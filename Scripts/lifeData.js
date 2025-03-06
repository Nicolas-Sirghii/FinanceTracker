 
let dateToday = new Date();
 const todaySDate = dateToday.toISOString().split('T')[0];
 

 

 let LifeData = [
    {
        "countNumber": 1,
        "date": "2025-03-03",
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
    },
    {
        "countNumber": 2,
        "date": "2025-03-04",
        "income": {
            "Job": 54
        },
        "outcome": {
            "Food": 100,
            "Rent": 100
        },
        "workHours": 8,
        "ratePerHour": 27,
        "averageOutcome": 100,
        "averageIncome": 27,
        "salary": 0,
        "allTimeIncome": 54,
        "allTimeOutcome": 200,
        "totalIncome": 54,
        "totalOutcome": 200
    },
    {
        "countNumber": 3,
        "date": "2025-03-05",
        "income": {
            "Job": 54
        },
        "outcome": {
            "Car": 100
        },
        "workHours": 8,
        "ratePerHour": 27,
        "averageOutcome": 100,
        "averageIncome": 36,
        "salary": 25,
        "allTimeIncome": 108,
        "allTimeOutcome": 300,
        "totalIncome": 54,
        "totalOutcome": 100
    }
];





if (LifeData.length === 0) {
    LifeData = [
        {
            "countNumber": 1,
            "date": "2025-03-02",
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
}

let graphLables = [];
let averageIncomeArray = [];
let averageOutcomeArray = [];

let totalIncomeArray = [];
let totalOutcomeArray = [];

let pieIncomeData = {};
let pieOutcomeData = {};

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




