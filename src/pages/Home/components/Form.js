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
import axios from "axios";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import CreateAccount from "./CreateAccount";
import UpdateAccount from "./UpdateAccount";

const theme = createTheme();

export default function Form() {
  const [alignment, setAlignment] = React.useState("create");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <Paper variant="outlined" sx={{ paddingRight: 1 }}>
      <Container
        component="main"
        maxWidth="lg"
        sx={{
          bgcolor: "white",
          borderRadius: "20px",
          padding: "40px !important",
          marginTop: "20px"
        }}
      >
        
        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          size="small"
          onChange={handleChange}
        >
          <ToggleButton value="create">Create</ToggleButton>
          <ToggleButton value="update">Update</ToggleButton>
        </ToggleButtonGroup>

        <CssBaseline />

        {alignment === "create" ? <CreateAccount /> : <UpdateAccount />}
      </Container>
    </Paper>
  );
}
