import React, { useState } from "react";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { deleteRole } from "../redux/slices/roleSlice";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import RoleModal from "../Components/RoleModal";
import PermissionModal from "../Components/PermissionModal";

const RoleList = () => {

  const roles = useSelector((state) => state.roles.roles);
  const [isRoleModalOpen, setRoleModalOpen] = useState(false);
  const [isPermissionModalOpen, setPermissionModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const dispatch = useDispatch();

  const handleAddRole = () => {
    setSelectedRole(null);
    setRoleModalOpen(true);
  };

  const handleEditRole = (role) => {
    setSelectedRole(role);
    setRoleModalOpen(true);
  };

  const handleDeleteRole = (roleId) => {
    dispatch(deleteRole(roleId))
  };

  const handleAssignPermissions = (role) => {
    setSelectedRole(role);
    setPermissionModalOpen(true);
  };

  return (
    <div className="px-5">
      <button
        onClick={handleAddRole}
        className="mb-4 bg-blue-500 text-white px-2 py-1.5 rounded flex gap-2 items-center"
      >
        <MdOutlineAddCircleOutline size={17} /> Add Role
      </button>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Role Name</th>
            <th className="border border-gray-300 p-2">Permissions</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id} className="text-center">
              <td className="border border-gray-300 p-2">{role.name}</td>
              <td className="border border-gray-300 p-2">{role.permissions.join(", ")}</td>
              <td className="border border-gray-300 p-2">
                <button
                  onClick={() => handleEditRole(role)}
                  className="text-blue-500 mr-3"
                >
                  {/* Edit */}
                  <FiEdit size={18} />
                </button>
                <button
                  onClick={() => handleDeleteRole(role.id)}
                  className="text-red-500 mr-3"
                >
                  {/* Delete */}
                  <MdDelete size={18} />
                </button>
                <button
                  onClick={() => handleAssignPermissions(role)}
                  className="text-green-500"
                >
                  Assign Permissions
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isRoleModalOpen && (
        <RoleModal
          setRoleModalOpen={setRoleModalOpen}
          selectedRole={selectedRole}
        />
      )}

      {isPermissionModalOpen && (
        <PermissionModal
          setPermissionModalOpen={setPermissionModalOpen}
          selectedRole={selectedRole}
        />
      )}
    </div>
  );
}

export default RoleList;
