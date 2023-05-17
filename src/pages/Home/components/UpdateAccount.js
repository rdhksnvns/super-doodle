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
  const [showForm, setShowForm] = React.useState(false);

  const [userIDError, setUserIDError] = React.useState({
    status: false,
    msg: null,
  });
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

      let id = data.get("readOnlyID");
      console.log(id);
      console.log(data.get("user"));

      const msgData = {
        user: data.get("user"),
        currency: data.get("currency"),
        balance: data.get("balance"),
        description: data.get("description"),
      };

      console.log(msgData);

      axios
        .post("https://api.rkv.one/super-doodle/v1/api/accounts/" + id, msgData)
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

    if (userID) {
      setOpen(true);
      axios
        .get("https://api.rkv.one/super-doodle/v1/api/accounts/" + userID)
        .then(function (response) {
          console.log(response);
          setID(response.data.id);
          setUser(response.data.user);
          setCurrency(response.data.currency);
          setBalance(response.data.balance);
          setDescription(response.data.description);

          setUserIDError({ status: false, msg: null });
          setShowForm(true);
          setOpen(false);
        })
        .catch(function (error) {
          if (error.response.status === 404) {
            setUserIDError({ status: true, msg: "User not found" });
          } else {
            setUserIDError({ status: true, msg: "Something went wrong" });
          }
          setOpen(false);
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
      <Typography variant="h6" sx={{ color: "#000000", display: formDisplay }}>
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
              error={userIDError.status}
              helperText={userIDError.msg}
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

      {showForm ? (
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
                name="readOnlyID"
                label="ID"
                type="number"
                id="readOnlyID"
                multiline
                rows={1}
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
                multiline
                rows={1}
                size="small"
                error={userError.status}
                helperText={userError.msg}
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
                error={currencyError.status}
                helperText={currencyError.msg}
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
                multiline
                rows={1}
                size="small"
                error={balanceError.status}
                helperText={balanceError.msg}
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
                rows={1}
                size="small"
                error={descriptionError.status}
                helperText={descriptionError.msg}
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
      ) : (
        <div></div>
      )}
    </Box>
  );
}
