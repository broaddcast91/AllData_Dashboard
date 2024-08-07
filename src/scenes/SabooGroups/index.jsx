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

const ContactUs = () => {
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
        const token = localStorage.getItem("authToken");
        if (!token) {
          navigate("/login");
          return;
        }
        const res = await axios.get(
          "https://saboo-groups-backend.onrender.com/getcontactform",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      setCol([
        { field: "id", headerName: "ID", width: 50 },
        {
          field: "name",
          headerName: "Name",
          // flex: 0.75,
          width: 160,
        },
        {
          field: "email",
          headerName: "Email",
          // flex: 1,
          width: 220,
        },
        {
          field: "phone",
          headerName: "Phone Number",
          width: 150,
          cellClassName: "Mobile-column--cell",
        },

         {
            field: "company",
            headerName: "Company",
            // flex: 1,
          },
          {
            field: "subject",
            headerName: "Subject",
            // flex: 0.80,
          },
          {
            field: "message",
            headerName: "Message",
            width :420
            // flex: 1,
          },
        {
          field: "date",
          headerName: "Date",
          // flex: 0.5,
          width: 130,
        },

        {
          field: "time",
          headerName: "Time",
          // flex: 1.5,
          width: 100,
        },
      ]);
        setData(res.data.data);
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

  const handleReset = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      if (!token) {
        window.location.href = "/login";
        return;
      }
      const res = await axios.get(
        "https://saboo-groups-backend.onrender.com/getcontactform",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCol([
        { field: "id", headerName: "ID", width: 50 },
        {
          field: "name",
          headerName: "Name",
          // flex: 0.75,
          width: 160,
        },
        {
          field: "email",
          headerName: "Email",
          // flex: 1,
          width: 220,
        },
        {
          field: "phone",
          headerName: "Phone Number",
          width: 150,
          cellClassName: "Mobile-column--cell",
        },

         {
            field: "company",
            headerName: "Company",
            // flex: 1,
          },
          {
            field: "subject",
            headerName: "Subject",
            // flex: 0.80,
          },
          {
            field: "message",
            headerName: "Message",
            width :420
            // flex: 1,
          },
        {
          field: "date",
          headerName: "Date",
          // flex: 0.5,
          width: 130,
        },

        {
          field: "time",
          headerName: "Time",
          // flex: 1.5,
          width: 100,
        },
      ]);
      setData(res.data.data);
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
      const token = localStorage.getItem("authToken");
      if (!token) {
        navigate("/login");
        return;
      }
      const res = await axios.get(
        "https://saboo-groups-backend.onrender.com/dupesSabooGroupsContactUs",
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

          count: item.count,
          date: item.date, // Adding the date field
        });
      });

      setCol([
        { field: "id", headerName: "ID", flex: 0.5 },
        {
          field: "phoneNumber",
          headerName: "Phone Number",
          flex: 1,
          cellClassName: "Mobile-column--cell",
        },
        // { field: "model", headerName: "Model", flex: 1 },
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
      const token = localStorage.getItem("authToken");
      if (!token) {
        navigate("/login");
        return;
      }
      const res = await axios.get(
        `https://saboo-groups-backend.onrender.com/SabooGroupsUniqueEntries`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
        setCol([
        { field: "id", headerName: "ID", width: 50 },
        {
          field: "name",
          headerName: "Name",
          // flex: 0.75,
          width: 160,
        },
        {
          field: "email",
          headerName: "Email",
          // flex: 1,
          width: 220,
        },
        {
          field: "phone",
          headerName: "Phone Number",
          width: 150,
          cellClassName: "Mobile-column--cell",
        },

         {
            field: "company",
            headerName: "Company",
            // flex: 1,
          },
          {
            field: "subject",
            headerName: "Subject",
            // flex: 0.80,
          },
          {
            field: "message",
            headerName: "Message",
            width :420
            // flex: 1,
          },
        {
          field: "date",
          headerName: "Date",
          // flex: 0.5,
          width: 130,
        },

        {
          field: "time",
          headerName: "Time",
          // flex: 1.5,
          width: 100,
        },
      ]);
      setData(res.data.data);
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
      const token = localStorage.getItem("authToken");
      if (!token) {
        navigate("/login");
        return;
      }
      res = await axios.post(
        "https://saboo-groups-backend.onrender.com/SabooGroupsRange",
        {
          startDate: startDate,
          endDate: endDate,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
        setCol([
        { field: "id", headerName: "ID", width: 50 },
        {
          field: "name",
          headerName: "Name",
          // flex: 0.75,
          width: 160,
        },
        {
          field: "email",
          headerName: "Email",
          // flex: 1,
          width: 220,
        },
        {
          field: "phone",
          headerName: "Phone Number",
          width: 150,
          cellClassName: "Mobile-column--cell",
        },

         {
            field: "company",
            headerName: "Company",
            // flex: 1,
          },
          {
            field: "subject",
            headerName: "Subject",
            // flex: 0.80,
          },
          {
            field: "message",
            headerName: "Message",
            width :420
            // flex: 1,
          },
        {
          field: "date",
          headerName: "Date",
          // flex: 0.5,
          width: 130,
        },

        {
          field: "time",
          headerName: "Time",
          // flex: 1.5,
          width: 100,
        },
      ]);
      setData(res.data.data);
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
    const headers = col.map((column) => column.headerName);
    csvData.push(headers.join(","));

    newData.forEach((row) => {
      const rowData = col.map((column) => row[column.field]);
      csvData.push(rowData.join(","));
    });

    const csvContent = csvData.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "popup_data.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
      <IconButton onClick={handleDownloadCSV}>
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
      <Header title=" Contact us " subtitle="contacted data" />
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
              fontWeight: activeButton === "unique" ? "bold" : undefined,
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
              fontWeight: activeButton === "duplicates" ? "bold" : undefined,
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
              fontWeight: activeButton === "dateRange" ? "bold" : undefined,
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
          columns={col.map((column) => ({
            ...column,
            minWidth: column.width || 200,
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
          loading={loading}
          error={error}
          components={{ Toolbar: CustomToolbar }}
          getRowHeight={(params) => {
            const lineHeight = 1.8;
            const defaultRowHeight = 50;

            if (params && params.model && params.model.message) {
              const lines = params.model.message.split("\n");
              const lineCount = lines.length;

              // Calculate the row height based on the number of lines
              const rowHeight = defaultRowHeight + lineCount * lineHeight * 18;

              return rowHeight;
            }

            return defaultRowHeight;
          }}
          sx={{
            backgroundColor: "white", // Set the background color to white
            height: "100%",
            fontSize: 15,
            "& .MuiDataGrid-columnHeader": {
              color: "white",
              backgroundColor: colors.sabooAutoColors[600], // Optional background color for headers
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default ContactUs;
