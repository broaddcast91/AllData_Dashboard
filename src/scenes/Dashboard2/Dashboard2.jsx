import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom";
// import { mockTransactions } from "../../data/mockData";
// import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
// import WebAssetIcon from "@mui/icons-material/WebAsset";
// import { FaRoad } from "react-icons/fa";
// import { BiSolidCarWash } from "react-icons/bi";
// import MyPieChart from "../../components/MyPieChart";
// import { rowFirst } from "../../data/mockData";
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
import BarChart2 from "../../components/BarChart2";

import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import axios from "axios";
import LoadingComponent from "../Loading"; // Import the loading component
// const allDataValue = rowFirst.AllDataCount;
// let Service = rowFirst.Service + rowFirst["24/7 Service"];
// // Log the value to the console
// console.log(" rowFirst ", rowFirst);
// console.log(" allDataValue ", allDataValue);

const Dashboard2 = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    globalFormData: {},
    monthYearCounts: {},
    barchart: [],
    recentLeads: [],
  });
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const navigate = useNavigate();

  const handleBoxClick = (path) => {
    navigate(path);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://saboo-groups-backend.onrender.com/getAllDataStaisticsPage"
        );
        const data = response.data.Data;

        setData({
          globalFormData: data.LeadsCount,
          monthYearCounts: data.monthlyCounts,
          barchart: data.barchart,
          recentLeads: data.recentLeads,
        });
        setLoading(false);
        // console.log(data)
      } catch (error) {
        console.error("Error fetching data:", error);
        window.alert("Something went wrong");
      }
    };

    fetchData();
  }, []);
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
      {/* {console.log(data)} */}
    
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
          {loading ? (
      <LoadingComponent /> // Render the loading component when loading is true
    ) : (
      <>
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
              subtitle={data.globalFormData.arenaCount}
              progress={
                data.globalFormData.arenaCount /
                data.globalFormData.AllDataCount
              }
              increase={
                Math.floor(
                  (data.globalFormData.arenaCount /
                    data.globalFormData.AllDataCount) *
                    100
                ) + "%"
              }
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
            onClick={() => handleBoxClick("/finance")}
          >
            <StatBox
              title="Nexa"
              subtitle={data.globalFormData.nexaCount}
              progress={
                data.globalFormData.nexaCount / data.globalFormData.AllDataCount
              }
              increase={
                Math.floor(
                  (data.globalFormData.nexaCount /
                    data.globalFormData.AllDataCount) *
                    100
                ) + "%"
              }
              // icon={
              //   <FaIndianRupeeSign sx={{ color: "black", fontSize: "36px" }} />
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
            onClick={() => handleBoxClick("/bookaservice")}
          >
            <StatBox
              subtitle={data.globalFormData.autozoneCount}
              title="Autozone"
              progress={
                data.globalFormData.autozoneCount /
                data.globalFormData.AllDataCount
              }
              increase={
                Math.floor(
                  (data.globalFormData.autozoneCount /
                    data.globalFormData.AllDataCount) *
                    100
                ) + "%"
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
            onClick={() => handleBoxClick("/onroadprice")} // Navigate to /popup on click
          >
            <StatBox
              subtitle={data.globalFormData.commercialCount}
              title="Commercial"
              progress={
                data.globalFormData.commercialCount /
                data.globalFormData.AllDataCount
              }
              increase={
                Math.floor(
                  (data.globalFormData.commercialCount /
                    data.globalFormData.AllDataCount) *
                    100
                ) + "%"
              }
              // icon={<FaRoad sx={{ color: "black" }} />}
            />
          </Box>

          {/* ROW 2 */}
          <Box
            gridColumn="span 7"
            gridRow="span 2"
            backgroundColor="white"
            sx={{ borderRadius: "10px", overflow: "hidden" }}
          >
            <Box
              mt="10px"
              p="0 20px"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography
                  variant="h5"
                  fontWeight="400"
                  color={colors.primary[1002]}
                >
                  MONTHLY LEAD CREATION
                </Typography>
              </Box>
            </Box>
            <Box height="230px" mr="10px" overflow="auto">
              <LineChart
                isDashboard={true}
                monthYearCounts={data.monthYearCounts}
              />
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
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`1px solid ${colors.primary[1002]}`}
              p="15px"
              sx={{
                backgroundColor: "#d2d8e8",
                borderRadius: "15px",
                mt: "10px",
                px: "35px",
              }}
            >
              <Typography
                color={colors.primary[1002]}
                variant="body2"
                fontWeight="600"
                // sx={{ flex: 1 }}
              >
                Phone
              </Typography>
              <Typography
                color={colors.primary[1002]}
                variant="body2"
                fontWeight="600"
                // backgroundColor="red"
                // sx={{ flex: 1, marginRight: "19px" }}
              >
                LeadFrom
              </Typography>
              <Typography
                color={colors.primary[1002]}
                variant="body2"
                fontWeight="600"
              >
                Date
              </Typography>
              <Typography
                color={colors.primary[1002]}
                variant="body2"
                fontWeight="600"
                // sx={{ flex: 1 }}
              >
                Time
              </Typography>
            </Box>
            {data.recentLeads.map((transaction, i) => (
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
                    width="60px"
                  >
                    {transaction.phone}
                  </Typography>
                  {/* <Typography color={colors.grey[100]}>
                    {transaction.user} */}
                  {/* </Typography> */}
                </Box>
                <Box
                  color={colors.primary[1002]}
                  width="90px"
                  display="flex"
                  justifyContent="center"
                >
                  {transaction.leadFrom}
                </Box>
                <Box color={colors.primary[1002]}>{transaction.date}</Box>
                <Box color={colors.primary[1002]}>{transaction.time}</Box>
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
              Comparison
            </Typography>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mt="-70px"
              height={"320px"}
            >
              <Box sx={{ height: "150px", marginTop: "10px" }}>
                <BarChart2 barchart={data.globalFormData} />
              </Box>
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
            <Box height="240px" mt="-20px" overflow="auto">
              {/* {data.barchart && data.barchart.length > 0 ? (
                <>
                  {console.log(data.barchart)} */}
              <BarChart isDashboard={true} barchartData={data.barchart} />
              {/* </>
              ) : (
                <p>Loading...</p> // Or any other placeholder content you prefer
              )} */}
            </Box>
          </Box>
        </Box>
          </>
    )}
      </Box>
    
    </Box>
  );
};

export default Dashboard2;
