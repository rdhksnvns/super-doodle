import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import axios from "axios";

export default function CreateAccount() {
  const [open, setOpen] = React.useState(false);
  const [successMsg, setSuccessMsg] = React.useState("none");
  const [errorMsg, setErrorMsg] = React.useState("none");
  const [formDisplay, setFormDisplay] = React.useState("block");

  const [userError, setUserError] = React.useState({
    status: false,
    msg: null,
  });
  const [currencyError, setCurrencyError] = React.useState({
    status: false,
    msg: null,
  });
  const [balanceError, setBalanceError] = React.useState({
    status: false,
    msg: null,
  });
  const [descriptionError, setDescriptionError] = React.useState({
    status: false,
    msg: null,
  });

  const handleValidation = (name, email, subject, message) => {
    let formIsValid = true;

    function checkUser(valData) {
      if (!valData) {
        formIsValid = false;
        setUserError({ status: true, msg: "Cannot be empty" });
      } else {
        setUserError({ status: false, msg: null });
      }
    }

    function checkCurrency(valData) {
      if (!valData) {
        formIsValid = false;
        setCurrencyError({ status: true, msg: "Cannot be empty" });
      } else {
        setCurrencyError({ status: false, msg: null });
      }
    }

    function checkBalance(valData) {
      if (!valData) {
        formIsValid = false;
        setBalanceError({ status: true, msg: "Cannot be empty" });
      } else {
        setBalanceError({ status: false, msg: null });
      }
    }

    function checkDescription(valData) {
      if (!valData) {
        formIsValid = false;
        setDescriptionError({ status: true, msg: "Cannot be empty" });
      } else {
        setDescriptionError({ status: false, msg: null });
      }
    }

    checkUser(name);
    checkCurrency(email);
    checkBalance(subject);
    checkDescription(message);

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
        .post("https://api.rkv.one/super-doodle/v1/api/accounts", msgData)
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
        <CircularProgress sx={{ color: "#1565c0" }} />
      </Backdrop>
      <Typography
        variant="subtitle2"
        gutterBottom
        component="div"
        sx={{ color: "#000000", display: successMsg }}
      >
        Details saved successfully!
      </Typography>
      <Typography
        variant="subtitle2"
        gutterBottom
        component="div"
        sx={{ color: "#000000", display: errorMsg }}
      >
        Oops! Something went wrong.
      </Typography>
      <Typography
        component="h1"
        variant="h6"
        sx={{ color: "#000000", display: formDisplay }}
      >
        Account Details
      </Typography>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit}
        sx={{ mt: 3, display: formDisplay }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              autoComplete="user"
              name="user"
              required
              fullWidth
              id="user"
              label="User"
              autoFocus
              multiline
              rows={1}
              size="small"
              error={userError.status}
              helperText={userError.msg}
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
              error={currencyError.status}
              helperText={currencyError.msg}
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
              multiline
              rows={1}
              size="small"
              error={balanceError.status}
              helperText={balanceError.msg}
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
              rows={1}
              size="small"
              error={descriptionError.status}
              helperText={descriptionError.msg}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 2, mb: 2 }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}
