import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";


const theme = createTheme();

export default function Form() {
  const [open, setOpen] = React.useState(false);
  const [successMsg, setSuccessMsg] = React.useState("none");
  const [errorMsg, setErrorMsg] = React.useState("none");
  const [formDisplay, setFormDisplay] = React.useState("block");
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

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(msgData),
      };
      fetch(
        "http://localhost:5000/api/accounts",
        requestOptions
      )
        .then((response) => {
          return response.text();
        })
        .then((response) => {
          setSuccessMsg("block");
          setFormDisplay("none");
          setOpen(false);
        })
        .catch((err) => {
          setErrorMsg("block");
          setFormDisplay("none");
          setOpen(false);
        });
    }
  };

  return (

      <Paper variant="outlined" sx={{ paddingRight: 1 }}>
         <Container
            component="main"
            maxWidth="lg"
            sx={{
               bgcolor: "white",
               borderRadius: "20px",
               padding: "40px!important",
               marginTop: "40px",
               marginBottom: "40px",
            }}
         >
            <CssBaseline />
            <Box
               sx={{
               display: "flex",
               flexDirection: "column",
               alignItems: "center",
               }}
            >
               <Backdrop
               sx={{
                  color: "FFF",
                  zIndex: (theme) => theme.zIndex.drawer + 1,
               }}
               open={open}
               >
               <CircularProgress color="inherit" />
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
                     size="small"
                     error={nameError.status}
                     helperText={nameError.msg}
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
                     size="small"
                     error={emailError.status}
                     helperText={emailError.msg}
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
                     />
                  </Grid>
               </Grid>
               <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 6, mb: 2 }}
               >
                  Submit
               </Button>
               </Box>
            </Box>
         </Container>
      </Paper>
  );
}
