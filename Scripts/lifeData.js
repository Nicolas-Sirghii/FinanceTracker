 
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
        "salary": 0,
        freedom: 0,
        MDLstatement: parseFloat(document.getElementById('mdl').value) || 0,
        PLNstatement: parseFloat(document.getElementById('pln').value) || 0,
        EURstatement: parseFloat(document.getElementById('eur').value) || 0,
        USDstatement: parseFloat(document.getElementById('usd').value) || 0,
        balanceInUSD: parseFloat(document.getElementById('usdTotal').value) || 0,
        actualFinanceStatement: parseFloat(document.getElementById('usdTotal').value) || 0,
    }
]




function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { month: 'short', day: 'numeric' };
  const month = date.toLocaleDateString('en-US', { month: 'short' });
  const day = String(date.getDate()).padStart(2, '0');
  return `${month} ${day}`;
}
function formatDate2(dateString) {
  const date = new Date(dateString);
  // Increment the date by 1 day
  date.setDate(date.getDate() + 1);
  const options = { month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}




 const lastElem = LifeData[LifeData.length -1];
 const firsElem = LifeData[0];
 let perioudFrom = formatDate(firsElem.date);
 let perioudTo = formatDate(lastElem.date);
 let yetToBe = formatDate2(lastElem.date)
 const exchange = JSON.parse(localStorage.getItem("exchange")) || [0.92 , 18 , 3.87];
 const EUR = exchange[0];
 const MDL = exchange[1];
 const PLN = exchange[2];

let graphLables = [];
let averageIncomeArray = [];
let averageOutcomeArray = [];

let totalIncomeArray = [];
let totalOutcomeArray = [];

let pln_statement = [];
let mdl_statement = [];
let usd_statement = [];
let eur_statement = [];
let balance_usd = [];
let actual_statement = [];
let free = [];
let HoursOfWork = [];
let totalHoursOf = 0;

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

    pln_statement = [];
    mdl_statement = [];
    usd_statement = [];
    eur_statement = [];
    balance_usd = [];
    actual_statement = [];
    free = [];
    HoursOfWork = [];
    totalHoursOf = 0;





    LifeData.forEach(element => {
        graphLables.push(element.date)
        averageIncomeArray.push(element.averageIncome)
        averageOutcomeArray.push(element.averageOutcome)
    
        totalIncomeArray.push(element.totalIncome);
        totalOutcomeArray.push(element.totalOutcome);

        pln_statement.push(element.PLNstatement);
        mdl_statement.push(element.MDLstatement);
        usd_statement.push(element.USDstatement);
        eur_statement.push(element.EURstatement);
        balance_usd.push(element.balanceInUSD);
        actual_statement.push(element.actualFinanceStatement);
        free.push(element.freedom);
        HoursOfWork.push(element.workHours)
        totalHoursOf += element.workHours
    
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


document.getElementById('actualMoney').innerText = `${lastElem.actualFinanceStatement} USD`
