
let currentGoalId = '';
let currentSpacificGoal = '';
let bankAccountNumber = 600;
let CurrentCurrency = "";
let existingOrNewExpence = 0;


let newDay = {
  date: dateToday.toISOString().split('T')[0], // Format as YYYY-MM-DD
  expenses: {
    existing: {
      food: {
        USD: [0,0],
        MDL: [0,0],
        PLN: [0,0],
        EUR: [0,0],
      },
      car: {
        USD: [0,0],
        MDL: [0,0],
        PLN: [0,0],
        EUR: [0,0],
      },
      rent: {
        USD: [0,0],
        MDL: [0,0],
        PLN: [0,0],
        EUR: [0,0],
      }

    } ,
  },
  income: {
    existing: {
      job: {
        USD: 0,
        MDL: 0,
        PLN: 0,
        EUR: 0,
      },
      investments: {
        USD: 0,
        MDL: 0,
        PLN: 0,
        EUR: 0,
      },
      something: {
        USD: 0,
        MDL: 0,
        PLN: 0,
        EUR: 0,
      }

    } ,
  },
  workHours: [8,27],
  salary: 0,



};


let goals1 = []

let goals = JSON.parse(localStorage.getItem("GOOOOL")) || goals1; 
let newLife = JSON.parse(localStorage.getItem("LIFE")) || [];




const firstLinearChart = document.getElementById('lineChart').getContext('2d');
const PieExpence = document.getElementById('expensePieChart').getContext('2d');
const PieIncome = document.getElementById('incomePieChart').getContext('2d');


const GoalPopup = document.querySelector('.GoalPopup');
const NewExpencePopup = document.querySelector('.NewExpencePopup');
const incomePopup = document.querySelector('.incomePopup');
const expencePieContainer = document.getElementById('expencePieContainer');
const twoCharts = document.getElementById('twoCharts');
const goalSpacificContainer = document.getElementById('goalSpacificContainer');
const goalElementContainer = document.getElementById('goalElementContainer');
const addSpacificsPopup = document.getElementById('addSpacificsPopup');
const setBtn = document.getElementById('setBtn');
const updateSpacificGoal = document.getElementById('updateSpacificGoal');
const SpacificName = document.getElementById('SpacificName');
const SpacificUrl = document.getElementById('SpacificUrl');
const SpacificAmount = document.getElementById('SpacificAmount');
const UpdateCircle = document.getElementById('UpdateCircle');
const UpdateGoalImge = document.getElementById('UpdateGoalImge');
const name = document.getElementById('name');
const amount = document.getElementById('amount');
const incomeName = document.getElementById('incomeName');
const incomeAmount = document.getElementById('incomeAmount');
const amountOfHours = document.getElementById('amountOfHours');
const ratePerHour = document.getElementById('ratePerHour');
const salary = document.getElementById('salary');
const ExistingOptions = document.getElementById('ExistingOptions');




if (window.innerWidth < 800) {

  GoalPopup.classList.add('mobGoalPopup');
  incomePopup.classList.add('mobIncomePopup');
  linearContainer.classList.add('mobLinearContainer');
  NewExpencePopup.classList.add('mobNewEspencesPopup');
  expencePieContainer.classList.add("mobExpencePieContainer");
  twoCharts.classList.add('mobTwoCharts');
  
}







