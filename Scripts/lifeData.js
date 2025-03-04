 
let dateToday = new Date();
 const todaySDate = dateToday.toISOString().split('T')[0];
 

 let totalWorkedHour = 0;
 let graphLables = [];
 let grapgIncomeNumbers = [];
 let graphExpencesNumbers = [];
 let expencesLables = [];
 let ExLables = {};
 let IncomLables = {};
 let totalWorkHours = 0;
 let totalSalary = 0;
 let ExpencePieLables = [];
 let ExpencePieNumbers = [];
 let incomePieLables = [];
 let incomePieNumbers = [];



 let AEX = 0;
 let AIN = 0;
 let totalExpected = 0;
 let totalUnexpected = 0;
 let totalIncome = 0;
 let totalExpenceADay = [];
 let totalIncomeADay = [];
 let dates = [];
 let totalHours = 0;
 let totalEarnedAtWork = 0;
 let totalSpentEUR = 0;
 let totalSpentUSD = 0;
 let totalSpentPLN = 0;
 let totalSpentMDL = 0;
 
 let incomeLabels = {};
 let outcomeLabels = {};

 let averInc = [];
 let averExp = [];

 

 let LifeData = [
    {
        "date": "2025-03-03",
        "expenses": [
            {
                "name": "Food",
                "PLN": [
                    50,
                    0
                ]
            },
            {
                "name": "Alcohol",
                "PLN": [
                    0,
                    10
                ]
            },
            {
                "name": "first",
                "EUR": [
                    100,
                    0
                ]
            }
        ],
        "income": [
            {
                "name": "Investments",
                "USD": 50
            }
        ],
        averExpence: 4,
        averIncome: 7,
        "workHours": 0,
        "ratePerHour": 3,
        "salary": 0
    },
    {
        "date": "2025-02-26",
        "expenses": [
            {
                "name": "Grooming",
                "PLN": [
                    45,
                    13
                ]
            }
        ],
        "income": [
            {
                "ggggg": "Investments",
                "EUR": 500
            }
        ],
        averExpence: 4,
        averIncome: 7,
        "workHours": 8,
        "ratePerHour": 27,
        "salary": 0
    },
    {
        "date": "2025-02-27",
        "expenses": [
            {
                "name": "Internet",
                "PLN": [
                    0,
                    10
                ]
            }
        ],
        "income": [
            {
                "name": "Gift",
                "PLN": 40
            }
        ],
        averExpence: 4,
        averIncome: 7,
        "workHours": 8,
        "ratePerHour": 27,
        "salary": 0
    },
    {
        "date": "2025-02-28",
        "expenses": [
            {
                "name": "Alcohol",
                "PLN": [
                    4,
                    54
                ]
            }
        ],
        averExpence: 4,
        averIncome: 7,
        "income": [],
        "workHours": 0,
        "ratePerHour": 27,
        "salary": 23
    },
    {
        "date": "2025-03-01",
        "expenses": [
            {
                "name": "Utilityes",
                "MDL": [
                    170,
                    0
                ]
            }
        ],
        "income": [
            {
                "name": "Found",
                "MDL": 300
            }
        ],
        averExpence: 4,
        averIncome: 7,
        "workHours": 0,
        "ratePerHour": 27,
        "salary": 0
    },
    {
        "date": "2025-03-02",
        "expenses": [
            {
                "name": "Car",
                "PLN": [
                    100,
                    0
                ],
                "USD": [
                    100,
                    0
                ]
            }
            
        ],
        averExpence: 4,
        averIncome: 7,
        "income": [],
        "workHours": 8,
        "ratePerHour": 27,
        "salary": 0
    },
    {
        "date": "2025-03-03",
        "expenses": [
            {
                "name": "Food",
                "PLN": [
                    23,
                    0
                ]
            },
            {
                "name": "Cigarets",
                "PLN": [
                    19,
                    0
                ]
            }
        ],
        "income": [
            {
                "name": "Job",
                "PLN": 135
            }
        ],
        "averExpence": 97.35,
        "averIncome": 296.67,
        "workHours": 0,
        "ratePerHour": 27,
        "salary": 0
    }
];

