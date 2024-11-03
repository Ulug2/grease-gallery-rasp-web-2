"use client"; // This directive indicates that the component is a client component

import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Sample Delta E2000 values
const deltaE2000Values = [0.5, 1.3, 2.7, 3.5, 5.1, 7.8, 1.1, 0.7, 10.2, 2.2, 4.9];

export default function AnalysisPage() {
  const [chartData, setChartData] = useState<ChartData<'bar'>>({
    labels: [], // x-axis labels
    datasets: [], // y-axis data
  });

  useEffect(() => {
    // Sort the Delta E2000 values
    const sortedValues = deltaE2000Values.sort((a, b) => a - b);

    // Categorize the values
    const lowContrast = sortedValues.filter(value => value < 2);
    const slightContrast = sortedValues.filter(value => value >= 2 && value < 4);
    const moderateContrast = sortedValues.filter(value => value >= 5 && value < 7);
    const highContrast = sortedValues.filter(value => value >= 7);

    // Set up the chart data
    setChartData({
      labels: ['Low Contrast', 'Slight Contrast', 'Moderate Contrast', 'High Contrast'],
      datasets: [
        {
          label: 'Delta E2000 Contrast Levels',
          data: [
            lowContrast.length,
            slightContrast.length,
            moderateContrast.length,
            highContrast.length,
          ], // y-axis values (size of each category array)
          backgroundColor: ['#8BC34A', '#FFEB3B', '#FFC107', '#F44336'],
          borderColor: ['#689F38', '#FBC02D', '#FFA000', '#D32F2F'],
          borderWidth: 1,
        },
      ],
    });
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl font-bold flex justify-center">Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top' as const,
              },
              title: {
                display: true,
                text: 'Delta E2000 Contrast Analysis',
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Number of Samples',
                },
              },
              x: {
                title: {
                  display: true,
                  text: 'Contrast Level',
                },
              },
            },
          }}
          height={250} // Height of the chart
          width={300}  // Width of the chart
        />
      </CardContent>
    </Card>
  );
}