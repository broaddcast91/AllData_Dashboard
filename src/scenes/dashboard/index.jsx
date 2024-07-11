import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom";
import { mockTransactions } from "../../data/mockData";
// import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
// import WebAssetIcon from "@mui/icons-material/WebAsset";
// import { FaRoad } from "react-icons/fa";
// import { BiSolidCarWash } from "react-icons/bi";
import MyPieChart from "../../components/MyPieChart";
import { rowFirst } from "../../data/mockData";
// import { FaIndianRupeeSign } from "react-icons/fa6";
// let formData = JSON.stringify(rowFirst, null, 2)
// import EmailIcon from "@mui/icons-material/Email";
// import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
// import PersonAddIcon from "@mui/icons-material/PersonAdd";
// import TrafficIcon from "@mui/icons-material/Traffic";
// import { FaDatabase } from "react-icons/fa6";
// import ProgressCircle from "../../components/ProgressCircle";
// import ProgressCircle from "../../components/ProgressCircle";
// import GeographyChart from "../../components/GeographyChart";

// import Header from "../../components/Header";
import LineChart from "../../components/LineChart";

import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";

const allDataValue = rowFirst.AllData;
// let Service = rowFirst.Service + rowFirst["24/7 Service"];
// Log the value to the console
console.log("AllData value:", allDataValue);
const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const navigate = useNavigate();

  const handleBoxClick = (path) => {
    navigate(path);
  };

  return (
    <Box
      sx={{
        mx: "10px",
        backgroundColor: "#1d3a8a",
        marginTop: "-34px",
        borderRadius: "30px",
        height: "160px",
        paddingTop: "10px",
        "&.MuiBox-root css-y0u0hj": { backgroundColor: "#1d3a8a" },
      }}
    >
      <Box
        sx={{
          backgroundColor: "#f5f5f6",
          my: "20px",
          height: {
            xs: "auto", // Adjust for extra small screens
            sm: "90vh", // Adjust for small screens
            md: "90vh", // Adjust for medium screens
            lg: "90vh", // Adjust for large screens
            xl: "90vh", // Adjust for extra large screens
          },
          borderRadius: "30px",
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{ height: "70px", paddingTop: "15px", paddingLeft: "20px" }}
        >
          {/* <h6>Dashboard</h6> */}
          <Box
            mt="20px"
            mb="10px"
            ml="20px"
            // sx={{backgroundColor:"red"}}
          >
            {/* HEADER */}
            <Typography
              variant="h3"
              color={colors.grey[700]}
              fontWeight="bold"
              sx={{ m: "0 0 5px 0" }}
            >
              DASHBOARD
            </Typography>
            <Typography variant="h5" color={colors.redAccent[1000]}>
              Welcome to dashboard
            </Typography>
          </Box>
          {/* <Header title="DASHBOARD" subtitle="Welcome to your dashboard" /> */}

          {/* <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "5px 10px",
              marginRight:"20px"
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box> */}
        </Box>

        {/* GRID & CHARTS */}
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="13vh"
          gap="14px"
          sx={{ padding: "36px" }}
        >
          {/* ROW 1 */}

          <Box
            gridColumn="span 3"
            backgroundColor="white" 
            sx={{ borderRadius: "20px" }}
            display="flex"
            alignItems="center"
            justifyContent="center"
            onClick={() => handleBoxClick("/popup")} // Navigate to /popup on click
          >
            <StatBox
              title="Arena"
              subtitle={rowFirst.Arena}
              progress={rowFirst.Arena / allDataValue}
              increase={Math.floor((rowFirst.Arena / allDataValue) * 100) + "%"}
              // icon={<WebAssetIcon fontSize="39px" sx={{ color: "black" }} />}
            />
          </Box>
          <Box
            gridColumn="span 3"
            backgroundColor="white"
            sx={{ borderRadius: "10px" }}
            display="flex"
            alignItems="center"
            justifyContent="center"
            onClick={() => handleBoxClick("/onroadprice")} // Navigate to /popup on click
          >
            <StatBox
              subtitle={rowFirst["Saboo Groups"]}
              title="Saboo Groups"
              progress={rowFirst["Saboo Groups"] / allDataValue}
              increase={
                Math.floor((rowFirst["Saboo Groups"] / allDataValue) * 100) +
                "%"
              }
              // icon={<FaRoad sx={{ color: "black" }} />}
            />
          </Box>

          <Box
            gridColumn="span 3"
            backgroundColor="white"
            sx={{ borderRadius: "10px" }}
            display="flex"
            alignItems="center"
            justifyContent="center"
            onClick={() => handleBoxClick("/bookaservice")}
          >
            <StatBox
              subtitle={rowFirst.Autozone}
              title="Autozone"
              progress={rowFirst.Autozone / allDataValue}
              increase={
                Math.floor((rowFirst.Autozone / allDataValue) * 100) + "%"
              }
              // icon={
              //   <BiSolidCarWash sx={{ color: "black", fontSize: "26px" }} />
              // }
            />
          </Box>
          <Box
            gridColumn="span 3"
            backgroundColor="white"
            sx={{ borderRadius: "10px" }}
            display="flex"
            alignItems="center"
            justifyContent="center"
            onClick={() => handleBoxClick("/finance")}
          >
            <StatBox
              title="Nexa"
              subtitle={rowFirst.Nexa}
              progress={rowFirst.Nexa / allDataValue}
              increase={
                Math.floor((rowFirst.Nexa / allDataValue) * 100) + "%"
              }
              // icon={
              //   <FaIndianRupeeSign sx={{ color: "black", fontSize: "36px" }} />
              // }
            />
          </Box>

          {/* ROW 2 */}
          <Box
            gridColumn="span 7"
            gridRow="span 2"
            backgroundColor="white"
            sx={{ borderRadius: "10px" }}
          >
            <Box
              mt="10px"
              p="0 20px"
              display="flex "
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography
                  variant="h5"
                  fontWeight="400"
                  color={colors.primary[1002]}
                >
                  MONTHLY Lead CREATION
                </Typography>
                {/* <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                59,342.32
              </Typography> */}
              </Box>
            </Box>
            <Box height="230px" m="-20px -60px 0 0">
              <LineChart isDashboard={true} />
            </Box>
          </Box>
          <Box
            gridColumn="span 5"
            gridRow="span 2"
            backgroundColor="white"
            overflow="auto"
            sx={{ borderRadius: "10px" }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`1px solid ${colors.primary[500]}`}
              colors={colors.grey[100]}
              p="15px"
            >
              <Typography
                color={colors.primary[1002]}
                variant="h5"
                fontWeight="600"
              >
                Recent Leads
              </Typography>
            </Box>

            {mockTransactions.map((transaction, i) => (
              <Box
                key={`${transaction.phone}`}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`1px solid ${colors.primary[1002]}`}
                p="15px"
              >
                <Box>
                  <Typography
                    color={colors.redAccent[400]}
                    variant="h6"
                    fontWeight="600"
                  >
                    {transaction.phone}
                  </Typography>
                  <Typography color={colors.grey[100]}>
                    {transaction.user}
                  </Typography>
                </Box>
                <Box color={colors.primary[1002]}>{transaction.leadFrom} </Box>
                <Box color={colors.primary[1002]}>{transaction.date}</Box>
                <Box color={colors.primary[1002]}>{transaction.time}</Box>
                {/* <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                {transaction.phone}
              </Box> */}
              </Box>
            ))}
          </Box>

          {/* ROW 3 */}
          <Box
            gridColumn="span 4"
            gridRow="span 2"
            backgroundColor="white"
            p="30px"
            sx={{ borderRadius: "10px" }}
          >
            <Typography
              variant="h5"
              fontWeight="600"
              color={colors.primary[1002]}
            >
              Forms Data
            </Typography>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mt="-70px"
              // mx={"20px"}
              height={"320px"}
              // width={"150px"}
            >
              <MyPieChart />
            </Box>
          </Box>
          <Box
            gridColumn="span 8"
            gridRow="span 2"
            backgroundColor="white"
            sx={{ borderRadius: "10px" }}
          >
            <Typography
              variant="h5"
              fontWeight="600"
              sx={{ padding: "20px 20px 0 20px" }}
              color={colors.primary[1002]}
            >
              {" "}
              Vehicle Enquiries{" "}
            </Typography>
            <Box height="230px" mt="-20px">
              <BarChart isDashboard={true} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
