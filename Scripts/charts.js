

let lineChart = new Chart(firstLinearChart, {
  type: 'line',
  data: {
      labels: graphLables,
      datasets: [
        {
            label: 'Line A',
            data: graphExpencesNumbers,
            borderColor: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.2)',
            fill: false,
            tension: 0.3
        },
        {
            label: 'Line B',
            data: grapgIncomeNumbers,
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
       labels: ExpencePieLables,
       datasets: [
                   { 
                   data: ExpencePieNumbers,
                   backgroundColor: ['red', 'blue', 'green', 'yellow', 'purple']
                   }
                 ] 
          }, 
  }
);
const incomePieChart = new Chart(PieIncome, 
  { type: 'pie',
    data: {
      labels: incomePieLables,
      datasets: [
                  {
                  data: incomePieNumbers,
                  backgroundColor: ['red', 'blue', 'green', 'yellow', 'purple']
                  }
                ]
          }, 
  }
);