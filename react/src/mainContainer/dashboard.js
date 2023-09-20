import React, { lazy, Suspense } from "react";
import Container from '@mui/material/Container';
import { Navigate, Route, Routes } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const HomeComponent = lazy(() => import("../components/homeComponent"));
const AddEditUserComponent = lazy(() => import("../components/addEditUserComponent"));

function Dashboard() {
  return (
    <>
      <Container className="main-content">
        <Suspense fallback={<><CircularProgress className="centered" /></>}>
          <Routes>
            <Route path="/home" element={<HomeComponent />} />
            <Route path="/user/:id" element={<AddEditUserComponent />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        </Suspense>
      </Container>
    </>
  );
}

export default Dashboard;