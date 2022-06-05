import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";

import Modal from "@mui/material/Modal";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { IconButton } from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";

const MenuModelStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1050,
  height: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  overflowY: "auto",
  p: 1,
  boxShadow: 24,
};

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export const GetAppointment = () => {
  const [open, setOpen] = useState(false);

  const [updatedItemModal, setupdatedItemModal] = useState(false);

  const [title, setTitle] = useState("");
  const [slug, setslug] = useState("");
  const [image, setimage] = useState("");
  const [description, setDescription] = useState([]);
  const [chr_delete, setchr_delete] = useState(0);
  const [apiData, setapiData] = useState([]);
  const [updateState, setupdateState] = useState("");
  const [update, setupdate] = useState(false);
  const [menuData, setmenuData] = useState([]);
  const [parentMenu, setparentMenu] = useState(0);
  // const confirm = useConfirm();

  const [deletePage, setDeletePage] = useState({});
  const [deletePagePopup, setdeletePagePopup] = useState(false);
  // console.log("delete page -->>", deletePage);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setupdatedItemModal(false);
    setupdate(false);
    if (!title || !slug || !image || !description) {
      toast.error("Plz Fill all the field");
      return;
    }
    try {
      const formData = new FormData();
      // // chr_delete
      // console.log("the data", image);
      formData.append("title", title);
      formData.append("slug", slug);
      formData.append("image", image);
      formData.append("description", description);
      formData.append(`chr_delete`, chr_delete);
      formData.append(`parentMenu`, parentMenu);
      const result = await axios.post(
        "http://localhost:5000/admin/allpages",
        formData
      );

      toast.success(result.data.message);
      // setOpen(false);
      // apiFunc();
      // handleClose();
      // openUpdateModalHandler()
      return result.data;
    } catch (error) {
      toast.error(error);
      return console.log("error: " + error);
    }
  };
  return (
    <>
      <h1>Get appointment</h1>
      {/*  */}
    </>
  );
};
