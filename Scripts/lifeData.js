 
let dateToday = new Date();
 const todaySDate = dateToday.toISOString().split('T')[0];
 
 function getShortDayOfWeek() {
  const today = new Date();
  const shortDaysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayOfWeek = today.getDay(); // Get the day as a number (0-6)
  return shortDaysOfWeek[dayOfWeek]; // Return the corresponding shortened day name
}

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
        weekDay: getShortDayOfWeek()
    }
]

    






let bankAccountNumber = LifeData[LifeData.length -1].actualFinanceStatement;





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

let perioudFreedome = [];
let perioudIncomeAverage = [];
let perioudOutcomeAverage = [];
let actualPlus = [];
let jobProcent1 = 0;
let IncomeProcent2 = 0;
let traktor = 0;
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
    actualPlus = [];
    jobProcent1 = 0;
    IncomeProcent2 = 0;
    


    perioudFreedome = [];
    perioudIncomeAverage = [];
    perioudOutcomeAverage = [];
    
    let countPerioudFreedome = 0;
    let countFreedomeDays = 0;
    let countIncome = 0;


    let amma = 0;


    function getLasValue4(arr , keyName) {
      for (let i = arr.length - 1; i >= 0; i--) {
        if (arr[i][keyName]) {
          return arr[i][keyName];
        }
      }
      
    }
     
    LifeData.forEach(element => {

      countFreedomeDays ++;
      countPerioudFreedome += element.totalOutcome;
      countIncome += element.totalIncome;
      const avInc = parseFloat((countIncome / countFreedomeDays).toFixed(2));
      const avOut = parseFloat((countPerioudFreedome / countFreedomeDays).toFixed(2))
      perioudOutcomeAverage.push(avOut)
      perioudIncomeAverage.push(avInc)
      perioudFreedome.push(Math.round(element.actualFinanceStatement/avOut))

      
      if (element.tradeAmount) {
        jobProcent1 = element.totalIncome - element.totalOutcome;
        IncomeProcent2 = element.tradeAmount;
        amma = Number((element.actualFinanceStatement + element.actualStatus).toFixed(2));
        traktor = element.actualStatus
        
      } else {
        
        amma = Number((element.actualFinanceStatement + traktor).toFixed(2))
        jobProcent1 = element.totalIncome - element.totalOutcome;
        IncomeProcent2 = 0;
      }
      actualPlus.push(amma)
   

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






document.getElementById('actualMoney').innerText = `${lastElem.actualFinanceStatement} USD`
