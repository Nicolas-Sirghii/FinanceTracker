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
     weekDay: getShortDayOfWeek(),
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

  const textInsideCircle = document.createElement("div");
  textInsideCircle.innerText = amount;
  textInsideCircle.classList.add('textInsideTheCircle');

  // Circle with Background Image
  const circle = document.createElement("div");
  circle.classList.add("circle");
  circle.style.backgroundImage = `url(${imageUrl})`;
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
  circleWrapper.appendChild(textInsideCircle);
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
  let countIt = bankAccountNumber;
  element.forEach(item => {
    countIt -=  Number(item.amount) ;
    We.createSpacificGoalItem(item.name, item.imageUrl , Number(item.amount) , countIt);
  });
},
createSpacificGoalItem(name, imageUrl, amount , countIt ) {

  
  let container = document.getElementById('goalElementContainer');
  let item = document.createElement('div');
  item.classList.add('item');
  let inf = document.createElement('div');
  inf.classList.add('acieving')

  if (countIt >= 0) {
    inf.innerText = "Achieved" 
    inf.style.color = 'green'
    inf.style.fontSize = "25px"
  } else {
    const a = Math.abs(countIt);
    inf.innerText =`${We.calculateEstimateAchieving(a , imageUrl)}. You need  ${a.toFixed(2)}$ more!`  ; 
    
  }
  
  item.innerHTML = `
      <img src="${imageUrl}" alt="Image">
      <div class="info">
          <h3>${name}</h3>
          <p>Amount: <span class="amount">${amount}</span></p>
      </div>
    
      <div class="progress-bar"></div>
  `;
  item.append(inf)

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


forEachData();
  
  We.highlightDays();

  We.openChart(actualChartId, actualChartType)
 
},
highlightDays() {
  const input = LifeData[LifeData.length -1].freedom;
  const today = new Date();
  const endDate = new Date(today);
  const t = (input <= 0)  ? (0) : (input-1);
  endDate.setDate(today.getDate() + t); // Calculate the end date (today + input days)

  const tod = new Date(today);
  const i = (input <= 0)  ? (0) : (1);
  tod.setDate(today.getDate() + i); 

  let start = false;
  let secondLoop = false;
  let overdo = false;
  dayElements.forEach(dayElement => {
    if (dayElement.id === yetToBe) {
      overdo = true;
    }
    if (dayElement.id === `${tod}`.slice(4,10)) {
      overdo = false;
    }
    if (overdo) {
      if (perioudTo !== `${tod}`.slice(4,10)) {
        dayElement.classList.add("toBeDone")
      }
    }

      if (`${tod}`.slice(4,10) === dayElement.id) {
          start = true;
        }
      if (start) {
          dayElement.classList.add("highlight"); // Add the highlight class 
      }
      if (`${endDate}`.slice(4,10) === dayElement.id) {
          start = false;
      }
      
      if (dayElement.id === 'Dec 31' && start) {
          secondLoop = true;
      }
  });
  if (secondLoop) {
       dayElements.forEach(dayElement => {

      if (`${tod}`.slice(4,10) === dayElement.id) {
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
actualChartId = id;
actualChartType = typ;
if (id) {
  document.getElementById(id).style.display = "flex";
forEachData();
const greenState = document.getElementById("graphLast");
const greenCalculate = document.getElementById("GraphLastOperation");
const redState = document.getElementById("graphLast2");
const redCalculate = document.getElementById("GraphLastOperation2");

if (typ === "perioudFreedome") {
  lineChart.data.labels = graphLables;
  lineChart.data.datasets[0].data = perioudFreedome;
  lineChart.data.datasets[1].data = [];

 

  const b = (perioudFreedome[perioudFreedome.length -1] - perioudFreedome[perioudFreedome.length -2]);

  greenState.innerText = perioudFreedome[perioudFreedome.length -1];
  greenCalculate.innerText = b > 0 ? `+${b}` :b;
  greenCalculate.style.color = Number(b) > 0 ? "green" : "red";


  redState.style.display = "none";
  redCalculate.style.display = "none";
  document.getElementById('expencePieContainer').style.display = "none"
  lineChart.update();
} else if (typ === "average"){
  lineChart.data.labels = graphLables;
  lineChart.data.datasets[0].data = averageIncomeArray;
  lineChart.data.datasets[1].data = averageOutcomeArray;


  const a = (averageIncomeArray[averageIncomeArray.length -1] - averageIncomeArray[averageIncomeArray.length -2]);
  const b = (averageOutcomeArray[averageOutcomeArray.length -1] - averageOutcomeArray[averageOutcomeArray.length -2]);

  greenState.innerText = averageIncomeArray[averageIncomeArray.length -1];
  greenCalculate.innerText = a > 0 ? `+${a.toFixed(2)}` : a.toFixed(2);
  greenCalculate.style.color = a > 0 ? "green" : "red";

  redState.innerText = averageOutcomeArray[averageOutcomeArray.length -1];
  redCalculate.innerText = b > 0 ? `+${b.toFixed(2)}` : b.toFixed(2);
  redCalculate.style.color = b > 0 ? "red" : "green";

  redState.style.display = "block";
  redCalculate.style.display = "block";

document.getElementById('expencePieContainer').style.display = "none"

  lineChart.update();
}else if (typ === 'actualVSbalance'){
  lineChart.data.labels = graphLables;
  lineChart.data.datasets[0].data = actual_statement;
  lineChart.data.datasets[1].data = balance_usd;

  
  const a = (actual_statement[actual_statement.length -1] - actual_statement[actual_statement.length -2]);
  const b = (balance_usd[balance_usd.length -1] - balance_usd[balance_usd.length -2]);
  

  greenState.innerText = actual_statement[actual_statement.length -1];
  greenCalculate.innerText = a > 0 ? `+${a.toFixed(2)}` : a.toFixed(2);
  greenCalculate.style.color = a > 0 ? "green" : "red";

  redState.innerText = balance_usd[balance_usd.length -1];
  redCalculate.innerText = b > 0 ? `+${b.toFixed(2)}` : b.toFixed(2);
  redCalculate.style.color = b > 0 ? "green" : "red";

  redState.style.display = "block";
  redCalculate.style.display = "block";
  document.getElementById('expencePieContainer').style.display = "none"
  lineChart.update();
}else if (typ === 'plnStatement'){
  lineChart.data.labels = graphLables;
  lineChart.data.datasets[0].data = pln_statement;
  lineChart.data.datasets[1].data = [];

  
  greenState.innerText = pln_statement[pln_statement.length -1];
  greenCalculate.innerText = (pln_statement[pln_statement.length -1] - pln_statement[pln_statement.length -2]).toFixed(2);
  greenCalculate.style.color = Number(greenCalculate.innerText) > 0 ? "green" : "red";

  redState.style.display = "none";
  redCalculate.style.display = "none";
  
document.getElementById('expencePieContainer').style.display = "none"
  lineChart.update();
}else if (typ === 'mdlStatement'){
  lineChart.data.labels = graphLables;
  lineChart.data.datasets[0].data = mdl_statement;
  lineChart.data.datasets[1].data = [];

  greenState.innerText = mdl_statement[mdl_statement.length -1];
  greenCalculate.innerText = (mdl_statement[mdl_statement.length -1] - mdl_statement[mdl_statement.length -2]).toFixed(2);
  greenCalculate.style.color = Number(greenCalculate.innerText) > 0 ? "green" : "red";

  redState.style.display = "none";
  redCalculate.style.display = "none";
  document.getElementById('expencePieContainer').style.display = "none"

  lineChart.update();
}else if (typ === 'eruStatement'){
  lineChart.data.labels = graphLables;
  lineChart.data.datasets[0].data = eur_statement;
  lineChart.data.datasets[1].data = [];

  greenState.innerText = eur_statement[eur_statement.length -1];
  greenCalculate.innerText = (eur_statement[eur_statement.length -1] - eur_statement[eur_statement.length -2]).toFixed(2);
  greenCalculate.style.color = Number(greenCalculate.innerText) > 0 ? "green" : "red";

  redState.style.display = "none";
  redCalculate.style.display = "none";
  document.getElementById('expencePieContainer').style.display = "none"
  lineChart.update();
}else if (typ === 'usdStatement'){
  lineChart.data.labels = graphLables;
  lineChart.data.datasets[0].data = usd_statement;
  lineChart.data.datasets[1].data = [];

  greenState.innerText = usd_statement[usd_statement.length -1];

  const b = (usd_statement[usd_statement.length -1] - usd_statement[usd_statement.length -2]);
  greenCalculate.innerText = b > 0 ? `+${b.toFixed(2)}` : b.toFixed(2);


  greenCalculate.style.color = Number(b) > 0 ? "green" : "red";

  redState.style.display = "none";
  redCalculate.style.display = "none";
  document.getElementById('expencePieContainer').style.display = "none"
  lineChart.update();
}else if (typ === 'freedome'){
  lineChart.data.labels = graphLables;
  lineChart.data.datasets[0].data = free;
  lineChart.data.datasets[1].data = [];

  const b = (free[free.length -1] - free[free.length -2]);

  greenState.innerText = free[free.length -1];
  greenCalculate.innerText = b > 0 ? `+${b}` :b;
  greenCalculate.style.color = Number(b) > 0 ? "green" : "red";


  redState.style.display = "none";
  redCalculate.style.display = "none";
  document.getElementById('expencePieContainer').style.display = "none"
  lineChart.update();
}else if (typ === 'hours'){
  lineChart.data.labels = graphLables;
  lineChart.data.datasets[0].data = HoursOfWork;
  lineChart.data.datasets[1].data = [];

  const b = (HoursOfWork[HoursOfWork.length -1] - HoursOfWork[HoursOfWork.length -2]);

  greenState.innerText = totalHoursOf;
  greenCalculate.innerText = b > 0 ? `+${b}` :b;
  greenCalculate.style.color = Number(b) > 0 ? "green" : "red";


  redState.style.display = "none";
  redCalculate.style.display = "none";
  document.getElementById('expencePieContainer').style.display = "none"
  lineChart.update();

}else if (typ === 'expences'){
  pieExpenceChart.data.labels = Object.keys(pieOutcomeData);
  pieExpenceChart.data.datasets[0].data = Object.values(pieOutcomeData);

  const sum = Object.values(pieOutcomeData).reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  const a = document.getElementById('pieNumber')
  a.innerText = 
  `${sum.toFixed(2)} $ 
  ${(sum*EUR).toFixed(2)} EUR 
  ${(sum*PLN).toFixed(2)} PLN 
  ${(sum*MDL).toFixed(2)} MDL`;
  a.style.color = "red";

document.getElementById('linearContainer').style.display = "none"
  pieExpenceChart.update();
}else if (typ === 'income'){
  pieExpenceChart.data.labels = Object.keys(pieIncomeData);
  pieExpenceChart.data.datasets[0].data = Object.values(pieIncomeData);

  const sum = Object.values(pieIncomeData).reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  const a = document.getElementById('pieNumber')
  a.innerText = 
  `${sum.toFixed(2)} $ 
  ${(sum*EUR).toFixed(2)} EUR 
  ${(sum*PLN).toFixed(2)} PLN 
  ${(sum*MDL).toFixed(2)} MDL`;
  a.style.color = "Green";
 
document.getElementById('linearContainer').style.display = "none"
  pieExpenceChart.update();
}else if(typ === 'expence/income') {
  lineChart.data.labels = graphLables;
  lineChart.data.datasets[0].data = totalIncomeArray;
  lineChart.data.datasets[1].data = totalOutcomeArray;

  const a = (totalIncomeArray[totalIncomeArray.length -1] - totalIncomeArray[totalIncomeArray.length -2]);
  const b = (totalOutcomeArray[totalOutcomeArray.length -1] - totalOutcomeArray[totalOutcomeArray.length -2]);
  

  greenState.innerText = totalIncomeArray[totalIncomeArray.length -1];
  greenCalculate.innerText = a > 0 ? `+${a.toFixed(2)}` : a.toFixed(2);
  greenCalculate.style.color = a > 0 ? "green" : "red";

  redState.innerText = totalOutcomeArray[totalOutcomeArray.length -1];
  redCalculate.innerText = b > 0 ? `+${b.toFixed(2)}` : b.toFixed(2);
  redCalculate.style.color = b > 0 ? "red" : "green";

  redState.style.display = "block";
  redCalculate.style.display = "block";
  document.getElementById('expencePieContainer').style.display = "none"
  lineChart.update();
}else if (typ === 'perioudAverage'){
  lineChart.data.labels = graphLables;
  lineChart.data.datasets[0].data = perioudIncomeAverage;
  lineChart.data.datasets[1].data = perioudOutcomeAverage;


  const a = (perioudIncomeAverage[perioudIncomeAverage.length -1] - perioudIncomeAverage[perioudIncomeAverage.length -2]);
  const b = (perioudOutcomeAverage[perioudOutcomeAverage.length -1] - perioudOutcomeAverage[perioudOutcomeAverage.length -2]);

  greenState.innerText = perioudIncomeAverage[perioudIncomeAverage.length -1];
  greenCalculate.innerText = a > 0 ? `+${a.toFixed(2)}` : a.toFixed(2);
  greenCalculate.style.color = a > 0 ? "green" : "red";

  redState.innerText = perioudOutcomeAverage[perioudOutcomeAverage.length -1];
  redCalculate.innerText = b > 0 ? `+${b.toFixed(2)}` : b.toFixed(2);
  redCalculate.style.color = b > 0 ? "red" : "green";

  redState.style.display = "block";
  redCalculate.style.display = "block";
  
document.getElementById('expencePieContainer').style.display = "none"

  lineChart.update();
}else if (typ === 'invest'){
  let lables = [];
  let statusS = [];
  let targetLine = [];
  LifeData.forEach(element => {
    if (element.investTarget) {
      lables.push(element.date);
    statusS.push(element.actualStatus);
    targetLine.push(element.investTarget);
    }
    
  });
  function procentCalculated2(total, part) {
    if (total === 0) return "0%"; // Avoid division by zero
    let percentage = (part / total) * 100;
    return  - percentage.toFixed(2) + "%";
  }

  

  lineChart.data.labels = lables;
  lineChart.data.datasets[0].data = statusS;
  lineChart.data.datasets[1].data = targetLine;

  greenState.innerText = LifeData[LifeData.length -1].actualStatus ? LifeData[LifeData.length -1].actualStatus : LifeData[LifeData.length -2].actualStatus;

  function getLasValue(arr , keyName) {
    for (let i = arr.length - 1; i >= 0; i--) {
      if (arr[i][keyName]) {
        return arr[i][keyName];
      }
    }
  }
    function getSecondLastValue(arr , keyName) {
      let count = 0;
      for (let i = arr.length - 1; i >= 0; i--) {
        if (arr[i][keyName]) {
          count++;
          if (count === 2) {
            return arr[i][keyName];
          }
        }
      }
      
    }
  
    greenCalculate.innerText = getLasValue(LifeData , 'actualStatus') - getSecondLastValue(LifeData , 'actualStatus')
    
 
  
  greenCalculate.style.color = Number(greenCalculate.innerText) > 0 ? "green" : "red";

  redState.style.display = "none";
  redCalculate.style.display = "none";
  document.getElementById('expencePieContainer').style.display = "none"


  
    const putGap = document.getElementById('linearContainer');
  const gap = document.createElement("div");
  gap.id = "gapBetween";
  gap.innerText = 
  `Gap
  ${-(targetLine[targetLine.length-1] - statusS[statusS.length - 1]).toFixed(2)}$
  ${procentCalculated2(targetLine[targetLine.length-1],(targetLine[targetLine.length-1] - statusS[statusS.length - 1]))}`  ;
  putGap.append(gap);
  
    const gggapStyle = document.getElementById("gapBetween");
    if ((-(targetLine[targetLine.length-1] - statusS[statusS.length - 1])) > 0) {
      gggapStyle.style.color = "rgb(160, 235, 160)"
    } else {
      gggapStyle.style.color = "rgb(243, 156, 145)"
    }
  

  lineChart.update();
}
  
  
}



},
closeChart(id){
  this.closePopup(id)
  actualChartId = '';
  const a = [
    'actualMoney','usd-balance','eur-balance','mdl-balance','pln-balance','freedome2','averr2','hourrr2','expence2',
    'income2','expence/income2',"freedome3",'averr3','investGraphButton'
  ]
  a.forEach(element => {
    document.getElementById(element).classList.remove('chosenGraph');
  });
  document.getElementById('gapBetween').style.display = "none";
},
highlightChosen(id, secId, typ){
const a = [
  'actualMoney','usd-balance','eur-balance','mdl-balance','pln-balance','freedome2','averr2','hourrr2','expence2',
    'income2','expence/income2',"freedome3",'averr3','investGraphButton'
]
a.forEach(element => {
  document.getElementById(element).classList.remove('chosenGraph');
});
 document.getElementById(id).classList.add('chosenGraph');
 We.openChart(secId, typ)
},
unveilTheDay(element){
  We.openPopup('dayPopup','flex');
  const container = document.getElementById('dayPopup');

    const data = element;
  
    // Populate the general financial information
    document.getElementById("date").textContent = data.date;
    document.getElementById("weekday").textContent = data.weekDay;
    document.getElementById("countNumber").textContent = data.countNumber;
    document.getElementById("workHours").textContent = `${data.workHours} hrs`;
    document.getElementById("ratePerHour").textContent = `${data.ratePerHour}`;
    document.getElementById("totalIncome").textContent = `$${data.totalIncome}`;
    document.getElementById("totalOutcome").textContent = `$${data.totalOutcome}`;
    document.getElementById("allTimeIncome").textContent = `$${data.allTimeIncome}`;
    document.getElementById("allTimeOutcome").textContent = `$${data.allTimeOutcome}`;
    document.getElementById("balanceInUSD").textContent = `$${data.balanceInUSD}`;
    document.getElementById("actualFinanceStatement").textContent = `$${data.actualFinanceStatement}`;
    document.getElementById("freedom").textContent = `${data.freedom} Days`;

   
    // Dynamically populate the expenses section with a forEach loop
    const expensesContainer = document.getElementById("expenses");
    expensesContainer.innerHTML= '';
    Object.entries(data.outcome).forEach(([expense, amount]) => {
        const expenseDiv = document.createElement("div");
        expenseDiv.style.fontSize = "13px"
        expenseDiv.innerHTML = `<span>${expense}:</span><span>${amount}$ ${(amount*EUR).toFixed(2)} EUR ${(amount*PLN).toFixed(2)} PLN ${(amount*MDL).toFixed(2)} MDL</span>`;
        expensesContainer.appendChild(expenseDiv);
    });

  
  


},
calculateEstimateAchieving(goalSum , imgUrl){
   // Calculate daily net income
 
   let dailyNetIncome =LifeData[LifeData.length -1].averageIncome - LifeData[LifeData.length -1].averageOutcome;

   // If daily net income is zero or negative, it's impossible to achieve the goal
   if (dailyNetIncome <= 0) {
       return "It is not possible to achieve the goal with the current income and spending.";
   }
 
   // Calculate the number of days to achieve the goal
   let daysNeeded = goalSum / dailyNetIncome;
 
   // Get today's date
   let currentDate = new Date();
 
   // Add the calculated days to today's date
   currentDate.setDate(currentDate.getDate() + Math.ceil(daysNeeded));
 
   // Format the future date to a readable string (Month Day, Year)
   let futureDate = currentDate.toLocaleDateString('en-US', {
       weekday: 'long',
       year: 'numeric',
       month: 'long',
       day: 'numeric'
   });

   let secondFutureDate = currentDate.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit'
});

  
document.getElementById(secondFutureDate) && document.getElementById(secondFutureDate).classList.add('goalToAcheve');
// Select the existing element
let existingElement ;
if (document.getElementById(secondFutureDate)) {
  existingElement = document.getElementById(secondFutureDate);
  existingElement.classList.add('tooltip-item');
}


// Create the tooltip element

const tooltip = document.createElement('div');
tooltip.classList.add('tooltip');
tooltip.innerText =
`You need ${goalSum.toFixed(2)} $ 
 to achieve this gool!` ;  // The text you want for the tooltip
tooltip.style.backgroundImage = `url(${imgUrl})`; 

// Append the tooltip to the existing element


existingElement && existingElement.appendChild(tooltip);



 
   // Return the message with the estimated number of days and the final date
   return `Estimated achieving is in ${Math.ceil(daysNeeded)} days. On ${futureDate}.`;
},
investCalculations(typ){
  
  const coment = document.getElementById('Comment');
  const url = document.getElementById('image_url_invest');
  const amount = document.getElementById('investementAmount');
  function addOnePercent(num) {
    let result = num + (num * 0.01);
    return Math.round(result * 100) / 100; // Ensures only 2 decimal places
}
function procentCalculated(total, part) {
  if (total === 0) return "0%"; // Avoid division by zero
  let percentage = (part / total) * 100;
  return percentage.toFixed(2) + "%";
}


  We.closePopup('investPopup')


  if (LifeData[LifeData.length -1].investTarget) {
    if (typ === "win") {
      const a = LifeData[LifeData.length -1].tradeAmount + Number(amount.value);
      LifeData[LifeData.length -1].prrrocent =  procentCalculated(LifeData[LifeData.length -2].actualStatus,a);
      LifeData[LifeData.length -1].comment = coment.value || LifeData[LifeData.length -1].comment;
      LifeData[LifeData.length -1].tradeAmount = Number(a.toFixed(2));
      LifeData[LifeData.length -1].actualStatus = Number((LifeData[LifeData.length -1].actualStatus + Number(amount.value)).toFixed(2));
      LifeData[LifeData.length -1].investUrl =  url.value ? dateToday.toISOString().split('T')[0] : '';
      LifeData[LifeData.length -1].investTarget = segodnea ? addOnePercent(LifeData[LifeData.length -1].investTarget) : LifeData[LifeData.length -1].investTarget;
  
      
    } else {
      const a = LifeData[LifeData.length -1].tradeAmount - Number(amount.value);
      LifeData[LifeData.length -1].prrrocent =  procentCalculated(LifeData[LifeData.length -2].actualStatus,a);
      LifeData[LifeData.length -1].comment = coment.value || LifeData[LifeData.length -1].comment;
      LifeData[LifeData.length -1].tradeAmount = Number(a.toFixed(2));
      LifeData[LifeData.length -1].actualStatus = Number((LifeData[LifeData.length -1].actualStatus - Number(amount.value)).toFixed(2));
      LifeData[LifeData.length -1].investUrl =  url.value ? dateToday.toISOString().split('T')[0] : '';
      LifeData[LifeData.length -1].investTarget =  segodnea ? addOnePercent(LifeData[LifeData.length -1].investTarget) : LifeData[LifeData.length -1].investTarget;
      
    }
    
  } else {

    function getLasValue(arr , keyName) {
      for (let i = arr.length - 1; i >= 0; i--) {
        if (arr[i][keyName]) {
          return arr[i][keyName];
        }
      }
      
    }
    
    const firstAmount = Number(amount.value)
    if (typ === "win") {
      const a = LifeData[LifeData.length -2].tradeAmount + Number(amount.value);
      LifeData[LifeData.length -1].prrrocent =  procentCalculated(LifeData[LifeData.length -3].actualStatus,firstAmount);
      LifeData[LifeData.length -1].comment = coment.value || 'No Comment !';
      LifeData[LifeData.length -1].tradeAmount = Number(firstAmount.toFixed(2));
      LifeData[LifeData.length -1].actualStatus = Number((getLasValue(LifeData , 'actualStatus') + Number(amount.value)).toFixed(2));
      LifeData[LifeData.length -1].investUrl =  url.value ? dateToday.toISOString().split('T')[0] : '';
      LifeData[LifeData.length -1].investTarget = addOnePercent(getLasValue(LifeData, 'investTarget'));
  
      
    } else {
      const a = LifeData[LifeData.length -2].tradeAmount - Number(amount.value);
      LifeData[LifeData.length -1].prrrocent =  procentCalculated(LifeData[LifeData.length -3].actualStatus,firstAmount);
      LifeData[LifeData.length -1].comment = coment.value || 'No Comment !';
      LifeData[LifeData.length -1].tradeAmount = Number(firstAmount.toFixed(2));
      LifeData[LifeData.length -1].actualStatus = Number((getLasValue(LifeData, 'actualStatus') - Number(amount.value)).toFixed(2));
      LifeData[LifeData.length -1].investUrl =  url.value ? dateToday.toISOString().split('T')[0] : '';
      LifeData[LifeData.length -1].investTarget = addOnePercent(getLasValue(LifeData, 'investTarget'));
      
    }

   
    
  }
 

  
 
  
  
},
openInvestComents(){
  We.openPopup('investmentComentContainer' , 'block')

  
    



    





  const container = document.getElementById('list_of_comments');
  container.innerHTML = ''
   let countId = 0;


  
  LifeData.forEach(element => {

    if (element.investTarget) {
      countId ++;
      const uniqueId = "element-" + countId ;
      const d = document.createElement("div");
      const c = document.createElement('div');
      const f = document.createElement('div');
      const am7 = document.createElement('div');
      f.classList.add('commentItemCont');
      c.id = `${uniqueId}`;
      d.classList.add("comentItem");
      am7.classList.add('commentAmount');
      am7.innerText = 
      `${element.date} ${element.tradeAmount}
       ${element.prrrocent}`;
      if (element.investUrl) {
       c.style.backgroundImage = `url('./investImages/${element.investUrl}.png')`;
       c.addEventListener("click" ,function(){We.scaleThePicture(`${uniqueId}`)})
       
      } else {
       c.style.backgroundImage = 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSkdGbj-QrUuNqhXP7DtY3-t8yD6H1Tk4uFg&s)';
      }
      
      c.classList.add('itemImageCom');
      f.innerText = element.comment;
      d.append(c , f , am7);
      container.append(d)
      if (element.tradeAmount >= 0) {
       d.style.backgroundColor = "green";
      } else {
       d.style.backgroundColor = 'brown';
      }
    }
    
  
  
  });
},
scaleThePicture(id){
  console.log(id)
  document.getElementById(id).classList.toggle('opendFinanceImage')
}



};


