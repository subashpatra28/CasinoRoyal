import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Game from "../game/Game";
import TablePagination from "@material-ui/core/TablePagination";
import { gameHistoryStorage } from "../storage/UseLocalStorage";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    height: 830,
    background: theme.palette.warning.light,
  },
  main: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    display: "flex",
    justifyContent: "center",
  },
  table: {
    minWidth: 50,
    background: theme.palette.secondary.dark,
  },
}));

function Content() {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);
  const [page, setPage] = React.useState(20);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [tableState, setTableState] = useState(gameHistoryStorage());
  const startGame = () => {
    setOpenModal(true);
  };

  const endGame = () => {
    setTableState(gameHistoryStorage());
    setOpenModal(false);
  };

  function sortByName(action) {
    const comparison = action == "byName" ? "username" : "time";
    setTableState((oldTableState) => {
      const newTableState = oldTableState.sort((a, b) => {
        if (a[comparison] > b[comparison]) {
          return 1;
        }
        if (a[comparison] < b[comparison]) {
          return -1;
        }
        return 0;
      });
      return [...newTableState];
    });
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Container component="main" className={classes.main} maxWidth="sm">
        <Button onClick={startGame} variant="contained" color="secondary">
          PLAY TIME!!
        </Button>
        <Game isOpen={openModal} closeModal={endGame} />
      </Container>
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          size="medium"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell
                align="center"
                onClick={() => {
                  sortByName("byName");
                }}
              >
                Name
              </TableCell>
              <TableCell align="center">Result</TableCell>
              <TableCell
                align="center"
                onClick={() => {
                  sortByName("byTime");
                }}
              >
                Time
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableState.map((row) => (
              <TableRow key={row}>
                <TableCell align="center">{row.username}</TableCell>
                <TableCell align="center">{`${row.result.firstNumber} ${row.result.secondNumber} ${row.result.thirdNumber}`}</TableCell>
                <TableCell align="center">{row.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TablePagination
            component="div"
            count={100}
            page={page}
            onChangePage={handleChangePage}
            rowsPerPage={rowsPerPage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Table>
      </TableContainer>
    </div>
  );
}

export default Content;
