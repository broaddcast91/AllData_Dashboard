import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import dayjs from 'dayjs';
// import { rowFirst } from '../data/mockData';  // Adjust the import according to your data structure

// Register the components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function BarChart2({barchart}) {
    const getCurrentMonthAndPreviousMonthData = () => {
        // const currentMonth = dayjs().format('MMMYYYY');
        // const previousMonth = dayjs().subtract(1, 'month').format('MMMYYYY');

        // Using LeadsCount data for current and previous months
        // console.log(barchart)
        const currentMonthData = barchart.currentMonthCounts;
        const previousMonthData = barchart.previousMonthCounts;

        const currentMonthLabel = dayjs().format('MMMM YYYY');
        const previousMonthLabel = dayjs().subtract(1, 'month').format('MMMM YYYY');

        return {
            labels: [previousMonthLabel, currentMonthLabel],
            data: [previousMonthData, currentMonthData]
        };
    };

    const chartDataInitial = getCurrentMonthAndPreviousMonthData();

    const chartData = {
        labels: chartDataInitial.labels,
        datasets: [
            {
                data: chartDataInitial.data,
                backgroundColor: ["#1d3a8a", "#FF2922"],
                borderWidth: 0.5,
            },
        ],
    };

    const [chartOptions, setChartOptions] = useState({
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
        plugins: {
            legend: {
                display: false,
            },
        },
        animation: {
            duration: 2000,
            easing: 'easeOutBounce',
        },
    });

    useEffect(() => {
        setChartOptions((prevOptions) => ({
            ...prevOptions,
            animation: {
                duration: 2000,
                easing: 'easeOutBounce',
            },
        }));
    }, []);

    return (
        <div style={{ maxWidth: "400px", marginTop: "70px" }}>
            <Bar data={chartData} height={200} options={chartOptions} />
        </div>
    );
}

export default BarChart2;
