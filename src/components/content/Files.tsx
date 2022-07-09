import CheckIcon from "@mui/icons-material/Check";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ErrorIcon from "@mui/icons-material/Error";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  LinearProgress,
  Snackbar,
  styled,
  Tooltip,
  tooltipClasses,
  TooltipProps,
  Typography
} from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridCellModes,
  GridCellModesModel,
  GridEditInputCell,
  GridRenderEditCellParams,
  GridRowId,
  GridRowParams,
  GridRowsProp,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport
} from "@mui/x-data-grid";
import { v1 } from "moos-api";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createFile, deleteFile, fetchFile, updateFile } from "../../logic/api";
import { updateFileList } from "../../logic/files";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  setFileDeletionErrorVisible,
  setFileEditErrorVisible,
  setFolderDialogVisible,
  setUploadDialogVisible
} from "../../redux/interfaceSlice";

interface FileTreeItem {
  id: string;
  name: string;
}

interface File extends FileTreeItem {
  owner: string;
  private: boolean;
  size: number;
  creationDate: number;
  lastModified: number;
}

interface Directory extends FileTreeItem {
  children: FileTreeItem[];
  parent?: Directory;
}

const root: Directory = {
  id: "/",
  name: "Root",
  children: []
};

const Files = () => {
  const files = useAppSelector((state) => state.session.files);
  const [gridData, setGridData] = useState<GridRowsProp>();
  const [currentDirectory, setCurrentDirectory] = useState<Directory>(root);
  const [cellModesModel, setCellModesModel] = useState<GridCellModesModel>();
  const [loading, setLoading] = useState(false);
  const [nameState, setNameState] = useState<{
    [key: GridRowId]: { original: string; value: string };
  }>({});
  const [errorState, setErrorState] = useState<{
    [key: GridRowId]: boolean | undefined;
  }>({});
  const fileDeletionErrorVisible = useAppSelector(
    (state) => state.interface.fileDeletionErrorVisible
  );
  const fileEditErrorVisible = useAppSelector(
    (state) => state.interface.fileEditErrorVisible
  );
  const hash = useLocation().hash.substring(1);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    updateFileList();
  }, []);

  useEffect(() => {
    if (files) {
      root.children = [];
      files.forEach((file: v1.File) => {
        if (!file.name.includes("/")) {
          const fileItem: File = {
            ...file
          };
          root.children.push(fileItem);
        } else {
          const paths = file.name.split("/");
          const fileName = paths.pop();
          let currentDirectory: Directory = root;
          for (const path of paths) {
            let foundDirectory: Directory | undefined =
              currentDirectory.children.find(
                (child) => child.name === path
              ) as Directory;
            if (!foundDirectory) {
              foundDirectory = {
                id: path,
                name: path,
                children: []
              };
              foundDirectory.parent = currentDirectory;
              currentDirectory.children.push(foundDirectory);
            }
            currentDirectory = foundDirectory;
          }
          const fileItem: File = {
            id: file.id,
            name: fileName ?? file.name,
            owner: file.owner,
            private: file.private,
            size: file.size,
            creationDate: file.creationDate,
            lastModified: file.lastModified
          };
          currentDirectory.children.push(fileItem);
        }
      });
      updateGridData();
    }
  }, [files]);

  useEffect(() => {
    updateGridData();
  }, [currentDirectory]);

  const updateGridData = () => {
    if (currentDirectory) {
      let gridData = currentDirectory.children;
      if (currentDirectory.parent) {
        const backToParent: Directory = {
          ...currentDirectory.parent,
          name: ".."
        };
        gridData = [backToParent, ...gridData];
      }
      setGridData(gridData);
    }
  };

  useEffect(() => {
    const paths = hash.split("/");
    let currentDirectory: Directory = root;
    for (const path of paths) {
      const foundDirectory: Directory | undefined =
        currentDirectory.children.find(
          (child) => child.name === path
        ) as Directory;
      if (!foundDirectory) {
        break;
      }
      currentDirectory = foundDirectory;
    }
    setCurrentDirectory(currentDirectory);
  }, [hash]);

  const onRowClick = async (rowParams: GridRowParams) => {
    const fileTreeItem = currentDirectory.children.find(
      (child) => child.id === rowParams.id
    );
    if (isFile(fileTreeItem)) {
      setLoading(true);
      try {
        const response = await fetchFile({ id: fileTreeItem.id });
        if (!response) {
          throw new Error("File not found");
        }
        setLoading(false);
        window.open(response?.url, "_blank");
      } catch (error) {
        setLoading(false);
      }
    } else if (isDirectory(fileTreeItem)) {
      navigate(`/files/${fileTreeItem.id}`);
    } else {
      console.error("Not Found.");
    }
  };

  const onRowEdit = (id: GridRowId) => {
    const newCellModesModel = { ...cellModesModel };
    newCellModesModel[id] = {
      name: {
        mode: GridCellModes.Edit
      }
    };
    setCellModesModel(newCellModesModel);
  };

  const onRowEditFinished = async (id: GridRowId) => {
    if (errorState[id]) {
      return dispatch(setFileEditErrorVisible(true));
    }
    const newCellModesModel = { ...cellModesModel };
    newCellModesModel[id] = {
      name: {
        mode: GridCellModes.View
      }
    };
    setCellModesModel(newCellModesModel);
    setLoading(true);
    let path = "";
    if (currentDirectory.parent) {
      let directory: Directory = currentDirectory;
      while (directory.parent) {
        path = `${directory.name}/${path}`;
        directory = directory.parent;
      }
    }
    try {
      const successful = await updateFile({
        id: id as string,
        name: path ? `${path}/${nameState[id].value}` : nameState[id].value
      });
      if (!successful) {
        throw new Error("Failed to update file");
      }
      await updateFileList();
      setLoading(false);
    } catch (error) {
      await updateFileList();
      dispatch(setFileEditErrorVisible(true));
      setLoading(false);
    }
  };

  const onDelete = async (id: string) => {
    setLoading(true);
    const successful = await deleteFile({ id: id });
    setLoading(false);
    if (successful) {
      await updateFileList();
    } else {
      dispatch(setFileDeletionErrorVisible(true));
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "30rem"
      }}
    >
      <UploadDialog currentDirectory={currentDirectory} />
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        autoHideDuration={4000}
        onClose={() => dispatch(setFileDeletionErrorVisible(false))}
        open={fileDeletionErrorVisible}
      >
        <Alert
          onClose={() => dispatch(setFileDeletionErrorVisible(false))}
          severity="error"
          variant="filled"
        >
          An error occurred while deleting this file!
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        autoHideDuration={4000}
        onClose={() => dispatch(setFileEditErrorVisible(false))}
        open={fileEditErrorVisible}
      >
        <Alert
          onClose={() => dispatch(setFileEditErrorVisible(false))}
          severity="error"
          variant="filled"
        >
          An error occurred while editing this file!
        </Alert>
      </Snackbar>
      {gridData && (
        <DataGrid
          cellModesModel={cellModesModel}
          columns={[
            {
              field: "name",
              headerName: "Name",
              flex: 2,
              editable: true,
              renderEditCell: renderEditName,
              preProcessEditCellProps(parameters) {
                const error: boolean | undefined =
                  parameters.props.value.includes("/");
                const newErrorState = { ...errorState };
                newErrorState[parameters.id] = error;
                setErrorState(newErrorState);
                return {
                  ...parameters.props,
                  error: !!error,
                  errorMessage: error
                    ? "File names must not contain '/'"
                    : undefined
                };
              },
              valueParser: (value, parameters) => {
                if (parameters) {
                  const newNameState = { ...nameState };
                  newNameState[parameters.id] = {
                    original: parameters.value,
                    value: value
                  };
                  setNameState(newNameState);
                }
                return value;
              }
            },
            {
              field: "actions",
              type: "actions",
              headerName: "Actions",
              flex: 0.5,
              getActions: ({ id }) => {
                return isFile(
                  currentDirectory.children.find((child) => child.id === id)
                )
                  ? [
                      cellModesModel &&
                      cellModesModel[id]?.name.mode === GridCellModes.Edit ? (
                        <GridActionsCellItem
                          icon={<CheckIcon />}
                          key="submit-edit"
                          label="Submit Changes"
                          onClick={() => onRowEditFinished(id)}
                        />
                      ) : (
                        <GridActionsCellItem
                          icon={<EditIcon />}
                          key="edit"
                          label="Edit"
                          onClick={() => onRowEdit(id)}
                        />
                      ),
                      <GridActionsCellItem
                        icon={<DeleteIcon />}
                        key="delete"
                        label="Delete"
                        onClick={() => onDelete(id as string)}
                      />
                    ]
                  : [];
              }
            }
          ]}
          components={{
            LoadingOverlay: LinearProgress,
            NoRowsOverlay: CustomNoRowsOverlay,
            Toolbar: CustomToolbar
          }}
          experimentalFeatures={{ newEditingApi: true }}
          hideFooterSelectedRowCount
          loading={files === undefined || loading}
          onRowDoubleClick={onRowClick}
          rows={gridData}
        />
      )}
    </Box>
  );
};

