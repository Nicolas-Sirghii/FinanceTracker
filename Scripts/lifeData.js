 
let dateToday = new Date();
 const todaySDate = dateToday.toISOString().split('T')[0]; 

 

 let LifeData = [
  
    {
        "date": "2025-03-02",
        "expenses": [
            {
                "name": "fdfdfd",
                "EUR": [
                    555,
                    0
                ]
            }
        ],
        "income": [],
        "workHours": 0,
        ratePerHour: 2,
        "salary": 0
    },
    {
        "date": "2025-03-01",
        "expenses": [
            {
                "name": "first",
                "PLN": [
                    444,
                    0
                ]
            }
        ],
        "income": [
            {
                name: "first",
                USD: 10,

            }
        ],
        "workHours": 0,
        ratePerHour: 3,
        "salary": 0
    }

 ];


console.log(LifeData)
