import React, { useState } from "react";
import { Typography } from "@mui/material";
import IUser from "../models/types.model";
import styled from "styled-components";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { FormDialog } from "./formDialog/FormDialog";
import { useDispatch } from "react-redux";
import { deleteUser } from "../store/slice";
interface userCardProps {
  user: IUser;
}

const UserCardContainer = styled.div`
  background-color: var(--surface-color);
  box-shadow: 0 21px 40px -16px #131335;
  border-radius: 15px;
  padding: 8px 16px;
`;

const AvatarImageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AvatarImg = styled.img`
  border-radius: 50%;
`;

const ActionButton = styled.div`
  font-size: 13px;
`;

const ActionsButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ActionButtonContainer = styled.div`
  display: flex;
  cursor: pointer;
  border-radius: 20px;
  color: #c3c3c3;
  font-weight: bold;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  margin-bottom: 10px;
  border: 1px solid #353578;

  &:hover {
    background-color: var(--primary-color);
    transition: 250ms background-color, color;
    color: #fff;
  }
`;

export const UserCard = ({ user }: userCardProps) => {
  const [openDialog, setOpenDialog] = useState(false);
  const dispatch = useDispatch();

  return (
    <UserCardContainer>
      <AvatarImageContainer>
        <AvatarImg alt="avatar" src={user.picture.large} />
        <ActionsButtonContainer>
          <ActionButtonContainer onClick={() => setOpenDialog(true)}>
            <EditIcon />
            <ActionButton>Edit</ActionButton>
          </ActionButtonContainer>
          <ActionButtonContainer
            onClick={() => dispatch(deleteUser(user.email))}
          >
            <DeleteIcon />
            <ActionButton>delete</ActionButton>
          </ActionButtonContainer>
        </ActionsButtonContainer>
      </AvatarImageContainer>
      <Typography gutterBottom mt={2} variant="h5" component="div">
        {user.name.title} {user.name.first} {user.name.last}
      </Typography>
      <Typography variant="body2" color="text.primary">
        {user.email}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {user.location.street.number} {user.location.street.name},{" "}
        {user.location.country}
      </Typography>
      <Typography variant="body2" color="text.secondary">
       uid: {user.id.value}
      </Typography>
      <FormDialog user={user} setOpen={setOpenDialog} open={openDialog} />
    </UserCardContainer>
  );
};
