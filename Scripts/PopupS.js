    // Exchange rates against USD
    const EUR = 0.9;
    const PLN = 4;
    const MDL = 18;

    let selectedCurrency = null;

    // Close popup when the close button is clicked
    document.getElementById('close-btn').addEventListener('click', function() {
        document.getElementById('popup').style.display = 'none';
    });

    // Handle "Add" button click
    document.getElementById('add-btn').addEventListener('click', function() {
        const name = document.getElementById('name').value;
        const amount = document.getElementById('amount').value;
        const selectedCurrencyBtn = document.querySelector('.currency-buttons .selected');

        if (!name || !amount || !selectedCurrencyBtn) {
            alert('Please fill in all fields and select a currency!');
            return;
        }

        alert(`Added: Name = ${name}, Amount = ${amount}, Currency = ${selectedCurrencyBtn.textContent}`);
    });

    // Handle "Cancel" button click
    document.getElementById('cancel-btn').addEventListener('click', function() {
        document.getElementById('name').value = '';
        document.getElementById('amount').value = '';
        document.querySelectorAll('.currency-buttons .selected').forEach(function(btn) {
            btn.classList.remove('selected');
        });
    });

    // Currency button logic
    const currencyButtons = document.querySelectorAll('.currency-btn');
    
    currencyButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            // Check if the amount field is empty
            const amount = document.getElementById('amount').value;
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
            let convertedAmount = numericAmount;

            if (button.id === 'eur-btn') {
                convertedAmount = numericAmount / EUR;
            } else if (button.id === 'pln-btn') {
                convertedAmount = numericAmount / PLN;
            } else if (button.id === 'mdl-btn') {
                convertedAmount = numericAmount / MDL;
            }

            document.getElementById('amount').value = convertedAmount.toFixed(2);
        });
    });

    // List button logic - Show the List Popup
    document.getElementById('list-btn').addEventListener('click', function() {
        document.getElementById('list-popup').style.display = 'block';
        console.log("list")
    });

    // Dynamically generate list options from an array
    const listOptionsArray = ["Food", "Rent", "Car", "Grooming"];
    const listOptionsContainer = document.getElementById('list-options');

    listOptionsArray.forEach(function(optionText) {
        const optionButton = document.createElement('button');
        optionButton.textContent = optionText;
        optionButton.classList.add('list-option');
        optionButton.addEventListener('click', function() {
            document.getElementById('name').value = optionText;
            document.getElementById('list-popup').style.display = 'none'; // Close list popup
        });
        listOptionsContainer.appendChild(optionButton);
    });

    // Cancel button in the list popup - Close the list popup
    document.getElementById('list-cancel-btn').addEventListener('click', function() {
        document.getElementById('list-popup').style.display = 'none';
    });