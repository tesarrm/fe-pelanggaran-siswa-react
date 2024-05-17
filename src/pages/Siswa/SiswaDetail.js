import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { Grid, TextField, Typography, Paper, Button, Box } from "@mui/material";
import * as yup from "yup";
import { Link, useNavigate, useParams } from "react-router-dom";

import useRequestResource from "src/hooks/useRequestResource";

const validationSchema = yup.object({
  nama: yup.string().required("Nama is required").max(100, "Max length is 100"),
  nis: yup.string().required("NIS is required").max(19, "Max length is 19"),
  nama_ortu: yup.string().max(99, "Max length is 99"),
  hp_ortu: yup.string().max(19, "Max length is 19"),
  email_ortu: yup.string().email("Invalid email").max(99, "Max length is 99"),
  catatan: yup.string().max(199, "Max length is 199"),
});

export default function SiswaDetail() {
  const { addResource, resource, getResource, updateResource } =
    useRequestResource({
      endpoint: "siswa", // Update endpoint to "siswa"
      resourceLabel: "Siswa",
    });

  const [initialValues, setInitialValues] = useState({
    nama: "",
    nis: "",
    nama_ortu: "",
    hp_ortu: "",
    email_ortu: "",
    catatan: "",
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
        nis: resource.nis,
        nama_ortu: resource.nama_ortu || "",
        hp_ortu: resource.hp_ortu || "",
        email_ortu: resource.email_ortu || "",
        catatan: resource.catatan || "",
      });
    }
  }, [resource]);

  const handleSubmit = (values) => {
    const formattedValues = {
      nama: values.nama,
      nis: values.nis,
      nama_ortu: values.nama_ortu || null,
      hp_ortu: values.hp_ortu || null,
      email_ortu: values.email_ortu || null,
      catatan: values.catatan || null,
    };

    if (id) {
      updateResource(id, formattedValues, () => {
        navigate("/siswa"); // Navigate back to "/siswa"
      });
    } else {
      addResource(formattedValues, () => {
        navigate("/siswa"); // Navigate back to "/siswa"
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
        {id ? "Edit Siswa" : "Create Siswa"}
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
                    id="nis"
                    label="NIS"
                    {...formik.getFieldProps("nis")}
                    error={formik.touched.nis && Boolean(formik.errors.nis)}
                    helperText={formik.touched.nis && formik.errors.nis}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="nama_ortu"
                    label="Nama Orang Tua"
                    {...formik.getFieldProps("nama_ortu")}
                    error={
                      formik.touched.nama_ortu &&
                      Boolean(formik.errors.nama_ortu)
                    }
                    helperText={
                      formik.touched.nama_ortu && formik.errors.nama_ortu
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="hp_ortu"
                    label="Nomor HP Orang Tua"
                    {...formik.getFieldProps("hp_ortu")}
                    error={
                      formik.touched.hp_ortu && Boolean(formik.errors.hp_ortu)
                    }
                    helperText={formik.touched.hp_ortu && formik.errors.hp_ortu}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="email_ortu"
                    label="Email Orang Tua"
                    {...formik.getFieldProps("email_ortu")}
                    error={
                      formik.touched.email_ortu &&
                      Boolean(formik.errors.email_ortu)
                    }
                    helperText={
                      formik.touched.email_ortu && formik.errors.email_ortu
                    }
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="catatan"
                    label="Catatan"
                    multiline
                    rows={4}
                    {...formik.getFieldProps("catatan")}
                    error={
                      formik.touched.catatan && Boolean(formik.errors.catatan)
                    }
                    helperText={formik.touched.catatan && formik.errors.catatan}
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
                      to="/siswa"
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
