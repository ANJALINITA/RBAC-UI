import React, { useState } from "react";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, toggleUserStatus } from "../redux/slices/userSlice";
import { RiSwapBoxLine } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import UserModal from "../Components/UserModal";

const UserList = () => {

  const users = useSelector((state) => state.users.users);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const dispatch = useDispatch();

  const handleAddUser = () => {
    setSelectedUser(null);
    setModalOpen(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const handleDeleteUser = (userId) => {
    dispatch(deleteUser(userId))
  };

  return (
    <div className="px-6">
      <button
        onClick={handleAddUser}
        className="mb-4 bg-blue-500 text-white px-2 py-1.5 rounded flex gap-2 items-center"
      >
        <MdOutlineAddCircleOutline size={17} /> Add User
      </button>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Role</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="text-center">
              <td className="border border-gray-300 p-2">{user.name}</td>
              <td className="border border-gray-300 p-2">{user.email}</td>
              <td className="border border-gray-300 p-2">{user.role}</td>
              <td className="border border-gray-300 p-2 flex items-center justify-center gap-2">{user.status} <RiSwapBoxLine className=" cursor-pointer" onClick={() => dispatch(toggleUserStatus(user.id))} /></td>
              <td className="border border-gray-300 p-2">
                <button
                  onClick={() => handleEditUser(user)}
                  className="text-blue-500 mr-4"
                >
                  {/* Edit */}
                  <FiEdit size={16} />
                </button>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="text-red-500"
                >
                  {/* Delete */}
                  <MdDelete size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && <UserModal setModalOpen={setModalOpen} selectedUser={selectedUser} />}
    </div>
  );
}

export default UserList;
