import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'

import UserStoreList from "./pages/user/StoreList";
import AdminDashboard from "./pages/admin/Dashboard";
// import OwnerDashboard from "./pages/owner/Dashboard";

import ProtectedRoute from "./router/ProtectedRoute";
import AddUser from './pages/admin/AddUser';
import AddStore from './pages/admin/AddStore';
import UsersList from './pages/admin/UsersList';
import UserDetail from './pages/admin/UserDetail';
import Dashboard from './pages/owner/Dashboard';
import StoreList from './pages/admin/StoreList';
import Navbar from './components/Navbar';
import UpdatePassword from './pages/user/updatePassword';


const App = ()=> {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/stores"
          element={
            <ProtectedRoute allowed={["USER"]}>
              <UserStoreList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowed={["ADMIN"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/add-user"
          element={
            <ProtectedRoute allowed={["ADMIN"]}>
            <AddUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/add-store"
          element={
            <ProtectedRoute allowed={["ADMIN"]}>
            <AddStore />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowed={["ADMIN"]}>
              <UsersList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users/:id"
          element={
            <ProtectedRoute allowed={["ADMIN"]}>
              <UserDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/stores"
          element={
            <ProtectedRoute allowed={["ADMIN"]}>
              <StoreList />
            </ProtectedRoute>
          }
        />




        <Route
          path="/owner/dashboard"
          element={
            <ProtectedRoute allowed={["OWNER"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
          <Route path="/update-password" element={
            <ProtectedRoute allowed={['ADMIN', 'USER', 'OWNER']}>
              <UpdatePassword/>
            </ProtectedRoute>
          } />
      </Routes>

    </BrowserRouter>
  );
}

export default App