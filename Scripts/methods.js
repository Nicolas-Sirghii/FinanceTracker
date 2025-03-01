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
openSpacificsGoalPopup (name) {
  addSpacificsPopup.style.display = "block";
  console.log(name)
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
  if (type === 'expectedExpence') {
    
   if (name.value && amount.value && existingOrNewExpence && CurrentCurrency) {
    We.cancelNewExpencePopup()
    console.log('expectedExpence')
    console.log(CurrentCurrency)
    console.log(existingOrNewExpence)
     console.log( "go")

     const a = {
      date: dateToday.toISOString().split('T')[0],
      expenses: [
        {
          name: "rent",
          PLN: [0,10],
        },
        {
          name: "food",
          EUR: [4,0]
        }
      ],
      income:  [
              {
                name: "job",
                PLN: 30,
              },
              {
                name: "investments",
                EUR: 40
              },
              {
                name: "something",
                MDL: 280,   
              }
            ],
      workHours: [8,27
      ],
      salary: 0,
  }
  a.expenses.push({name: name.value , [CurrentCurrency]: [ Number(amount.value) , 0]})
  LifeData.push(a);

   } else {
    alert("you didn't click the necessary button !!")
   }
  } else {
    if (name.value && amount.value && existingOrNewExpence && CurrentCurrency) {
      We.cancelNewExpencePopup()
      console.log('UnexpectedExpence')
    console.log(CurrentCurrency)
    console.log(existingOrNewExpence)
    console.log( "go")
    } else {
      alert("you didn't click the necessary button !!")
    }
    
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
const targetButton = document.getElementById(id)
targetButton.style.border = "2px solid red";
CurrentCurrency = id.substring(0, 3);
},
ChangeExisting(id) {
const targetButton = document.getElementById(id)
targetButton.style.border = "2px solid red";
if (id === "isItExisting"  ) {
  existingOrNewExpence = 1;
  
} else if(id === "isItExisting2") {
  existingOrNewExpence = 2;
  
} else if(id === "isItNew") {
  existingOrNewExpence = 3;
} else {
  existingOrNewExpence = 4;
}
},

}