import * as React from "react";
import Avatar from "@mui/material/Avatar";
import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Formik } from "formik";
import * as yup from "yup";
import useRequestAuth from "src/hooks/useRequestAuth";
import { Link } from "react-router-dom";
import Divider from "@mui/material/Divider";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const validationSchema = yup.object({
  username: yup.string().required("Email Address / Username is required"),
  password: yup.string().required("Password is required"),
});

export default function SignIn() {
  const { login, loading } = useRequestAuth();

  const handleSubmit = (values) => {
    login(values);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Card sx={{ mt: 8, boxShadow: 3 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "primary.main" }}>
              <AccountCircleIcon />
            </Avatar>
          }
          title={<Typography component="h1" variant="h5">Sign In</Typography>}
          titleTypographyProps={{ align: 'center' }}
        />
        <CardContent>
          <Formik
            validationSchema={validationSchema}
            validateOnBlur={false}
            onSubmit={handleSubmit}
            initialValues={{
              username: "",
              password: "",
            }}
          >
            {(formik) => (
              <Box component="form" onSubmit={formik.handleSubmit} noValidate>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username / Email Address"
                  name="username"
                  autoFocus
                  {...formik.getFieldProps("username")}
                  error={formik.touched.username && Boolean(formik.errors.username)}
                  helperText={formik.touched.username && formik.errors.username}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    startAdornment: <EmailIcon sx={{ mr: 1 }} />,
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  {...formik.getFieldProps("password")}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    startAdornment: <LockIcon sx={{ mr: 1 }} />,
                  }}
                />
                <LoadingButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  loading={loading}
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </LoadingButton>
                <Divider sx={{ my: 2 }} />
                <Grid container>
                  {/* <Grid item xs>
                    <Link to="/auth/password-reset" key="reset-password">
                      Forgot password?
                    </Link>
                  </Grid> */}
                  <Grid item>
                    <Link to="/auth/signup" key="signup">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            )}
          </Formik>
        </CardContent>
      </Card>
    </Container>
  );
}
