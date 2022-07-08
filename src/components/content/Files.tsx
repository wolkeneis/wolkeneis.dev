import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
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
  Snackbar,
  Typography
} from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridCellModes,
  GridCellModesModel,
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
import { createFile, deleteFile } from "../../logic/api";
import { updateFileList } from "../../logic/files";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  setFileDeletionErrorVisible,
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
  const fileDeletionErrorVisible = useAppSelector(
    (state) => state.interface.fileDeletionErrorVisible
  );
  const hash = useLocation().hash.substring(1);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    updateFileList();
  }, []);

  useEffect(() => {
    if (files && files.length !== 0) {
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
      updateGridDate();
    }
  }, [files]);

  useEffect(() => {
    updateGridDate();
  }, [currentDirectory]);

  const updateGridDate = () => {
    if (currentDirectory) {
      let gridData = currentDirectory.children;
      if (currentDirectory.parent) {
        gridData = [
          {
            ...currentDirectory.parent,
            name: ".."
          },
          ...gridData
        ];
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

  const onRowClick = (rowParams: GridRowParams) => {
    navigate(`/files#${rowParams?.id}`);
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

  const onDelete = async (id: string) => {
    const successful = await deleteFile({ id: id });
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
          An error occurred while deleting the file!
        </Alert>
      </Snackbar>
      {gridData && (
        <DataGrid
          cellModesModel={cellModesModel}
          columns={[
            {
              field: "name",
              headerName: "Name",
              flex: 2
            },
            {
              field: "actions",
              type: "actions",
              headerName: "Actions",
              flex: 0.5,
              getActions: ({ id }) => {
                return [
                  <GridActionsCellItem
                    icon={<EditIcon />}
                    key="edit"
                    label="Edit"
                    onClick={() => onRowEdit(id)}
                  />,
                  <GridActionsCellItem
                    icon={<DeleteIcon />}
                    key="delete"
                    label="Delete"
                    onClick={() => onDelete(id as string)}
                  />
                ];
              }
            }
          ]}
          components={{
            NoRowsOverlay: CustomNoRowsOverlay,
            Toolbar: CustomToolbar
          }}
          experimentalFeatures={{ newEditingApi: true }}
          loading={files === undefined}
          onRowDoubleClick={onRowClick}
          rows={gridData}
        />
      )}
    </Box>
  );
};

const CustomToolbar = () => {
  const dispatch = useAppDispatch();

  return (
    <GridToolbarContainer>
      <GridToolbarDensitySelector />
      <GridToolbarExport />
      <Box sx={{ minWidth: "0.5rem", width: "5rem" }} />
      <Button size="small" startIcon={<CreateNewFolderIcon />} variant="text">
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
