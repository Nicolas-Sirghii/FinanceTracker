 
let dateToday = new Date();
 const todaySDate = dateToday.toISOString().split('T')[0];
 
 let PLN = 4;
 let MDL = 18;
 let EUR = 0.9;

 let totalWorkedHour = 0;
 let totalExpected = 0;
 let totalUnexpected = 0;
 let graphLables = [];
 let grapgIncomeNumbers = [];
 let graphExpencesNumbers = [];
 let expencesLables = [];
 let ExLables = {};
 let IncomLables = {};
 let totalIncome = 0;
 let totalWorkHours = 0;
 let totalSalary = 0;

 let ExpencePieLables = [];
 let ExpencePieNumbers = [];

 let incomePieLables = [];
 let incomePieNumbers = [];
 

 let LifeData = [
    {
        "date": "2025-02-25",
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
        "income": [],
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
        "income": [],
        "workHours": 8,
        "ratePerHour": 27,
        "salary": 0
    }
];

LifeData.forEach(element => {
    graphLables.push(element.date);
     let inc = 0;
    let out = 0;

    element.expenses.forEach(element => {
    let r = 0;
    
    element.USD && (r += calculateTotals(element ,'USD', "out"));
    element.EUR && (r += calculateTotals(element ,'EUR', "out"));
    element.PLN && (r += calculateTotals(element ,'PLN', "out"));
    element.MDL && (r += calculateTotals(element ,'MDL', "out"));

    if (ExLables[element.name]) {
        ExLables[element.name] += r
    } else {
        ExLables[element.name] = r 
    }

    out = r;
    });
    element.income.forEach(element => {
        let b = 0;
        
        element.USD && (b += calculateTotals(element ,'USD', "inc"));
        element.EUR && (b += calculateTotals(element ,'EUR', "inc"));
        element.PLN && (b += calculateTotals(element ,'PLN', "inc"));
        element.MDL && (b += calculateTotals(element ,'MDL', "inc"));
    
        if (IncomLables[element.name]) {
            IncomLables[element.name] += b
        } else {
            IncomLables[element.name] = b 
        }
    
        inc = b;
        });
        grapgIncomeNumbers.push(inc)
        graphExpencesNumbers.push(out)
        totalWorkHours += element.workHours;
        totalSalary += element.salary;

});


ExpencePieLables = Object.keys(ExLables);
ExpencePieNumbers = Object.values(ExLables);

 incomePieLables = Object.keys(IncomLables);
 incomePieNumbers = Object.values(IncomLables);



function calculateTotals( element , Curr, inc ){
    let a = 1; 
  if (Curr === "PLN"){a = PLN;}else if(Curr === "EUR"){a = EUR;} else if(Curr === "MDL"){a = MDL;};
   if (inc === "inc") {
    totalIncome += Number((element[Curr]/a).toFixed(2))
    
    return Number((element[Curr]/a).toFixed(2))
   } else {
    totalExpected += Number((element[Curr][1]/a).toFixed(2))
    totalUnexpected += Number((element[Curr][0]/a).toFixed(2))
    return Number((element[Curr][0]/a).toFixed(2)) + Number((element[Curr][1]/a).toFixed(2))
   }
  
    
  }
