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
          waitTime: item.waitTime === true ? 'Yes' : item.waitTime === false ? 'No' : undefined,
          billExplanation: item.billExplanation === true ? 'Yes' : item.billExplanation === false ? 'No' : undefined,
          transparencyPrice: item.transparencyPrice === true ? 'Yes' : item.transparencyPrice === false ? 'No' : undefined,
          advisorTimeAndAttention: item.advisorTimeAndAttention === true ? 'Yes' : item.advisorTimeAndAttention === false ? 'No' : undefined,
         }));
        console.log(adjustedData)
        let column =   [
            { field: "id", headerName: "ID", flex: 0.5, width: 60, },
            {
              field: "name",
              headerName: "FirstName",
              flex: 1,
              width: 150,
              
            },
            {
                field: "phone",
                headerName: "Phone Number",
                width: 150,
                flex: 1,
              },
              {
                field: "location",
                headerName: "Location",
                flex: 1,
              },
              {
                field: "vehicleNumber",
                headerName: "vehicle number",
                flex: 1,
              //   cellClassName: "phone-column--cell",
              },
            {
              field: "overAllPerformance",
              headerName: "how would you rate overall performance of service center?",
              flex: 1,
            //   cellClassName: "phone-column--cell",
            },
            {
              field: "preferingSabooRKS",
              headerName: "how  would you prefer Saboo RKS  which you visited rather than other service centers?",
              flex: 1,
            //   cellClassName: "phone-column--cell",
            },
            {
              field: "waitTime",
              headerName: "Wait time before a service advisor attended you",
              flex: 1,
            //   cellClassName: "phone-column--cell",
            },
            {
                field: "advisorTimeAndAttention",
                headerName: "Time & attention provided by the Service advisor",
                flex: 1,
              //   cellClassName: "phone-column--cell",
              },
           
            {
                field: "advisorsUnderstandingWorkingRequirement",
                headerName: "Service advisors understanding of work required",
                flex: 1,
              //   cellClassName: "phone-column--cell",
              },
              {
                field: "advisorsListenAbility",
                headerName: "Service advisors ability to listen",
                flex: 1,
              //   cellClassName: "phone-column--cell",
              },
              {
                field: "advisorsBehavior",
                headerName: "Behavior of Service advisor",
                flex: 1,
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
                headerName: "advisor's recommendation regarding the work required upon inspection of your car",
                flex: 1,
              //   cellClassName: "phone-column--cell",
              },
              {
                field: "advancePerformingWork",
                headerName: "Explanation of work to be performed in advance",
                flex: 1,
              //   cellClassName: "phone-column--cell",
              },
              {
                field: "workPerformedOnTheCar",
                headerName: "Explanation about the work performed on the car",
                flex: 1,
              //   cellClassName: "phone-column--cell",
              },
              {
                field: "qualityOfWork",
                headerName: "Quality of work performed",
                flex: 1,
              //   cellClassName: "phone-column--cell",
              },
            
              {
                field: "postServiceWashingAndCleaning",
                headerName: "Washing & Cleanliness of the car post service",
                flex: 1,
              //   cellClassName: "phone-column--cell",
              },
              {
                field: "billExplanation",
                headerName: "Explanation of charges in bill",
                flex: 1,
              //   cellClassName: "phone-column--cell",
              },
              {
                field: "transparencyPrice",
                headerName: "Transparency in prices of services",
                flex: 1,
              //   cellClassName: "phone-column--cell",
              },
             
            {
              field: "recommendation",
              headerName: "On scale of from 0 to 10 How likely are you to recommend Saboo RKS Service ",
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


