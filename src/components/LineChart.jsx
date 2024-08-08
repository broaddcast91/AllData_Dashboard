import { ResponsiveLine } from '@nivo/line';
import { useTheme } from '@mui/material';
import { tokens } from '../theme';
// import { mockLineData as data } from '../data/mockData';

const LineChart = ({  isDashboard = false , monthYearCounts}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  let mockLineData = [
    {
      id: 'Arena',
      color: 'hsl(224, 66%, 44%)',
      data: monthYearCounts.ArenaMonthlyData || [],
    },
    {
      id: 'Nexa',
      color: "hsl(0, 0%, 0%)",
      data: monthYearCounts.NexaMonthlyData || [],
    },
    {
      id: 'Autozone',
      color: 'hsl(42, 70%, 50%)',
      data: monthYearCounts.AutozoneMonthlyData || [],
    },
    {
      id: 'Commercial',
      color: 'hsl(345, 70%, 50%)',
      data: monthYearCounts.CommercialMonthlyData || [],
    },
  ];
  
  return (
    // {console.log(mockLineData)}
    <ResponsiveLine

      data={mockLineData}
      width={800} // Pass width prop to ResponsiveLine
      theme={{
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
        tooltip: {
          container: {
            color: colors.primary[1002],
          },
        },
      }}
      colors={isDashboard ? { datum: 'color' } : { scheme: 'nivo' }} // added
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: 'point' }}
      yScale={{
        type: 'linear',
        min: 0, // Set the minimum y value to 0
        max: 'auto', // Automatically determine the maximum y value
        stacked: false, // Set to false to plot individual y values correctly
        reverse: false,
      }}
      yFormat=' >-.2f'
      curve='catmullRom'
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: 'bottom',
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : 'transportation', // added
        legendOffset: 36,
        legendPosition: 'middle',
      }}
      axisLeft={{
        orient: 'left',
        tickValues: 5, // added
        tickSize: 3,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : 'count', // added
        legendOffset: -40,
        legendPosition: 'middle',
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={8}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: 'bottom-right',
          direction: 'column',
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: 'left-to-right',
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: 'circle',
          symbolBorderColor: 'rgba(0, 0, 0, .5)',
          effects: [
            {
              on: 'hover',
              style: {
                itemBackground: 'rgba(0, 0, 0, .03)',
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
    
  );
};

export default LineChart;
