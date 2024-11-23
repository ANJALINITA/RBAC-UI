import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addRole, updateRole } from "../redux/slices/roleSlice";

const RoleModal = ({ setRoleModalOpen, selectedRole }) => {
  const [roleData, setRoleData] = useState({
    name: "",
    permissions: [],
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedRole) {
      setRoleData({
        name: selectedRole.name,
        permissions: selectedRole.permissions,
      });
    }
  }, [selectedRole]);

  const availablePermissions = ["Read", "Write", "Delete"];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedRole) {
      roleData.id = selectedRole.id;
      dispatch(updateRole(roleData))
    } else {
      dispatch(addRole(roleData));
    }
    setRoleModalOpen(false);
  };

  const handlePermissionChange = (permission) => {
    setRoleData((prevData) => {
      const newPermissions = prevData.permissions.includes(permission)
        ? prevData.permissions.filter((p) => p !== permission)
        : [...prevData.permissions, permission];
      return { ...prevData, permissions: newPermissions };
    });
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md shadow-md w-1/3">
        <h2 className="text-xl font-bold mb-4">{selectedRole ? "Edit Role" : "Add Role"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Role Name</label>
            <input
              type="text"
              value={roleData.name}
              onChange={(e) => setRoleData({ ...roleData, name: e.target.value })}
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Permissions</label>
            <div className="space-y-2">
              {availablePermissions.map((permission) => (
                <div key={permission} className="flex items-center">
                  <input
                    type="checkbox"
                    id={permission}
                    checked={roleData.permissions.includes(permission)}
                    onChange={() => handlePermissionChange(permission)}
                    className="mr-2"
                  />
                  <label htmlFor={permission}>{permission}</label>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => setRoleModalOpen(false)}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              {selectedRole ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RoleModal;
