    // Exchange rates against USD


    

   


function open2(id,dis,amo,tit,spa){
    targetAmount = amo;
    if (id === 'incomePopup') {
        const lastRate = (LifeData.length > 0) ? LifeData[LifeData.length -1].ratePerHour : 0;
        document.getElementById('ratePerHour').value = lastRate;
    }
    

    // Currency button logic
   const currencyButtons = document.querySelectorAll('.currency-btn');
    
   currencyButtons.forEach(function(button) {
       button.addEventListener('click', function() {
           // Check if the amount field is empty
           const amount = document.getElementById(`${targetAmount}`).value || 0;
           let salaryValue = document.getElementById('salaryId').value || 0;
           const fix = Number(document.getElementById(`${tit}`).innerText).toFixed(2);
           const fixedAmount = Number(fix);
           const currSpan = document.getElementById(`${spa}`);
           if (!(amount || salaryValue)) {
               alert('Please enter an amount first!');
               return;
           }
  
           // Remove 'selected' class from any previously selected currency button
           document.querySelectorAll('.currency-buttons .selected').forEach(function(btn) {
               btn.classList.remove('selected');
           });
  
           // Add 'selected' class to the clicked currency button
           button.classList.add('selected');
           amountTobeAdded = fix;
           chosenButton =  button.innerText.toLowerCase();
           
  

           
           // Get amount and convert to USD
           const numericAmount = parseFloat(amount);
           let convertedAmount = 0;
           let sal = salaryValue;
           if (button.id === 'eur-btn') {
               convertedAmount = fixedAmount / EUR;
               sal = salaryValue / EUR;
               currSpan.innerText = '-EUR';
               
           } else if (button.id === 'pln-btn') {
               convertedAmount = fixedAmount / PLN;
               sal = salaryValue / PLN;
               currSpan.innerText = '-PLN';
               
           } else if (button.id === 'mdl-btn') {
               convertedAmount = fixedAmount / MDL;
               sal = salaryValue / MDL;
               currSpan.innerText = '-MDL';
               
           }else if (button.id === 'usd-btn'){
            convertedAmount = fixedAmount;
            sal = salaryValue;
            currSpan.innerText = '-USD';
            
            
           }
  
           if (salaryValue) {
            document.getElementById('salaryId').value = convertedAmount.toFixed(2);
           } else {
            document.getElementById(`${amo}`).value = convertedAmount.toFixed(2);
           }
            
            
           
           
           
       });
   });
   
    We.openPopup(id,dis);
}


   
   

    

    function createOptionList(pop , nam ){
 // Dynamically generate list options from an array
 let listArray = [];
 if (nam === 'incomeName') {
    listArray = Object.keys(pieIncomeData);
   
 } else {
    listArray = Object.keys(pieOutcomeData);
  
 }
 const listOptionsArray = listArray;
 const listOptionsContainer = document.getElementById('list-options');
  listOptionsContainer.innerHTML = '';
 listOptionsArray.forEach(function(optionText) {
     const optionButton = document.createElement('button');
     optionButton.textContent = optionText;
     optionButton.classList.add('list-option');
     optionButton.addEventListener('click', function() {
         document.getElementById(`${nam}`).value = optionText;
         document.getElementById('list-popup').style.display = 'none'; // Close list popup
     });
     listOptionsContainer.appendChild(optionButton);
     We.openPopup(`${pop}`,'block')
 });
    }

    function amountTitle(inp , tit) {
      
        const inputValue = document.getElementById(`${inp}`).value;
        const titleText = document.getElementById(`${tit}`);
        titleText.innerText = inputValue;
    }

    function calculateHoursMoney(){
     const val = Number(document.getElementById("workedHours").value)  || 0;
     const rate = Number(document.getElementById("ratePerHour").value)  || 0;
     const titleText = document.getElementById('incTitle');
     document.getElementById('incomeAmount').value = Number((val*rate).toFixed(2));
     document.getElementById('incomeName').value = "Job";
     titleText.innerText = Number((val*rate).toFixed(2)) 

    }

