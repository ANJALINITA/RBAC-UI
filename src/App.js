import React from "react";
import { Routes, Route } from 'react-router-dom';
import Sidebar from "./Components/Sidebar";
import Header from "./Components/Header";
import UserList from "./pages/UserList";
import RoleList from "./pages/RoleList";

function App() {

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="p-4">
          <Routes>
            <Route path="/" element={<UserList />} />
            <Route path="/roles" element={<RoleList />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
