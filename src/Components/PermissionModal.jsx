import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addPermissionToRole } from '../redux/slices/roleSlice';

const PermissionModal=({ setPermissionModalOpen, selectedRole})=> {
  const [permissions, setPermissions] = useState({
    Read: false,
    Write: false,
    Delete: false,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedRole) {
      const rolePermissions = selectedRole.permissions.reduce((acc, permission) => {
        acc[permission] = true;
        return acc;
      }, {});
      setPermissions((prev) => ({ ...prev, ...rolePermissions }));
    }
  }, [selectedRole]);

  const handlePermissionChange = (permission) => {
    setPermissions((prevPermissions) => ({
      ...prevPermissions,
      [permission]: !prevPermissions[permission],
    }));
  };

  const handleSave = () => {
    const updatedPermissions = Object.keys(permissions)
      .filter((permission) => permissions[permission]);

    const changedpermission = {
      permissions: updatedPermissions,
      roleId: selectedRole.id
    }
    dispatch(addPermissionToRole(changedpermission))
    setPermissionModalOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md shadow-md w-1/3">
        <h2 className="text-xl font-bold mb-4">Assign Permissions to {selectedRole?.name}</h2>
        <div className="space-y-2">
          {Object.keys(permissions).map((permission) => (
            <div key={permission} className="flex items-center">
              <input
                type="checkbox"
                id={permission}
                checked={permissions[permission]}
                onChange={() => handlePermissionChange(permission)}
                className="mr-2"
              />
              <label htmlFor={permission}>{permission}</label>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={() => setPermissionModalOpen(false)}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default PermissionModal;
