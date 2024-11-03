'use client'

import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { fetchDeltaE2000Values } from '@/lib/parser'; // Ensure this import path is correct
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

export default function AnalysisPage() {
  const [chartData, setChartData] = useState<ChartData<'bar'>>({
    labels: [], // x-axis labels
    datasets: [], // y-axis data
  });

  useEffect(() => {
    async function fetchData() {
      // const deltaE2000Values = await fetchDeltaE2000Values(); // Fetch the values asynchronously
      const deltaE2000Values = [1, 2, 3, 4, 5, 6, 7]

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
            ],
            backgroundColor: ['#8BC34A', '#FFEB3B', '#FFC107', '#F44336'],
            borderColor: ['#689F38', '#FBC02D', '#FFA000', '#D32F2F'],
            borderWidth: 1,
          },
        ],
      });
    }

    fetchData(); // Call the async function within useEffect
  }, []);

  return (
    <div className="flex justify-center items-center min-h-2xl bg-gray-100">
  <Card className="max-w-3xl w-full shadow-lg rounded-lg p-6 bg-white">
    <CardHeader>
      <CardTitle className="text-3xl font-bold flex justify-center">Analysis</CardTitle>
    </CardHeader>
    <CardContent className=" font-bold flex justify-center">
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
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
        height={250}
        width={300}
      />
    </CardContent>
  </Card>
</div>
  );
}