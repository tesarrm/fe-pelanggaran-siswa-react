// import React, { useEffect, useState } from "react";
// import {
//   Button,
//   Box,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   IconButton,
//   Dialog,
//   DialogTitle,
//   DialogActions,
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { Link } from "react-router-dom";
// import useRequestResource from "src/hooks/useRequestResource";

// import ColorBox from "src/components/ColorBox";

// export default function Pelanggaran() {
//   const { getResourceList, resourceList, deleteResource } = useRequestResource({
//     endpoint: "pelanggaran",
//     resourceLabel: "Pelanggaran",
//   });
//   const [open, setOpen] = useState(false);
//   const [idToDelete, setIdToDelete] = useState(null);

//   useEffect(() => {
//     getResourceList();
//   }, [getResourceList]);

//   const handleConfirmDelete = (id) => {
//     setIdToDelete(id);
//     setOpen(true);
//   };

//   const handleDeleteClose = () => {
//     setOpen(false);
//   };

//   const handleDelete = () => {
//     setOpen(false);
//     deleteResource(idToDelete);
//   };

//   return (
//     <div>
//       <Dialog open={open} onClose={handleDeleteClose}>
//         <DialogTitle>
//           Are you sure you want to delete this category?
//         </DialogTitle>
//         <DialogActions>
//           <Button onClick={handleDelete}>Yes</Button>
//           <Button onClick={handleDeleteClose}>No</Button>
//         </DialogActions>
//       </Dialog>
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "flex-end",
//           mb: 4,
//         }}
//       >
//         <Button
//           component={Link}
//           variant="contained"
//           color="primary"
//           to="/pelanggaran/create"
//         >
//           Create Category
//         </Button>
//       </Box>
//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 360 }} size="small">
//           <TableHead>
//             <TableRow>
//               <TableCell align="left">Name</TableCell>
//               <TableCell align="left">Poin</TableCell>
//               <TableCell align="left">Pesan</TableCell>
//               <TableCell align="right">Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {resourceList.results.map((r) => {
//               return (
//                 <TableRow key={r.id}>
//                   <TableCell align="left">{r.nama}</TableCell>
//                   <TableCell align="left">{r.poin}</TableCell>
//                   <TableCell align="left">{r.pesan}</TableCell>
//                   <TableCell align="right">
//                     <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
//                       <Link to={`/pelanggaran/edit/${r.id}`} key="pelanggaran-edit">
//                         <IconButton size="large">
//                           <EditIcon />
//                         </IconButton>
//                       </Link>

//                       <IconButton
//                         size="large"
//                         onClick={() => {
//                           handleConfirmDelete(r.id);
//                         }}
//                       >
//                         <DeleteIcon />
//                       </IconButton>
//                     </Box>
//                   </TableCell>
//                 </TableRow>
//               );
//             })}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </div>
//   );
// }

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
import { Link } from "react-router-dom";
import useRequestResource from "src/hooks/useRequestResource";

export default function Pelanggaran() {
  const { getResourceList, resourceList, deleteResource } = useRequestResource({
    endpoint: "pelanggaran",
    resourceLabel: "Pelanggaran",
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

  return (
    <div>
      <Dialog open={open} onClose={handleDeleteClose}>
        <DialogTitle>
          Are you sure you want to delete this pelanggaran?
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
          to="/pelanggaran/create"
        >
          Create Pelanggaran
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 360 }} size="small">
          <TableHead>
            <TableRow>
              <TableCell align="left">Pelanggaran</TableCell>
              <TableCell align="left">Siswa</TableCell>
              <TableCell align="left">Catatan</TableCell>
              <TableCell align="left">Tanggal & Jam</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {resourceList.results.map((r) => {
              return (
                <TableRow key={r.id}>
                  <TableCell align="left">{r.kategori.nama}</TableCell>
                  <TableCell align="left">{r.siswa.nama}</TableCell>
                  <TableCell align="left">{r.catatan}</TableCell>
                  <TableCell align="left">{r.tgl_jam ? new Date(r.tgl_jam).toISOString().slice(0, 16): ""}</TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                      <Link to={`/pelanggaran/edit/${r.id}`} key="pelanggaran-edit">
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
