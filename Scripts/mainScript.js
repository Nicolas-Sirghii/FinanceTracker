document.addEventListener("DOMContentLoaded", () => {
  We.loadGoalsFromStorage();
  We.loadBankData();
  We.calculateBankTotal();
  We.highlightDays();
});

function calculateSustainability(balance, averageOutcomePerDay) {
  // Calculate how many days you can sustain, including today
  const daysSustain = Math.floor(balance / averageOutcomePerDay);

  // Get the current date
  const startDate = new Date();

  // Calculate the end date by adding the days to the start date
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + daysSustain - 1);  // Subtract 1 to make the end date inclusive of today

  // Format the dates
  const startFormatted = startDate.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
  });

  const endFormatted = endDate.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
  });
  
  // console.log(`You can sustain living for ${daysSustain} days, from ${startFormatted}, until ${endFormatted}.`)

  return daysSustain
 
  
}






function createEachDayInfo() {
  const dayList =  document.getElementById("dayList");
  LifeData.forEach(element => {
   const dayContainer =  document.createElement("div");
   const weekDayContainer = document.createElement("div");
   const dayDate = document.createElement("div");
   const usdCalc = document.createElement("div");
   const eurCalc = document.createElement("div");
   const plnCalc = document.createElement('div');
   const mdlCalc = document.createElement('div');
  
   
   usdCalc.classList.add('usdCalc');
   eurCalc.classList.add('eurCalc');
   dayDate.classList.add("dayDate");
   plnCalc.classList.add('plnCalc');
   mdlCalc.classList.add('mdlCalc')
   
   weekDayContainer.classList.add("weekDayContainer");
   dayContainer.classList.add("dayContainer");

   dayContainer.addEventListener("click" ,function () {We.unveilTheDay(element)} )


   weekDayContainer.innerText = element.weekDay;
   dayDate.innerText = element.date;
   if (element.weekDay === "Sat") {
    weekDayContainer.style.backgroundColor = "rgb(192, 192, 31)";
   } else if (element.weekDay === "Sun"){
    weekDayContainer.style.backgroundColor = "red";
   }
   
  usdCalc.innerText =
  `Income : ${element.totalIncome}$
  Outcome : ${element.totalOutcome}$
  left : ${(element.totalIncome - element.totalOutcome).toFixed(2)}$`;
  eurCalc.innerText = 
  `Income : ${(element.totalIncome*EUR).toFixed(2)} EUR
  Outcome : ${(element.totalOutcome*EUR).toFixed(2)} EUR
  left : ${((element.totalIncome*EUR) - (element.totalOutcome*EUR)).toFixed(2)} EUR`;
 plnCalc.innerText = 
 `Income : ${(element.totalIncome*PLN).toFixed(2)} PLN
 Outcome : ${(element.totalOutcome*PLN).toFixed(2)} PLN
 left : ${((element.totalIncome*PLN) - (element.totalOutcome*PLN)).toFixed(2)} PLN`;
 mdlCalc.innerText = 
 `Income : ${(element.totalIncome*MDL).toFixed(2)} MDL
 Outcome : ${(element.totalOutcome*MDL).toFixed(2)} MDL
 left : ${((element.totalIncome*MDL) - (element.totalOutcome*MDL)).toFixed(2)} MDL`;

   
   dayContainer.append(weekDayContainer , dayDate , usdCalc,eurCalc,plnCalc,mdlCalc)
   dayList.append(dayContainer)
  });
}
createEachDayInfo();


function copyObject() {
  // The object to copy
  const lastThreeObjects = LifeData.slice(-3);
  const obj = LifeData;

   

  // Convert the object to a nicely formatted JSON string with indentation
  const jsonString = JSON.stringify(obj, null, 4); // The 4 here adds indentation

  // Try to use the Clipboard API first
  if (navigator.clipboard) {
    navigator.clipboard.writeText(jsonString).then(function() {
      alert("Object copied to clipboard in formatted JSON!");
    }).catch(function(err) {
      console.error("Error copying to clipboard: ", err);
      alert("Failed to copy object.");
    });
  } else {
    // Fallback for browsers that don't support the Clipboard API
    console.log("Clipboard API not supported, using fallback.");

    // Create a temporary textarea element to hold the text
    const textArea = document.createElement("textarea");
    textArea.value = jsonString;
    document.body.appendChild(textArea);
    textArea.select();  // Select the text

    // Try to copy to clipboard using the fallback method
    try {
      const successful = document.execCommand('copy');
      if (successful) {
        alert("Object copied to clipboard in formatted JSON!");
      } else {
        alert("Failed to copy object.");
      }
    } catch (err) {
      console.error("Fallback copy failed: ", err);
      alert("Failed to copy object.");
    }

    // Remove the temporary textarea
    document.body.removeChild(textArea);
  }
}


