import React from "react";
import { Route, Routes } from "react-router-dom";
import { PathContextProvider } from "./context/PathContext";
import { AddFamilyMemberPage, Dashboard, Login, Register, TicketVaccinePage, VaccinationBookingsPage } from "./pages";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard">
        <Route
          index
          element={
            <PathContextProvider>
              <Dashboard />
            </PathContextProvider>
          }
        />
        <Route
          path="vaccination-bookings"
          element={
            <PathContextProvider>
              <VaccinationBookingsPage />
            </PathContextProvider>
          }
        />
        <Route
          path="add-family-member"
          element={
            <PathContextProvider>
              <AddFamilyMemberPage />
            </PathContextProvider>
          }
        />
        <Route
          path="ticket-vaccine"
          element={
            <PathContextProvider>
              <TicketVaccinePage />
            </PathContextProvider>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
