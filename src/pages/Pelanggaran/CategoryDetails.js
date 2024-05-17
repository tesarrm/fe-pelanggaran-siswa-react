// import React, { useEffect, useState } from "react";
// import { Formik } from "formik";
// import { Grid, TextField, Typography, Paper, Button, Box } from "@mui/material";
// import * as yup from "yup";
// import { Link, useNavigate, useParams } from "react-router-dom";

// import useRequestResource from "src/hooks/useRequestResource";
// import ColorPicker from "src/components/ColorPicker";

// // const validationSchema = yup.object({
// //   name: yup.string().required("Name is required").max(100, "Max length is 100"),
// //   color: yup.string().required("Color is required"),
// // });
// const validationSchema = yup.object({
//   name: yup.string().required("Name is required").max(100, "Max length is 100"),
//   poin: yup.number().required("Poin is required"),
//   pesan: yup.string().required("Pesan is required"),
// });

// export default function CategoryDetails() {
//   const { addResource, resource, getResource, updateResource } =
//     useRequestResource({
//       endpoint: "pelanggaran_kategori",
//       resourceLabel: "Category",
//     });
//   const [initialValues, setInitialValues] = useState({
//     name: "",
//     poin: "",
//     pesan: "",
//   });
//   const navigate = useNavigate();
//   const { id } = useParams();

//   useEffect(() => {
//     if (id) {
//       getResource(id);
//     }
//   }, [id, getResource]);

//   useEffect(() => {
//     if (resource) {
//       setInitialValues({
//         nama: resource.nama,
//         poin: resource.poin,
//         pesan: resource.pesan,
//       });
//     }
//   }, [resource]);

//   const handleSubmit = (values) => {
//     console.log("halo")
//     const formattedValues = {
//       name: values.name,
//       poin: values.poin,
//       pesan: values.pesan,
//     };
//     if (id) {
//       updateResource(id, formattedValues, () => {
//         navigate("/categories");
//       });
//       return;
//     }
//     addResource(formattedValues, () => {
//       navigate("/categories");
//     });
//   };

//   return (
//     <Paper
//       sx={{
//         borderRadius: "2px",
//         boxShadow: (theme) => theme.shadows[5],
//         padding: (theme) => theme.spacing(2, 4, 3),
//       }}
//     >
//       <Typography variant="h6" mb={4}>
//         {id ? "Edit Category" : "Create Category"}
//       </Typography>
//       <Formik
//         onSubmit={handleSubmit}
//         initialValues={initialValues}
//         enableReinitialize
//         validationSchema={validationSchema}
//       >
//         {(formik) => {
//           return (
//             <form onSubmit={formik.handleSubmit}>
//               <Grid container spacing={3}>
//                 <Grid item xs={12}>
//                   <TextField
//                     fullWidth
//                     id="name"
//                     label="Nama"
//                     {...formik.getFieldProps("nama")}
//                     error={formik.touched.nama && Boolean(formik.errors.nama)}
//                     helperText={formik.touched.nama && formik.errors.nama}
//                     InputLabelProps={{
//                       shrink: true,
//                     }}
//                   />
//                 </Grid>
//                 <Grid item xs={12}>
//                   <TextField
//                     fullWidth
//                     id="poin"
//                     label="Poin"
//                     {...formik.getFieldProps("poin")}
//                     error={formik.touched.poin && Boolean(formik.errors.poin)}
//                     helperText={formik.touched.poin && formik.errors.poin}
//                     InputLabelProps={{
//                       shrink: true,
//                     }}
//                   />
//                 </Grid>

