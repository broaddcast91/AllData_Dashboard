import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";
// import { mockBarData as data } from "../data/mockData";

const BarChart = ({ isDashboard = false , barchartData}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const customColors = {
    Arena: "hsl(224, 66%, 44%)",
    Nexa: "hsl(0, 0%, 0%)",
    Autozone: "hsl(42, 70%, 50%)",
    // "saboo groups": "hsl(133, 70%, 50%)",
    Commercial: "#FF2922",
  };
console.log(barchartData)

  return (
    <ResponsiveBar
      data={barchartData}
      theme={{
        // added
        axis: {
          domain: {
            line: {
              stroke: colors.primary[1002],
            },
          },
          legend: {
            text: {
              fill: colors.primary[1002],
            },
          },
          ticks: {
            line: {
              stroke: colors.primary[1002],
              strokeWidth: 1,
            },
            text: {
              fill: colors.primary[1002],
            },
          },
        },
        legends: {
          text: {
            fill: colors.primary[1002],
          },
        },
      }}
      keys={[
        // "Driving School",
        // "Corporate",
        // "Accessories",
        // "Finance",
        // "Insurance",
        "Arena",
        "Nexa",
        // "saboo groups",
      "Commercial",
        "Autozone",
        // "offers",
        // "Showroom",
        // "Test Drive",
      ]}
      // keys ={["Grand Vitara","Fronx","Ciaz","Ignis","Baleno","Invicto","Jimny","Xl6"]}
      indexBy="Month"
      margin={{ top: 30, right: 130, bottom: 35, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
          colors={({ id }) => customColors[id]} // Apply custom colors
      // defs={[
      //   {
      //     id: "dots",
      //     type: "patternDots",
      //     background: "inherit",
      //     color: "#ff0000",
      //     size: 4,
      //     padding: 1,
      //     stagger: true,
      //   },
      //   {
      //     id: "lines",
      //     type: "patternLines",
      //     background: "inherit",
      //     color: "#eed312",
      //     rotation: -45,
      //     lineWidth: 6,
      //     spacing: 10,
      //   },
      // ]}
      borderColor={{
        from: "color",
        modifiers: [["darker", "1.6"]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "country", // changed
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "food", // changed
        legendPosition: "middle",
        legendOffset: -40,
      }}
      enableLabel={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      barAriaLabel={function (e) {
        return e.id + ": " + e.formattedValue + " in country: " + e.indexValue;
      }}
      animate={true}
      motionConfig="gentle" // Change to gentle for a smoother animation
      layout="horizontal" // Change to horizontal layout
    />
  );
};

export default BarChart;
