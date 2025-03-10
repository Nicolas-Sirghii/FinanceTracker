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
let salaryVal = document.getElementById("salaryId").value;
 





  if((!name || !amount || !selectedCurrencyBtn)){
    if (!salaryVal) {
      alert('Please fill in all fields and select a currency!');
       return;
    } else {
        if (!selectedCurrencyBtn) {
          alert('Please select currency!');
          return;
      }
      }
     

  } 

  
const takeActual = LifeData[LifeData.length -1].actualFinanceStatement;
let actU = 0;


if (typ === "outcome") {
  document.getElementById(chosenButton).value =
   parseFloat(document.getElementById(chosenButton).value) - parseFloat(amountTobeAdded);
   actU =parseFloat((takeActual - parseFloat(amount)).toFixed(2));
} else {
  if (name === "Job") {
   actU = parseFloat((takeActual + parseFloat(amount)).toFixed(2));
  } else {
    if (salaryVal) {
      actU = LifeData[LifeData.length -1].actualFinanceStatement;
      
    } else{
         if (typ === "outcome") {
          actU = parseFloat((LifeData[LifeData.length -1].actualFinanceStatement - parseFloat(amount)).toFixed(2)) ;
         } else {
          actU = parseFloat((LifeData[LifeData.length -1].actualFinanceStatement + parseFloat(amount)).toFixed(2))  ;
         }
     
    }
    document.getElementById(chosenButton).value =
    parseFloat(document.getElementById(chosenButton).value) + parseFloat(amountTobeAdded);
  }
  
  
}
We.calculateBankTotal();

    document.getElementById(`${nam}`).value = '';
    document.getElementById(`${amo}`).value = '';
    document.querySelectorAll('.currency-buttons .selected').forEach(function(btn) {
        btn.classList.remove('selected');
    });

const lastObject = LifeData[LifeData.length -1];
let {countNumber,averageIncome,averageOutcome,ratePerHour,
  date,allTimeIncome,allTimeOutcome,}= lastObject;
let coutDay = countNumber;


if (dateToday.toISOString().split('T')[0] === date) {
  if (!salaryVal) {
    if ( lastObject[`${typ}`][name]) {
      lastObject[`${typ}`][name] += Number(amount);
    } else {
      lastObject[`${typ}`][name] = Number(amount);
    };
  }
 
  const a = allTimeOutcome + Number(amount);
  const b = allTimeIncome + Number(amount);
  lastObject.workHours += Number(document.getElementById('workedHours').value) || 0 ;
  lastObject.ratePerHour = Number(document.getElementById('ratePerHour').value) || ratePerHour;
  lastObject.averageIncome = (typ==="income") ? Number((b /coutDay).toFixed(2)): averageIncome;
  lastObject.averageOutcome = (typ==="outcome") ? Number((a  /coutDay).toFixed(2)) : averageOutcome;

  lastObject.salary = salaryVal ? (lastObject.salary + Number(document.getElementById('salaryId').value)) : 
  (Number(document.getElementById('salaryId').value) || 
  lastObject.salary) ;

  lastObject.allTimeIncome += parseFloat(((typ==="income") ? Number(amount): 0).toFixed(2));
  lastObject.allTimeOutcome += parseFloat(((typ==="outcome") ? Number(amount): 0).toFixed(2));
  lastObject.totalIncome += parseFloat(((typ==="income") ? Number(amount): 0).toFixed(2));
  lastObject.totalOutcome += parseFloat(((typ==="outcome") ? Number(amount): 0).toFixed(2));
  lastObject.MDLstatement = parseFloat(document.getElementById('mdl').value) || 0;
  lastObject.PLNstatement = parseFloat(document.getElementById('pln').value) || 0;
  lastObject.EURstatement = parseFloat(document.getElementById('eur').value) || 0;
  lastObject.USDstatement = parseFloat(document.getElementById('usd').value) || 0;
  lastObject.balanceInUSD = parseFloat(document.getElementById('usdTotal').innerText) || 0;
  lastObject.actualFinanceStatement = actU;
  lastObject.freedom = calculateSustainability(lastObject.actualFinanceStatement, lastObject.averageOutcome);
   

    
} else {

  coutDay ++

  const c = allTimeIncome + Number(amount);
  const d = allTimeOutcome + Number(amount);

  const gt = (typ==="outcome") ? Number((d/coutDay).toFixed(2)) : Number((allTimeOutcome/coutDay).toFixed(2));


  let theObj = {
    countNumber : coutDay ,
     date: dateToday.toISOString().split('T')[0],
     income: {},
     outcome: {},
     workHours: Number(document.getElementById('workedHours').value) || 0,
     ratePerHour: Number(document.getElementById('ratePerHour').value) || ratePerHour,
     averageOutcome: (typ==="outcome") ? Number((d/coutDay).toFixed(2)) : Number((allTimeOutcome/coutDay).toFixed(2)),
     averageIncome : (typ==="income") ? Number((c/coutDay).toFixed(2)) : Number((allTimeIncome/coutDay).toFixed(2)),
     salary: Number(document.getElementById('salaryId').value) || 0,
     allTimeIncome: parseFloat((allTimeIncome += (typ==="income") ? Number(amount): 0).toFixed(2)),
     allTimeOutcome: parseFloat((allTimeOutcome += (typ==="outcome") ? Number(amount): 0).toFixed(2)),
     totalIncome: parseFloat(((typ==="income") ? Number(amount): 0).toFixed(2)),
     totalOutcome: parseFloat(((typ==="outcome") ? Number(amount): 0).toFixed(2)),
     MDLstatement: parseFloat(document.getElementById('mdl').value) || 0,
     PLNstatement: parseFloat(document.getElementById('pln').value) || 0,
     EURstatement: parseFloat(document.getElementById('eur').value) || 0,
     USDstatement: parseFloat(document.getElementById('usd').value) || 0,
     balanceInUSD: parseFloat(document.getElementById('usdTotal').innerText) || 0,
     actualFinanceStatement: actU,
     freedom: calculateSustainability(actU, gt),
     
     
   }

   salaryVal || (theObj[typ][name] = Number(amount));
 LifeData.push(theObj)
}
document.getElementById("salaryId").value = '';
document.getElementById('workedHours').value = '';

 We.closePopup(id)

 forEachData();
 