//                 <Grid item xs={12}>
//                   <TextField
//                     fullWidth
//                     id="pesan"
//                     label="Pesan"
//                     multiline
//                     rows={4} // You can change this to the desired number of rows
//                     {...formik.getFieldProps("pesan")}
//                     error={formik.touched.pesan && Boolean(formik.errors.pesan)}
//                     helperText={formik.touched.pesan && formik.errors.pesan}
//                     InputLabelProps={{
//                       shrink: true,
//                     }}
//                   />
//                 </Grid>
//                 <Grid item>
//                   <Box
//                     sx={{
//                       display: "flex",
//                       margin: (theme) => theme.spacing(1),
//                       marginTop: (theme) => theme.spacing(3),
//                     }}
//                   >
//                     <Button
//                       component={Link}
//                       to="/categories"
//                       size="medium"
//                       variant="outlined"
//                       sx={{ mr: 2 }}
//                     >
//                       Back
//                     </Button>
//                     <Button
//                       type="submit"
//                       size="medium"
//                       variant="contained"
//                       color="primary"
//                     >
//                       Submit
//                     </Button>
//                   </Box>
//                 </Grid>
//               </Grid>
//             </form>
//           );
//         }}
//       </Formik>
//     </Paper>
//   );
// }

import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { Grid, TextField, Typography, Paper, Button, Box } from "@mui/material";
import * as yup from "yup";
import { Link, useNavigate, useParams } from "react-router-dom";

import useRequestResource from "src/hooks/useRequestResource";
import ColorPicker from "src/components/ColorPicker";

const validationSchema = yup.object({
  nama: yup.string().required("Nama is required").max(100, "Max length is 100"),
  poin: yup.number().required("Poin is required"),
  pesan: yup.string().required("Pesan is required"),
});

export default function CategoryDetails() {
  const { addResource, resource, getResource, updateResource } =
    useRequestResource({
      endpoint: "pelanggaran_kategori",
      resourceLabel: "Category",
    });

  const [initialValues, setInitialValues] = useState({
    nama: "",
    poin: "",
    pesan: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getResource(id);
    }
  }, [id, getResource]);

  useEffect(() => {
    if (resource) {
      setInitialValues({
        nama: resource.nama,
        poin: resource.poin,
        pesan: resource.pesan,
      });
    }
  }, [resource]);

  const handleSubmit = (values) => {
    console.log("Submitted values:", values);

    const formattedValues = {
      nama: values.nama,
      poin: values.poin,
      pesan: values.pesan,
    };

    if (id) {
      updateResource(id, formattedValues, () => {
        navigate("/categories");
      });
    } else {
      addResource(formattedValues, () => {
        navigate("/categories");
      });
    }
  };

  return (
    <Paper
      sx={{
        borderRadius: "2px",
        boxShadow: (theme) => theme.shadows[5],
        padding: (theme) => theme.spacing(2, 4, 3),
      }}
    >
      <Typography variant="h6" mb={4}>
        {id ? "Edit Category" : "Create Category"}
      </Typography>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
      >
        {(formik) => {
          return (
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="nama"
                    label="Nama"
                    {...formik.getFieldProps("nama")}
                    error={formik.touched.nama && Boolean(formik.errors.nama)}
                    helperText={formik.touched.nama && formik.errors.nama}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="poin"
                    label="Poin"
                    {...formik.getFieldProps("poin")}
                    error={formik.touched.poin && Boolean(formik.errors.poin)}
                    helperText={formik.touched.poin && formik.errors.poin}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="pesan"
                    label="Pesan"
                    multiline
                    rows={4} // You can change this to the desired number of rows
                    {...formik.getFieldProps("pesan")}
                    error={formik.touched.pesan && Boolean(formik.errors.pesan)}
                    helperText={formik.touched.pesan && formik.errors.pesan}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item>
                  <Box
                    sx={{
                      display: "flex",
                      margin: (theme) => theme.spacing(1),
                      marginTop: (theme) => theme.spacing(3),
                    }}
                  >
                    <Button
                      component={Link}
                      to="/categories"
                      size="medium"
                      variant="outlined"
                      sx={{ mr: 2 }}
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      size="medium"
                      variant="contained"
                      color="primary"
                    >
                      Submit
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          );
        }}
      </Formik>
    </Paper>
  );
}
