import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, updateUser } from "../redux/slices/userSlice";

const UserModal = ({ setModalOpen, selectedUser }) => {
  const roles = useSelector((state) => state.roles.roles);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    role: "User",
    status: "Active",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedUser) {
      setUserData(selectedUser);
    }
  }, [selectedUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedUser) {
      userData.id = selectedUser.id;
      dispatch(updateUser(userData));
    } else {
      dispatch(addUser(userData));
    }
    setModalOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md shadow-md w-1/3">
        <h2 className="text-xl font-bold mb-4">{selectedUser ? "Edit User" : "Add User"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Name</label>
            <input
              type="text"
              value={userData.name}
              onChange={(e) => setUserData({ ...userData, name: e.target.value })}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Email</label>
            <input
              type="email"
              value={userData.email}
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Role</label>
            <select
              value={userData.role}
              onChange={(e) => setUserData({ ...userData, role: e.target.value })}
              className="w-full px-4 py-2 border rounded"
            >
              {roles.map((role, index) => {
                return <option key={index}>{role.name}</option>
              })}
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Status</label>
            <select
              value={userData.status}
              onChange={(e) => setUserData({ ...userData, status: e.target.value })}
              className="w-full px-4 py-2 border rounded"
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              {selectedUser ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserModal;
