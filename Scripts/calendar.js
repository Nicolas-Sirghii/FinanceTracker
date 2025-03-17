


   const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

// Days of the week
const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Array of days in each month (non-leap year)
const daysInMonth = [
    31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31
];

// Array to store all the day elements for easier manipulation
let dayElements = [];

// Function to generate the calendar
function generateCalendar() {

    
    const calendarContainer = document.getElementById("calendar");
    dayElements = []; // Clear the array before regenerating the calendar

    months.forEach((month, index) => {
        const monthContainer = document.createElement("div");
        monthContainer.classList.add("month");

        const monthTitle = document.createElement("div");
        monthTitle.classList.add("month-name");
        monthTitle.textContent = month;
        monthContainer.appendChild(monthTitle);

        const daysContainer = document.createElement("div");
        daysContainer.classList.add("days");

        // Adding the days of the week
        daysOfWeek.forEach(day => {
            const dayName = document.createElement("div");
            dayName.classList.add("day");
            dayName.textContent = day;
            daysContainer.appendChild(dayName);
        });

        const currentYear = new Date().getFullYear();
        

        // Get the first day of the month (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
        const firstDay = new Date(currentYear, index, 1).getDay();

        // Add empty spaces before the first day of the month
        for (let i = 0; i < firstDay; i++) {
            const emptyDay = document.createElement("div");
            emptyDay.classList.add("day");
            daysContainer.appendChild(emptyDay);
        }

        // Add the actual days of the month
        let nextSelect = false;
        for (let day = 1; day <= daysInMonth[index]; day++) {
            const dayElement = document.createElement("div");
            dayElement.classList.add("day");
            dayElement.textContent = day;
            const date = new Date(2023, index, day);
            dayElement.id = `${date}`.slice(4,10);
            dayElement.dataset.date = date.toISOString(); // Store the actual Date object in ISO format

            
            if (dayElement.id === perioudFrom) {
                dayElement.classList.add("passed")
                startLife = true; 
            }
            if (dayElement.id === perioudTo) {
                dayElement.classList.add("passed")
                startLife = false;  
            }
            if (startLife) {
                dayElement.classList.add("passed")
            }
            dayElement.addEventListener("click", () => {

                if (clearChosen) {
                    
                     clearTheBorders();

                    clearChosen = false; 
                }
             
                dayElement.classList.toggle("selected");
                if (chooseDate) {
                    clearChosen = true;
                     We.choosePeriod(chosenDateBegining , `${date}`.slice(4,10))
                    dayElements.forEach(element => {
                        if (element.id === chosenDateBegining) {
                            chosenStart = true;
                        }else if (element.id === `${date}`.slice(4,10)){
                            chosenStart = false;
                        }
                       
                        if (chosenStart) {
                            element.classList.add("selected")
                            if (element.id === "Dec 31") {
                                chooseSecondLoop = true;
                            }
                           
                        }
                    });
                    if (chooseSecondLoop) {
                        dayElements.forEach(element => {
                           
                             if (element.id === `${date}`.slice(4,10)){
                                chosenStart = false;
                            }
                           
                            if (chosenStart) {
                                element.classList.add("selected")
                            }
                        });
                    }
                    chosenDateBegining = '';
                    
                } else{
                    chosenDateBegining = `${date}`.slice(4,10);
                }
                chooseDate = !chooseDate;
               
                
                
            });
            daysContainer.appendChild(dayElement);
            dayElements.push(dayElement); // Store the day element
        }
        function clearTheBorders() {
            LifeData = JSON.parse(localStorage.getItem("LIFE"));
            dayElements.forEach(element => {
                element.classList.remove("selected")
            });
        }
        // Ensure that the remaining empty cells fill the grid to make 7 rows
        const remainingDays = 7 - (daysInMonth[index] + firstDay) % 7;
        for (let i = 0; i < remainingDays && remainingDays !== 7; i++) {
            const emptyDay = document.createElement("div");
            emptyDay.classList.add("day");
            daysContainer.appendChild(emptyDay);
        }

        monthContainer.appendChild(daysContainer);
        calendarContainer.appendChild(monthContainer);
    });
    We.highlightDays();
}

// Generate the calendar when the page loads
window.onload = generateCalendar;


