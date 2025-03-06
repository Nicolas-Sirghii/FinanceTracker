

let lineChart = new Chart(firstLinearChart, {
  type: 'line',
  data: {
      labels: graphLables,
      datasets: [
        {
            label: 'Line A',
            data: totalIncomeArray,
            borderColor: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.2)',
            fill: false,
            tension: 0.3
        },
        {
            label: 'Line B',
            data: totalOutcomeArray,
            borderColor: 'green',
            backgroundColor: 'rgba(0, 255, 0, 0.2)',
            fill: false,
            tension: 0.3
        }
    ]
  },
});

const pieExpenceChart = new Chart(PieExpence, 
  { type: 'pie',
    data: {
       labels: Object.keys(pieOutcomeData),
       datasets: [
                   { 
                   data: Object.values(pieOutcomeData),
                   backgroundColor: ['red', 'blue', 'green', 'yellow', 'purple']
                   }
                 ] 
          }, 
  }
);
const incomePieChart = new Chart(PieIncome, 
  { type: 'pie',
    data: {
      labels: Object.keys(pieIncomeData),
      datasets: [
                  {
                  data: Object.values(pieIncomeData),
                  backgroundColor: ['red', 'blue', 'green', 'yellow', 'purple']
                  }
                ]
          }, 
  }
);


let averageChrt = new Chart(averageLinearChart, {
  type: 'line',
  data: {
      labels: graphLables,
      datasets: [
        {
            label: 'Line A',
            data: averageOutcomeArray,
            borderColor: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.2)',
            fill: false,
            tension: 0.3
        },
        {
            label: 'Line B',
            data: averageIncomeArray,
            borderColor: 'green',
            backgroundColor: 'rgba(0, 255, 0, 0.2)',
            fill: false,
            tension: 0.3
        }
    ]
  },
});
