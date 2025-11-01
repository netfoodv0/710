import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface LineColumnChartCustomProps {
  className?: string;
}

export const LineColumnChartCustom: React.FC<LineColumnChartCustomProps> = ({ className = '' }) => {
  const options: ApexOptions = {
    chart: {
      height: 350,
      type: 'line',
      toolbar: {
        show: false
      },
      sparkline: {
        enabled: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '70%'
      }
    },
    stroke: {
      width: [0, 4]
    },
    title: {
      text: 'Traffic Sources',
      offsetY: 10,
      offsetX: 8,
      style: {
        fontSize: '14px',
        fontWeight: 400,
        color: '#111827',
        fontFamily: 'inherit'
      }
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: [1]
    },
    labels: [
      '01 Jan',
      '02 Jan',
      '03 Jan',
      '04 Jan',
      '05 Jan',
      '06 Jan',
      '07 Jan',
      '08 Jan',
      '09 Jan',
      '10 Jan',
      '11 Jan',
      '12 Jan'
    ],
    yaxis: [
      {
        title: {
          text: '',
        },
      },
      {
        opposite: true,
        title: {
          text: ''
        }
      }
    ],
    grid: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      }
    }
  };

  const series = [
    {
      name: 'Website Blog',
      type: 'column',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    {
      name: 'Social Media',
      type: 'line',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
  ];

  return (
    <div className={`w-full ${className}`}>
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={350}
      />
    </div>
  );
};

