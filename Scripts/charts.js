

const lineChart = new Chart(firstLinearChart, {
  type: 'line',
  data: {
      labels: ['January', 'February', 'March', 'April', 'May' , 'something'],
      datasets: [
        {
            label: 'Line A',
            data: [30, 50, 40, 60, 70, 50, 90],
            borderColor: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.2)',
            fill: false,
            tension: 0.3
        },
        {
            label: 'Line B',
            data: [20, 40, 50, 30, 60, 80, 70],
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
       labels: ["food" , "something" , "three"],
       datasets: [
                   { 
                   data: [34 , 55 , 4],
                   backgroundColor: ['red', 'blue', 'green', 'yellow', 'purple']
                   }
                 ] 
          }, 
  }
);

const incomePieChart = new Chart(PieIncome, 
  { type: 'pie',
    data: {
      labels: ["food" , "something"],
      datasets: [
                  {
                  data: [34 , 55],
                  backgroundColor: ['red', 'blue', 'green', 'yellow', 'purple']
                  }
                ]
          }, 
  }
);