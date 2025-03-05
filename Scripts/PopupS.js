    // Exchange rates against USD
    const EUR = 0.9;
    const PLN = 4;
    const MDL = 18;

    

   


function open2(id,dis,amo,tit,spa){

    if (id === 'incomePopup') {
        const lastRate = (LifeData.length > 0) ? LifeData[LifeData.length -1].ratePerHour : 0;
        document.getElementById('ratePerHour').value = lastRate;
    }

    // Currency button logic
   const currencyButtons = document.querySelectorAll('.currency-btn');
    
   currencyButtons.forEach(function(button) {
       button.addEventListener('click', function() {
           // Check if the amount field is empty
           const amount = document.getElementById(`${amo}`).value;
           const fixedAmount = Number(document.getElementById(`${tit}`).innerText);
           const currSpan = document.getElementById(`${spa}`);
           if (!amount) {
               alert('Please enter an amount first!');
               return;
           }
  
           // Remove 'selected' class from any previously selected currency button
           document.querySelectorAll('.currency-buttons .selected').forEach(function(btn) {
               btn.classList.remove('selected');
           });
  
           // Add 'selected' class to the clicked currency button
           button.classList.add('selected');
  

           
           // Get amount and convert to USD
           const numericAmount = parseFloat(amount);
           let convertedAmount = 0;
           if (button.id === 'eur-btn') {
               convertedAmount = fixedAmount / EUR;
               currSpan.innerText = '-EUR';
               
           } else if (button.id === 'pln-btn') {
               convertedAmount = fixedAmount / PLN;
               currSpan.innerText = '-PLN';
               
           } else if (button.id === 'mdl-btn') {
               convertedAmount = fixedAmount / MDL;
               currSpan.innerText = '-MDL';
               
           }else if (button.id === 'usd-btn'){
            convertedAmount = fixedAmount;
            currSpan.innerText = '-USD';
            
           }
  
           document.getElementById(`${amo}`).value = convertedAmount.toFixed(2);
           
       });
   });
   
    We.openPopup(id,dis);
}


   
   

    

    function createOptionList(pop , nam ){
 // Dynamically generate list options from an array
 const listOptionsArray = ["Food", "Rent", "Car", "Grooming"];
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
