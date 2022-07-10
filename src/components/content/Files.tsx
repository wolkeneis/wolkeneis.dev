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
  Breadcrumbs,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  LinearProgress,
  Link,
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
import { v4 as uuidv4 } from "uuid";
import { createFile, deleteFile, fetchFile, updateFile } from "../../logic/api";
import { updateFileList } from "../../logic/files";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  setFileDeletionErrorVisible,
  setFileEditErrorVisible,
  setFolderDialogVisible,
  setUploadDialogVisible
} from "../../redux/interfaceSlice";
import LinkBehavior from "../LinkBehavior";

interface FileTreeItem {
  path: string;
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
  virtual?: boolean;
}

const root: Directory = {
  path: "",
  id: ">",
  name: "Home",
  children: []
};

const Files = () => {
  const files = useAppSelector((state) => state.session.files);
  const [gridData, setGridData] = useState<GridRowsProp>();
  const [currentDirectory, setCurrentDirectory] = useState<Directory>(root);
  const [breadcrumbs, setBreadcrumbs] = useState([root]);
  const [cellModesModel, setCellModesModel] = useState<GridCellModesModel>();
  const [loading, setLoading] = useState(false);
  const [nameState, setNameState] = useState<{
    [key: GridRowId]: { original: string; value: string };
  }>({});
  const [errorState, setErrorState] = useState<{
    [key: GridRowId]: boolean | undefined;
  }>({});
  const folderDialogVisible = useAppSelector(
    (state) => state.interface.folderDialogVisible
  );
  const fileDeletionErrorVisible = useAppSelector(
    (state) => state.interface.fileDeletionErrorVisible
  );
  const fileEditErrorVisible = useAppSelector(
    (state) => state.interface.fileEditErrorVisible
  );
  const hash = decodeURI(useLocation().hash).substring(1);
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
            ...file,
            path: "/"
          };
          root.children.push(fileItem);
        } else {
          const pathParts = file.name.split("/");
          const fileName = pathParts.pop();
          let currentDirectory: Directory = root;
          for (const pathPart of pathParts) {
            let foundDirectory: Directory | undefined =
              currentDirectory.children.find(
                (child) => child.name === pathPart
              ) as Directory;
            if (!foundDirectory) {
              foundDirectory = {
                path: currentDirectory.path
                  ? `${currentDirectory.path}/${currentDirectory.id}`
                  : `${currentDirectory.id}`,
                id: pathPart,
                name: pathPart,
                children: []
              };
              foundDirectory.parent = currentDirectory;
              currentDirectory.children.push(foundDirectory);
            }
            currentDirectory = foundDirectory;
          }
          const fileItem: File = {
            path: currentDirectory.path
              ? `${currentDirectory.path}/${currentDirectory.id}`
              : `${currentDirectory.id}`,
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
      updateCurrentDirectory();
    }
  }, [files]);

  useEffect(() => {
    updateGridData();
  }, [currentDirectory]);

  const updateGridData = () => {
    if (currentDirectory) {
      let gridData = currentDirectory.children;
      let breadcrumbs: Directory[] = [];
      let breadcrumb: Directory = currentDirectory;
      if (currentDirectory.parent) {
        while (breadcrumb.parent) {
          breadcrumbs.push(breadcrumb);
          breadcrumb = breadcrumb.parent;
        }
        const backToParent: Directory = {
          ...currentDirectory.parent,
          name: "..",
          virtual: true
        };
        gridData = [backToParent, ...gridData];
      }
      breadcrumbs.push(root);
      breadcrumbs = breadcrumbs.reverse();
      setBreadcrumbs(breadcrumbs);
      setGridData(gridData);
    }
  };

  useEffect(() => {
    updateCurrentDirectory();
  }, [hash]);

  const updateCurrentDirectory = () => {
    const pathParts = (
      hash.startsWith(`${root.id}/`)
        ? hash.substring(`${root.id}/`.length)
        : hash
    ).split("/");
    let currentDirectory: Directory = root;
    for (const pathPart of pathParts) {
      const foundDirectory: Directory | undefined =
        currentDirectory.children.find((child) => {
          return child.id === pathPart;
        }) as Directory;
      if (!foundDirectory) {
        break;
      }
      currentDirectory = foundDirectory;
    }
    setCurrentDirectory(currentDirectory);
  };

  useEffect(() => {
    if (folderDialogVisible) {
      const alreadyExists =
        currentDirectory.children.find((item) => item.id === "New Folder") !==
        undefined;
      const name = alreadyExists ? `${uuidv4()}` : "New Folder";
      const newDirectory: Directory = {
        path: currentDirectory.path
          ? `${currentDirectory.path}/${currentDirectory.id}`
          : `${currentDirectory.id}`,
        id: name,
        name: name,
        children: [],
        parent: currentDirectory
      };
      currentDirectory.children = [...currentDirectory.children, newDirectory];
      updateGridData();
      startItemEditing(newDirectory);
      dispatch(setFolderDialogVisible(false));
    }
  }, [currentDirectory, folderDialogVisible]);

  const onItemClick = async (rowParams: GridRowParams) => {
    const fileTreeItem = rowParams.row;
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
      navigate(
        fileTreeItem.path
          ? `/files#${fileTreeItem.path}/${fileTreeItem.id}`
          : `/files#${fileTreeItem.id}`
      );
    } else {
      console.error("Not Found.");
    }
  };

  const startItemEditing = (item: FileTreeItem) => {
    const newNameState = { ...nameState };
    newNameState[item.id] = {
      original: item.name,
      value: item.name
    };
    setNameState(newNameState);
    changeEditMode(item.id, GridCellModes.Edit);
  };

  const stopItemEditing = (id: GridRowId) => {
    changeEditMode(id, GridCellModes.View);
  };

  const changeEditMode = (id: GridRowId, mode: GridCellModes) => {
    const newCellModesModel = { ...cellModesModel };
    newCellModesModel[id] = {
      name: {
        mode: mode
      }
    };
    setCellModesModel(newCellModesModel);
  };

  const onItemEditFinished = async (item: FileTreeItem) => {
    if (errorState[item.id]) {
      return dispatch(setFileEditErrorVisible(true));
    }
    if (
      currentDirectory.children.filter(
        (child) =>
          !!nameState[item.id] &&
          child.name === nameState[item.id].value &&
          child.id !== item.id
      ).length !== 0
    ) {
      return dispatch(setFileEditErrorVisible(true));
    }
    if (isFile(item)) {
      stopItemEditing(item.id);
      setLoading(true);
      try {
        const successful = await updateFile({
          id: item.id,
          name: item.path
            ? `${item.path}/${nameState[item.id].value}`
            : nameState[item.id].value
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
    } else if (isDirectory(item)) {
      if (item.children.length > 0) {
        return dispatch(setFileEditErrorVisible(true));
      }
      stopItemEditing(item.id);
      const value = nameState[item.id].value;
      item.name = value;
      item.id = value;
      setTimeout(() => updateGridData(), 1);
    } else {
      return dispatch(setFileEditErrorVisible(true));
    }
  };

  const onDelete = async (id: string) => {
    setLoading(true);
    try {
      const successful = await deleteFile({ id: id });
      if (!successful) {
        throw new Error("Failed to delete file");
      }
      await updateFileList();
      setLoading(false);
    } catch (error) {
      dispatch(setFileDeletionErrorVisible(true));
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "31.5rem"
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
      {breadcrumbs && (
        <Breadcrumbs maxItems={2} sx={{ margin: 2 }}>
          {breadcrumbs.map((breadcrumb) => {
            return (
              <Link
                color="inherit"
                component={LinkBehavior}
                href={
                  breadcrumb.path
                    ? `#${breadcrumb.path}/${breadcrumb.id}`
                    : `#${breadcrumb.id}`
                }
                key={breadcrumb.id}
                underline="hover"
              >
                {breadcrumb.name}
              </Link>
            );
          })}
        </Breadcrumbs>
      )}
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
                  parameters.props.value.includes("/") ||
                  parameters.props.value.includes("\\") ||
                  parameters.props.value.includes(">");
                const newErrorState = { ...errorState };
                newErrorState[parameters.id] = error;
                setErrorState(newErrorState);
                return {
                  ...parameters.props,
                  error: !!error,
                  errorMessage: error
                    ? "File names must not contain '/', '\\' or '>'"
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
              getActions: ({ id, row }) => {
                const item: FileTreeItem = row;
                return isFile(item)
                  ? [
                      cellModesModel &&
                      cellModesModel[id]?.name.mode === GridCellModes.Edit ? (
                        <GridActionsCellItem
                          icon={<CheckIcon />}
                          key="submit-edit"
                          label="Submit Changes"
                          onClick={() => onItemEditFinished(item)}
                        />
                      ) : (
                        <GridActionsCellItem
                          icon={<EditIcon />}
                          key="edit"
                          label="Edit"
                          onClick={() => startItemEditing(item)}
                        />
                      ),
                      <GridActionsCellItem
                        icon={<DeleteIcon />}
                        key="delete"
                        label="Delete"
                        onClick={() => onDelete(id as string)}
                      />
                    ]
                  : isDirectory(item) && !item.virtual
                  ? [
                      cellModesModel &&
                      cellModesModel[id]?.name.mode === GridCellModes.Edit ? (
                        <GridActionsCellItem
                          icon={<CheckIcon />}
                          key="submit-edit"
                          label="Submit Changes"
                          onClick={() => onItemEditFinished(item)}
                        />
                      ) : (
                        <GridActionsCellItem
                          icon={<EditIcon />}
                          key="edit"
                          label="Edit"
                          onClick={() => startItemEditing(item)}
                        />
                      )
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
          onCellEditStart={(_params, event) =>
            (event.defaultMuiPrevented = true)
          }
          onRowDoubleClick={onItemClick}
          rows={gridData}
          sx={{ userSelect: "none" }}
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
      try {
        const absoluteFilepath = currentDirectory.path
          ? `${currentDirectory.path}/${currentDirectory.id}/${file.name}`
          : `${currentDirectory.id}/${file.name}`;
        const response = await createFile({
          name: absoluteFilepath.startsWith(`${root.id}/`)
            ? absoluteFilepath.substring(`${root.id}/`.length)
            : absoluteFilepath
        });
        if (!response) {
          throw new Error("Failed to create file");
        }
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
      } catch (error) {
        console.error(error);
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
