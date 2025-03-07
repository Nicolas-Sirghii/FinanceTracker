 
let dateToday = new Date();
 const todaySDate = dateToday.toISOString().split('T')[0];
 

 



let LifeData = JSON.parse(localStorage.getItem('LIFE')) || [
    {
        "countNumber": 1,
        "date": dateToday.toISOString().split('T')[0],
        "income": {},
        "outcome": {},
        "workHours": 0,
        "ratePerHour": 0,
        "averageOutcome": 0,
        "averageIncome": 0,
        "allTimeIncome": 0,
        "allTimeOutcome": 0,
        "totalIncome": 0,
        "totalOutcome": 0,
        "salary": 0
    }
]





let graphLables = [];
let averageIncomeArray = [];
let averageOutcomeArray = [];

let totalIncomeArray = [];
let totalOutcomeArray = [];

let pieIncomeData = {};
let pieOutcomeData = {};

function forEachData() {

    graphLables = [];
    averageIncomeArray = [];
    averageOutcomeArray = [];

    totalIncomeArray = [];
    totalOutcomeArray = [];

    pieIncomeData = {};
    pieOutcomeData = {};



    LifeData.forEach(element => {
        graphLables.push(element.date)
        averageIncomeArray.push(element.averageIncome)
        averageOutcomeArray.push(element.averageOutcome)
    
        totalIncomeArray.push(element.totalIncome);
        totalOutcomeArray.push(element.totalOutcome);
    
        Object.keys(element.income).forEach(key => {
            // If the key already exists in result, add the value to the existing value
            if (pieIncomeData[key]) {
                pieIncomeData[key] += element.income[key];
            } else {
              // If the key does not exist, initialize it with the current value
              pieIncomeData[key] = element.income[key];
            }
          });
          Object.keys(element.outcome).forEach(key => {
            // If the key already exists in result, add the value to the existing value
            if (pieOutcomeData[key]) {
                pieOutcomeData[key] += element.outcome[key];
            } else {
              // If the key does not exist, initialize it with the current value
              pieOutcomeData[key] = element.outcome[key];
            }
          });
        
    });
    
};
forEachData();


console.log('....MainScript...')
console.log(LifeData)
console.log('.................')


