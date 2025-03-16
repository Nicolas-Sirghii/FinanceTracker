

let lineChart = new Chart(firstLinearChart, {
  type: 'line',
  data: {
      labels: graphLables,
      datasets: [
        {
            label: 'Income',
            data: totalIncomeArray,
            borderColor: 'green',
            backgroundColor: 'greed',
            fill: false,
            tension: 0.3
        },
        {
            label: 'Outcome',
            data: totalOutcomeArray,
            borderColor: 'red',
            backgroundColor: 'red',
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