const isDirectory = (entry?: FileTreeItem): entry is Directory => {
  return !!entry && (entry as Directory).children !== undefined;
};

const isFile = (entry?: FileTreeItem): entry is File => {
  return !!entry && !isDirectory(entry) && (entry as File).owner !== undefined;
};

const renderEditName = (parameters: GridRenderEditCellParams) => {
  return <NameEditInputCell {...parameters} />;
};

const NameEditInputCell = ({
  errorMessage,
  ...parameters
}: GridRenderEditCellParams) => {
  const { error } = parameters;

  return (
    <>
      <GridEditInputCell {...parameters} />
      <StyledTooltip
        open={!!error}
        title={`${errorMessage ?? "Everything seems correct."}`}
      >
        <Box sx={{ display: "flex", alignItems: "center", paddingX: 1 }}>
          {!!error ? (
            <ErrorIcon color="error" />
          ) : (
            <CheckCircleOutlineIcon color="success" />
          )}
        </Box>
      </StyledTooltip>
    </>
  );
};

const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText
  }
}));

const CustomToolbar = () => {
  const dispatch = useAppDispatch();

  return (
    <GridToolbarContainer>
      <GridToolbarDensitySelector />
      <GridToolbarExport />
      <Box sx={{ minWidth: "0.5rem", width: "5rem" }} />
      <Button
        onClick={() => dispatch(setFolderDialogVisible(true))}
        size="small"
        startIcon={<CreateNewFolderIcon />}
        variant="text"
      >
        New Folder
      </Button>
      <Button
        onClick={() => dispatch(setUploadDialogVisible(true))}
        size="small"
        startIcon={<UploadFileIcon />}
        variant="text"
      >
        Upload File
      </Button>
    </GridToolbarContainer>
  );
};

