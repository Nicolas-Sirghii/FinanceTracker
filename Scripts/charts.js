

const lables = ["first", "second", "third"];
const inc = [45,23,67];
const out = [22,216,47];


let lineChart = new Chart(firstLinearChart, {
  type: 'line',
  data: {
      labels: lables,
      datasets: [
        {
            label: 'Line A',
            data: out,
            borderColor: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.2)',
            fill: false,
            tension: 0.3
        },
        {
            label: 'Line B',
            data: inc,
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
       labels: ["something",'another',"what"],
       datasets: [
                   { 
                   data: [45,23,67],
                   backgroundColor: ['red', 'blue', 'green', 'yellow', 'purple']
                   }
                 ] 
          }, 
  }
);
const incomePieChart = new Chart(PieIncome, 
  { type: 'pie',
    data: {
      labels: ["something",'another',"what"],
      datasets: [
                  {
                  data: [45,23,67],
                  backgroundColor: ['red', 'blue', 'green', 'yellow', 'purple']
                  }
                ]
          }, 
  }
);


let averageChrt = new Chart(averageLinearChart, {
  type: 'line',
  data: {
      labels: lables,
      datasets: [
        {
            label: 'Line A',
            data: out,
            borderColor: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.2)',
            fill: false,
            tension: 0.3
        },
        {
            label: 'Line B',
            data: inc,
            borderColor: 'green',
            backgroundColor: 'rgba(0, 255, 0, 0.2)',
            fill: false,
            tension: 0.3
        }
    ]
  },
});