function calculateTotals(EUR, PLN, MDL, array) {
    // Helper function to round to 2 decimal places
    const roundToTwoDecimalPlaces = (num) => Math.round(num * 100) / 100;
  
   
    
    array.forEach(entry => {
      let date = entry.date;
      let expenses = entry.expenses;
      let income = entry.income;
      let workHours = entry.workHours;
      let ratePerHour = entry.ratePerHour;
      
      // Collect date
      dates.push(date);
      averExp.push(entry.averExpence)
      averInc.push(entry.averIncome)
      
      // Track total hours and work earnings (in USD)
      totalHours += workHours;
      totalEarnedAtWork += workHours * ratePerHour;
  
      // Process expenses for each currency
      expenses.forEach(exp => {
        const expenseName = exp.name; // Get the expense name (e.g., "Food", "Rent")
        for (let currency in exp) {
          if (currency !== 'name') {
            const [expected, unexpected] = exp[currency];
            let convertedExpected = expected;
            let convertedUnexpected = unexpected;
            
            // Convert values to USD using the provided exchange rates
            if (currency === 'PLN') {
              convertedExpected = expected / PLN; // Convert PLN to USD
              convertedUnexpected = unexpected / PLN; // Convert PLN to USD
              totalSpentPLN += expected + unexpected;
            } else if (currency === 'MDL') {
              convertedExpected = expected / MDL; // Convert MDL to USD
              convertedUnexpected = unexpected / MDL; // Convert MDL to USD
              totalSpentMDL += expected + unexpected;
            } else if (currency === 'EUR') {
              convertedExpected = expected / EUR; // Convert EUR to USD
              convertedUnexpected = unexpected / EUR; // Convert EUR to USD
              totalSpentEUR += expected + unexpected;
            }
  
            // Add to total expenses in USD
            totalExpected += convertedExpected;
            totalUnexpected += convertedUnexpected;
  
            // Track outcome labels with expense names
            if (!outcomeLabels[expenseName]) outcomeLabels[expenseName] = 0;
            outcomeLabels[expenseName] += expected + unexpected;
          }
        }
      });
  
      // Process income for each currency
      income.forEach(inc => {
        const incomeValue = Object.values(inc)[1]; // Only 1 value, which is the amount
        totalIncome += incomeValue;
        
        // Track income labels with income source names
        const incomeName = Object.keys(inc)[0];
        if (!incomeLabels[incomeName]) incomeLabels[incomeName] = 0;
        incomeLabels[incomeName] += incomeValue;
      });
  
      // Track daily expenses and income (in USD)
      totalExpenceADay.push(totalExpected + totalUnexpected);
      totalIncomeADay.push(totalIncome);
    });
  
    // Calculate averages (in USD) and round to two decimal places
    const averageIncome = roundToTwoDecimalPlaces(totalIncome / array.length);
    const averageOutcome = roundToTwoDecimalPlaces((totalExpected + totalUnexpected) / array.length);
     AEX = averageOutcome;
     AIN = averageIncome;
    // Round all other totals to two decimal places
    return {
      totalExpected: roundToTwoDecimalPlaces(totalExpected),
      totalUnexpected: roundToTwoDecimalPlaces(totalUnexpected),
      totalIncome: roundToTwoDecimalPlaces(totalIncome),
      totalExpenceADay: totalExpenceADay.map(amount => roundToTwoDecimalPlaces(amount)),
      totalIncomeADay: totalIncomeADay.map(amount => roundToTwoDecimalPlaces(amount)),
      dates: dates,
      totalHours: roundToTwoDecimalPlaces(totalHours),
      totalEarnedAtWork: roundToTwoDecimalPlaces(totalEarnedAtWork),
      averageIncome: averageIncome,
      averageOutcome: averageOutcome,
      incomeLabels: Object.fromEntries(
        Object.entries(incomeLabels).map(([key, value]) => [key, roundToTwoDecimalPlaces(value)])
      ),
      outcomeLabels: Object.fromEntries(
        Object.entries(outcomeLabels).map(([key, value]) => [key, roundToTwoDecimalPlaces(value)])
      ),
      totalSpentEUR: roundToTwoDecimalPlaces(totalSpentEUR / EUR), // Already in USD
      totalSpentUSD: roundToTwoDecimalPlaces(totalSpentUSD),
      totalSpentPLN: roundToTwoDecimalPlaces(totalSpentPLN / PLN), // Converted to USD
      totalSpentMDL: roundToTwoDecimalPlaces(totalSpentMDL / MDL), // Converted to USD
    };
  }
  

  

//   calculateTotals(EUR, PLN, MDL, LifeData)
  

