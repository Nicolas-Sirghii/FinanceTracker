let dateToday = new Date();
let newDay = {
  date: dateToday.toISOString().split('T')[0], // Format as YYYY-MM-DD
  expenses: {
    USD: 0,
    MDL: 0,
    PLN: 0,
    EUR: 0,
  },
  income: {
    USD: 0,
    MDL: 0,
    PLN: 0,
    EUR: 0,
  },
  workHours: [8,27]

};
let newLife = JSON.parse(localStorage.getItem("LIFE")) || [];




const firstLinearChart = document.getElementById('lineChart').getContext('2d');
const PieExpence = document.getElementById('expensePieChart').getContext('2d');
const PieIncome = document.getElementById('incomePieChart').getContext('2d');


const GoalPopup = document.getElementById('GoalPopup');
const NewExpencePopup = document.getElementById('NewExpencePopup');
const incomePopup = document.getElementById('incomePopup');
const expencePieContainer = document.getElementById('expencePieContainer');
const twoCharts = document.getElementById('twoCharts');


if (window.innerWidth < 800) {

  GoalPopup.classList.add('mobGoalPopup');
  incomePopup.classList.add('mobIncomePopup');
  linearContainer.classList.add('mobLinearContainer');
  NewExpencePopup.classList.add('mobNewEspencesPopup');
  expencePieContainer.classList.add("mobExpencePieContainer");
  twoCharts.classList.add('mobTwoCharts');
  
}







console.log(newLife)