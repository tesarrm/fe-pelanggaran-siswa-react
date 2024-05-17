import React, { useEffect, useState } from "react";
import {
  Button,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import useRequestResource from "src/hooks/useRequestResource";
import Filters from "./Filters";
import { Link, useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import Masonry from "react-masonry-css";

export default function Siswa() {
  const navigate = useNavigate();
  const location = useLocation();
  const { getResourceList, resourceList, deleteResource } = useRequestResource({
    endpoint: "siswa",
    resourceLabel: "siswa",
  });
  const [open, setOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);

  useEffect(() => {
    getResourceList();
  }, [getResourceList]);

  const handleConfirmDelete = (id) => {
    setIdToDelete(id);
    setOpen(true);
  };

  const handleDeleteClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    setOpen(false);
    deleteResource(idToDelete);
  };

  const onSubmitSearch = (values) => {
    const { completed, priority, search, category } = values;
    const newQuery = {
      completed:
        completed === "True" || completed === "False" ? completed : undefined,
      priority: priority === "all" ? undefined : priority,
      category: category === "all" ? undefined : category,
      search: search,
    };
    const newSearch = queryString.stringify(newQuery);
    navigate(`${location.pathname}?${newSearch}`);
  };

  return (
    <div>
      <Filters onSubmit={onSubmitSearch} />
      <Dialog open={open} onClose={handleDeleteClose}>
        <DialogTitle>
          Are you sure you want to delete this siswa?
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleDelete}>Yes</Button>
          <Button onClick={handleDeleteClose}>No</Button>
        </DialogActions>
      </Dialog>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mb: 4,
        }}
      >
        <Button
          component={Link}
          variant="contained"
          color="primary"
          to="/siswa/create"
        >
          Create Siswa
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 360 }} size="small">
          <TableHead>
            <TableRow>
              <TableCell align="left">NIS</TableCell>
              <TableCell align="left">Nama</TableCell>
              <TableCell align="left">Nama Orang Tua</TableCell>
              <TableCell align="left">HP Orang Tua</TableCell>
              <TableCell align="left">Kelas</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {resourceList.results.map((r) => {
              return (
                <TableRow key={r.id}>
                  <TableCell align="left">{r.nis}</TableCell>
                  <TableCell align="left">{r.nama}</TableCell>
                  <TableCell align="left">{r.nama_ortu}</TableCell>
                  <TableCell align="left">{r.hp_ortu}</TableCell>
                  <TableCell align="left">{r.kelas.nama}</TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                      <Link
                        to={`/siswa/edit/${r.id}`}
                        key="siswa-edit"
                      >
                        <IconButton size="large">
                          <EditIcon />
                        </IconButton>
                      </Link>
                      <IconButton
                        size="large"
                        onClick={() => {
                          handleConfirmDelete(r.id);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
