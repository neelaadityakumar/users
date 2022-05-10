import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useFormik } from "formik";

export default function FormDialog(props) {
  const randomUser = async () => {
    const response = await fetch("https://randomuser.me/api/?results=10");
    const userData = await response.json();
    return userData.results[0];
  };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const formik = useFormik({
    initialValues: {
      fname: "",
      lname: "",
      homePhone: "",
      phone: "",
      streetNo: "",
      streetName: "",
      pincode: "",
      city: "",
      state: "",
      country: "",
    },
    onSubmit: (values) => {
      const user = {
        name: {
          first: values.fname,
          last: values.lname,
        },
        location: {
          street: {
            number: values.streetNo,
            name: values.streetName,
          },
          city: values.city,
          state: values.state,
          postcode: values.pincode,
          country: values.country,
        },
        cell: values.phone,
        phone: values.homePhone,
        login: {
          uuid: Math.random().toString(36).slice(2, 7),
        },
        picture: {
          large: "https://source.unsplash.com/random",
          medium: "https://source.unsplash.com/random",
          thumbnail: "https://source.unsplash.com/random",
        },
      };
      //   console.log("user data", props.userData);
      //   const newUsers = [...props.data, user];
      props.addUser(user);
      //   alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add a User
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Details</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your details here. We will send updates occasionally.
          </DialogContentText>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              formik.handleSubmit();
              handleClose();
            }}
          >
            <TextField
              autoFocus
              margin="dense"
              label="First Name"
              variant="standard"
              required
              id="fname"
              name="fname"
              onChange={formik.handleChange}
              value={formik.values.fname}
            />
            <TextField
              autoFocus
              margin="dense"
              label="Last Name"
              variant="standard"
              id="lname"
              name="lname"
              onChange={formik.handleChange}
              value={formik.values.lname}
            />
            <TextField
              autoFocus
              margin="dense"
              label="Street Number"
              type="number"
              variant="standard"
              id="streetNo"
              name="streetNo"
              onChange={formik.handleChange}
              value={formik.values.streetNo}
            />
            <TextField
              autoFocus
              margin="dense"
              label="Street Name"
              variant="standard"
              id="streetName"
              name="streetName"
              onChange={formik.handleChange}
              value={formik.values.streetName}
            />
            <TextField
              autoFocus
              margin="dense"
              label="City"
              variant="standard"
              id="city"
              name="city"
              onChange={formik.handleChange}
              value={formik.values.city}
              required
            />{" "}
            <TextField
              autoFocus
              margin="dense"
              label="State"
              variant="standard"
              id="state"
              name="state"
              onChange={formik.handleChange}
              value={formik.values.state}
            />{" "}
            <TextField
              autoFocus
              margin="dense"
              label="PinCode"
              type={"number"}
              variant="standard"
              id="pincode"
              name="pincode"
              onChange={formik.handleChange}
              value={formik.values.pincode}
            />
            <TextField
              autoFocus
              margin="dense"
              label="Country"
              required
              variant="standard"
              id="country"
              name="country"
              onChange={formik.handleChange}
              value={formik.values.country}
            />
            <TextField
              autoFocus
              margin="dense"
              type={"number"}
              label="Home Phone"
              variant="standard"
              id="homePhone"
              name="homePhone"
              onChange={formik.handleChange}
              value={formik.values.homePhone}
            />
            <TextField
              autoFocus
              margin="dense"
              type={"number"}
              label="Phone number"
              required
              variant="standard"
              id="phone"
              name="phone"
              onChange={formik.handleChange}
              value={formik.values.phone}
            />{" "}
            <div className="form-buttons">
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Submit</Button>{" "}
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
