import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import axios from "axios";

export default function UpdateAccount() {
  const [open, setOpen] = React.useState(false);
  const [successMsg, setSuccessMsg] = React.useState("none");
  const [errorMsg, setErrorMsg] = React.useState("none");
  const [formDisplay, setFormDisplay] = React.useState("block");
  const [ID, setID] = React.useState();
  const [user, setUser] = React.useState();
  const [currency, setCurrency] = React.useState();
  const [balance, setBalance] = React.useState();
  const [description, setDescription] = React.useState();

  const [nameError, setNameError] = React.useState({
    status: false,
    msg: null,
  });
  const [emailError, setEmailError] = React.useState({
    status: false,
    msg: null,
  });
  const [subjectError, setSubjectError] = React.useState({
    status: false,
    msg: null,
  });
  const [messageError, setMessageError] = React.useState({
    status: false,
    msg: null,
  });

  const handleValidation = (name, email, subject, message) => {
    let formIsValid = true;

    function checkName(name) {
      //Name
      if (!name) {
        formIsValid = false;
        setNameError({ status: true, msg: "Cannot be empty" });
      } else if (typeof name !== "undefined") {
        if (!name.match(/^[a-zA-Z]+(\s[a-zA-Z]+)?$/)) {
          formIsValid = false;
          setNameError({ status: true, msg: "Only letters" });
        } else {
          setNameError({ status: false, msg: null });
        }
      }
    }

    function checkSubject(subject) {
      //Name
      if (!subject) {
        formIsValid = false;
        setSubjectError({ status: true, msg: "Cannot be empty" });
      } else if (typeof subject !== "undefined") {
        if (subject.match(/^[\s]+$/)) {
          formIsValid = false;
          setSubjectError({ status: true, msg: "Enter a valid subject" });
        } else {
          setSubjectError({ status: false, msg: null });
        }
      }
    }

    function checkMessage(message) {
      //Name
      if (!message) {
        formIsValid = false;
        setMessageError({ status: true, msg: "Cannot be empty" });
      } else if (typeof message !== "undefined") {
        if (message.match(/^[\s]+$/)) {
          formIsValid = false;
          setMessageError({ status: true, msg: "Enter a valid message" });
        } else {
          setMessageError({ status: false, msg: null });
        }
      }
    }

    checkName(name);
    checkSubject(email);
    checkSubject(subject);
    checkMessage(message);

    return formIsValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    var valStatus = handleValidation(
      data.get("user"),
      data.get("currency"),
      data.get("balance"),
      data.get("description")
    );
    if (valStatus) {
      setOpen(true);

      const msgData = {
        user: data.get("user"),
        currency: data.get("currency"),
        balance: data.get("balance"),
        description: data.get("description"),
       };
       
       console.log(msgData);

      axios
        .post("https://api.superdoodle.rkv.one/api/accounts", msgData)
        .then(function (response) {
          setSuccessMsg("block");
          setFormDisplay("none");
          setOpen(false);
        })
        .catch(function (error) {
          setErrorMsg("block");
          setFormDisplay("none");
          setOpen(false);
          console.log(error);
        });
    }
  };

  const handleGetData = (event) => {
    event.preventDefault();
    const eleData = new FormData(event.currentTarget);
    let userID = eleData.get("userID");
    axios
      .get("https://api.superdoodle.rkv.one/api/accounts/" + userID)
      .then(function (response) {
        console.log(response);
        let cID = response.data.id;
        setID(cID);
        setUser(response.data.user);
        setCurrency(response.data.currency);
        setBalance(response.data.balance);
        console.log(response.data.balance);
        console.log(balance);
        setDescription(response.data.description);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "20px",
      }}
    >
      <Backdrop
        sx={{
          color: "FFF",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={open}
      >
        <CircularProgress sx={{color: "#1565c0"}} />
      </Backdrop>
      <Typography
        variant="h6"
        gutterBottom
        component="div"
        sx={{ color: "#000000", display: successMsg }}
      >
        Details saved successfully!
      </Typography>
      <Typography
        variant="h6"
        gutterBottom
        component="div"
        sx={{ color: "#000000", display: errorMsg }}
      >
        Oops! Something went wrong.
      </Typography>
      <Typography
        component="h1"
        variant="h5"
        sx={{ color: "#000000", display: formDisplay }}
      >
        Update Account Details
      </Typography>
      <Box
        component="form"
        noValidate
        onSubmit={handleGetData}
        sx={{ mt: 3, display: formDisplay }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="userID"
              label="ID"
              type="number"
              id="userID"
              size="small"
              error={subjectError.status}
              helperText={subjectError.msg}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 2, mb: 2 }}
        >
          Get Data
        </Button>
      </Box>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit}
        sx={{ mt: 3, display: formDisplay }}
      >
        <Grid container spacing={2}>
          
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="id"
              label="ID"
              type="number"
              id="id"
              size="small"
              defaultValue={ID}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              autoComplete="user"
              name="user"
              required
              fullWidth
              id="user"
              label="User"
              autoFocus
              size="small"
              error={nameError.status}
              helperText={nameError.msg}
              defaultValue={user}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="currency"
              label="Currency"
              name="currency"
              type="text"
              multiline
              rows={1}
              size="small"
              error={emailError.status}
              helperText={emailError.msg}
              defaultValue={currency}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="balance"
              label="Balance"
              type="number"
              id="balance"
              size="small"
              error={subjectError.status}
              helperText={subjectError.msg}
              defaultValue={balance}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="description"
              label="Description"
              type="text"
              id="description"
              multiline
              rows={4}
              size="small"
              error={messageError.status}
              helperText={messageError.msg}
              defaultValue={description}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 4, mb: 2 }}
        >
          Update
        </Button>
      </Box>
    </Box>
  );
}
