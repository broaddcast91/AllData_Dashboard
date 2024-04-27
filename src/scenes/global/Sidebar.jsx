import { useState } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import GroupsIcon from "@mui/icons-material/Groups";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import StorageIcon from "@mui/icons-material/Storage";
import { SiSuzuki } from "react-icons/si";
import { ImTruck } from "react-icons/im";
import { BiSolidCarWash } from "react-icons/bi";

const CustomSubMenuTitle = ({ title, icon }) => (
  <Tooltip title={title} placement="right">
    <span>
      {icon}
      <span>{title}</span>
    </span>
  </Tooltip>
);

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Tooltip title={title} placement="right">
      <MenuItem
        active={selected === title}
        style={{
          color: colors.redAccent[100],
        }}
        onClick={() => setSelected(title)}
        icon={icon}
      >
        <Typography>{title}</Typography>
        <Link to={to} />
      </MenuItem>
    </Tooltip>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.sabooAutoColors[600]} !important`,
          height:"810px"
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#db4f4a !important",
        },
        "& .pro-menu-item.active": {
          color: "#db4f4a !important",
        },
        "& .pro-inner-list-item":{
          height:"10px"
        },
        ".custom-submenu-title": {
          padding: "4px",
          color: "white",
          
        },
        ".custom-submenu-title :hover": {
          color: "#db4f4a !important",
        },

        ".custom-submenu-icon": {
          color: "white",
        },
        ".custom-submenu-icon :hover": {
          color: "#db4f4a !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed} >
        <Menu iconShape="square" >
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
               
              >
                <Typography variant="h3" color={colors.redAccent[100]}>
                  <img
                    alt="profile-user"
                    width="100px"
                    height="100px"
                    src={`https://saboomaruti.in/static/media/whitelogo.5a5baebbd708786e1e5d.webp`}
                  />
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon
                    style={{ margin: "10px 0 20px 0", color: colors.grey[100] }}
                  />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
              ></Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  Saboo Rks
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <SubMenu
              title={
                <CustomSubMenuTitle icon={<StorageIcon />} title="All Data" />
              }
              selected={selected}
              setSelected={setSelected}
            >
              <Item
                title="Arena All Data"
                to="/alldata"
                icon={<SiSuzuki />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Nexa All Data"
                to="/nexadata"
                icon={<SiSuzuki style={{ color: "black" }} />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="AutoZone All Data"
                to="/autozonedata"
                icon={<ImTruck />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Service FeedBack"
                to="/service"
                icon={<BiSolidCarWash />}
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenu>

            <SubMenu
              title={
                <CustomSubMenuTitle
                  title=" SabooGroups"
                  icon={<GroupsIcon />}
                />
              }
              selected={selected}
              setSelected={setSelected}
            >
              <Item
                title="Contact Us"
                to="/saboogroups"
                icon={<ContactPhoneIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenu>
          </Box>
          <Box marginTop="450px">
            <Item
              title="Log Out"
              to="/logout"
              icon={<LogoutIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
