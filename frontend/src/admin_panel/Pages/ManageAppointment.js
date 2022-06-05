import React, { useEffect, useState } from "react";
import "./CSS/ManagePages.css";
import Tabs from "@mui/material/Tabs";
import { Tab, TablePagination } from "@mui/material";
import Table from "@mui/material/Table";
import { styled } from "@mui/material/styles";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";

import Button from "@mui/material/Button";
import ButtonUnstyled, {
  buttonUnstyledClasses,
} from "@mui/base/ButtonUnstyled";
import { TableComponent } from "../TableComponent";

const style = {
  position: "absolute",
  top: "42%",
  left: "54%",
  // transform: "translate(-50%, -50%)",
  width: 830,
  height: 500,
  bgcolor: "background.paper",
  // overflowY: "auto",
  border: "2px solid #000",
  marginTop: "10rem",
  p: 1,
  boxShadow: 24,
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const blue = {
  500: "#007FFF",
  600: "#0072E5",
  700: "#0059B2",
};

const CustomButtonRoot = styled("button")`
  font-family: IBM Plex Sans, sans-serif;
  font-weight: bold;
  font-size: 0.875rem;
  background-color: ${blue[500]};
  padding: 12px 24px;
  border-radius: 8px;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: ${blue[600]};
  }

  &.${buttonUnstyledClasses.active} {
    background-color: ${blue[700]};
  }

  &.${buttonUnstyledClasses.focusVisible} {
    box-shadow: 0 4px 20px 0 rgba(61, 71, 82, 0.1),
      0 0 0 5px rgba(0, 127, 255, 0.5);
    outline: none;
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// First_name, Last_name, Email, Mobile, Service_Type, Date, Remark, Status, Action

const columns = [
  { id: 1, label: "First_name", minWidth: 170 },
  { label: "Last_name", minWidth: 100 },
  {
    label: "Email",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "Mobile",
    label: "Mobile",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    label: "Service_Type",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    label: "Date",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    label: "Remark",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    label: "Status",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    label: "Action",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

export const ManageAppointment = () => {
  const [appointmentData, setappointmentData] = useState([]);
  const [status, setstatus] = useState("pending");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // appontment/reject



  const datehandle = (data) => {
    let theDate = new Date(Date.parse(data.date));
    return theDate.toLocaleDateString();
  };

  function CustomButton(props) {
    return <ButtonUnstyled {...props} component={CustomButtonRoot} />;
  }

  // const handleApproved = async (data) => {
  //   //   console.log("aprroved", data);
  //   let appoitmentStatus = appointmentData.find(
  //     (curData) => curData.id === data.id
  //   );
  //   console.log(appoitmentStatus);
  //   try {
  //     let result = await axios.put(
  //       `http://localhost:5000/admin/appontment/aprooved/${appoitmentStatus.id}`
  //     );
  //     setstatus("1");
  //     return result;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // const handleRejected = async (data) => {
  //   console.log("Rejected", data);
  //   let appoitmentStatus = appointmentData.find(
  //     (curData) => curData.id === data.id
  //   );
  //   console.log(appoitmentStatus);
  //   try {
  //     const rejectedData = await axios.put(
  //       `http://localhost:5000/admin/appontment/reject/${appoitmentStatus.id}`
  //     );
  //     setstatus("0");
  //     console.log(rejectedData);
  //     return rejectedData;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const statusHandler = (value) => {
    switch (value) {
      case "0":
        return "Rejected";

      case "1":
        return "Approved";

      case "2":
        return "pending";

      default:
        return "pending";
    }
  };

  return (
    <>
      <header className="header">Manage Appointment</header>

      <TableComponent
        columns={columns}
        // data={appointmentData}
        page={page}
        rowsPerPage={rowsPerPage}
        CustomButton={CustomButton}
        setPage={setPage}
        setRowsPerPage={setRowsPerPage}
        setstatus={setstatus}
        // status={status}

      />

      
    </>
  );
};
