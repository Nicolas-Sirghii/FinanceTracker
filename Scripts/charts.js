

let lineChart = new Chart(firstLinearChart, {
  type: 'line',
  data: {
      labels: dates,
      datasets: [
        {
            label: 'Line A',
            data: totalExpenceADay,
            borderColor: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.2)',
            fill: false,
            tension: 0.3
        },
        {
            label: 'Line B',
            data: totalIncomeADay,
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
       labels: Object.keys(outcomeLabels),
       datasets: [
                   { 
                   data: Object.values(outcomeLabels),
                   backgroundColor: ['red', 'blue', 'green', 'yellow', 'purple']
                   }
                 ] 
          }, 
  }
);
const incomePieChart = new Chart(PieIncome, 
  { type: 'pie',
    data: {
      labels: Object.keys(incomeLabels),
      datasets: [
                  {
                  data: Object.values(incomeLabels),
                  backgroundColor: ['red', 'blue', 'green', 'yellow', 'purple']
                  }
                ]
          }, 
  }
);


let averageChrt = new Chart(averageLinearChart, {
  type: 'line',
  data: {
      labels: dates,
      datasets: [
        {
            label: 'Line A',
            data: averExp,
            borderColor: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.2)',
            fill: false,
            tension: 0.3
        },
        {
            label: 'Line B',
            data: averInc,
            borderColor: 'green',
            backgroundColor: 'rgba(0, 255, 0, 0.2)',
            fill: false,
            tension: 0.3
        }
    ]
  },
});
