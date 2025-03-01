const We = {
openGoalPopup() {
  GoalPopup.style.display = "flex";
},
closeGoalPopup() {
  GoalPopup.style.display = "none";
},
openNewExpencePopup() {
  NewExpencePopup.style.display = 'flex';
},
cancelNewExpencePopup() {
  NewExpencePopup.style.display = 'none';
},
openNewIncomePopup() {
  incomePopup.style.display = "flex";
},
closeNewIncomePopup() {
  incomePopup.style.display = "none";
},
addNewExpence(type){
  console.log(type)
}

}