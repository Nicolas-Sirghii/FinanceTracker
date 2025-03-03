document.addEventListener("DOMContentLoaded", () => {
  We.loadGoalsFromStorage();
});

const result = calculateTotals(EUR, PLN, MDL, LifeData);

// Display totals
document.getElementById('totalExpected').textContent = result.totalExpected;
document.getElementById('totalUnexpected').textContent = result.totalUnexpected;
document.getElementById('totalIncome').textContent = result.totalIncome;
document.getElementById('totalEarnedAtWork').textContent = result.totalEarnedAtWork;
document.getElementById('averageIncome').textContent = result.averageIncome;
document.getElementById('averageOutcome').textContent = result.averageOutcome;

// Display income labels
const incomeLabelsContainer = document.getElementById('incomeLabels');
for (let label in result.incomeLabels) {
    const li = document.createElement('li');
    li.innerHTML = `${label}: $${result.incomeLabels[label]}`;
    incomeLabelsContainer.appendChild(li);
}

// Display outcome labels
const outcomeLabelsContainer = document.getElementById('outcomeLabels');
for (let label in result.outcomeLabels) {
    const li = document.createElement('li');
    li.innerHTML = `${label}: $${result.outcomeLabels[label]}`;
    outcomeLabelsContainer.appendChild(li);
}