import React, { useState } from 'react'
import { Bar, Line, Chart } from 'react-chartjs-2'

const BarChart = () => {
  const [chartData, setData] = useState({

    labels: ['High', 'Medium', 'Low'],
    datasets: [{
      label: 'Number of tickets',
      data: [
        3,
        4,
        5
      ],
      backgroudcolor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
      ],
    }]
  })

  return (
    <div className='chart'>
      <Bar
        data={chartData}

      />
    </div>
  )
}

export default BarChart
