
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






console.log(newLife)