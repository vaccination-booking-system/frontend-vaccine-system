import React from "react";
import { Route, Routes } from "react-router-dom";
import { AddFamilyMemberPage, Dashboard, Login, Register, TicketVaccinePage, VaccinationBookingsPage } from "./pages";
import { AuthRoute, PublicRoute } from "./routes";

const App = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />
      <Route path="/dashboard">
        <Route
          index
          element={
            <AuthRoute>
              <Dashboard />
            </AuthRoute>
          }
        />
        <Route
          path="vaccination-bookings"
          element={
            <AuthRoute>
              <VaccinationBookingsPage />
            </AuthRoute>
          }
        />
        <Route
          path="add-family-member"
          element={
            <AuthRoute>
              <AddFamilyMemberPage />
            </AuthRoute>
          }
        />
        <Route
          path="ticket-vaccine"
          element={
            <AuthRoute>
              <TicketVaccinePage />
            </AuthRoute>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
