import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { Grid, TextField, Typography, Paper, Button, Box, MenuItem } from "@mui/material";
import * as yup from "yup";
import { Link, useNavigate, useParams } from "react-router-dom";
import useRequestResource from "src/hooks/useRequestResource";

const validationSchema = yup.object({
  nama: yup.string().required("Nama is required").max(100, "Max length is 100"),
  siswa: yup.string().required("Siswa is required"),
  catatan: yup.string().required("Catatan is required"),
  tgl_jam: yup.date().required("Tanggal dan Jam is required"),
});

export default function PelanggaranDetail() {
  const { addResource, resource, getResource, updateResource } = useRequestResource({
    endpoint: "pelanggaran",
    resourceLabel: "Pelanggaran",
  });

  const { getResourceList: getKategoriResourceList, resourceList: kategoriResourceList } = useRequestResource({
    endpoint: "pelanggaran_kategori",
    resourceLabel: "Kategori",
  });

  const { getResourceList: getSiswaResourceList, resourceList: siswaResourceList } = useRequestResource({
    endpoint: "siswa",
    resourceLabel: "Siswa",
  });

  const [initialValues, setInitialValues] = useState({
    nama: "",
    siswa: "",
    poin: "",
    catatan: "",
    tgl_jam: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getResource(id);
    }
    getKategoriResourceList();
    getSiswaResourceList();
  }, [id, getResource, getKategoriResourceList, getSiswaResourceList]);

  useEffect(() => {
    if (resource) {
      setInitialValues({
        nama: resource.kategori?.nama || "",
        siswa: resource.siswa?.nama || "",
        poin: resource.kategori?.poin || "",
        catatan: resource.catatan || "",
        tgl_jam: resource.tgl_jam ? new Date(resource.tgl_jam).toISOString().slice(0, 16) : "",
      });
    }
  }, [resource]);

  const handleKategoriChange = (e, formik) => {
    const selectedKategori = kategoriResourceList.results.find(kategori => kategori.nama === e.target.value);
    formik.setFieldValue("nama", selectedKategori.nama);
    formik.setFieldValue("poin", selectedKategori.poin);
  };

  const handleSubmit = (values) => {
    const formattedValues = {
      nama: values.nama,
      siswa: values.siswa,
      poin: values.poin,
      catatan: values.catatan,
      tgl_jam: new Date(values.tgl_jam).toISOString(),
    };

    if (id) {
      updateResource(id, formattedValues, () => {
        navigate("/pelanggaran");
      });
    } else {
      addResource(formattedValues, () => {
        navigate("/pelanggaran");
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
        {id ? "Edit Pelanggaran" : "Create Pelanggaran"}
      </Typography>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  select
                  fullWidth
                  id="nama"
                  label="Nama Pelanggaran"
                  {...formik.getFieldProps("nama")}
                  error={formik.touched.nama && Boolean(formik.errors.nama)}
                  helperText={formik.touched.nama && formik.errors.nama}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => handleKategoriChange(e, formik)}
                >
                  {kategoriResourceList.results.map((kategori) => (
                    <MenuItem key={kategori.id} value={kategori.nama}>
                      {kategori.nama}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  select
                  fullWidth
                  id="siswa"
                  label="Siswa"
                  {...formik.getFieldProps("siswa")}
                  error={formik.touched.siswa && Boolean(formik.errors.siswa)}
                  helperText={formik.touched.siswa && formik.errors.siswa}
                  InputLabelProps={{
                    shrink: true,
                  }}
                >
                  {siswaResourceList.results.map((siswa) => (
                    <MenuItem key={siswa.id} value={siswa.nama}>
                      {siswa.nama}
                    </MenuItem>
                  ))}
                </TextField>
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
                  disabled
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
                  error={formik.touched.catatan && Boolean(formik.errors.catatan)}
                  helperText={formik.touched.catatan && formik.errors.catatan}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="tgl_jam"
                  label="Tanggal dan Jam"
                  type="datetime-local"
                  {...formik.getFieldProps("tgl_jam")}
                  error={formik.touched.tgl_jam && Boolean(formik.errors.tgl_jam)}
                  helperText={formik.touched.tgl_jam && formik.errors.tgl_jam}
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
                    to="/pelanggaran"
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
        )}
      </Formik>
    </Paper>
  );
}
