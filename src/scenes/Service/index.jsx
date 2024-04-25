// import { DataGrid, GridToolbar } from '@mui/x-data-grid';
// import React, { useState } from "react";
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom";
import { Box, Button, Select, MenuItem, Typography } from "@mui/material";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
// import { colors } from "@mui/material"; // Assuming colors is imported from MUI
import FilterListIcon from "@mui/icons-material/FilterList";
//import date range picker files
// import { DemoContainer } from '@mui/x-da ate-pickers-pro/DateRangePicker';
// import { DateRangePicker } from '@mui/lab';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
import "react-datepicker/dist/react-datepicker.css";

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
import DatePicker from "react-datepicker";
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
  const [selectedFilter, setSelectedFilter] = useState("Yesterday");
  // State for start and end dates
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Handler for date range change
  // const handleDateRangeChange = (dates) => {
  //   const [start, end] = dates;
  //   setStartDate(start);
  //   setEndDate(end);
  // };

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };
  // const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
  //   <input
  //     ref={ref}
  //     onClick={onClick}
  //     value={value ? value.toLocaleDateString() : "Select Start Date"}
  //     placeholder="Select Start Date"
  //     style={{
  //       backgroundColor: "#f0f0f0", // Apply the background color here
  //       height:"40px",
  //       display: "flex",
  //       flexDirection: "row", // Change to column to stack children vertically
  //       justifyContent: "space-between",
  //       alignItems: "center",
  //       mr:"8px"
  //       // Add other styles as needed
  //     }}
  //   />
  // ));

  const CustomInput = React.forwardRef(
    ({ value, onClick, placeholder }, ref) => (
      <input
        ref={ref}
        value={value}
        placeholder={placeholder || "Select Date"} // Fallback to a default placeholder if none is provided
        onClick={onClick}
        style={{
          height: "40px",
          backgroundColor: "#f6f6f6",
          marginRight: "10px",
          padding: "10px",
          width: "150px",
        }}
      />
    )
  );

  let newData = data.map((item, index) => {
    return { ...item, id: index + 1 };
  });

  //   const handleStartDateChange = (event) => {
  //     setStartDate(event.target.value);
  //   };

  //   const handleEndDateChange = (event) => {
  //     setEndDate(event.target.value);
  //   };
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        "https://saboo-nexa.onrender.com/filtersfeedbacks",
        {
          filter: selectedFilter,
        }
      );
      const unifiedData = res.data.data.map((item) => {
        const { Last_Name, name, Phone, Mobile, phone, model, ...rest } = item;

        return {
          ...rest,
          Name: Last_Name || name,
          "Phone Number": Phone || Mobile || phone,
          model: model ? model.toUpperCase() : model,
        };
      });
      setCol([
        { field: "id", headerName: "ID", flex: 0.5 },
        {
          field: "Name",
          headerName: "Name",
          flex: 1,
          cellClassName: "name-column--cell",
        },
        {
          field: "Phone Number",
          headerName: "Phone Number",
          flex: 1,
          cellClassName: "phone-column--cell",
        },
        {
          field: "model",
          headerName: "Model",
          flex: 1,
          cellClassName: "phone-column--cell",
        },
        {
          field: "leadFrom",
          headerName: "Lead From",
          flex: 1,
        },
        {
          field: "date",
          headerName: "Date",
          flex: 1,
        },
        {
          field: "time",
          headerName: "Time",
          flex: 1,
        },
      ]);

      setData(unifiedData);
      setStartDate("");
      setEndDate("");
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
        const res = await axios.post(
          "https://saboo-nexa.onrender.com/filtersfeedbacks",
          {
            filter: selectedFilter,
            startDate: startDate,
            endDate: endDate,
          }
        );
        const unifiedData = res.data.data.map((item) => {
          const { Last_Name, name, Phone, Mobile, phone, model, ...rest } =
            item;

          return {
            ...rest,
            Name: Last_Name || name,
            "Phone Number": Phone || Mobile || phone,
            model: model ? model.toUpperCase() : model,
          };
        });
        setCol([
          { field: "id", headerName: "ID", flex: 0.5 },
          {
            field: "Name",
            headerName: "Name",
            flex: 1,
            cellClassName: "name-column--cell",
          },
          {
            field: "Phone Number",
            headerName: "Phone Number",
            flex: 1,
            cellClassName: "phone-column--cell",
          },
          {
            field: "model",
            headerName: "Model",
            flex: 1,
            cellClassName: "phone-column--cell",
          },
          {
            field: "leadFrom",
            headerName: "Lead From",
            flex: 1,
          },
          {
            field: "date",
            headerName: "Date",
            flex: 1,
          },
          {
            field: "time",
            headerName: "Time",
            flex: 1,
          },
        ]);

        setData(unifiedData);
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
      console.log(startDate, endDate);
      fetchUniqueValues();
    }
  }, [data, startDate, endDate, selectedFilter, navigate]); // Added data as a dependency
  const handleDownloadCSV = () => {
    const csvData = [];
    const headers = col.map((column) => column.headerName);
    csvData.push(headers);

    newData.forEach((item) => {
      const row = col.map((column) => item[column.field]);
      csvData.push(row);
    });

    const csvContent = csvData.map((row) => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "service-feedback.csv";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  // Custom toolbar with the download button

  const CustomToolbar = () => {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <IconButton
          color="primary"
          onClick={handleDownloadCSV}
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
                <DatePicker
                  selected={startDate}
                  onChange={(date) => {
                    // Adjust the date to the local timezone
                    let localDate = new Date(
                      date.getTime() - date.getTimezoneOffset() * 60000
                    );
                    console.log(
                      "Selected start date:",
                      localDate.toISOString().slice(0, 10)
                    );
                    // Use the adjusted date for setting the state
                    setStartDate(localDate.toISOString().slice(0, 10));
                  }}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  customInput={<CustomInput placeholder="Select Start Date" />}
                />
                <DatePicker
                  selected={endDate}
                  onChange={(date) => {
                    // Adjust the date to the local timezone
                    let localDate = new Date(
                      date.getTime() - date.getTimezoneOffset() * 60000
                    );
                    console.log(
                      "Selected end date:",
                      localDate.toISOString().slice(0, 10)
                    );
                    // Use the adjusted date for setting the state
                    setEndDate(localDate.toISOString().slice(0, 10));
                  }}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  customInput={<CustomInput placeholder="Select End Date" />}
                />
              </div>
            )}

            <Button
              variant="contained"
              // color="primary"
              onClick={fetchData} // Attach fetchData here
              // sx={{
              //   backgroundColor: "#1d3a8a",
              //   borderRadius:"10px",
              //   color: "white",
              //  height:"50px"
              // }}
              sx={{
                backgroundColor: colors.sabooAutoColors[600],
                borderRadius:"10px",
                height:"50px",
                mr: 2,
                color: "white",
                "&:hover": {
                  backgroundColor: "red",
                },
              }}
              // onClick={fetchData}
            >
              Submit
            </Button>
          </Box>
        </div>
      </div>

      <Box
        height="83vh"
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
          //   "& .MuiDataGrid-columnHeader": {
          //     height: "unset !important", // Removes the fixed height to allow for dynamic height based on content
          //   },
          //   "& .MuiDataGrid-columnHeaders": {
          //     maxHeight: "168px !important", // Adjusts the maximum height of the headers to accommodate wrapped text
          //   },

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
            columns={col
              .filter((column) => column) // Filter out undefined/null columns
              .map((column) => ({
                ...column,
                minWidth: column.width || 180,
                renderCell: (params) => (
                  <div
                    style={{
                      whiteSpace: "pre-wrap", // Enable word wrapping
                      overflow: "hidden", // Hide overflow content
                      textOverflow: "ellipsis", // Show ellipsis for overflow
                    }}
                  >
                    {params.value}
                  </div>
                ),
              }))}
            components={{ Toolbar: CustomToolbar }}
            sx={{
              backgroundColor: "white", // Set the background color to white
              fontSize: 15,
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default Service;
