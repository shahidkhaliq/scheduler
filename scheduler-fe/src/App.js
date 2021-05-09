import "./App.css";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Box, CircularProgress } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const DAY_MAP = {
  0: "Sun",
  1: "Mon",
  2: "Tue",
  3: "Wed",
  4: "Thu",
  5: "Fri",
  6: "Sat",
};

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "gainsboro",
    color: "black",
    fontWeight: "600",
  },
  body: {
    backgroundColor: (props) => props.backgroundColor || "white",
    color: (props) => props.color || "black",
    fontWeight: (props) => props.fontWeight || "400",
    fontSize: 14,
  },
}))(TableCell);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const Shift = ({ shift }) =>
  !shift ? (
    <StyledTableCell />
  ) : (
    <StyledTableCell backgroundColor={shift.color} color="white">
      <Box display="flex" flexDirection="column" alignItems="center">
        {shift.start_at} - {shift.end_at}
        <Box>{shift.role}</Box>
      </Box>
    </StyledTableCell>
  );

const App = () => {
  const classes = useStyles();
  const [data, setData] = useState();
  const [sortBy, setSortBy] = useState("first_name");

  useEffect(() => {
    async function fetchData() {
      return await axios("http://localhost:3000/shifts", {
        params: { sort_by: sortBy },
      });
    }
    fetchData().then((response) => {
      setData(response.data);
    });
  }, [sortBy]);

  const [sumEmployee, sumDay, shiftLookupMap] = useMemo(() => {
    const sumDay = {};
    const sumEmployee = {};
    const shiftLookupMap = {};

    if (!data) {
      return [null, null, null];
    }
    data.forEach((row) => {
      if (!(row.name in sumEmployee)) {
        sumEmployee[row.name] = 0;
      }
      row.shifts.forEach((shift) => {
        sumEmployee[row.name] += shift.duration;
        if (!(shift.day in sumDay)) {
          sumDay[shift.day] = 0;
        }
        sumDay[shift.day] += shift.duration;
        shiftLookupMap[`${row.name}:${shift.day}`] = shift;
      });
    });
    return [sumEmployee, sumDay, shiftLookupMap];
  }, [data]);

  if (!data) {
    return <CircularProgress />;
  }

  const headerLabels = [
    "",
    ...Object.keys(DAY_MAP).map(
      (day) => `${DAY_MAP[day]} (${sumDay[day]} hrs)`
    ),
  ];
  return (
    <Box display="flex" justifyContent="center">
      <Box padding="100px" maxWidth="80%">
        <Box paddingY={"10px"}>
          <FormControl>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortBy}
              onChange={(event) => {
                setSortBy(event.target.value);
              }}
            >
              <MenuItem value={"first_name"}>First Name</MenuItem>
              <MenuItem value={"last_name"}>Last Name</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                {headerLabels.map((item) => (
                  <StyledTableCell key={item}>{item}</StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.name}>
                  <StyledTableCell
                    key={row.name}
                    backgroundColor="white"
                    fontWeight="600"
                  >
                    {`${row.name} (${sumEmployee[row.name]} hrs)`}
                  </StyledTableCell>
                  {Object.keys(DAY_MAP).map((day) => (
                    <Shift
                      key={day}
                      shift={shiftLookupMap[`${row.name}:${day}`]}
                    />
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default App;
