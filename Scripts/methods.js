const We = {
openGoalPopup() {
  GoalPopup.style.display = "flex";
},
openGoalBackground(){
  UpdateCircle.style.display = "block";
  
},
updateGoalBackground(){
  const elementId = goals.find(item => item.id === currentGoalId);
  
  elementId.imageUrl = UpdateGoalImge.value || elementId.imageUrl;
  
  UpdateCircle.style.display = "none";
},
closeUpdateGoalBackground(){
  UpdateCircle.style.display = "none";
},
closeGoalPopup() {
  GoalPopup.style.display = "none";
},
openOptions(op){
  ExistingOptions.style.display = "flex"
  ExistingOptions.innerHTML = '';
  op.forEach(element => {
    const a = document.createElement('button')
    a.innerText = element;
    a.addEventListener("click" ,function (){
      if (existingOrNewExpence === 1) {
        name.value = element;
      } else {
        incomeName.value = element;
      }
    })
    ExistingOptions.append(a)
  });
},
closeOptions(){
ExistingOptions.style.display = "none"
},
openSpacificsGoalPopup () {
  addSpacificsPopup.style.display = "block";
},
closeSpacificsGoalPopup () {
addSpacificsPopup.style.display = "none";
},
openUpdateSpacificGoal(id){
  updateSpacificGoal.style.display = "block";
  const goal = goals.find(item => item.id === currentGoalId);
  const elementId = goal.data.find(item => item.name === id);
  currentSpacificGoal = elementId;
},
closeUpdateSpacificGoal(){
  updateSpacificGoal.style.display = "none";
},
updateSpacificGoal(){
  const goal = goals.find(item => item.id === currentGoalId);
  const elementId = goal.data.find(item => item.name === currentSpacificGoal.name);

  currentSpacificGoal.name = SpacificName.value || elementId.name;
  currentSpacificGoal.imageUrl = SpacificUrl.value || elementId.imageUrl;
  currentSpacificGoal.amount = SpacificAmount.value || elementId.amount;
  
  SpacificName.value = '';
  SpacificUrl.value = '';
  SpacificAmount.value = '';

  updateSpacificGoal.style.display = "none";

},
deleteSpacificGoal(){
  let goal = goals.find(item => item.id === currentGoalId);
  goal.data = goal.data.filter(item => item.name !== currentSpacificGoal.name);
  
  
  

  SpacificName.value = '';
  SpacificUrl.value = '';
  SpacificAmount.value = '';

  updateSpacificGoal.style.display = "none";
  
},
openNewExpencePopup(id) {
  document.getElementById(id).style.display = "flex";
},
cancelNewExpencePopup() {
  NewExpencePopup.style.display = 'none';
  
},
openNewIncomePopup() {
  incomePopup.style.display = "flex";
  const lastRate = (LifeData.length > 0) ? LifeData[LifeData.length -1].ratePerHour : 0;
  ratePerHour.value = lastRate;
},
closeNewIncomePopup() {
  incomePopup.style.display = "none";
},
addNewExpence(type){
  const ExOrUnEx  = (type === 'expectedExpence') ?  [Number(amount.value) , 0] : [ 0 , Number(amount.value)];
  const last = LifeData[LifeData.length -1];

 if (name.value && amount.value && CurrentCurrency && existingOrNewExpence) {
   
  
if (todaySDate === LifeData[LifeData.length -1].date) {


            let exists = false;
            last.expenses.forEach(element => {
              if (element.name === name.value) {
                if (type === 'expectedExpence') {
                  if (element[CurrentCurrency]) {
                    element[CurrentCurrency][0] += Number(amount.value)
                  } else {
                    element[CurrentCurrency] = [Number(amount.value) , 0]
                  }
                
                } else {
                  if (element[CurrentCurrency]) {
                    element[CurrentCurrency][1] += Number(amount.value)
                  } else {
                    element[CurrentCurrency] = [ 0 , Number(amount.value)]
                  }
                }
                exists = true;  
              } 

            });
            
            if (!exists) {
              last.expenses.push({name: name.value , [CurrentCurrency]: ExOrUnEx});
              exists = true;
            }


  
} else {

  const lastRate = (LifeData.length > 0) ? Number(LifeData[LifeData.length -1].ratePerHour) : 0;
              
              LifeData.push(
                {
                  date: todaySDate,
                  expenses: [
                    {name: name.value , [CurrentCurrency]: ExOrUnEx}
                  ],
                  income: [],
                  averExpence: AEX,
                  averIncome: AIN,
                  workHours: Number(amountOfHours.value) || 0 ,
                  ratePerHour:  Number(ratePerHour.value) || lastRate,
                  salary: Number(salary.value) || 0 ,
              }
              )
}

 name.value = '';
 amount.value = '';
 
We.cancelNewExpencePopup();
We.updateCharts();
 } else {
  alert("try again!!!")
 }

},
addNewIncome(){
  const last = LifeData[LifeData.length -1];

 if (
  (CurrentCurrency && existingOrNewExpence)
  
&& (
  (incomeName.value && incomeAmount.value)
  || amountOfHours.value
  || salary.value
)

  

  ) {


 
  
if (todaySDate === LifeData[LifeData.length -1].date) {

         if (incomeAmount.value) {
          let exists = false;
            last.income.forEach(element => {
              if (element.name === incomeName.value) {
                
                  if (element[CurrentCurrency]) {
                    element[CurrentCurrency] += Number(incomeAmount.value);
                  } else {
                    element[CurrentCurrency] = Number(incomeAmount.value);
                  }
                
                
                exists = true;  
              } 

            });
            
            if (!exists) {
              last.income.push({name: incomeName.value , [CurrentCurrency]:  Number(incomeAmount.value)});
              exists = true;
            }
         }
            
          
            const lastRate = (LifeData.length > 0) ? Number(LifeData[LifeData.length -1].ratePerHour)  : 0;
            
            

            last.salary = last.salary + Number(salary.value);
            last.workHours = last.workHours + Number(amountOfHours.value) ;
            last.ratePerHour = Number(ratePerHour.value) || lastRate ;

  
} else {

  const lastRate = (LifeData.length > 0) ? Number(LifeData[LifeData.length -1].ratePerHour) : 0;
               const  ifAmount = incomeAmount.value ? 
               [
                {name: incomeName.value || "Insignificant" , [CurrentCurrency]: Number(incomeAmount.value)}
              ] 
              : 
              [];
              LifeData.push(
                {
                  date: todaySDate,
                  expenses: [],
                  income: ifAmount,
                  averExpence: AEX,
                  averIncome: AIN,
                  workHours: Number(amountOfHours.value) || 0 ,
                  ratePerHour:  Number(ratePerHour.value) || lastRate,
                  salary: Number(salary.value) || 0 ,
              }
              )
}

incomeName.value = '';
 incomeAmount.value = '';
 amountOfHours.value = '';
 salary.value = '';
We.closeNewIncomePopup();
We.updateCharts();
 } else {
  alert("try again!!!")
 }
},
showGoalStatus() {
  let totalProgress = 0;

  goals.forEach(goals => {
    let generalAmount = 0;
    goals.data.forEach(elem=>{
      generalAmount += Number(elem.amount);
    })

      let progress = (bankAccountNumber / generalAmount) * 100;
      progress = Math.min(progress, 100); // Ensure progress is capped at 100%

      We.updateGoalProgress(goals.id, progress);
      totalProgress += progress;
  });
},
setGoalValues() {
  const imageUrl = document.getElementById("goalImge").value;
  
  const circleId = `circle-${Date.now()}`;
  We.createGoalElement(circleId, imageUrl, '');

  // Store in array & localStorage
  goals.push({ id: circleId, imageUrl , data: [] });
  We.closeGoalPopup();

},
createGoalElement(id, imageUrl, amount) {
  const circleWrapper = document.createElement("div");
  circleWrapper.classList.add("circle-wrapper");
  circleWrapper.setAttribute("id", id);
  circleWrapper.addEventListener("click", function() {
    We.unvailGoalsDetales(id)
  });

  // Circle with Background Image
  const circle = document.createElement("div");
  circle.classList.add("circle");
  circle.style.backgroundImage = `url(${imageUrl})`;
  circle.innerText = amount;
  circle.style.zIndex = "4";
 
  
  

  // Progress SVG
  const progressCircleWrapper = document.createElement("div");
  progressCircleWrapper.classList.add("progress-circle");

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "100");
  svg.setAttribute("height", "100");

  const circleProgress = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  circleProgress.classList.add("progress-bar");
  circleProgress.setAttribute("cx", "50");
  circleProgress.setAttribute("cy", "50");
  circleProgress.setAttribute("r", "45");
  circleProgress.setAttribute("stroke-dasharray", "282.74"); // Full circle
  circleProgress.setAttribute("stroke-dashoffset", "282.74"); // Initially empty

  svg.appendChild(circleProgress);
  progressCircleWrapper.appendChild(svg);

  // Append elements
  circleWrapper.appendChild(circle);
  circleWrapper.appendChild(progressCircleWrapper);
  document.getElementById("circleContainer").appendChild(circleWrapper);
},
unvailGoalsDetales(id) {
  goalSpacificContainer.style.display = "block";
  goalElementContainer.innerHTML = '';
  const element = goals.find(item => item.id === id);
  currentGoalId = id;
  We.loadGoalItems(element.data)

},
closeGoalDetails() {
  goalSpacificContainer.style.display = "none";
},
updateGoalProgress(circleId, progress) {
  const circleWrapper = document.getElementById(circleId);
  if (!circleWrapper) return;

  const progressBar = circleWrapper.querySelector(".progress-bar");
  if (!progressBar) return;

  const circumference = 282.74;
  const offset = circumference - (progress / 100) * circumference;
  progressBar.style.strokeDashoffset = offset;
},
loadGoalsFromStorage() {
  goals.forEach(circle => {
    let generalAmount = 0;
    circle.data.forEach(element => {
     generalAmount +=Number(element.amount);
    });
    We.createGoalElement(circle.id, circle.imageUrl, generalAmount); 
    });
},
loadGoalItems(element) {
 
  element.forEach(item => {
    We.createSpacificGoalItem(item.name, item.imageUrl , Number(item.amount));
  });
},
createSpacificGoalItem(name, imageUrl, amount ) {
  let container = document.getElementById('goalElementContainer');
  let item = document.createElement('div');
  item.classList.add('item');
  
  item.innerHTML = `
      <img src="${imageUrl}" alt="Image">
      <div class="info">
          <h3>${name}</h3>
          <p>Amount: <span class="amount">${amount}</span></p>
      </div>
      <div class="progress-bar"></div>
  `;

  item.addEventListener("click" , function go (){We.openUpdateSpacificGoal(name)} )
  
  container.appendChild(item);
  We.showSpacificsProgress ();
},
showSpacificsProgress (){
  let items = document.querySelectorAll('.item');
  let count = bankAccountNumber;
  items.forEach(item => {
      let amount = parseFloat(item.querySelector('.amount').textContent);
      let progressBar = item.querySelector('.progress-bar');
      let percentage = (count / amount) * 100;
      
      if (percentage > 100) percentage = 100;
      if (percentage < 0) percentage = 0;
      
      progressBar.style.width = percentage + '%';
      count -= amount;
  });
},
addSpacificGoal() {
  let name = document.getElementById('nameInput').value;
  let imageUrl = document.getElementById('imageInput').value;
  let amount = document.getElementById('amountInput').value;

  const itemId = `item-${Date.now()}`

  const elementId = goals.find(item => item.id === currentGoalId);
  elementId.data.push({name , imageUrl , amount: Number(amount) , id: itemId})
  
    We.createSpacificGoalItem(name, imageUrl,amount,);
      document.getElementById('addSpacificsPopup').style.display = 'none';

  
},
storeData(){
  localStorage.setItem("GOOOOL" , JSON.stringify(goals));
},
DeleteGoal(){
goals = goals.filter(item => item.id !== currentGoalId);
We.storeData();

},
changeBackgroundButton(id) {

document.getElementById('USD').style.border = (id === "USD") ? "1px solid red" : "1px solid black";
document.getElementById('EUR').style.border = (id === "EUR") ? "1px solid red" : "1px solid black";
document.getElementById('PLN').style.border = (id === "PLN") ? "1px solid red" : "1px solid black";
document.getElementById('MDL').style.border = (id === "MDL") ? "1px solid red" : "1px solid black";

document.getElementById('USD2').style.border = (id === "USD2") ? "1px solid red" : "1px solid black";
document.getElementById('EUR2').style.border = (id === "EUR2") ? "1px solid red" : "1px solid black";
document.getElementById('PLN2').style.border = (id === "PLN2") ? "1px solid red" : "1px solid black";
document.getElementById('MDL2').style.border = (id === "MDL2") ? "1px solid red" : "1px solid black";
CurrentCurrency = id.substring(0, 3);
},
ChangeExisting(id) {
document.getElementById("isItExisting").style.border = (id === "isItExisting" ) ? "1px solid red" : "1px solid black";
document.getElementById("isItNew").style.border = (id === "isItNew" ) ? "1px solid red" : "1px solid black";
document.getElementById("isItExisting2").style.border = (id === "isItExisting2" ) ? "1px solid red" : "1px solid black";
document.getElementById("isItNew2").style.border = (id === "isItNew2" ) ? "1px solid red" : "1px solid black";
if (id === "isItExisting"  ) {
  existingOrNewExpence = 1;
  const op = ["Food" , "Rent" , "Utilityes" , "Grooming" , "Internet" , "Car", "Clothes" , "Alcohol" , "Cigarets" , "Other" ]
  We.openOptions(op);
  
} else if(id === "isItExisting2") {
  existingOrNewExpence = 2;
  const op2 = ["Job","Investments","Business" , "Gift" , "Found"]
  We.openOptions(op2);
  
} else if(id === "isItNew") {
  existingOrNewExpence = 3;
} else {
  existingOrNewExpence = 4;
}
 
},
updateCharts(){
   AEX = 0;
   AIN = 0;
totalExpected = 0;
totalUnexpected = 0
totalIncome = 0;
totalExpenceADay = [];
totalIncomeADay = [];
dates = [];
totalHours = 0;
totalEarnedAtWork =
totalSpentEUR = 0;
totalSpentUSD = 0;
totalSpentPLN = 0;
totalSpentMDL = 0;
incomeLabels = {};
outcomeLabels = {};

 averInc = [];
 averExp = [];


 const a = calculateTotals(EUR, PLN, MDL, LifeData)


lineChart.data.labels = dates;
lineChart.data.datasets[0].data = totalExpenceADay;
lineChart.data.datasets[1].data = totalIncomeADay;

averageChrt.data.labels = dates;
averageChrt.data.datasets[0].data = averExp;
averageChrt.data.datasets[1].data = averInc;

pieExpenceChart.data.labels = Object.keys(outcomeLabels);
pieExpenceChart.data.datasets[0].data = Object.values(outcomeLabels);

incomePieChart.data.labels = Object.keys(incomeLabels);
incomePieChart.data.datasets[0].data = Object.values(incomeLabels);



 incomePieChart.update();
 pieExpenceChart.update();
 lineChart.update();
 averageChrt.update();
 console.log("LifeData[LifeData.length -1]")
console.log(LifeData[LifeData.length -1])
}

};
