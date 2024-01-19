export function createChartData(datasets: Array<{
  label: string
  dates: string[]
  data: number[]
  backgroundColor: string
  borderColor: string
  borderWidth: number
}>) {
  return {
    type: 'line',
    data: {
      labels: datasets[0].dates,
      datasets,
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'crates download over time',
        },
      },
      lineTension: 1,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              padding: 25,
            },
          },
        ],
      },
    },
  }
}

// Example usage:
export const cratesChartData = createChartData([
  {
    label: 'Number of Moons',
    data: [0.166, 2.081, 3.003, 0.323, 954.792, 285.886, 43.662, 51.514],
    backgroundColor: 'rgba(54,73,93,.5)',
    borderColor: '#36495d',
    borderWidth: 3,
  },
  {
    label: 'Planetary Mass (relative to the Sun x 10^-6)',
    data: [0, 0, 1, 2, 79, 82, 27, 14],
    backgroundColor: 'rgba(71, 183,132,.5)',
    borderColor: '#47b784',
    borderWidth: 3,
  },
])
