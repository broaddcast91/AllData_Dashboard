// import { DataGrid, GridToolbar } from '@mui/x-data-grid';
// import React, { useState } from "react";
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom";
import { Box, Select, MenuItem, Typography } from "@mui/material";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
// import Calendar from "react-calendar";
import FilterListIcon from "@mui/icons-material/FilterList";
//import date range picker files
// import { DemoContainer } from '@mui/x-da ate-pickers-pro/DateRangePicker';
// import { DateRangePicker } from '@mui/lab';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
import "react-datepicker/dist/react-datepicker.css";
// import XLSX from 'xlsx';
import * as XLSX from 'xlsx';

import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

// import { red } from "@mui/material/colors";
// import TextField from "@mui/material/TextField";
// import DatePicker from "react-datepicker";
const Service = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  // const [startDate, setStartDate] = useState(null);
  // const [endDate, setEndDate] = useState(null);
  const navigate = useNavigate();
  const [col, setCol] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("Today");
  // State for start and end dates
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (date) => {
    setStartDate(date.toISOString().slice(0, 10));
    // console.log(startDate);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date.toISOString().slice(0, 10));
    // console.log(endDate);
  };

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  let newData = data.map((item, index) => {
    return { ...item, id: index + 1 };
  });

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      // console.log(selectedFilter);

      const token = localStorage.getItem("authTokenNexa");
      if (!token) {
        navigate("/login");
        return;
      }
      const res = await axios.post(
        "https://saboo-nexa.onrender.com/filtersfeedbacks",
       {
          filter: selectedFilter,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      let column = [
        { field: "id", headerName: "ID",  width: 60 },
        {
          field: "name",
          headerName: "FirstName",
          // flex: 1,
          width: 150,
        },
        {
          field: "phone",
          headerName: "Phone Number",
          width: 150,
          // flex: 1,
        },
        {
          field: "location",
          headerName: "Location",
          // flex: 1,
        },
        {
          field: "vehicleNumber",
          headerName: "vehicle number",
          // flex: 1,
          //   cellClassName: "phone-column--cell",
        },
        {
          field: "overAllPerformance",
          headerName:
            "how would you rate overall performance of service center?",
          // flex: 1,
          //   cellClassName: "phone-column--cell",
        },
        {
          field: "preferingSabooRKS",
          headerName:
            "how  would you prefer Saboo RKS  which you visited rather than other service centers?",
          // flex: 1,
          //   cellClassName: "phone-column--cell",
        },
        {
          field: "waitTime",
          headerName: "Wait time before a service advisor attended you",
          // flex: 1,
          //   cellClassName: "phone-column--cell",
        },
        {
          field: "advisorTimeAndAttention",
          headerName: "Time & attention provided by the Service advisor",
          // flex: 1,
          //   cellClassName: "phone-column--cell",
        },

        {
          field: "advisorsUnderstandingWorkingRequirement",
          headerName: "Service advisors understanding of work required",
          // flex: 1,
          //   cellClassName: "phone-column--cell",
        },
        {
          field: "advisorsListenAbility",
          headerName: "Service advisors ability to listen",
          // flex: 1,
          //   cellClassName: "phone-column--cell",
        },
        {
          field: "advisorsBehavior",
          headerName: "Behavior of Service advisor",
          // flex: 1, 
          //   cellClassName: "phone-column--cell",
        },
        //   {
        //     field: "advisorsRecommendationOnWorkRequirement",
        //     headerName: "Did the service personnel explain the issues and repairs needed clearly?",
        //     flex: 1,
        //   //   cellClassName: "phone-column--cell",
        //   },

        {
          field: "advisorsRecommendationOnWorkRequirement",
          headerName:
            "advisor's recommendation regarding the work required upon inspection of your car",
          // flex: 1,
          //   cellClassName: "phone-column--cell",
        },
        {
          field: "advancePerformingWork",
          headerName: "Explanation of work to be performed in advance",
          // flex: 1,
          //   cellClassName: "phone-column--cell",
        },
        {
          field: "workPerformedOnTheCar",
          headerName: "Explanation about the work performed on the car",
          // flex: 1,
          //   cellClassName: "phone-column--cell",
        },
        {
          field: "qualityOfWork",
          headerName: "Quality of work performed",
          // flex: 1,
          //   cellClassName: "phone-column--cell",
        },

        {
          field: "postServiceWashingAndCleaning",
          headerName: "Washing & Cleanliness of the car post service",
          // flex: 1,
          //   cellClassName: "phone-column--cell",
        },
        {
          field: "billExplanation",
          headerName: "Explanation of charges in bill",
          // flex: 1,
          //   cellClassName: "phone-column--cell",
        },
        {
          field: "transparencyPrice",
          headerName: "Transparency in prices of services",
          // flex: 1,
          //   cellClassName: "phone-column--cell",
        },

        {
          field: "recommendation",
          headerName:
            "On scale of from 0 to 10 How likely are you to recommend Saboo RKS Service ",
          // flex: 1,
          //   cellClassName: "phone-column--cell",
        },

        {
          field: "feedback",
          headerName:
            "feedback",
          width:500
          //   cellClassName: "phone-column--cell",
        },

        {
          field: "date",
          headerName: "Date",
          width: 120,
          flex: 1,
        },
        {
          field: "time",
          headerName: "Time",
          flex: 1,
          width: 120,
        },
      ];
      // console.log("Columns before setting state:", column);
      setCol(column);

      // console.log("Data from API:", res.data.data);
      setData(res.data.data);
      setLoading(false);
    } catch (err) {
      setError(err);
      navigate("/login");
      setLoading(false);
    }
  }, [selectedFilter, navigate]); // Add dependencies here

  useEffect(() => {
    fetchData();
  }, [fetchData]); // Include fetchData in the dependency array

  useEffect(() => {
    async function fetchUniqueValues() {
      try {
        setLoading(true);

        const token = localStorage.getItem("authTokenNexa");
        if (!token) {
          navigate("/login");
          return;
        }
        const res = await axios.post(
          "https://saboo-nexa.onrender.com/filtersfeedbacks",
          {
            filter: selectedFilter,
            startDate: startDate,
            endDate: endDate,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        let column = [
          { field: "id", headerName: "ID",  width: 60 },
          {
            field: "name",
            headerName: "FirstName",
            // flex: 1,
            width: 150,
          },
          {
            field: "phone",
            headerName: "Phone Number",
            width: 150,
            // flex: 1,
          },
          {
            field: "location",
            headerName: "Location",
            // flex: 1,
          },
          {
            field: "vehicleNumber",
            headerName: "vehicle number",
            // flex: 1,
            //   cellClassName: "phone-column--cell",
          },
          {
            field: "overAllPerformance",
            headerName:
              "how would you rate overall performance of service center?",
            // flex: 1,
            //   cellClassName: "phone-column--cell",
          },
          {
            field: "preferingSabooRKS",
            headerName:
              "how  would you prefer Saboo RKS  which you visited rather than other service centers?",
            // flex: 1,
            //   cellClassName: "phone-column--cell",
          },
          {
            field: "waitTime",
            headerName: "Wait time before a service advisor attended you",
            // flex: 1,
            //   cellClassName: "phone-column--cell",
          },
          {
            field: "advisorTimeAndAttention",
            headerName: "Time & attention provided by the Service advisor",
            // flex: 1,
            //   cellClassName: "phone-column--cell",
          },

          {
            field: "advisorsUnderstandingWorkingRequirement",
            headerName: "Service advisors understanding of work required",
            // flex: 1,
            //   cellClassName: "phone-column--cell",
          },
          {
            field: "advisorsListenAbility",
            headerName: "Service advisors ability to listen",
            // flex: 1,
            //   cellClassName: "phone-column--cell",
          },
          {
            field: "advisorsBehavior",
            headerName: "Behavior of Service advisor",
            // flex: 1, 
            //   cellClassName: "phone-column--cell",
          },
          //   {
          //     field: "advisorsRecommendationOnWorkRequirement",
          //     headerName: "Did the service personnel explain the issues and repairs needed clearly?",
          //     flex: 1,
          //   //   cellClassName: "phone-column--cell",
          //   },

          {
            field: "advisorsRecommendationOnWorkRequirement",
            headerName:
              "advisor's recommendation regarding the work required upon inspection of your car",
            // flex: 1,
            //   cellClassName: "phone-column--cell",
          },
          {
            field: "advancePerformingWork",
            headerName: "Explanation of work to be performed in advance",
            // flex: 1,
            //   cellClassName: "phone-column--cell",
          },
          {
            field: "workPerformedOnTheCar",
            headerName: "Explanation about the work performed on the car",
            // flex: 1,
            //   cellClassName: "phone-column--cell",
          },
          {
            field: "qualityOfWork",
            headerName: "Quality of work performed",
            // flex: 1,
            //   cellClassName: "phone-column--cell",
          },

          {
            field: "postServiceWashingAndCleaning",
            headerName: "Washing & Cleanliness of the car post service",
            // flex: 1,
            //   cellClassName: "phone-column--cell",
          },
          {
            field: "billExplanation",
            headerName: "Explanation of charges in bill",
            // flex: 1,
            //   cellClassName: "phone-column--cell",
          },
          {
            field: "transparencyPrice",
            headerName: "Transparency in prices of services",
            // flex: 1,
            //   cellClassName: "phone-column--cell",
          },

          {
            field: "recommendation",
            headerName:
              "On scale of from 0 to 10 How likely are you to recommend Saboo RKS Service ",
            // flex: 1,
            //   cellClassName: "phone-column--cell",
          },

          {
            field: "feedback",
            headerName:
              "feedback",
            width:500
            //   cellClassName: "phone-column--cell",
          },

          {
            field: "date",
            headerName: "Date",
            width: 120,
            flex: 1,
          },
          {
            field: "time",
            headerName: "Time",
            flex: 1,
            width: 120,
          },
        ];
        // console.log("Columns before setting state:", column);
        setCol(column);

        setData(res.data.data);
        setStartDate("");
        setEndDate("");
        setLoading(false);
      } catch (err) {
        setError(err);
        navigate("/login");
        setLoading(false);
      }
    }

    if (startDate && endDate) {
      // console.log(startDate, endDate);
      fetchUniqueValues();
    }
  }, [data, startDate, endDate, selectedFilter, navigate]); // Added data as a dependency


  // const handleDownloadCSV = () => {
  //   const csvData = [];
  //   const headers = col.map((column) => `"${column.headerName}"`);
  //   csvData.push(headers);

  //   newData.forEach((item) => {
  //     const row = col.map((column) => item[column.field]);
  //     csvData.push(row);
  //   });

  //   const csvContent = csvData.map((row) => row.join(",")).join("\n");

  //   const blob = new Blob([csvContent], { type: "text/csv" });
  //   const url = window.URL.createObjectURL(blob);
  //   const a = document.createElement("a");
  //   a.style.display = "none";
  //   a.href = url;
  //   a.download = "contact_us(Arena).csv";
  //   document.body.appendChild(a);
  //   a.click();
  //   window.URL.revokeObjectURL(url);
  //   document.body.removeChild(a);
  // };

  // console.log(newData)

  const headers = [
    "id",
    "name",
    "phone",
    "location",
    "vehicleNumber",
    "overAllPerformance",
    "preferingSabooRKS",
    "waitTime",
    "advisorTimeAndAttention",
    "advisorsUnderstandingWorkingRequirement",
    "advisorsListenAbility",
    "advisorsBehavior",
    "advisorsRecommendationOnWorkRequirement",
    "advancePerformingWork",
    "workPerformedOnTheCar",
    "qualityOfWork",
    "postServiceWashingAndCleaning",
    "billExplanation",
    "transparencyPrice",
    "recommendation",
    "feedback",
    // "leadFrom",
    "date",
    "time",
   
    // "isDeleted",
    // "createdAt",
    // "updatedAt",
    // "__v"
  ];
  
  const dataRows = newData.map(row => {
    // Exclude specific keys
    const { _id, isDeleted, createdAt, updatedAt, __v, leadFrom, ...filteredRow } = row;
    return headers.map(header => filteredRow.hasOwnProperty(header) ? filteredRow[header] : '');
  });
  const handleDownloadXLSX = () => {
    // Create a new workbook
    const wb = XLSX.utils.book_new();
  
    // Convert the data to a worksheet
    const wsData = [headers, ...dataRows]; // Combine headers with data rows
    const ws = XLSX.utils.aoa_to_sheet(wsData);
  
    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  
    // Write the workbook to a file
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
  
    // Create a Blob from the workbook
    const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });
  
    // Create a download link
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "Service FeedBack.xlsx";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };
  
  
  // Helper function to convert a string to an array buffer
  function s2ab(s) {
   const buf = new ArrayBuffer(s.length);
   const view = new Uint8Array(buf);
   for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
   return buf;
  }
  

  // Custom toolbar with the download button

  const CustomToolbar = () => {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <IconButton
          color="primary"
          onClick={handleDownloadXLSX}
          sx={{
            marginLeft: "10px",
            backgroundColor: "white",
            fontSize: "14px",
            padding: "5px",
            minWidth: "auto",
            height: "25px",
            color: "#1d3a8a",
          }}
        >
          <DownloadIcon />
        </IconButton>
      </GridToolbarContainer>
    );
  };

  const inputStyle = {
    border: "1px solid #D3D3D3", // Change the color as needed
    borderRadius: "10px",
    padding: "5px",
    marginRight: "8px",
    height: "50px",
    // BorderColor:"grey"
  };
  return (
    <Box m="20px">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Header title="Book a Service" subtitle="feedback for the service" />
        <div style={{ display: "flex", alignItems: "center" }}>
          <Box
            sx={{
              marginBottom: "8px",
              width: "auto",
              height: "100px", // Adjust height to auto to accommodate content
              // border: 1,
              // borderColor: "black",
              borderRadius: "10px",
              // boxShadow:"2px",
              boxShadow: "1px 1px 3px rgba(0, 0, 0, 0.25)", // Add shadow here
              display: "flex",
              flexDirection: "row", // Change to column to stack children vertically
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px",
              overflow: "visible", // Ensure overflow is visible
            }}
          >
            <Typography
              variant="h5"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <FilterListIcon sx={{ marginRight: 1 }} />
              Filters
            </Typography>

            {/* Dropdown for selecting time range */}
            <Select
              value={selectedFilter}
              onChange={handleFilterChange}
              sx={{
                width: "150px",
                color: "black",
                mr: "8px",
                ml: "8px",
                borderRadius: "10px",
              }}
            >
              <MenuItem value="Between">Between</MenuItem>
              <MenuItem value="Today">Today</MenuItem>
              <MenuItem value="Yesterday">Yesterday</MenuItem>
              <MenuItem value="Current Month">Current Month</MenuItem>
              <MenuItem value="Last Month">Last Month</MenuItem>
              <MenuItem value="Last Week">Last Week</MenuItem>
              <MenuItem value="Last 3 Month">Last 3 Month</MenuItem>
              <MenuItem value="Last 6 Month">Last 6 Month</MenuItem>
              <MenuItem value="Last 12 Month">Last 12 Month</MenuItem>
              <MenuItem value="Previous Year">Previous Year</MenuItem>
            </Select>

            {/* Date range picker */}
            {selectedFilter === "Between" && (
              <div
                style={{
                  // borderTop: "1px solid #ccc",
                  display: "flex",
                  flexDirection: "row",
                  flexGrow: 1, // Allow this div to grow and take up available space
                  justifyContent: "flex-end", // Align items to the end (right)
                }}
              >
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) =>
                    handleStartDateChange(new Date(e.target.value))
                  }
                  placeholder="Select Start Date"
                  style={inputStyle}
                />
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) =>
                    handleEndDateChange(new Date(e.target.value))
                  }
                  placeholder="Select End Date"
                  min={startDate}
                  style={inputStyle}
                />
              </div>
            )}

            {/* <Button
              variant="contained"
              // color="primary"
              onClick={fetchData} // Attach fetchData here
            
              sx={{
                backgroundColor: colors.sabooAutoColors[600],
                borderRadius: "10px",
                height: "50px",
                mr: 2,
                color: "white",
                "&:hover": {
                  backgroundColor: "red",
                },
              }}
              // onClick={fetchData}
            >
              Submit
            </Button> */}
          </Box>
        </div>
      </div>

      <Box
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
            backgroundColor: "white",
          },

          "& .MuiDataGrid-columnHeader": {
            color: "white",
            backgroundColor: colors.sabooAutoColors[600], // Optional background color for headers
            height: "250px",
            fontSize: "12px", // Adjust the font size as needed
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            whiteSpace: "normal", // Allows text to wrap
            lineHeight: "normal", // Adjusts line height for better readability
          },

          "& .MuiCheckbox-root": {
            color: `${colors.sabooAutoColors[600]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text ": {
            color: `${colors.sabooAutoColors[600]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text:hover ": {
            color: `${colors.redAccent[1000]} !important`,
          },
          "& .MuiDataGrid-sortIcon": {
            color: "white",
          },

          "& .phone-column--cell": {
            color: colors.redAccent[1000],
          },
          "& .css-196n7va-MuiSvgIcon-root": {
            color: "white",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.sabooAutoColors[400],
            overflowX: "auto",
            "&::-webkit-scrollbar": {
              height: "7px",
              width: "7px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: `${colors.sabooAutoColors[700]} !important`,
              borderRadius: "100px",
              height: "5px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: colors.grey[100],
            },
          },
        }}
      >
        {loading ? (
          <div style={{ fontSize: "14px" }}>Processing, please wait...</div>
        ) : error ? (
          "Error ~ Something went wrong :)"
        ) : (
          <DataGrid
          rows={newData}
          columns={col.map((column) => ({
            ...column,
            minWidth: column.width || 200,
            renderCell: (params) => (
              <div
                style={{
                  whiteSpace: "pre-wrap",
                }}
              >
                {params.value}
              </div>
            ),
          }))}
          components={{ Toolbar: CustomToolbar }}
          getRowHeight={(params) => {
            // const lineHeight = 2; // Assuming each line has a height of 2 units
            const baseHeight = 50; // Base height for rows with a single line of text
            const maxLength = 200; // Maximum string length before increasing row height
            const extraHeightPerChar = 1.5; // Extra height added for each character beyond the maxLength
           
            if (params && params.model && params.model.feedback) {
               const stringLength = params.model.feedback.length +5;
               const extraHeight = stringLength > maxLength ? (stringLength - maxLength) + extraHeightPerChar : 0;
               const rowHeight =  extraHeight>150? 170: extraHeight;
              //  console.log("Row Height:", rowHeight, "String Length:", stringLength , "sting:" ,params.model.feedback );
               return rowHeight;
            }
            return baseHeight; // Default height for rows without feedback
           }}
           
          sx={{
            backgroundColor: "white",
            height: "100%",
            fontSize:15
          }}
        />
        )}
      </Box>
    </Box>
  );
};

export default Service;
