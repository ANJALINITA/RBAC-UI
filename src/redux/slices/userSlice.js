import { createSlice } from '@reduxjs/toolkit';
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { RiSwapBoxLine } from "react-icons/ri";
const initialState = {
    users: [
        { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
        { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", status: "Inactive" }
    ],
};

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUser: (state, action) => {
            action.payload.id = state.users.length + 1;
            state.users.push(action.payload);
        },
        deleteUser: (state, action) => {
            state.users = state.users.filter(user => user.id !== action.payload);
        },
        updateUser: (state, action) => {
            const index = state.users.findIndex(user => user.id === action.payload.id);
            if (index >= 0) {
                state.users[index] = action.payload;
            }
        },
        toggleUserStatus: (state, action) => {
            const user = state.users.find(user => user.id === action.payload);
           
            user && user?.status === "Active" ? user.status = "Inactive" : user.status = "Active"
        },
    },
});

export const { addUser, deleteUser, updateUser, toggleUserStatus } = userSlice.actions;

export default userSlice.reducer;
