import React from "react";
import { Chart } from "react-google-charts";
import { pieData } from "../data/mockData"

// export const data = [
//   ["Language", "Speakers (in millions)"],
//   ["German", 2.000],
//   ["French", 1.66],
//   ["Italian", 1.316],
//   ["Romansh", 1.391],
// ];

export const data = pieData

// console.log((data))
export const options = {
  legend: "none",
  pieSliceText: "label",
  pieStartAngle: 100,
  width: "1000px", // Set the desired width
  height: "95%", // Set the desired height
  backgroundColor: "transparent", // Set background color to transparent
//   sliceVisibilityThreshold: 0.2, // 20%
// pieHole: 0.4,
is3D: true,
  
};

const MyPieChart = () => {
  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"1000px"} // Adjust the width as needed
      height={"95%"}
    />
  );
};

export default MyPieChart;