const UploadDialog = ({
  currentDirectory
}: {
  currentDirectory: Directory;
}) => {
  const [file, setFile] = useState<globalThis.File>();
  const fileInput = useRef<HTMLInputElement | null>(null);
  const uploadDialogVisible = useAppSelector(
    (state) => state.interface.uploadDialogVisible
  );
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(setUploadDialogVisible(false));
  };

  const handleFileSelection = () => {
    if (fileInput.current?.files) {
      const file = fileInput.current.files[0];
      if (file) {
        setFile(file);
      }
    }
  };

  const handleUpload = async () => {
    if (file) {
      const response = await createFile({
        name: `${
          currentDirectory
            ? currentDirectory === root
              ? ""
              : currentDirectory.id
            : ""
        }${file.name}`
      });
      if (response) {
        try {
          const abortController = new AbortController();
          setTimeout(() => abortController.abort(), response.ttl);
          await fetch(response.url, {
            method: "PUT",
            signal: abortController.signal,
            body: file
          });
          updateFileList();
          handleClose();
          setFile(undefined);
        } catch (error) {
          await deleteFile({ id: response.id });
        }
      }
    }
  };

  return (
    <div>
      <Dialog onClose={handleClose} open={uploadDialogVisible}>
        <DialogTitle>File Upload</DialogTitle>
        <DialogContent>
          {file ? (
            <DialogContentText
              sx={{
                width: "12rem",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis"
              }}
            >
              {file.name}
            </DialogContentText>
          ) : (
            <DialogContentText>
              Please select a File to upload.
            </DialogContentText>
          )}
          <input
            id="file"
            name="file"
            onChange={handleFileSelection}
            ref={fileInput}
            style={{ display: "none" }}
            type="file"
          ></input>
          <label htmlFor="file">
            <Button
              component="div"
              startIcon={<UploadFileIcon />}
              sx={{ marginY: 1.5 }}
              variant="outlined"
            >
              Select File
            </Button>
          </label>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpload}>Upload</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

function CustomNoRowsOverlay() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Typography sx={{}} variant="body1">
        No files found. Click the button above to create a new file.
      </Typography>
    </Box>
  );
}

export default Files;
