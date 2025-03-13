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




