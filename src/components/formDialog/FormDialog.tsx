import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import * as Yup from "yup";
import { useFormik } from "formik";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { editUser } from "../../store/slice";
import IUser from "../../models/types.model";
import "./formStyle.module.css";

interface Form {
  open: boolean;
  setOpen: (value: boolean) => void;
  user: IUser;
}
interface Values {
  name: string;
  email: string;
  location: {
    city: string;
    country: string;
    street: { number: string; streetName: string };
  };
}

export const FormDialog = ({ open, setOpen, user }: Form) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: user.name.first,
      email: user.email,
      location: {
        city: user.location.city,
        country: user.location.country,
        street: {
          number: user.location.street.number,
          streetName: user.location.street.name,
        },
      },
    },
    onSubmit: (values) => {
      handleSubmit(values);
    },
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .min(2, "Too short")
        .required("Pleas Enter Your Full Name "),
      email: Yup.string()
        .email("Invalid email")
        .required("Your Email Must Be a valid email"),
      location: Yup.object().shape({
        city: Yup.string()
          .min(3, "Too short")
          .required("Pleas Enter Your address "),
        country: Yup.string()
          .min(3, "Too short")
          .required("Pleas Enter Your address "),
        street: Yup.object().shape({
          number:
            Yup.number() || Yup.string().required("please enter street number"),
          streetName: Yup.string()
            .min(3, "Too short")
            .required("Pleas Enter Your street name "),
        }),
      }),
    }),
  });
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = (values: Values) => {
    dispatch(editUser(values));
    handleClose();
  };
  return (
    <Wrapper>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>edit {user?.name?.first} account</DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <>
              <Row>
                <p>name:</p>
                <input
                  type="text"
                  onChange={formik.handleChange}
                  name="name"
                  placeholder={user.name.first}
                  value={formik.values.name}
                />
              </Row>
              {formik.errors.name && formik.touched.name ? (
                <Error>{formik.errors.name} </Error>
              ) : null}
            </>
            <>
              <Row>
                <p>email:</p>
                <input
                  type="email"
                  placeholder={user.email}
                  onChange={formik.handleChange}
                  name="email"
                  value={formik.values.email}
                />
              </Row>
              {formik.errors.email && formik.touched.email ? (
                <Error className="errorMsg">{formik.errors.email} </Error>
              ) : null}
            </>
            <>
              <Row>
                <p>city:</p>
                <input
                  type="text"
                  placeholder={user.location.city}
                  onChange={formik.handleChange}
                  name="location.city"
                  value={formik.values.location.city}
                />
              </Row>
              {formik.errors.location?.city && formik.touched.location?.city ? (
                <Error>{formik.errors.location.city} </Error>
              ) : null}
            </>
            <>
              <Row>
                <p>country</p>
                <input
                  type="text"
                  placeholder={user.location.country}
                  onChange={formik.handleChange}
                  name="location.country"
                  value={formik.values.location.country}
                />
              </Row>
              {formik.errors.location?.country &&
              formik.touched.location?.country ? (
                <Error>{formik.errors.location.country} </Error>
              ) : null}
            </>
            <>
              <Row>
                <p>street number: </p>
                <input
                  type="text"
                  placeholder={user.location.street.number}
                  onChange={formik.handleChange}
                  name="location.street.number"
                  value={formik.values.location.street.number}
                />
              </Row>
              {formik.errors.location?.street?.number &&
              formik.touched.location?.street?.number ? (
                <Error>{formik.errors.location.street.number} </Error>
              ) : null}
            </>
            <>
              <Row>
                <p>street name:</p>
                <input
                  type="text"
                  placeholder={user.location.street.name}
                  onChange={formik.handleChange}
                  name="location.street.streetName"
                  value={formik.values.location.street.streetName}
                />
              </Row>
              {formik.errors.location?.street?.streetName &&
              formik.touched.location?.street?.streetName ? (
                <Error>{formik.errors.location.street.streetName} </Error>
              ) : null}
            </>
            <div>
              <DialogActions>
                <Button color="inherit" onClick={handleClose}>
                  Cancel
                </Button>
                <Button color="inherit" type="submit">
                  save
                </Button>
              </DialogActions>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: var(--background-color) !important;
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;
const Error = styled.div`
  font-size: 12px;
  color: red;
  width: 100%;
  text-align: end;
`;
