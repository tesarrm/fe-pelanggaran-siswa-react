import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import { SnackbarProvider } from "notistack";

import Categories from "./pages/Categories";
import CategoryDetails from "./pages/Categories/CategoryDetails";
import SignUp from "./pages/Auth/SignUp";
import SignIn from "./pages/Auth/SignIn";
import AuthContextProvider from "./contexts/AuthContextProvider";
import RequireAuth from "./components/RequireAuth";
import RequireNotAuth from "./components/RequireNotAuth";
import BaseLayout from "./components/BaseLayout";
import TaskDetails from "./pages/Siswa/TaskDetails";
import Dashboard from "./pages/Dashboard";
import "./index.css";
import RequestResetPassword from "./pages/Auth/RequestResetPassword";
import ResetPasswordConfirm from "./pages/Auth/ResetPasswordConfirm";
import ThemeModeProvider from "./contexts/ThemeModeProvider";
import Admin from "./pages/Admin"
import Pelanggaran from "./pages/Pelanggaran";
import PelanggaranDetail from "./pages/Pelanggaran/PelanggaranDetail";
import Siswa from "./pages/Siswa";
import SiswaDetail from "./pages/Siswa/SiswaDetail";

export default function App() {
  return <ThemeModeProvider>
    <CssBaseline />


    <AuthContextProvider>
      <SnackbarProvider>
        <Router>
          <Box sx={{
            bgcolor: (theme) => theme.palette.background.default,
            minHeight: "100vh",
            width: "100%"
          }}>
            <Routes>

              <Route path="/admin" element={<Admin />} />

              <Route element={<RequireAuth />}>
                <Route element={<BaseLayout />}>
                  <Route path="/categories" element={<Categories />} />
                  <Route path="/categories/create" element={<CategoryDetails />} />
                  <Route path={`/categories/edit/:id`} element={<CategoryDetails />} />

                  <Route path="/pelanggaran" element={<Pelanggaran />} />
                  <Route path="/pelanggaran/create" element={<PelanggaranDetail/>} />
                  <Route path={`/pelanggaran/edit/:id`} element={<PelanggaranDetail/>} />

                  <Route path="/siswa" element={<Siswa/>} />
                  <Route path="/siswa/create" element={<SiswaDetail/>} />
                  <Route path="/siswa/edit/:id" element={<SiswaDetail/>} />
                  <Route path="/" element={<Dashboard />} />
                </Route>

              </Route>

              <Route element={<RequireNotAuth />} >
                <Route path="/auth/signup" element={<SignUp />} />
                <Route path="/auth/signin" element={<SignIn />} />
                <Route path="/auth/password-reset" element={<RequestResetPassword />} />
                <Route path="/auth/password-reset/confirm/:uid/:token" element={<ResetPasswordConfirm />} />
              </Route>

            </Routes>
          </Box>
        </Router>
      </SnackbarProvider>
    </AuthContextProvider>






  </ThemeModeProvider>
}

ReactDOM.render(<App />, document.getElementById("root"))