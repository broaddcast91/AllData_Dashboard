import { tokens } from "../theme";
import axios from "axios";
const token = localStorage.getItem("authToken");



let globalFormData =  {
  "Nexa": 2486,
  "Arena": 6447,
  "Autozone": 4405,
  "Saboo Groups": 1118,
  AllData: 14456
}

let monthYearCounts =null;
let barchart = null;
let recentleads = null
// Create an async function to fetch data
const fetchData = async () => {
  try {
    const response = await axios.get(
      " https://nexa-backend-git-main-saboo-nexas-projects.vercel.app/nexaStatistics",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    // globalFormData = response.data.formData;
    monthYearCounts = response.data.monthYearCounts;
    barchart = response.data.barchart
    recentleads = response.data.recentData
    return globalFormData
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Rethrow the error to be handled by the calling code
  }
};

// Call the async function to get the data
const rowFirstData = await fetchData();
// const transformedData = Object.entries(globalFormData).map(([label, value]) => [label, value]);


// Calculate the total sum of all values
const total = globalFormData.AllData;

// Transform the data into the desired format, calculating the percentage of each value relative to the total
const transformedData = [
 ["Label", "Percentage (%)"]
].concat(Object.entries(globalFormData).filter(([label]) => label !== "AllData").map(([label, value]) => {
 // Calculate the percentage
 const percentage = (value / total) * 100;
 // Format the label to include the percentage
 const formattedLabel = `${label}`;
 return [formattedLabel, percentage];
}));

// Add the total data as the last entry
// transformedData.push(["AllData", total]);

console.log(typeof(transformedData))
export const pieData = transformedData
export const rowFirst = rowFirstData;

export const mockDataTeam = [
  {
    id: 1,
    name: "Jon Snow",
    email: "jonsnow@gmail.com",
    age: 35,
    phone: "(665)121-5454",
    access: "admin",
  },
  {
    id: 2,
    name: "Cersei Lannister",
    email: "cerseilannister@gmail.com",
    age: 42,
    phone: "(421)314-2288",
    access: "manager",
  },
  {
    id: 3,
    name: "Jaime Lannister",
    email: "jaimelannister@gmail.com",
    age: 45,
    phone: "(422)982-6739",
    access: "user",
  },
  {
    id: 4,
    name: "Anya Stark",
    email: "anyastark@gmail.com",
    age: 16,
    phone: "(921)425-6742",
    access: "admin",
  },
  {
    id: 5,
    name: "Daenerys Targaryen",
    email: "daenerystargaryen@gmail.com",
    age: 31,
    phone: "(421)445-1189",
    access: "user",
  },
  {
    id: 6,
    name: "Ever Melisandre",
    email: "evermelisandre@gmail.com",
    age: 150,
    phone: "(232)545-6483",
    access: "manager",
  },
  {
    id: 7,
    name: "Ferrara Clifford",
    email: "ferraraclifford@gmail.com",
    age: 44,
    phone: "(543)124-0123",
    access: "user",
  },
  {
    id: 8,
    name: "Rossini Frances",
    email: "rossinifrances@gmail.com",
    age: 36,
    phone: "(222)444-5555",
    access: "user",
  },
  {
    id: 9,
    name: "Harvey Roxie",
    email: "harveyroxie@gmail.com",
    age: 65,
    phone: "(444)555-6239",
    access: "admin",
  },
];

export const mockDataContacts = [
  {
    id: 1,
    name: "Jon Snow",
    email: "jonsnow@gmail.com",
    age: 35,
    phone: "(665)121-5454",
    address: "0912 Won Street, Alabama, SY 10001",
    city: "New York",
    zipCode: "10001",
    registrarId: 123512,
  },
  {
    id: 2,
    name: "Cersei Lannister",
    email: "cerseilannister@gmail.com",
    age: 42,
    phone: "(421)314-2288",
    address: "1234 Main Street, New York, NY 10001",
    city: "New York",
    zipCode: "13151",
    registrarId: 123512,
  },
  {
    id: 3,
    name: "Jaime Lannister",
    email: "jaimelannister@gmail.com",
    age: 45,
    phone: "(422)982-6739",
    address: "3333 Want Blvd, Estanza, NAY 42125",
    city: "New York",
    zipCode: "87281",
    registrarId: 4132513,
  },
  {
    id: 4,
    name: "Anya Stark",
    email: "anyastark@gmail.com",
    age: 16,
    phone: "(921)425-6742",
    address: "1514 Main Street, New York, NY 22298",
    city: "New York",
    zipCode: "15551",
    registrarId: 123512,
  },
  {
    id: 5,
    name: "Daenerys Targaryen",
    email: "daenerystargaryen@gmail.com",
    age: 31,
    phone: "(421)445-1189",
    address: "11122 Welping Ave, Tenting, CD 21321",
    city: "Tenting",
    zipCode: "14215",
    registrarId: 123512,
  },
  {
    id: 6,
    name: "Ever Melisandre",
    email: "evermelisandre@gmail.com",
    age: 150,
    phone: "(232)545-6483",
    address: "1234 Canvile Street, Esvazark, NY 10001",
    city: "Esvazark",
    zipCode: "10001",
    registrarId: 123512,
  },
  {
    id: 7,
    name: "Ferrara Clifford",
    email: "ferraraclifford@gmail.com",
    age: 44,
    phone: "(543)124-0123",
    address: "22215 Super Street, Everting, ZO 515234",
    city: "Evertin",
    zipCode: "51523",
    registrarId: 123512,
  },
  {
    id: 8,
    name: "Rossini Frances",
    email: "rossinifrances@gmail.com",
    age: 36,
    phone: "(222)444-5555",
    address: "4123 Ever Blvd, Wentington, AD 142213",
    city: "Esteras",
    zipCode: "44215",
    registrarId: 512315,
  },
  {
    id: 9,
    name: "Harvey Roxie",
    email: "harveyroxie@gmail.com",
    age: 65,
    phone: "(444)555-6239",
    address: "51234 Avery Street, Cantory, ND 212412",
    city: "Colunza",
    zipCode: "111234",
    registrarId: 928397,
  },
  {
    id: 10,
    name: "Enteri Redack",
    email: "enteriredack@gmail.com",
    age: 42,
    phone: "(222)444-5555",
    address: "4123 Easer Blvd, Wentington, AD 142213",
    city: "Esteras",
    zipCode: "44215",
    registrarId: 533215,
  },
  {
    id: 11,
    name: "Steve Goodman",
    email: "stevegoodmane@gmail.com",
    age: 11,
    phone: "(444)555-6239",
    address: "51234 Fiveton Street, CunFory, ND 212412",
    city: "Colunza",
    zipCode: "1234",
    registrarId: 92197,
  },
];

export const mockDataInvoices = [
  {
    id: 1,
    name: "Jon Snow",
    email: "jonsnow@gmail.com",
    cost: "21.24",
    phone: "(665)121-5454",
    date: "03/12/2022",
  },
  {
    id: 2,
    name: "Cersei Lannister",
    email: "cerseilannister@gmail.com",
    cost: "1.24",
    phone: "(421)314-2288",
    date: "06/15/2021",
  },
  {
    id: 3,
    name: "Jaime Lannister",
    email: "jaimelannister@gmail.com",
    cost: "11.24",
    phone: "(422)982-6739",
    date: "05/02/2022",
  },
  {
    id: 4,
    name: "Anya Stark",
    email: "anyastark@gmail.com",
    cost: "80.55",
    phone: "(921)425-6742",
    date: "03/21/2022",
  },
  {
    id: 5,
    name: "Daenerys Targaryen",
    email: "daenerystargaryen@gmail.com",
    cost: "1.24",
    phone: "(421)445-1189",
    date: "01/12/2021",
  },
  {
    id: 6,
    name: "Ever Melisandre",
    email: "evermelisandre@gmail.com",
    cost: "63.12",
    phone: "(232)545-6483",
    date: "11/02/2022",
  },
  {
    id: 7,
    name: "Ferrara Clifford",
    email: "ferraraclifford@gmail.com",
    cost: "52.42",
    phone: "(543)124-0123",
    date: "02/11/2022",
  },
  {
    id: 8,
    name: "Rossini Frances",
    email: "rossinifrances@gmail.com",
    cost: "21.24",
    phone: "(222)444-5555",
    date: "05/02/2021",
  },
];

export const mockTransactions = recentleads


export const mockBarData = 
[
  {
      "Month": "Jun2024",
      "Arena": 156,
      "Nexa": 372,
      "Autozone": 121,
      "saboo groups": 104,
      // "Finance": 10,
    // "Showroom": 4,
      // "Driving School": 5,
      // "Isurance": 2,
      // "Test Drive": 1,
      // "Accessories": 1,
      "ArenaColor": "hsl(60, 100%, 50%)",
      "Nexacolor": "hsl(330, 100%, 50%)",
      "AutozoneColor": "hsl(0, 0%, 100%)",
      "saboo groupscolor": "hsl(45, 100%, 50%)",
      // "FinanceColor": "hsl(300, 100%, 50%)",
      // "ShowroomColor": "hsl(300, 100%, 50%)",
      // "Driving SchoolColor": "hsl(0, 100%, 50%)",
      // "IsuranceColor": "hsl(0, 0%, 0%)",
      // "Test DriveColor": "hsl(120, 100%, 50%)",
      // "AccessoriesColor": "hsl(120, 100%, 50%)"
  },
  {
      "Month": "May2024",
      "Nexa": 759,
      "Arena": 326,
      // "Finance": 40,
      "saboo groups": 214,
      // "Test Drive": 2,
      // "Showroom": 5,
      // "Accessories": 5,
      "Autozone": 322,
      // "Driving School": 26,
      // "24/7 Service": 2,
      // "Isurance": 3,
      // "Corporate": 1,
      "NexaColor": "hsl(330, 100%, 50%)",
      "ArenaColor": "hsl(60, 100%, 50%)",
      // "FinanceColor": "hsl(300, 100%, 50%)",
      "saboo groupscolor": "hsl(45, 100%, 50%)",
      // "Test DriveColor": "hsl(120, 100%, 50%)",
      // "ShowroomColor": "hsl(300, 100%, 50%)",
      // "AccessoriesColor": "hsl(120, 100%, 50%)",
      "AutozoneColor": "hsl(0, 0%, 100%)",
      // "Driving SchoolColor": "hsl(0, 100%, 50%)",
      // "24/7 ServiceColor": "hsl(0, 0%, 50%)",
      // "IsuranceColor": "hsl(0, 0%, 0%)",
      // "CorporateColor": "hsl(240, 100%, 50%)"
  },
  {
      "Month": "Apr2024",
      "Nexa": 646,
      // "Showroom": 9,
      // "Finance": 40,
      "Arena": 351,
      // "24/7 Service": 2,
      // "Driving School": 15,
      // "Test Drive": 1,
      "Autozone":247,
      // "Accessories": 5,
      "saboo groups": 312,
      // "Isurance": 2,
      // "Subscribe": 3,
      "NexaColor": "hsl(330, 100%, 50%)",
      // "ShowroomColor": "hsl(300, 100%, 50%)",
      // "FinanceColor": "hsl(300, 100%, 50%)",
      "ArenaColor": "hsl(60, 100%, 50%)",
      // "24/7 ServiceColor": "hsl(0, 0%, 50%)",
      // "Driving SchoolColor": "hsl(0, 100%, 50%)",
      // "Test DriveColor": "hsl(120, 100%, 50%)",
      "AutozoneColor": "hsl(0, 0%, 100%)",
      // "AccessoriesColor": "hsl(120, 100%, 50%)",
      "saboo groupscolor": "hsl(45, 100%, 50%)",
      // "IsuranceColor": "hsl(0, 0%, 0%)",
      // "SubscribeColor": "hsl(0, 0%, 0%)"
  },
  // {
  //     "Month": "Mar2024",
  //     "Finance": 222,
  //     "PopUp": 1943,
  //     "On Road Price": 647,
  //     "Service": 31,
  //     "Driving School": 24,
  //     "Showroom": 10,
  //     "Isurance": 2,
  //     "24/7 Service": 1,
  //     "popup": 25,
  //     "Contact Us": 1,
  //     "Accessories": 8,
  //     "FinanceColor": "hsl(300, 100%, 50%)",
  //     "PopUpColor": "hsl(330, 100%, 50%)",
  //     "On Road PriceColor": "hsl(60, 100%, 50%)",
  //     "ServiceColor": "hsl(45, 100%, 50%)",
  //     "Driving SchoolColor": "hsl(0, 100%, 50%)",
  //     "ShowroomColor": "hsl(300, 100%, 50%)",
  //     "IsuranceColor": "hsl(0, 0%, 0%)",
  //     "24/7 ServiceColor": "hsl(0, 0%, 50%)",
  //     "popupColor": "hsl(0, 0%, 0%)",
  //     "Contact UsColor": "hsl(0, 0%, 100%)",
  //     "AccessoriesColor": "hsl(120, 100%, 50%)"
  // },
  // {
  //     "Month": "Feb2024",
  //     "On Road Price": 305,
  //     "PopUp": 1365,
  //     "Service": 31,
  //     "Finance": 53,
  //     "Accessories": 19,
  //     "Driving School": 9,
  //     "24/7 Service": 18,
  //     "Contact Us": 11,
  //     "Isurance": 8,
  //     "Showroom": 28,
  //     "Corporate": 3,
  //     "Test Drive": 9,
  //     "On Road PriceColor": "hsl(60, 100%, 50%)",
  //     "PopUpColor": "hsl(330, 100%, 50%)",
  //     "ServiceColor": "hsl(45, 100%, 50%)",
  //     "FinanceColor": "hsl(300, 100%, 50%)",
  //     "AccessoriesColor": "hsl(120, 100%, 50%)",
  //     "Driving SchoolColor": "hsl(0, 100%, 50%)",
  //     "24/7 ServiceColor": "hsl(0, 0%, 50%)",
  //     "Contact UsColor": "hsl(0, 0%, 100%)",
  //     "IsuranceColor": "hsl(0, 0%, 0%)",
  //     "ShowroomColor": "hsl(300, 100%, 50%)",
  //     "CorporateColor": "hsl(240, 100%, 50%)",
  //     "Test DriveColor": "hsl(120, 100%, 50%)"
  // },
  // {
  //     "Month": "Jan2024",
  //     "PopUp": 1362,
  //     "Finance": 40,
  //     "On Road Price": 201,
  //     "Service": 16,
  //     "Test Drive": 4,
  //     "Accessories": 12,
  //     "offers": 3,
  //     "Showroom": 11,
  //     "Contact Us": 6,
  //     "Isurance": 3,
  //     "Corporate": 16,
  //     "Driving School": 13,
  //     "PopUpColor": "hsl(330, 100%, 50%)",
  //     "FinanceColor": "hsl(300, 100%, 50%)",
  //     "On Road PriceColor": "hsl(60, 100%, 50%)",
  //     "ServiceColor": "hsl(45, 100%, 50%)",
  //     "Test DriveColor": "hsl(120, 100%, 50%)",
  //     "AccessoriesColor": "hsl(120, 100%, 50%)",
  //     "offersColor": "hsl(180, 100%, 50%)",
  //     "ShowroomColor": "hsl(300, 100%, 50%)",
  //     "Contact UsColor": "hsl(0, 0%, 100%)",
  //     "IsuranceColor": "hsl(0, 0%, 0%)",
  //     "CorporateColor": "hsl(240, 100%, 50%)",
  //     "Driving SchoolColor": "hsl(0, 100%, 50%)"
  // }
]
//  [
//   {
//     Month: "Jan",
//     "Grand Vitara": 17,
//     "hot dogColor": "",
//     Fronx: 36,
//     FronxColor: "#000000",
//     Ciaz: 12,
//     CiazColor: "#ff0000",
//     Ignis: 14,
//     IgnisColor: "#0000ff",
//     Baleno :25,
//     BalenoColor: "#ff0000",
//     Invicto :2,
//     InvictoColor : "#000000",
//     Jimny :10,
//     JimnyColor :"#ff0000",
//     Xl6 : 5,
//     Xl6Color :  "#fff000"
//   },
//   {
//     Month: "Jan",
//     "Grand Vitara": 17,
//     "hot dogColor": "",
//     Fronx: 36,
//     FronxColor: "#000000",
//     Ciaz: 12,
//     CiazColor: "#ff0000",
//     Ignis: 14,
//     IgnisColor: "#0000ff",
//     Baleno :25,
//     BalenoColor: "#ff0000",
//     Invicto :2,
//     InvictoColor : "#000000",
//     Jimny :10,
//     JimnyColor :"#ff0000",
//     Xl6 : 5,
//     Xl6Color :  "#fff000"
//   },
//   {
//     Month: "Mar",
//     "Grand Vitara": 40,
//     "hot dogColor": "hsl(129, 70%, 50%)",
//     Fronx: 6,
//     FronxColor: "hsl(296, 70%, 50%)",
//     Ciaz: 10,
//     CiazColor: "hsl(97, 70%, 50%)",
//     Ignis: 4,
//     IgnisColor: "hsl(340, 70%, 50%)",
//     Baleno :5,
//     BalenoColor: "hsl(320, 70%, 50%)",
//     Invicto :2,
//     InvictoColor :"hsl(140, 40%, 50%)",
//     Jimny :2,
//     JimnyColor :"hsl(980, 32%, 50%)",
//     Xl6 : 9,
//     Xl6Color :  "hsl(270, 10%, 50%)",
//   },
//   // {
//   //   Month: "Apr",
//   //   "Grand Vitara": 17,
//   //   "hot dogColor": "hsl(129, 70%, 50%)",
//   //   Fronx: 16,
//   //   FronxColor: "hsl(296, 70%, 50%)",
//   //   Ciaz: 22,
//   //   CiazColor: "hsl(97, 70%, 50%)",
//   //   Ignis: 14,
//   //   IgnisColor: "hsl(340, 70%, 50%)",
//   //   Baleno :25,
//   //   BalenoColor: "hsl(320, 70%, 50%)",
//   //   Invicto :2,
//   //   InvictoColor :"hsl(140, 40%, 50%)",
//   //   Jimny :10,
//   //   JimnyColor :"hsl(980, 32%, 50%)",
//   //   Xl6 : 5,
//   //   Xl6Color :  "hsl(270, 10%, 50%)",
//   // },
//   // {
//   //   Month: "May",
//   //   "Grand Vitara": 17,
//   //   "hot dogColor": "hsl(129, 70%, 50%)",
//   //   Fronx: 6,
//   //   FronxColor: "hsl(296, 70%, 50%)",
//   //   Ciaz: 12,
//   //   CiazColor: "hsl(97, 70%, 50%)",
//   //   Ignis: 14,
//   //   IgnisColor: "hsl(340, 70%, 50%)",
//   //   Baleno :5,
//   //   BalenoColor: "hsl(320, 70%, 50%)",
//   //   Invicto :20,
//   //   InvictoColor :"hsl(140, 40%, 50%)",
//   //   Jimny :10,
//   //   JimnyColor :"hsl(980, 32%, 50%)",
//   //   Xl6 : 5,
//   //   Xl6Color :  "hsl(270, 10%, 50%)",
//   // },
//   // {
//   //   Month: "Jun",
//   //   "Grand Vitara": 17,
//   //   "hot dogColor": "hsl(129, 70%, 50%)",
//   //   Fronx: 16,
//   //   FronxColor: "hsl(296, 70%, 50%)",
//   //   Ciaz: 12,
//   //   CiazColor: "hsl(97, 70%, 50%)",
//   //   Ignis: 14,
//   //   IgnisColor: "hsl(340, 70%, 50%)",
//   //   Baleno :25,
//   //   BalenoColor: "hsl(320, 70%, 50%)",
//   //   Invicto :2,
//   //   InvictoColor :"hsl(140, 40%, 50%)",
//   //   Jimny :10,
//   //   JimnyColor :"hsl(980, 32%, 50%)",
//   //   Xl6 : 25,
//   //   Xl6Color :  "hsl(270, 10%, 50%)",
//   // },
//   // {
//   //   Month: "Jul",
//   //   "Grand Vitara": 12,
//   //   "hot dogColor": "hsl(129, 70%, 50%)",
//   //   Fronx: 16,
//   //   FronxColor: "hsl(296, 70%, 50%)",
//   //   Ciaz: 12,
//   //   CiazColor: "hsl(97, 70%, 50%)",
//   //   Ignis: 14,
//   //   IgnisColor: "hsl(340, 70%, 50%)",
//   //   Baleno :15,
//   //   BalenoColor: "hsl(320, 70%, 50%)",
//   //   Invicto :2,
//   //   InvictoColor :"hsl(140, 40%, 50%)",
//   //   Jimny :10,
//   //   JimnyColor :"hsl(980, 32%, 50%)",
//   //   Xl6 : 11,
//   //   Xl6Color :  "hsl(270, 10%, 50%)",
//   // },
//   // {
//   //   Month: "Aug",
//   //   "Grand Vitara": 14,
//   //   "hot dogColor": "hsl(129, 70%, 50%)",
//   //   Fronx: 16,
//   //   FronxColor: "hsl(296, 70%, 50%)",
//   //   Ciaz: 12,
//   //   CiazColor: "hsl(97, 70%, 50%)",
//   //   Ignis: 14,
//   //   IgnisColor: "hsl(340, 70%, 50%)",
//   //   Baleno :20,
//   //   BalenoColor: "hsl(320, 70%, 50%)",
//   //   Invicto :6,
//   //   InvictoColor :"hsl(140, 40%, 50%)",
//   //   Jimny :10,
//   //   JimnyColor :"hsl(980, 32%, 50%)",
//   //   Xl6 : 10,
//   //   Xl6Color :  "hsl(270, 10%, 50%)",
//   // },
//   // {
//   //   Month: "Sep",
//   //   "Grand Vitara": 17,
//   //   "hot dogColor": "hsl(129, 70%, 50%)",
//   //   Fronx: 16,
//   //   FronxColor: "hsl(296, 70%, 50%)",
//   //   Ciaz: 12,
//   //   CiazColor: "hsl(97, 70%, 50%)",
//   //   Ignis: 14,
//   //   IgnisColor: "hsl(340, 70%, 50%)",
//   //   Baleno :25,
//   //   BalenoColor: "hsl(320, 70%, 50%)",
//   //   Invicto :2,
//   //   InvictoColor :"hsl(140, 40%, 50%)",
//   //   Jimny :10,
//   //   JimnyColor :"hsl(980, 32%, 50%)",
//   //   Xl6 : 5,
//   //   Xl6Color :  "hsl(270, 10%, 50%)",
//   // },
//   // {
//   //   Month: "Oct",
//   //   "Grand Vitara": 17,
//   //   "hot dogColor": "hsl(129, 70%, 50%)",
//   //   Fronx: 16,
//   //   FronxColor: "hsl(296, 70%, 50%)",
//   //   Ciaz: 12,
//   //   CiazColor: "hsl(97, 70%, 50%)",
//   //   Ignis: 14,
//   //   IgnisColor: "hsl(340, 70%, 50%)",
//   //   Baleno :25,
//   //   BalenoColor: "hsl(320, 70%, 50%)",
//   //   Invicto :2,
//   //   InvictoColor :"hsl(140, 40%, 50%)",
//   //   Jimny :10,
//   //   JimnyColor :"hsl(980, 32%, 50%)",
//   //   Xl6 : 5,
//   //   Xl6Color :  "hsl(270, 10%, 50%)",
//   // },
//   // {
//   //   Month: "Nov",
//   //   "Grand Vitara": 17,
//   //   "hot dogColor": "hsl(129, 70%, 50%)",
//   //   Fronx: 16,
//   //   FronxColor: "hsl(296, 70%, 50%)",
//   //   Ciaz: 12,
//   //   CiazColor: "hsl(97, 70%, 50%)",
//   //   Ignis: 14,
//   //   IgnisColor: "hsl(340, 70%, 50%)",
//   //   Baleno :25,
//   //   BalenoColor: "hsl(320, 70%, 50%)",
//   //   Invicto :2,
//   //   InvictoColor :"hsl(140, 40%, 50%)",
//   //   Jimny :10,
//   //   JimnyColor :"hsl(980, 32%, 50%)",
//   //   Xl6 : 5,
//   //   Xl6Color :  "hsl(270, 10%, 50%)",
//   // },
// ];

export const mockPieData = [
  {
    id: "hack",
    label: "hack",
    value: 239,
    color: "hsl(104, 70%, 50%)",
  },
  {
    id: "make",
    label: "make",
    value: 170,
    color: "hsl(162, 70%, 50%)",
  },
  {
    id: "go",
    label: "go",
    value: 322,
    color: "hsl(291, 70%, 50%)",
  },
  {
    id: "lisp",
    label: "lisp",
    value: 503,
    color: "hsl(229, 70%, 50%)",
  },
  {
    id: "scala",
    label: "scala",
    value: 584,
    color: "hsl(344, 70%, 50%)",
  },
];

// export const mockLineData = [
  
//   {
//     id: "data",
//     color: tokens("light").redAccent[500],
//     data: monthYearCounts
//     // [
//     //   {
//     //     "x": "Jan",
//     //     "y": 191,
//     //   },
//     //   {
//     //     "x": "Feb",
//     //     "y": 136,
//     //   },
//     //   // {
//     //   //   x: "Mar",
//     //   //   y: 91,
//     //   // },
//     //   // {
//     //   //   x: "Apr",
//     //   //   y: 190,
//     //   // },
//     //   // {
//     //   //   x: "May",
//     //   //   y: 211,
//     //   // },
//     //   // {
//     //   //   x: "Jun",
//     //   //   y: 152,
//     //   // },
//     //   // {
//     //   //   x: "jul",
//     //   //   y: 189,
//     //   // },
//     //   // {
//     //   //   x: "Agu",
//     //   //   y: 152,
//     //   // },
//     //   // {
//     //   //   x: "Sep",
//     //   //   y: 8,
//     //   // },
//     //   // {
//     //   //   x: "Oct",
//     //   //   y: 197,
//     //   // },
//     //   // {
//     //   //   x: "Nov",
//     //   //   y: 107,
//     //   // },
//     //   // {
//     //   //   x: "Dec",
//     //   //   y: 170,
//     //   // },
//     // ],
//   },
// ];


export const mockLineData = [
  {
    id: 'Arena',
    color: 'hsl(211, 70%, 50%)',
    data: [
      { x: 'A', y: 277 },
      { x: 'February', y: 307 },
      { x: 'March', y: 220 },
      { x: 'April', y: 270 },
      { x: 'May', y: 200 },
      { x: 'June', y: 300 },
      { x: 'July', y: 250 },
      { x: 'August', y: 210 },
      { x: 'September', y: 280 },
      { x: 'October', y: 290 },
      { x: 'November', y: 240 },
      { x: 'December', y: 310 },
    ],
  },
  {
    id: 'Nexa',
    color: 'hsl(133, 70%, 50%)',
    data: [
      { x: 'A', y: 218 },
      { x: 'February', y: 212 },
      { x: 'March', y: 180 },
      { x: 'April', y: 250 },
      { x: 'May', y: 220 },
      { x: 'June', y: 290 },
      { x: 'July', y: 260 },
      { x: 'August', y: 230 },
      { x: 'September', y: 240 },
      { x: 'October', y: 280 },
      { x: 'November', y: 200 },
      { x: 'December', y: 270 },
    ],
  },
  {
    id: 'Autozone',
    color: 'hsl(42, 70%, 50%)',
    data: [
      { x: 'A', y: 190 },
      { x: 'February', y: 210 },
      { x: 'March', y: 220 },
      { x: 'April', y: 230 },
      { x: 'May', y: 210 },
      { x: 'June', y: 250 },
      { x: 'July', y: 270 },
      { x: 'August', y: 260 },
      { x: 'September', y: 220 },
      { x: 'October', y: 240 },
      { x: 'November', y: 230 },
      { x: 'December', y: 250 },
    ],
  },
  {
    id: 'Saboo groups',
    color: 'hsl(345, 70%, 50%)',
    data: [
      { x: 'A', y: 230 },
      { x: 'February', y: 220 },
      { x: 'March', y: 210 },
      { x: 'April', y: 260 },
      { x: 'May', y: 230 },
      { x: 'June', y: 240 },
      { x: 'July', y: 220 },
      { x: 'August', y: 210 },
      { x: 'September', y: 70 },
      { x: 'October', y: 260 },
      { x: 'November', y: 250 },
      { x: 'December', y: 280 },
    ],
  },
];


export const mockGeographyData = [
  {
    id: "AFG",
    value: 520600,
  },
  {
    id: "AGO",
    value: 949905,
  },
  {
    id: "ALB",
    value: 329910,
  },
  {
    id: "ARE",
    value: 675484,
  },
  {
    id: "ARG",
    value: 432239,
  },
  {
    id: "ARM",
    value: 288305,
  },
  {
    id: "ATA",
    value: 415648,
  },
  {
    id: "ATF",
    value: 665159,
  },
  {
    id: "AUT",
    value: 798526,
  },
  {
    id: "AZE",
    value: 481678,
  },
  {
    id: "BDI",
    value: 496457,
  },
  {
    id: "BEL",
    value: 252276,
  },
  {
    id: "BEN",
    value: 440315,
  },
  {
    id: "BFA",
    value: 343752,
  },
  {
    id: "BGD",
    value: 920203,
  },
  {
    id: "BGR",
    value: 261196,
  },
  {
    id: "BHS",
    value: 421551,
  },
  {
    id: "BIH",
    value: 974745,
  },
  {
    id: "BLR",
    value: 349288,
  },
  {
    id: "BLZ",
    value: 305983,
  },
  {
    id: "BOL",
    value: 430840,
  },
  {
    id: "BRN",
    value: 345666,
  },
  {
    id: "BTN",
    value: 649678,
  },
  {
    id: "BWA",
    value: 319392,
  },
  {
    id: "CAF",
    value: 722549,
  },
  {
    id: "CAN",
    value: 332843,
  },
  {
    id: "CHE",
    value: 122159,
  },
  {
    id: "CHL",
    value: 811736,
  },
  {
    id: "CHN",
    value: 593604,
  },
  {
    id: "CIV",
    value: 143219,
  },
  {
    id: "CMR",
    value: 630627,
  },
  {
    id: "COG",
    value: 498556,
  },
  {
    id: "COL",
    value: 660527,
  },
  {
    id: "CRI",
    value: 60262,
  },
  {
    id: "CUB",
    value: 177870,
  },
  {
    id: "-99",
    value: 463208,
  },
  {
    id: "CYP",
    value: 945909,
  },
  {
    id: "CZE",
    value: 500109,
  },
  {
    id: "DEU",
    value: 63345,
  },
  {
    id: "DJI",
    value: 634523,
  },
  {
    id: "DNK",
    value: 731068,
  },
  {
    id: "DOM",
    value: 262538,
  },
  {
    id: "DZA",
    value: 760695,
  },
  {
    id: "ECU",
    value: 301263,
  },
  {
    id: "EGY",
    value: 148475,
  },
  {
    id: "ERI",
    value: 939504,
  },
  {
    id: "ESP",
    value: 706050,
  },
  {
    id: "EST",
    value: 977015,
  },
  {
    id: "ETH",
    value: 461734,
  },
  {
    id: "FIN",
    value: 22800,
  },
  {
    id: "FJI",
    value: 18985,
  },
  {
    id: "FLK",
    value: 64986,
  },
  {
    id: "FRA",
    value: 447457,
  },
  {
    id: "GAB",
    value: 669675,
  },
  {
    id: "GBR",
    value: 757120,
  },
  {
    id: "GEO",
    value: 158702,
  },
  {
    id: "GHA",
    value: 893180,
  },
  {
    id: "GIN",
    value: 877288,
  },
  {
    id: "GMB",
    value: 724530,
  },
  {
    id: "GNB",
    value: 387753,
  },
  {
    id: "GNQ",
    value: 706118,
  },
  {
    id: "GRC",
    value: 377796,
  },
  {
    id: "GTM",
    value: 66890,
  },
  {
    id: "GUY",
    value: 719300,
  },
  {
    id: "HND",
    value: 739590,
  },
  {
    id: "HRV",
    value: 929467,
  },
  {
    id: "HTI",
    value: 538961,
  },
  {
    id: "HUN",
    value: 146095,
  },
  {
    id: "IDN",
    value: 490681,
  },
  {
    id: "IND",
    value: 549818,
  },
  {
    id: "IRL",
    value: 630163,
  },
  {
    id: "IRN",
    value: 596921,
  },
  {
    id: "IRQ",
    value: 767023,
  },
  {
    id: "ISL",
    value: 478682,
  },
  {
    id: "ISR",
    value: 963688,
  },
  {
    id: "ITA",
    value: 393089,
  },
  {
    id: "JAM",
    value: 83173,
  },
  {
    id: "JOR",
    value: 52005,
  },
  {
    id: "JPN",
    value: 199174,
  },
  {
    id: "KAZ",
    value: 181424,
  },
  {
    id: "KEN",
    value: 60946,
  },
  {
    id: "KGZ",
    value: 432478,
  },
  {
    id: "KHM",
    value: 254461,
  },
  {
    id: "OSA",
    value: 942447,
  },
  {
    id: "KWT",
    value: 414413,
  },
  {
    id: "LAO",
    value: 448339,
  },
  {
    id: "LBN",
    value: 620090,
  },
  {
    id: "LBR",
    value: 435950,
  },
  {
    id: "LBY",
    value: 75091,
  },
  {
    id: "LKA",
    value: 595124,
  },
  {
    id: "LSO",
    value: 483524,
  },
  {
    id: "LTU",
    value: 867357,
  },
  {
    id: "LUX",
    value: 689172,
  },
  {
    id: "LVA",
    value: 742980,
  },
  {
    id: "MAR",
    value: 236538,
  },
  {
    id: "MDA",
    value: 926836,
  },
  {
    id: "MDG",
    value: 840840,
  },
  {
    id: "MEX",
    value: 353910,
  },
  {
    id: "MKD",
    value: 505842,
  },
  {
    id: "MLI",
    value: 286082,
  },
  {
    id: "MMR",
    value: 915544,
  },
  {
    id: "MNE",
    value: 609500,
  },
  {
    id: "MNG",
    value: 410428,
  },
  {
    id: "MOZ",
    value: 32868,
  },
  {
    id: "MRT",
    value: 375671,
  },
  {
    id: "MWI",
    value: 591935,
  },
  {
    id: "MYS",
    value: 991644,
  },
  {
    id: "NAM",
    value: 701897,
  },
  {
    id: "NCL",
    value: 144098,
  },
  {
    id: "NER",
    value: 312944,
  },
  {
    id: "NGA",
    value: 862877,
  },
  {
    id: "NIC",
    value: 90831,
  },
  {
    id: "NLD",
    value: 281879,
  },
  {
    id: "NOR",
    value: 224537,
  },
  {
    id: "NPL",
    value: 322331,
  },
  {
    id: "NZL",
    value: 86615,
  },
  {
    id: "OMN",
    value: 707881,
  },
  {
    id: "PAK",
    value: 158577,
  },
  {
    id: "PAN",
    value: 738579,
  },
  {
    id: "PER",
    value: 248751,
  },
  {
    id: "PHL",
    value: 557292,
  },
  {
    id: "PNG",
    value: 516874,
  },
  {
    id: "POL",
    value: 682137,
  },
  {
    id: "PRI",
    value: 957399,
  },
  {
    id: "PRT",
    value: 846430,
  },
  {
    id: "PRY",
    value: 720555,
  },
  {
    id: "QAT",
    value: 478726,
  },
  {
    id: "ROU",
    value: 259318,
  },
  {
    id: "RUS",
    value: 268735,
  },
  {
    id: "RWA",
    value: 136781,
  },
  {
    id: "ESH",
    value: 151957,
  },
  {
    id: "SAU",
    value: 111821,
  },
  {
    id: "SDN",
    value: 927112,
  },
  {
    id: "SDS",
    value: 966473,
  },
  {
    id: "SEN",
    value: 158085,
  },
  {
    id: "SLB",
    value: 178389,
  },
  {
    id: "SLE",
    value: 528433,
  },
  {
    id: "SLV",
    value: 353467,
  },
  {
    id: "ABV",
    value: 251,
  },
  {
    id: "SOM",
    value: 445243,
  },
  {
    id: "SRB",
    value: 202402,
  },
  {
    id: "SUR",
    value: 972121,
  },
  {
    id: "SVK",
    value: 319923,
  },
  {
    id: "SVN",
    value: 728766,
  },
  {
    id: "SWZ",
    value: 379669,
  },
  {
    id: "SYR",
    value: 16221,
  },
  {
    id: "TCD",
    value: 101273,
  },
  {
    id: "TGO",
    value: 498411,
  },
  {
    id: "THA",
    value: 506906,
  },
  {
    id: "TJK",
    value: 613093,
  },
  {
    id: "TKM",
    value: 327016,
  },
  {
    id: "TLS",
    value: 607972,
  },
  {
    id: "TTO",
    value: 936365,
  },
  {
    id: "TUN",
    value: 898416,
  },
  {
    id: "TUR",
    value: 237783,
  },
  {
    id: "TWN",
    value: 878213,
  },
  {
    id: "TZA",
    value: 442174,
  },
  {
    id: "UGA",
    value: 720710,
  },
  {
    id: "UKR",
    value: 74172,
  },
  {
    id: "URY",
    value: 753177,
  },
  {
    id: "USA",
    value: 658725,
  },
  {
    id: "UZB",
    value: 550313,
  },
  {
    id: "VEN",
    value: 707492,
  },
  {
    id: "VNM",
    value: 538907,
  },
  {
    id: "VUT",
    value: 650646,
  },
  {
    id: "PSE",
    value: 476078,
  },
  {
    id: "YEM",
    value: 957751,
  },
  {
    id: "ZAF",
    value: 836949,
  },
  {
    id: "ZMB",
    value: 714503,
  },
  {
    id: "ZWE",
    value: 405217,
  },
  {
    id: "KOR",
    value: 171135,
  },
];
