import { Box } from "@mui/material";
import { DataGrid, GridRowParams, GridRowsProp } from "@mui/x-data-grid";
import { v1 } from "moos-api";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { updateFileList } from "../../logic/files";
import { useAppSelector } from "../../redux/hooks";

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
  const theme = useAppSelector((state) => state.interface.theme);
  const mobile = useAppSelector((state) => state.interface.mobile);
  const files = useAppSelector((state) => state.session.files);
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
    }
  }, [files]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: mobile ? 0 : "12%",
        minHeight: "30rem"
      }}
    >
      <Grid root={root} />
    </Box>
  );
};

const Grid = ({ root }: { root: Directory }) => {
  const [gridData, setGridData] = useState<GridRowsProp>();
  const [currentDirectory, setCurrentDirectory] = useState<Directory>(root);
  const hash = useLocation().hash.substring(1);
  const navigate = useNavigate();

  useEffect(() => {
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
  }, [currentDirectory]);

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

  return (
    <>
      {gridData && (
        <DataGrid
          columns={[{ field: "name", headerName: "Name" }]}
          onRowDoubleClick={onRowClick}
          rows={gridData}
        />
      )}
    </>
  );
};

export default Files;
