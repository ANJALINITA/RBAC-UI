import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white flex-shrink-0">
      <div className="p-4 text-xl font-bold">Admin Dashboard</div>
      <div className="mt-16 flex flex-col gap-6">
        <Link to="/">
          <button
            className="w-full px-4 py-2 text-left hover:bg-gray-700"
          >
            Users
          </button>
        </Link>

        <Link to="/roles">
          <button
            className="w-full px-4 py-2 text-left hover:bg-gray-700"
          >
            Roles
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
