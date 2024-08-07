import axios from "axios";

// Fetch data function
const fetchData = async () => {
  try {
    const response = await axios.get("https://saboo-groups-backend.onrender.com/getAllDataStaisticsPage");
    const data = response.data.Data;
    return {
      globalFormData: data.LeadsCount,
      monthYearCounts: data.monthlyCounts,
      barchart: data.barchart,
      recentleads: data.recentLeads,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// Call the async function to get the data
const rowFirstData = await fetchData();

export const rowFirst = rowFirstData.globalFormData;
export const mockTransactions = rowFirstData.recentleads;
export const mockBarData = rowFirstData.barchart;
export const mockLineData = [
  {
    id: 'Arena',
    color: 'hsl(224, 66%, 44%)',
    data: rowFirstData.monthYearCounts?.ArenaMonthlyData || [],
  },
  {
    id: 'Nexa',
    color: "hsl(0, 0%, 0%)",
    data: rowFirstData.monthYearCounts?.NexaMonthlyData || [],
  },
  {
    id: 'Autozone',
    color: 'hsl(42, 70%, 50%)',
    data: rowFirstData.monthYearCounts?.AutozoneMonthlyData || [],
  },
  {
    id: 'Commercial',
    color: 'hsl(345, 70%, 50%)',
    data: rowFirstData.monthYearCounts?.CommercialMonthlyData || [],
  },
];

export const compareBar = [
  {
    x: "Jul2024",
    y: 5303,
  },
  {
    x: "Aug2024",
    y: 5303,
  },
];
