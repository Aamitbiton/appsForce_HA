import React, { ChangeEvent } from "react";
import styled from "styled-components";
import {  TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { filterUsers } from "../store/slice";

const SearchBar = () => {
  const dispatch = useDispatch();
  const handleSearch = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    dispatch(filterUsers(e.target.value));
  };
  return (
    <Wrapper>
      <TextField
        onChange={(e) => handleSearch(e)}
        id="outlined-basic"
        label="search by name, id, location"
        variant="outlined"
        fullWidth={true}
      />
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  width: 80%;
  margin: 0 auto;
  flex-direction: row;
`;

const Input = styled.input`
  width: 85%;
  height: 40px;
  margin-top: 10px;
`;

export default SearchBar;
