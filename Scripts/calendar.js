   // Array of month names
  
   function convertToDate(dateStr) {
    // Get the current year
    const currentYear = new Date().getFullYear();
    
    // Month abbreviations
    const monthMap = {
      Jan: 1,
      Feb: 2,
      Mar: 3,
      Apr: 4,
      May: 5,
      Jun: 6,
      Jul: 7,
      Aug: 8,
      Sep: 9,
      Oct: 10,
      Nov: 11,
      Dec: 12
    };
    
    // Split the input string by space and extract month and day
    const [monthAbbr, day] = dateStr.split(' ');
  
    // Get the numeric month value from the abbreviation
    const month = monthMap[monthAbbr];
  
    // Format the day to ensure it's two digits (e.g., '05' instead of '5')
    const formattedDay = day.padStart(2, '0');
    
    // Return the date in the format "YYYY-MM-DD"
    return `${currentYear}-${month.toString().padStart(2, '0')}-${formattedDay}`;
  }



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

        // Get the first day of the month (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
        const firstDay = new Date(2023, index, 1).getDay();

        // Add empty spaces before the first day of the month
        for (let i = 0; i < firstDay; i++) {
            const emptyDay = document.createElement("div");
            emptyDay.classList.add("day");
            daysContainer.appendChild(emptyDay);
        }

        // Add the actual days of the month
        for (let day = 1; day <= daysInMonth[index]; day++) {
            const dayElement = document.createElement("div");
            dayElement.classList.add("day");
            dayElement.textContent = day;
            const date = new Date(2023, index, day);
            dayElement.id = `${date}`.slice(4,10);
            dayElement.dataset.date = date.toISOString(); // Store the actual Date object in ISO format
            dayElement.addEventListener("click", () => {
                dayElement.classList.toggle("selected");
                if (chooseDate) {
                    We.choosePeriod(convertToDate(chosenDateBegining),convertToDate(`${date}`.slice(4,10)))
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
}

// Function to highlight the days from today to the entered number of days
function highlightDays() {
    const input = parseInt(document.getElementById("daysInput").value);
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
}

// Generate the calendar when the page loads
window.onload = generateCalendar;