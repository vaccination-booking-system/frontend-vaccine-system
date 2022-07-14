import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { Layout } from "./Components";
import {
  AddFamilyMemberPage,
  Dashboard,
  Login,
  Register,
  TicketVaccinePage,
  VaccinationBookingsPage,
  BookingsSKPage,
  BookingsMemberPage,
  BookingsStatusPage,
  BookingsKategoriPage,
  BookingsJadwalPage,
  BookingsIdentitasPage,
  BookingsAlamatPage,
  BookingsTinjauPage,
  AddMembers,
} from "./pages";
import EditMembers from "./pages/EditFamilyMember";
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
                <BookingsSKPage />
              </AuthRoute>
            }
          />
          <Route path="member">
            <Route
              index
              element={
                <AuthRoute>
                  <BookingsMemberPage />
                </AuthRoute>
              }
            />
            <Route path="status">
              <Route
                index
                element={
                  <AuthRoute>
                    <BookingsStatusPage />
                  </AuthRoute>
                }
              />
              <Route path="kategori">
                <Route
                  index
                  element={
                    <AuthRoute>
                      <BookingsKategoriPage />
                    </AuthRoute>
                  }
                />
                <Route path="jadwal">
                  <Route
                    index
                    element={
                      <AuthRoute>
                        <BookingsJadwalPage />
                      </AuthRoute>
                    }
                  />
                  <Route path="identitas">
                    <Route
                      index
                      element={
                        <AuthRoute>
                          <BookingsIdentitasPage />
                        </AuthRoute>
                      }
                    />
                    <Route path="alamat">
                      <Route
                        index
                        element={
                          <AuthRoute>
                            <BookingsAlamatPage />
                          </AuthRoute>
                        }
                      />
                      <Route path="tinjau">
                        <Route
                          index
                          element={
                            <AuthRoute>
                              <BookingsTinjauPage />
                            </AuthRoute>
                          }
                        />
                      </Route>
                    </Route>
                  </Route>
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>
      </Route>
      <Route path="/family-member">
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
        <Route
          path="edit/:id"
          element={
            <AuthRoute>
              <EditMembers />
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
    </Routes>
  );
};

export default App;
