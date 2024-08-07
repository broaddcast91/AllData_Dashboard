import {
  Box,
  Button,
  useTheme,
  Menu,
  MenuItem,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import DownloadIcon from "@mui/icons-material/Download";
import RefreshIcon from "@mui/icons-material/Refresh";
import LoadingComponent from '../Loading'; // Import the loading component
const AllData = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [col, setCol] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedView, setSelectedView] = useState(""); // New state for selected view
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeButton, setActiveButton] = useState(""); // State to track active button
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        const token = localStorage.getItem("authTokenNexa");
        if (!token) {
           navigate("/login");
          return;
        }
        const res = await axios.get(
          "https://nexa-backend-git-main-saboo-nexas-projects.vercel.app/allData",
          {
            headers: { Authorization: `Bearer ${token}` },
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
        setLoading(false);
        setSelectedView(""); // Set selected view
        setLoading(false);
        setStartDate("");
        setEndDate("");
      } catch (err) {
        setError(err);
        window.alert("token expired");
        navigate("/login");
        setLoading(false);
      }
    }
    fetchData();
  }, [navigate]);

  let newData = data.map((item, index) => {
    return { ...item, id: index + 1 };
  });

  // const handleStartDateChange = (event) => {
  //   setStartDate(event.target.value);
  // };

  // const handleEndDateChange = (event) => {
  //   setEndDate(event.target.value);
  // };

  // useEffect(() => {
  //   const fetchUniqueValues = async () => {
  //     try {
  //       setLoading(true);
  //       const token = localStorage.getItem("authToken");
  //       if (!token) {
  //         navigate("/login");
  //         return;
  //       }
        
        
  //       const res = await axios.post(
  //         "https://nexa-backend-git-main-saboo-nexas-projects.vercel.app/findDataInRangeInAllCollections",
  //         {
  //           startDate: startDate,
  //           endDate: endDate,
  //         },
  //         {
  //           headers: { Authorization: `Bearer ${token}` },
  //         }
  //       );
  //       const unifiedData = res.data.data.map((item) => {
  //         const { Last_Name, name, Phone, Mobile, phone, model, ...rest } = item;
  
  //         return {
  //           ...rest,
  //           Name: Last_Name || name,
  //           "Phone Number": Phone || Mobile || phone,
  //           model: model ? model.toUpperCase() : model,
  //         };
  //       });
  
  //       setCol([
  //         { field: "id", headerName: "ID", flex: 0.5 },
  //         {
  //           field: "Name",
  //           headerName: "Name",
  //           flex: 1,
  //           cellClassName: "name-column--cell",
  //         },
  //         {
  //           field: "Phone Number",
  //           headerName: "Phone Number",
  //           flex: 1,
  //           cellClassName: "phone-column--cell",
  //         },
  //         {
  //           field: "model",
  //           headerName: "Model",
  //           flex: 1,
  //           cellClassName: "phone-column--cell",
  //         },
         
  //         {
  //           field: "leadFrom",
  //           headerName: "Lead From",
  //           flex: 1,
  //         },
  //         {
  //           field: "date",
  //           headerName: "Date",
  //           flex: 1,
  //         },
  //         {
  //           field: "time",
  //           headerName: "Time",
  //           flex: 1,
  //         },
  //       ]);

       
  //       setData(unifiedData);
  //       setSelectedView(`${startDate} to ${endDate}`); 
  //       setLoading(false);
  //     } catch (err) {
  //       setError(err);
  //       window.alert(err);
  //       navigate("/login");
  //       setLoading(false);
  //     }
  //   };
  
  //   if (startDate && endDate) {
  //     fetchUniqueValues();
  //   }
  // }, [startDate, endDate, navigate]);

  const handleReset = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("authTokenNexa");
      if (!token) {
        navigate("/login");
        return;
      }
      const res = await axios.get(
        "https://nexa-backend-git-main-saboo-nexas-projects.vercel.app/allData",
        {
          headers: { Authorization: `Bearer ${token}` },
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
      setSelectedView(""); // Set selected view
      setStartDate("");
      setEndDate("");
      setLoading(false);
      handleClose(); // Close the menu after resetting
      setActiveButton(""); // Clear active button
    } catch (err) {
      setError(err);
      window.alert("token expired");
      navigate("/login");
      setLoading(false);
    }
  };

  const handleDup = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("authTokenNexa");
      if (!token) {
        navigate("/login");
        return;
      }
      const res = await axios.get(
        "https://nexa-backend-git-main-saboo-nexas-projects.vercel.app/findDuplicatesInAllCollections",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Process the response data to create rows with phoneNumber, model, and count
      const processedData = [];
      let idCounter = 1;

      res.data.data.forEach((item) => {
        processedData.push({
          id: idCounter++,
          phoneNumber: item.number,
          // model: item.vehicle || "",
          model: item.vehicle ? item.vehicle.toUpperCase() : "", // Convert model to uppercase
          count: item.count,
          date: item.date, // Adding the date field
          leadFrom: item.leadFrom,
        });
      });

      setCol([
        { field: "id", headerName: "ID", flex: 0.5 },
        {
          field: "phoneNumber",
          headerName: "Phone Number",
          flex: 1,
          cellClassName: "phone-column--cell",
        },
        { field: "model", headerName: "Model", flex: 1 },
        { field: "leadFrom", headerName: "leadFrom", flex: 1 },
        { field: "count", headerName: "Count", flex: 1 },
        { field: "date", headerName: "Date", flex: 1 }, // Adding the date column
      ]);

      setData(processedData);
      setSelectedView("Duplicates"); // Set selected view
      setLoading(false);
      setStartDate("");
      setEndDate("");
      handleClose(); // Close the menu after fetching duplicates
      setActiveButton("duplicates"); // Set active button
    } catch (err) {
      console.error(err);
      setError(err);
      window.alert("token expired");
      navigate("/login");
      setLoading(false);
    }
  };
  const uniqueEntries = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("authTokenNexa");
      if (!token) {
        navigate("/login");
        return;
      }
      const res = await axios.get(
        `https://nexa-backend-git-main-saboo-nexas-projects.vercel.app/findUniqueEntriesInAllCollections`,
        {
          headers: { Authorization: `Bearer ${token}` },
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
      setSelectedView("Unique"); // Set selected view
      setStartDate("");
      setEndDate("");
      setLoading(false);
      handleClose(); // Close the menu after fetching unique entries
      setActiveButton("unique"); // Set active button
    } catch (error) {
      setError(error);
      window.alert("token expired");
      navigate("/login");
      setLoading(false);
    }
  };

 
  const handleGetData = async () => {
    if (!startDate || !endDate) {
      window.alert("Please select both start and end dates");
      return;
    }
    let res;
    try {
      setLoading(true);
      const token = localStorage.getItem("authTokenNexa");
      if (!token) {
        navigate("/login");
        return;
      }
      res = await axios.post(
        "https://nexa-backend-git-main-saboo-nexas-projects.vercel.app/findDataInRangeInAllCollections",
        {
          startDate: startDate,
          endDate: endDate,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const unifiedData = res.data.data.map((item) => {
        const { Last_Name, name, Phone, Mobile, phone,number, model, ...rest } = item;

        return {
          ...rest,
          Name: Last_Name || name,
          "Phone Number": Phone || Mobile || phone|| number,
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
      setSelectedView(`${startDate} to ${endDate}`); // Set selected view
      setLoading(false);
      handleClose(); // Close the menu after getting data
      setActiveButton("dateRange"); // Set active button
    } catch (err) {
      setError(err);
      window.alert("token expired");
      navigate("/login");
      setLoading(false);
    }
  };


 const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleDownloadCSV = () => {
    const csvData = [];
    const headers = col.map((column) => `"${column.headerName}"`);
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
    a.download = "All_Data(Nexa).csv";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };


  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const CustomToolbar = () => (
    <GridToolbarContainer>
      <GridToolbarColumnsButton
        sx={{
          color: "black",
        }}
      />
      <GridToolbarFilterButton
        sx={{
          color: "black",
        }}
      />
      <GridToolbarDensitySelector
        sx={{
          color: "black",
        }}
      />
      <IconButton onClick ={handleDownloadCSV}>
        <DownloadIcon sx={{ color: "black" }} />
      </IconButton>

      <IconButton onClick={handleReset}>
        <RefreshIcon sx={{ color: "black" }} />
      </IconButton>
    </GridToolbarContainer>
  );

  const currentDate = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format
  
  return (
    <Box m="20px">
        {loading ? (
      <LoadingComponent /> // Render the loading component when loading is true
    ) : (
      <>
      <Header title="Nexa All Data" subtitle="data from all the forms" />
    
      <Box display="flex" justifyContent="space-between" mb="10px">
        <Box display="flex">
          {/* <Button
            variant="contained"
            color={activeButton === "unique" ? "error" : "primary"}
            onClick={uniqueEntries}
            style={{
              backgroundColor: activeButton === "unique" ? "red" : undefined,
              marginRight: "8px",
            }}
          >
            Unique Entries
          </Button>
          <Button
            variant="contained"
            color={activeButton === "duplicates" ? "error" : "primary"}
            onClick={handleDup}
            style={{
              backgroundColor:
                activeButton === "duplicates" ? "red" : undefined,
              marginRight: "8px",
            }}
          >
            Duplicate Entries
          </Button>
          <Button
            variant="contained"
            color={activeButton === "dateRange" ? "error" : "primary"}
            onClick={handleMenuClick}
            style={{
              backgroundColor: activeButton === "dateRange" ? "red" : undefined,
            }}
          >
            Date Range Entries
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem>
              <TextField
                label="Start Date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  max: currentDate,
                }}
              />
            </MenuItem>
            <MenuItem>
              <TextField
                label="End Date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  min: startDate || "",
                  max: currentDate,
                }}
              />
            </MenuItem>
            <MenuItem
              onClick={handleGetData}
              sx={{
                backgroundColor: "gray",
                color: "white",
                width: "80px",
                mx: "40px",
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: "red",
                },
              }}
            >
              Submit
            </MenuItem>
          </Menu> */}
          {selectedView && (
            <Typography
              variant="h5"
              p="10px"
              borderRadius="4px"
              // bgcolor={colors.blueAccent[700]}
              color={colors.grey[800]}
            >
              (Viewing {selectedView})
            </Typography>
          )}
        </Box>
        <Box display="flex" alignItems="center">
        <Button
            variant="contained"
            color={activeButton === "unique" ? "error" : "primary"}
            onClick={uniqueEntries}
            style={{
              backgroundColor: activeButton === "unique" ? "red" : undefined,
              marginRight: "8px",
              fontWeight:  activeButton === "unique" ?"bold": undefined,
            }}
          >
            Unique Entries
          </Button>
          <Button
            variant="contained"
            color={activeButton === "duplicates" ? "error" : "primary"}
            onClick={handleDup}
            style={{
              backgroundColor:
                activeButton === "duplicates" ? "red" : undefined,
              marginRight: "8px",
              fontWeight:  activeButton === "duplicates" ?"bold": undefined,
            }}
          >
            Duplicate Entries
          </Button>
          <Button
            variant="contained"
            color={activeButton === "dateRange" ? "error" : "primary"}
            onClick={handleMenuClick}
            style={{
              backgroundColor: activeButton === "dateRange" ? "red" : undefined,
              fontWeight:  activeButton === "dateRange" ?"bold": undefined,
            }}
          >
            Date Range Entries
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem>
              <TextField
                label="Start Date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  max: currentDate,
                }}
              />
            </MenuItem>
            <MenuItem>
              <TextField
                label="End Date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  min: startDate || "",
                  max: currentDate,
                }}
              />
            </MenuItem>
            <MenuItem
              onClick={handleGetData}
              sx={{
                backgroundColor: "gray",
                color: "white",
                width: "80px",
                mx: "40px",
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: "red",
                },
              }}
            >
              Submit
            </MenuItem>
          </Menu>
          {/* {selectedView && (
            <Typography
              variant="h5"
              p="10px"
              borderRadius="4px"
              // bgcolor={colors.blueAccent[700]}
              color={colors.grey[800]}
            >
              (Viewing {selectedView})
            </Typography>
          )} */}
        </Box>
      </Box>
      <Box height="75vh" mt="20px">
        <DataGrid
          rows={newData}
          columns={col}
          loading={loading}
          error={error}
          components={{
            Toolbar: CustomToolbar,
          }}
          // componentsProps={{
          //   columnHeaders: {
          //     style: {
          //       backgroundColor: "black",
          //       color: colors.grey[100],
          //       fontSize: "3rem",
          //       fontWeight: "bold",
          //     },
          //   },
          // }}
          sx={{
            backgroundColor: "white", // Set the background color to white
            fontSize: 15,
            "& .MuiDataGrid-columnHeader": {
              color: "white",
              backgroundColor: colors.sabooAutoColors[600], // Optional background color for headers
            },
          }}
        />
      </Box>
      </>
    )}
    </Box>
  );
};

export default AllData;
