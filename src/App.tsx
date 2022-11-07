import React, { useEffect, useState } from "react";
import { fetch_url } from "./utils/fetchFunction";
import { UserCard } from "./components/UserCard";
import styled, { keyframes } from "styled-components";
import { addUsers } from "./store/slice";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "./components/SearchBar";
import { fadeIn } from "react-animations";
import IUser from "./models/types.model";
import { Box, CircularProgress } from "@mui/material";

function App() {
  const dispatch = useDispatch();
  const users = useSelector((state: any) => state.users).filteredUsers;
  useEffect(() => {
    let isSubscribed = true;

    async function getData() {
      const users = await fetch_url({
        url: "https://randomuser.me/api/?results=10",
      }).catch(console.error);
      if (isSubscribed) {
        dispatch(addUsers(users.results));
      }
    }

    getData();
    return () => {
      isSubscribed = false;
    };
  }, []);

  return (
    <MainWrapper>
      <SearchBar />
      {users.length ? (
        <UsersCardsContainer>
          {users.map((user: IUser) => {
            return <UserCard key={user.email} user={user} />;
          })}
        </UsersCardsContainer>
      ) : (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress color="primary" />
        </Box>
      )}
    </MainWrapper>
  );
}

const MainWrapper = styled.div`
  height: 100%;
`;

const UsersCardsContainer = styled.div`
  margin: 16px 0;
  display: grid;
  grid-gap: 16px;
  align-items: stretch;
  grid-template-columns: repeat(auto-fit, 300px);
  justify-content: center;
  animation: 250ms ${keyframes`${fadeIn}`};
`;

export default App;
