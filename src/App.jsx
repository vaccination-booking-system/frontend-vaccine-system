import React from "react";
import { Layout } from "./Components";
import { Route, Routes, Outlet } from "react-router-dom";
import {
  AddFamilyMemberPage,
  Dashboard,
  Login,
  Register,
  TicketVaccinePage,
  VaccinationBookingsPage,
  AddMembers,
  Profile,
  VaccinationBookingsSKPage,
  VaccinationBookingsMemberPage,
} from "./pages";
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
      <Route
        path="/dashboard"
        element={
          <AuthRoute>
            <Dashboard />
          </AuthRoute>
        }
      />
      <Route
        path="/booking-vaccine"
        element={
          <AuthRoute>
            <Layout>
              <Outlet />
            </Layout>
          </AuthRoute>
        }
      >
        <Route
          index
          element={
            <AuthRoute>
              <VaccinationBookingsPage />
            </AuthRoute>
          }
        />
        <Route path="sk">
          <Route
            index
            element={
              <AuthRoute>
                <VaccinationBookingsSKPage />
              </AuthRoute>
            }
          />
          <Route path="member">
            <Route
              index
              element={
                <AuthRoute>
                  <VaccinationBookingsMemberPage />
                </AuthRoute>
              }
            />
          </Route>
        </Route>
      </Route>
      <Route path="/add-family-member">
        <Route
          index
          element={
            <AuthRoute>
              <AddFamilyMemberPage />
            </AuthRoute>
          }
        />
        <Route
          path="add"
          element={
            <AuthRoute>
              <AddMembers />
            </AuthRoute>
          }
        />
      </Route>
      <Route
        path="/ticket-vaccine"
        element={
          <AuthRoute>
            <TicketVaccinePage />
          </AuthRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <AuthRoute>
            <Profile />
          </AuthRoute>
        }
      />
    </Routes>
  );
};

export default App;