perioudFrom = formatDate(LifeData[0].date);
perioudTo = formatDate(LifeData[LifeData.length -1].date);


We.highlightDays();




 
 console.log('.........LIFE...........')
 console.log(LifeData)
 console.log('........................')
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
  We.saveBankData()
  localStorage.setItem( "exchange",JSON.stringify(exchange))
  localStorage.setItem('LIFE' , JSON.stringify(LifeData));
},
DeleteGoal(){
goals = goals.filter(item => item.id !== currentGoalId);
We.storeData();

},
loadBankData() {
   document.getElementById('usd').value = lastElem .USDstatement;
   document.getElementById('eur').value = lastElem .EURstatement;;
   document.getElementById('mdl').value = lastElem .MDLstatement;
   document.getElementById('pln').value = lastElem .PLNstatement;
   document.getElementById('usdToEur').value = EUR;
   document.getElementById('usdToMdl').value = MDL;
   document.getElementById('usdToPln').value = PLN;
},
saveBankData() {

  const lastElement = LifeData[LifeData.length -1];

  lastElement.USDstatement = parseFloat(document.getElementById('usd').value) || 0;
  lastElement.EURstatement = parseFloat(document.getElementById('eur').value) || 0;
  lastElement.MDLstatement = parseFloat(document.getElementById('mdl').value) || 0;
  lastElement.PLNstatement = parseFloat(document.getElementById('pln').value) || 0;
  lastElement.balanceInUSD = parseFloat(document.getElementById('usdTotal').innerText || 0);

  exchange[0] = parseFloat(document.getElementById('usdToEur').value) || 0.91;
  exchange[1] = parseFloat(document.getElementById('usdToMdl').value) || 17.6;
  exchange[2] = parseFloat(document.getElementById('usdToPln').value) || 4.1;

},
calculateBankTotal() {
  // Get the values from the form inputs
  let usd = parseFloat(document.getElementById('usd').value) || 0;
  let eur = parseFloat(document.getElementById('eur').value) || 0;
  let mdl = parseFloat(document.getElementById('mdl').value) || 0;
  let pln = parseFloat(document.getElementById('pln').value) || 0;

  // Get the exchange rates from input fields
  let usdToEur = parseFloat(document.getElementById('usdToEur').value) || 0.91;
  let usdToMdl = parseFloat(document.getElementById('usdToMdl').value) || 17.6;
  let usdToPln = parseFloat(document.getElementById('usdToPln').value) || 4.1;

  // Convert all balances to USD
  let usdFromEur = eur / usdToEur;
  let usdFromMdl = mdl / usdToMdl;
  let usdFromPln = pln / usdToPln;

  // Calculate the total in USD
  let totalUsd = usd + usdFromEur + usdFromMdl + usdFromPln;

  // Convert the total USD to other currencies
  let totalEur = totalUsd * usdToEur;
  let totalMdl = totalUsd * usdToMdl;
  let totalPln = totalUsd * usdToPln;

  // Display the results
  document.getElementById('usdTotal').innerText = totalUsd.toFixed(2) + ' USD';
  document.getElementById('eurTotal').innerText = totalEur.toFixed(2) + ' EUR';
  document.getElementById('mdlTotal').innerText = totalMdl.toFixed(2) + ' MDL';
  document.getElementById('plnTotal').innerText = totalPln.toFixed(2) + ' PLN';

},
choosePeriod(from , to){
 
  function convertDate(dateStr) {
    // Define the current year
    const year = 2025;
    
    // Parse the input date string (month and day)
    const [monthName, day] = dateStr.split(" ");
    
    // Create a map of month names to month numbers (0-based index)
    const monthMap = {
        Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
        Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
    };
    
    // Create a new Date object using UTC to avoid timezone issues
    const date = new Date(Date.UTC(year, monthMap[monthName], parseInt(day)));
    
    // Format the date into "YYYY-MM-DD"
    const formattedDate = date.toISOString().split('T')[0];
    
    return formattedDate;
}

  const start = convertDate(from);
  const end = convertDate(to)

 
  const filteredData = LifeData.filter(item => {
    return item.date >= start && item.date <= end;
  });
 (filteredData.length > 0) && (LifeData = filteredData);

   perioudFrom = formatDate(LifeData[0].date);
   perioudTo = formatDate(LifeData[LifeData.length -1].date);
console.log("lifeData")
console.log(LifeData)
  
  We.highlightDays();
},
highlightDays() {
  const input = LifeData[LifeData.length -1].freedom;
  const today = new Date();
  const endDate = new Date(today);
  const t = (input <= 0)  ? (0) : (input-1);
  endDate.setDate(today.getDate() + t); // Calculate the end date (today + input days)
  // Clear previous highlights
  dayElements.forEach(dayElement => {
      dayElement.classList.remove("highlight");
      // console.log(dayElement.id)
  });
  // Highlight days within the range

  let start = false;
  let secondLoop = false;
  dayElements.forEach(dayElement => {

      if (`${today}`.slice(4,10) === dayElement.id) {
          dayElement.classList.add("highlight");
          start = true;
      }
      if (start) {
          dayElement.classList.add("highlight"); // Add the highlight class 
      }

      if (`${endDate}`.slice(4,10) === dayElement.id) {
          start = false;
      }
      
      if (dayElement.id === 'Dec 31' && start) {
          console.log('we need second loop')
          secondLoop = true;
      }
  });
  if (secondLoop) {
       dayElements.forEach(dayElement => {

      if (`${today}`.slice(4,10) === dayElement.id) {
          dayElement.classList.add("highlight");
      }
      if (start) {
          dayElement.classList.add("highlight"); // Add the highlight class 
      }

      if (`${endDate}`.slice(4,10) === dayElement.id) {
          start = false;
      }
      
  });
  }
},
openChart(id , typ){
document.getElementById(id).style.display = "block";
forEachData();

if (typ === "incomeVSoutcome") {
  lineChart.data.labels = graphLables;
lineChart.data.datasets[0].data = totalIncomeArray;
lineChart.data.datasets[1].data = totalOutcomeArray;
lineChart.update();
} else if (typ === "average"){
  lineChart.data.labels = graphLables;
  lineChart.data.datasets[0].data = averageOutcomeArray;
  lineChart.data.datasets[1].data = averageIncomeArray;
  lineChart.update();
}


},



};
