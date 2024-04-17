import { Box,  } from '@mui/material';
// import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { tokens } from '../../theme';
import { useNavigate } from "react-router-dom";
// import LooksOneIcon from '@mui/icons-material/LooksOne';
import Header from '../../components/Header';
import { useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';

//import date range picker files
// import { DemoContainer } from '@mui/x-da ate-pickers-pro/DateRangePicker';

import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
// import TextField from "@mui/material/TextField";

const Service = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
  const navigate = useNavigate();
  const [col, setCol] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await axios.get(
          "https://saboo-nexa.onrender.com/getfeedback",
      
        );
        const adjustedData = res.data.data.map(item => ({
            ...item,
            issueWithCarPostServicing: item.issueWithCarPostServicing ? 'Yes' : 'No', // Adjust the boolean value to 'Yes' or 'No'
            explainationRegardingIssuesAndRepairs: item.explainationRegardingIssuesAndRepairs ? 'Yes' : 'No',
          }));
        console.log(res)
        let column =   [
            { field: "id", headerName: "ID", flex: 0.5, width: 60, },
            {
              field: "firstName",
              headerName: "FirstName",
              flex: 1,
              width: 150,
              
            },
            {
              field: "lastName",
              headerName: "LastName",
              flex: 1,
              width: 150,
            },
            {
              field: "issueWithCarPostServicing",
              headerName: "Did you face any issues with your car post-servicing?",
              flex: 1,
            //   cellClassName: "phone-column--cell",
            },
            {
              field: "rateTheQualityOfService",
              headerName: "How would you rate the quality of service",
              flex: 1,
            //   cellClassName: "phone-column--cell",
            },
            {
              field: "satisfiedWithTurnaroundTime",
              headerName: "How satisfied are you with the turnaround time for the service?",
              flex: 1,
            //   cellClassName: "phone-column--cell",
            },
            {
              field: "explainationRegardingIssuesAndRepairs",
              headerName: "Did the service personnel explain the issues and repairs needed clearly?",
              flex: 1,
            //   cellClassName: "phone-column--cell",
            },
            {
              field: "recommendation",
              headerName: "On scale of from 0 to 10 How likely are you to recommend Saboo RKS Service ",
              flex: 1,
            //   cellClassName: "phone-column--cell",
            },
            {
              field: "vehicleNumber",
              headerName: "vehicle number",
              flex: 1,
            //   cellClassName: "phone-column--cell",
            },
            // {
            //   field: "explainationRegardingIssuesAndRepairs",
            //   headerName: "Did the service personnel explain the issues and repairs needed clearly?",
            //   flex: 1,
            //   cellClassName: "phone-column--cell",
            // },
            {
              field: "phone",
              headerName: "Phone Number",
              width: 150,
              flex: 1,
            },
            {
              field: "leadFrom",
              headerName: "Lead From",
              flex: 1,
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
          ]
          console.log("Columns before setting state:", column);
          setCol(column);
    
          console.log("Data from API:", res.data.data);
          setData(adjustedData);
          setLoading(false);
      } catch (err) {
        setError(err);
        // window.alert(err)
        navigate("/login");
        setLoading(false);
      }
    }
    fetchData();
  }, [navigate]);

  let newData = data.map((item, index) => {
    return { ...item, id: index + 1 };
  });

//   const handleStartDateChange = (event) => {
//     setStartDate(event.target.value);
//   };
  
//   const handleEndDateChange = (event) => {
//     setEndDate(event.target.value);
//   };
  

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
            color:"#1d3a8a"
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
        <Header
          title="Book a Service"
          subtitle="feedback for the service"
        />
        <div style={{ display: "flex", alignItems: "center" }}>   
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
            height:"250px",
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


