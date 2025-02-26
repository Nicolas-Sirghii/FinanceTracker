const addCircle = document.getElementById("addCircle");
const popup = document.getElementById("popup");
const addButton = document.getElementById("addButton");
const cancelButton = document.getElementById("cancelButton");
const nameInput = document.getElementById("nameInput");
const imageInput = document.getElementById("imageInput");
const amountInput = document.getElementById("amountInput");
const header = document.querySelector(".header");

addCircle.addEventListener("click", () => {
    popup.style.display = "block";
});

cancelButton.addEventListener("click", () => {
    popup.style.display = "none";
});

addButton.addEventListener("click", () => {
    const name = nameInput.value;
    const imageUrl = imageInput.value;
    const amount = amountInput.value;

    
    if (name && imageUrl && amount) {
        const item = document.createElement("div");
        item.classList.add("item");
        
        const circle = document.createElement("div");
        circle.classList.add("circle");
        circle.style.backgroundImage = `url('${imageUrl}')`;
        circle.textContent = amount;
        
        item.appendChild(circle);
        header.appendChild(item);
        
        popup.style.display = "none";
        nameInput.value = "";
        imageInput.value = "";
        amountInput.value = "";
    }
});