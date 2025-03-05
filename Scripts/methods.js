const We = {
updateGoalBackground(){
  const elementId = goals.find(item => item.id === currentGoalId);
  elementId.imageUrl = UpdateGoalImge.value || elementId.imageUrl;
  UpdateCircle.style.display = "none";
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
openUpdateSpacificGoal(id){
  updateSpacificGoal.style.display = "block";
  const goal = goals.find(item => item.id === currentGoalId);
  const elementId = goal.data.find(item => item.name === id);
  currentSpacificGoal = elementId;
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
openPopup(id , dis) {
  document.getElementById(id).style.display = `${dis}`;
},
closePopup(id){
  document.getElementById(id).style.display = "none";
},



addSomething(nam , amo , typ , id){
  // Handle "Add" button click
const name = document.getElementById(`${nam}`).value;
const amount = document.getElementById(`${amo}`).value;
const selectedCurrencyBtn = document.querySelector('.currency-buttons .selected');



if (!name || !amount || !selectedCurrencyBtn) {
    alert('Please fill in all fields and select a currency!');
    return;
}

alert(`Added: Name = ${name}, Amount = ${amount}, Currency = ${selectedCurrencyBtn.textContent}`);

    document.getElementById(`${nam}`).value = '';
    document.getElementById(`${amo}`).value = '';
    document.querySelectorAll('.currency-buttons .selected').forEach(function(btn) {
        btn.classList.remove('selected');
    });



if (dateToday.toISOString().split('T')[0] === LifeData[LifeData.length -1].date) {
  if (LifeData[LifeData.length -1][`${typ}`][name]) {LifeData[LifeData.length -1][`${typ}`][name] += Number(amount);} else {LifeData[LifeData.length -1][`${typ}`][name] = Number(amount);};
} else {
  const a = (typ==="income") ? 
  {
      "countNumber" : LifeData[LifeData.length -1].countNumber ++ ,
      "date": dateToday.toISOString().split('T')[0],
      "income": {
        [name]: amount
      },
      "outcome": {},
      "workHours": 0,
      "ratePerHour": 3,
      "averageOutcome": 0,
      "averageIncome" : 0,
      "salary": 0
  } : 
  {
     "countNumber" : LifeData[LifeData.length -1].countNumber ++ ,
      "date": dateToday.toISOString().split('T')[0],
      "income": {},
      "outcome": {
        [name]: amount
      },
      "workHours": 0,
      "ratePerHour": 3,
      "averageOutcome": 0,
      "averageIncome" : 0,
      "salary": 0
  };

  LifeData.push(a)
}

console.log(LifeData)
 We.closePopup(id)
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
  We.closePopup('GoalPopup');

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

  console.log(goals)
},
storeData(){
  localStorage.setItem("GOOOOL" , JSON.stringify(goals));
},
DeleteGoal(){
goals = goals.filter(item => item.id !== currentGoalId);
We.storeData();

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
