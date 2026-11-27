
const days = [
    "Monday", "Tuesday", "Wednesday",
    "Thursday", "Friday", "Saturday", "Sunday"
];

const mealTypes = ["Breakfast", "Lunch", "Dinner"];

const meals = {};

let selectedCell = null;

// Initialize all meal slots
days.forEach(day => {
    meals[day] = {};

    mealTypes.forEach(type => {
        meals[day][type] = "";
    });
});

// Create the weekly timetable
function createTable() {
    const table = document.getElementById("mealTable");

    table.innerHTML = "";

    days.forEach(day => {
        const row = document.createElement("tr");

        const dayCell = document.createElement("th");
        dayCell.textContent = day;
        row.appendChild(dayCell);

        mealTypes.forEach(type => {
            const cell = document.createElement("td");

            cell.dataset.day = day;
            cell.dataset.type = type;
            cell.textContent = "—";

            cell.addEventListener("click", function () {
                selectCell(cell);
            });

            row.appendChild(cell);
        });

        table.appendChild(row);
    });
}

// Get the selected meal slot
function getSelectedCell() {
    const day = document.getElementById("day").value;
    const type = document.getElementById("mealType").value;

    return document.querySelector(
        `td[data-day="${day}"][data-type="${type}"]`
    );
}

// Select a meal slot
function selectCell(cell) {
    if (!cell) return;

    if (selectedCell) {
        selectedCell.classList.remove("selected");
    }

    selectedCell = cell;
    selectedCell.classList.add("selected");

    document.getElementById("day").value = cell.dataset.day;
    document.getElementById("mealType").value = cell.dataset.type;

    document.getElementById("mealInput").value =
        meals[cell.dataset.day][cell.dataset.type];
}

// Add a meal
function addMeal() {
    const mealInput = document.getElementById("mealInput");
    const meal = mealInput.value.trim();

    if (meal === "") {
        showMessage("Please enter a meal name!");
        return;
    }

    const cell = getSelectedCell();

    if (!cell) {
        showMessage("Please select a day and meal type!");
        return;
    }

    const day = cell.dataset.day;
    const type = cell.dataset.type;

    if (meals[day][type] !== "") {
        showMessage("Meal already exists. Use Replace Meal.");
        return;
    }

    meals[day][type] = meal;

    updateTable();

    mealInput.value = "";
    showMessage("Meal added successfully!");
}

// Replace an existing meal
function replaceMeal() {
    const meal = document.getElementById("mealInput").value.trim();

    if (meal === "") {
        showMessage("Please enter a meal name!");
        return;
    }

    const cell = getSelectedCell();

    if (!cell) return;

    const day = cell.dataset.day;
    const type = cell.dataset.type;

    if (meals[day][type] === "") {
        showMessage("No meal exists. Use Add Meal.");
        return;
    }

    meals[day][type] = meal;

    updateTable();

    document.getElementById("mealInput").value = "";
    showMessage("Meal replaced successfully!");
}

// Remove a meal
function removeMeal() {
    const cell = getSelectedCell();

    if (!cell) return;

    const day = cell.dataset.day;
    const type = cell.dataset.type;

    if (meals[day][type] === "") {
        showMessage("This meal slot is already empty.");
        return;
    }

    meals[day][type] = "";

    updateTable();

    document.getElementById("mealInput").value = "";
    showMessage("Meal removed successfully!");
}

// Update the timetable and counter
function updateTable() {
    let count = 0;

    days.forEach(day => {
        mealTypes.forEach(type => {
            const cell = document.querySelector(
                `td[data-day="${day}"][data-type="${type}"]`
            );

            const meal = meals[day][type];

            if (meal !== "") {
                cell.textContent = meal;
                cell.classList.add("filled");
                count++;
            } else {
                cell.textContent = "—";
                cell.classList.remove("filled");
            }
        });
    });

    document.getElementById("count").textContent = count;
}

// Show messages
function showMessage(message) {
    document.getElementById("message").textContent = message;
}

// Update selection when dropdowns change
document.getElementById("day").addEventListener("change", () => {
    selectCell(getSelectedCell());
});

document.getElementById("mealType").addEventListener("change", () => {
    selectCell(getSelectedCell());
});

// Start the application
createTable();
updateTable();
selectCell(getSelectedCell());
