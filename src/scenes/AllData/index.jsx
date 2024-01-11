import { Box, Button } from '@mui/material';
// import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { tokens } from '../../theme';

import LooksOneIcon from '@mui/icons-material/LooksOne';
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
import TextField from "@mui/material/TextField";
const AllData = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [col, setCol] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await axios.get(
          "https://arena-backend-zj42.onrender.com/allData"
        );

        const unifiedData = res.data.data.map((item) => ({
          ...item,
          Name: item.Last_Name || item.name,
          "Phone Number": item.Phone || item.Mobile || item.phone,
        }));

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
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  let newData = data.map((item, index) => {
    return { ...item, id: index + 1 };
  });

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };
  
  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };
  

  async function fetchUniqueValues(startDate, endDate) {
    try {
      setLoading(true);
      // const formattedStartDate = new Date(startDate);
      // formattedStartDate.setDate(formattedStartDate.getDate() + 1);
      // const formattedStartDateString = formattedStartDate
      //   .toISOString()
      //   .slice(0, 10);

      // const formattedEndDate = new Date(endDate);
      // formattedEndDate.setDate(formattedEndDate.getDate() + 1);
      // const formattedEndDateString = formattedEndDate
      //   .toISOString()
      //   .slice(0, 10);

      const res = await axios.post(
        'https://arena-backend-zj42.onrender.com/findDataInRangeInAllCollections',
        {
          startDate: startDate,
          endDate: endDate,
        }
      );
      const unifiedData = res.data.data.map((item) => ({
        ...item,
        Name: item.Last_Name || item.name,
        "Phone Number": item.Phone || item.Mobile || item.phone,
      }));

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
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (startDate && endDate) {
      fetchUniqueValues(startDate, endDate);
    }
  }, [startDate, endDate]);
  const handleReset = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        'https://arena-backend-zj42.onrender.com/allData'
      );
      const unifiedData = res.data.data.map((item) => ({
        ...item,
        Name: item.Last_Name || item.name,
        "Phone Number": item.Phone || item.Mobile || item.phone,
      }));

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
      setLoading(false);
      setStartDate(null)
      setEndDate(null)
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const handleDup = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        'https://arena-backend-zj42.onrender.com/findDuplicatesInAllCollections'
      );

      // Process the response data to create rows with phoneNumber, model, and count
      const processedData = [];
      let idCounter = 1;

      res.data.data.forEach((item) => {
        processedData.push({
          id: idCounter++,
          phoneNumber: item.number,
          model: item.vehicle || '',
          count: item.count,
          date: item.date, // Adding the date field
          leadFrom :item.leadFrom
        });
      });

      setCol([
        { field: 'id', headerName: 'ID', flex: 0.5 },
        { field: 'phoneNumber', headerName: 'Phone Number', flex: 1 , cellClassName: 'phone-column--cell', },
        { field: 'model', headerName: 'Model', flex: 1 },
        { field: 'leadFrom', headerName: 'leadFrom', flex: 1 },
        { field: 'count', headerName: 'Count', flex: 1 },
        { field: 'date', headerName: 'Date', flex: 1 }, // Adding the date column
      ]);

      setData(processedData);
      setLoading(false);
      setStartDate(null)
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };
  const uniqueEntries = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://arena-backend-zj42.onrender.com/findUniqueEntriesInAllCollections`
      );
      const unifiedData = res.data.data.map((item) => ({
        ...item,
        Name: item.Last_Name || item.name,
        "Phone Number": item.Phone || item.Mobile || item.phone,
      }));

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
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

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
    a.download = "All_Data(Arena).csv";
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
            color:"#3e4396"
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
     <Header title="Arena All Data" subtitle='data from all the forms'  />
        <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ marginRight: "10px" }}>
            <TextField
              id="start-date"
              label="Start Date"
              type="date"
              value={startDate}
              onChange={handleStartDateChange}
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ margin: "10px" }}
            />

            <TextField
              id="end-date"
              label="End Date"
              type="date"
              value={endDate}
              onChange={handleEndDateChange}
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ margin: "10px" }}
            />
          </div>

          <Button
            variant="contained"
            color="primary"
            sx={{ backgroundColor: colors.sabooAutoColors[600], mr: 2,color: "white",  '&:hover': {
              backgroundColor: "red",
            },
           }}
            onClick={handleDup}
          >
            Duplicates
          </Button>

       

          <Button
            variant="contained"
            color="primary"
            sx={{ mr: 2, backgroundColor: colors.sabooAutoColors[600] , color: "white", '&:hover': {
              backgroundColor: "red",
            }, }}
            onClick={uniqueEntries}
          >
            {" "}
            <LooksOneIcon />
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{ backgroundColor:colors.sabooAutoColors[600],color: "white",  '&:hover': {
              backgroundColor: "red",
            }, }}
            onClick={handleReset}
          >
            Reset
          </Button>
          {/* <Button
            variant='contained'
            color='primary'
            sx={{ ml: 2, backgroundColor: '#940004' }}
            onClick={handleRemoveDuplicates}
          >
            Unique
          </Button>
          <input
            type='date'
            required
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{
              marginLeft: '16px',
              backgroundColor: '#940004',
              color: 'white',
              borderRadius: '8px',
              border: 'none',
              padding: '8px',
            }}
          /> */}
        </div>
      </div>
      
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
            backgroundColor: "white",
            // border: "1px solid #ccc", // Add a border to the table
          },

          "& .MuiDataGrid-columnHeader": {
            color: "white",
            backgroundColor: colors.sabooAutoColors[600], // Optional background color for headers
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.sabooAutoColors[400],
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
          // "& .MuiDataGrid-cell": {
          //   //borderBottom: "none",
          //   backgroundColor: "white",
          //   borderBottom: "1px solid #ccc", // Add a border to table cells
          // },
          "& .phone-column--cell": {
            color: colors.redAccent[1000],
            // backgroundColor: "white",
          },
          "& .css-196n7va-MuiSvgIcon-root": {
            color: "white",
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
            }}
          />
        )}
      </Box>

    </Box>
  );
};

export default AllData;


