import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function DataDisplay() {
  const [load, setLoad] = React.useState(true);
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    handleLoadData();
  }, []);

  function createData(id, user, currency, balance, description) {
    return { id, user, currency, balance, description};
  }

  const handleLoadData = () => {
    console.log("Loading data...");
    axios.get('https://api.rkv.one/super-doodle/v1/api/accounts')
    .then(function (response) {
      // handle success
      let pRows = [];
      response.data.forEach(element => {
        pRows.push(createData(element.id, element.user, element.currency, element.balance, element.description));
      });
      
      setRows(pRows);
      
      setLoad(false);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      setLoad(false);
    });
  };

  return (

    <div>
      <Stack direction="row" spacing={2} sx={{ marginTop: 5 }}>
        <Button variant="contained" onClick={handleLoadData}>Refresh</Button>
      </Stack>
      
      <Paper variant="outlined" sx={{ marginTop: 5}}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>  
                <TableCell>ID</TableCell>
                <TableCell align="right">User</TableCell>
                <TableCell align="right">Currency</TableCell>
                <TableCell align="right">Balance</TableCell>
                <TableCell align="right">Description</TableCell>
              </TableRow>
            </TableHead>
            
            {
              load ? (<TableBody></TableBody>) : (
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.user} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                      <TableCell component="th" scope="row">{row.id}</TableCell>
                      <TableCell align="right">{row.user}</TableCell>
                      <TableCell align="right">{row.currency}</TableCell>
                      <TableCell align="right">{row.balance}</TableCell>
                      <TableCell align="right">{row.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
            
                )
            }
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};
