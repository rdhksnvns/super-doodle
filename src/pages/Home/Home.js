import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ResizePanel from "react-resize-panel";

import Pictures from "./components/Pictures";
import Form from "./components/Form";
import DataDisplay from "./components/DataDisplay";

import style from "./home.scss";
import classNames from "classnames/bind";
let cx = classNames.bind(style);

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center" sx={{ marginTop: 5 }}>
      {"Copyright © "}
      <Link color="inherit" href="https://rkv.one">
        Rkv
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

function Home() {

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar
          position="absolute"
          color="default"
          elevation={0}
          sx={{
            position: "relative",
            borderBottom: (t) => `1px solid ${t.palette.divider}`,
          }}
        >
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              RKV
            </Typography>
          </Toolbar>
        </AppBar>

        <Container component="main" maxWidth="lg" sx={{ mb: 4, mt: 6 }}>
          <div className={cx("container")} style={{}}>
            <div className={cx("body")}>
              <ResizePanel
                direction="e"
                style={{ flexGrow: "1", maxWidth: "50%", minWidth: "30%" }}
              >
                <div style={{ paddingRight: "20px", display: "block" }}>
                  <Form />
                </div>
              </ResizePanel>

              <Box
                sx={{
                  width: "100%",
                  paddingLeft: "20px",
                  paddingBottom: "20px",
                }}
              >
                <div style={{ maxWidth: "calc(100% - 22px)" }}>
                  <div>
                    <Pictures />
                  </div>
                </div>
              </Box>
            </div>
          </div>

          <DataDisplay />

          <Copyright />
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default Home;
