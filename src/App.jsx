import React from "react";
import { Route, Routes } from "react-router-dom";
import { AddFamilyMemberPage, Dashboard, Login, Register, TicketVaccinePage, VaccinationBookingsPage } from "./pages";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard">
        <Route index element={<Dashboard />} />
        <Route path="vaccination-bookings" element={<VaccinationBookingsPage />} />
        <Route path="add-family-member" element={<AddFamilyMemberPage />} />
        <Route path="ticket-vaccine" element={<TicketVaccinePage />} />
      </Route>
    </Routes>
  );
};

export default App;
