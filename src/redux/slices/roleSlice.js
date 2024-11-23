import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  roles: [
    { id: 1, name: "Admin", permissions: ["Read", "Write", "Delete"] },
    { id: 2, name: "User", permissions: ["Read"] },
  ],
};

const roleSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {
    addRole: (state, action) => {
      action.payload.id = state.roles.length + 1;
      state.roles.push(action.payload);
    },
    deleteRole: (state, action) => {
      state.roles = state.roles.filter(role => role.id !== action.payload);
    },
    updateRole: (state, action) => {
      const index = state.roles.findIndex(role => role.id === action.payload.id);
      if (index >= 0) {
        state.roles[index] = action.payload;
      }
    },
    addPermissionToRole: (state, action) => {
      const role = state.roles.find(role => role.id === action.payload.roleId);
      console.log(role, action.payload)
      if (role) {
        role.permissions = action.payload.permissions;
      }
    },
  },
});

export const { addRole, deleteRole, updateRole, addPermissionToRole } = roleSlice.actions;

export default roleSlice.reducer;
