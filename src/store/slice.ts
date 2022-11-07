import { createSlice } from "@reduxjs/toolkit";
import User from "../models/types.model";

interface UsersInitialState {
  allUsers: User[];
  filteredUsers: User[];
}

const initialState = { allUsers: [], filteredUsers: [] } as UsersInitialState;

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    deleteUser: (users, action) => {
      users.allUsers = users.allUsers.filter(
        (user) => user.email !== action.payload
      );
    },

    editUser: (users, action) => {
      let i = users.allUsers.findIndex(
        (user) => user.email === action.payload.email
      );
      users.allUsers[i].location = action.payload.location;
      users.allUsers[i].name.first = action.payload.name;
      users.allUsers[i].email = action.payload.email;
    },

    addUsers: (users, action) => {
      users.allUsers = action.payload;
      users.filteredUsers = action.payload;
    },

    filterUsers: (users, action) => {
      let inputRes = action.payload.toLowerCase();
      users.filteredUsers = users.allUsers.filter((el) => {
        return Object.values(el).some((val: any) => {
          if (typeof val === "object") val = Object.values(val);
          return String(val).toLowerCase().includes(inputRes);
        });
      });
    },
  },
});

export const { deleteUser, editUser, addUsers, filterUsers } =
  usersSlice.actions;

export default usersSlice.reducer;
