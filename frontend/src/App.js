import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
// import { NavBar } from "./admin_panel/navbar";
import { Dashboard } from "./admin_panel/Pages/Dashboard";
import { ManageMenu } from "./admin_panel/Pages/ManageMenu";
import { Navigate } from "react-router";
// import { Dashboard } from "./admin_panel/Pages/Dashboard";
import { SideBar } from "./admin_panel/Sidebar";
import { Login } from "./components/Login";
import { ManagePages } from "./admin_panel/Pages/ManagePages";
import { ToastContainer } from "react-toastify";
import { Home } from "./Client-Frontend/Home";
import { DEMO, Demo } from "./Client-Frontend/DEMO";
import { Demoss } from "./Client-Frontend/Demos";
import { NavBar } from "./Client-Frontend/NavBar";
import { Pages } from "./Client-Frontend/Pages";
import { Admin_Routes } from "./admin_panel/Admin_Routes";
import { Frontend_Route } from "./Client-Frontend/Frontend_Route";
import { GetAppointment } from "./Client-Frontend/GetAppointment";
import { Dynamic_Routes } from "./Client-Frontend/Dynamic_Routes";

import axios from "axios";
import { useNavigate } from "react-router";
import { HomeNav } from "./Client-Frontend/DynamicPages/Home";
import { About } from "./Client-Frontend/DynamicPages/About";

function App({ routesDynamicNav }) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("user") ? true : false
  );
  const [admin, setadmin] = useState(false);
  const [menuData, setmenuData] = useState([]);
  const [pages, setpages] = useState([]);

  const [subMenu, setsubMenu] = useState(false);
  const [subPages, setsubPages] = useState([]);
  const [childMenu, setchildMenu] = useState([]);

  useEffect(async () => {
    let allMenu = await axios.get("http://localhost:5000/admin/allmenu");
    setmenuData(allMenu.data.data);
    let allPages = await axios.get("http://localhost:5000/admin/allpages");
    setpages(allPages.data.data);

    // return allMenu;
  }, []);

  const handleChooseSubMenu = (menuDataa) => {
    // console.log(id);
    // debugger
    // routesNav(menuDataa);
    setsubMenu(true);
    const childMenuData = menuData.filter((curMenu) =>
      curMenu.parent_Menu === menuDataa.id ? curMenu.title : console.log("")
    );
    const matchedMenu = pages.filter((curPage) =>
      curPage.slug === menuDataa.page_slug
        ? curPage.description
        : console.log("")
    );
    setsubPages(matchedMenu);
    setchildMenu(childMenuData);
    // <Demo />;
    // setAnchorElNav(null);
  };

  const pageSlugHandler = (MenuId) => {
    const pageDesc = pages.filter((curPage) =>
      curPage.slug === MenuId ? curPage.description : console.log("")
    );
    setsubPages(pageDesc);
  };

  console.log("admin ==>> ", admin);
  return (
    <>
      <ToastContainer />
      {isLoggedIn && (
        <>
          <Admin_Routes
            setIsLoggedIn={setIsLoggedIn}
            setadmin={setadmin}
            admin={admin}
          />
        </>
      )}
      {/* {isLoggedIn && !admin && (
        )} */}
      {!isLoggedIn && (
        <>
          {/* <Frontend_Route
            setIsLoggedIn={setIsLoggedIn}
            setadmin={setadmin}
            admin={admin}
          /> */}
          <Routes>
            <Route
              path="login"
              element={
                <Login setIsLoggedIn={setIsLoggedIn} setadmin={setadmin} />
              }
            />
            <Route
              path="/"
              element={
                <Home
                  setadmin={setadmin}
                  isLoggedIn={isLoggedIn}
                  handleChooseSubMenu={handleChooseSubMenu}
                  pageSlugHandler={pageSlugHandler}
                />
              }
            />

            {/* <Route
              path="/"
              element={<DEMO setadmin={setadmin} isLoggedIn={isLoggedIn} />}
            /> */}
            <Route
              path="/getappointment"
              element={
                <GetAppointment setadmin={setadmin} isLoggedIn={isLoggedIn} />
              }
            />

            <Route
              path="/home"
              element={
               <NavBar />
              }
            />
            <Route path="/about/:slug" element={<About />} />

            <Route path="*" element={<Navigate replace to="/" />} />
          </Routes>
          {/* <Dynamic_Routes /> */}
        </>
      )}
      {/* {isLoggedIn ? (
        <>
          {admin && (
            <Admin_Routes
              setIsLoggedIn={setIsLoggedIn}
              setadmin={setadmin}
              admin={admin}
            />
          )}
          {!admin && (
            <Frontend_Route
              setIsLoggedIn={setIsLoggedIn}
              setadmin={setadmin}
              admin={admin}
            />
          )}
        </>
      ) : (
        <>
          <Routes>
            <Route
              path="login"
              element={
                <Login setIsLoggedIn={setIsLoggedIn} setadmin={setadmin} />
              }
            />
            <Route path="*" element={<Navigate replace to="/login" />} />
          </Routes>
        </>
      )} */}
    </>
    // <>
    //   <div className="App">
    //     <>
    //       <ToastContainer />
    //       {/* <Routes>
    //       </Routes> */}
    //       {isLoggedIn ? (
    //         <>
    //           <Admin_Routes setIsLoggedIn={setIsLoggedIn} />

    //         </>
    //       ) : (
    //         <>
    //           <Routes>
    //             <Route
    //               path="login"
    //               element={<Login setIsLoggedIn={setIsLoggedIn} />}
    //             />
    //             <Route path="*" element={<Navigate replace to="/login" />} />
    //           </Routes>
    //         </>
    //       )}
    //     </>
    //   </div>
    // </>
  );
}
// {navigate("/")}

export default App;
