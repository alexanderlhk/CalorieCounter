/**
 * /Users/alexanderlhk/Downloads/Web Development/Tutorial/FreeCodeCamp/CalorieCounter/script.js
 * This file contains the JavaScript code for a calorie counter web application.
 * It handles adding meal entries, validating input, calculating calories, and clearing the form.
 */

// --- DOM Element Selectors ---
const calorieCounter = document.getElementById('calorie-counter'); // The main form element.
const budgetNumberInput = document.getElementById('budget'); // Input for the daily calorie budget.
const entryDropdown = document.getElementById('entry-dropdown'); // Dropdown to select meal type.
const addEntryButton = document.getElementById('add-entry'); // Button to add new meal entries.
const clearButton = document.getElementById('clear'); // Button to clear all entries and reset the form.
const output = document.getElementById('output'); // Element to display the calorie calculation results.
let isError = false; // Flag to indicate if any input errors have occurred.

// --- Helper Functions ---

/**
 * Cleans an input string by removing plus signs, minus signs, and whitespace.
 * @param {string} str - The input string to clean.
 * @returns {string} The cleaned string.
 */
function cleanInputString(str) {
  const regex = /[+-\s]/g; // Regular expression to match +, -, and whitespace globally.
  return str.replace(regex, ''); // Replace all matches with an empty string.
}

/**
 * Checks if an input string contains an invalid scientific notation pattern.
 * @param {string} str - The input string to check.
 * @returns {RegExpMatchArray | null} The matched portion if invalid notation is found, otherwise null.
 */
function isInvalidInput(str) {
  const regex = /\d+e\d+/i; // Regular expression to match scientific notation (e.g., 1e2, 12e34), case-insensitive.
  return str.match(regex); // Returns the match if found, otherwise null.
}

// --- Meal Entry Management ---

/**
 * Adds a new entry (name and calorie input fields) to the selected meal type's container.
 */
function addEntry() {
  const targetInputContainer = document.querySelector(`#${entryDropdown.value} .input-container`); // Select the input container for the selected meal type.
  const entryNumber = targetInputContainer.querySelectorAll('input[type="text"]').length + 1; // Calculate the entry number (based on existing entries).
  const HTMLString = `
  <label for="${entryDropdown.value}-${entryNumber}-name">Entry ${entryNumber} Name</label>
  <input type="text" id="${entryDropdown.value}-${entryNumber}-name" placeholder="Name" />
  <label for="${entryDropdown.value}-${entryNumber}-calories">Entry ${entryNumber} Calories</label>
  <input
    type="number"
    min="0"
    id="${entryDropdown.value}-${entryNumber}-calories"
    placeholder="Calories"
  />`; // HTML string for a new entry (label and input fields).
  targetInputContainer.insertAdjacentHTML('beforeend', HTMLString); // Add the new entry HTML to the end of the container.
}

// --- Calorie Calculation ---

/**
 * Calculates the total calories consumed, burned, and remaining.
 * @param {Event} e - The submit event triggered by the form.
 */
function calculateCalories(e) {
  e.preventDefault(); // Prevent the default form submission behavior.
  isError = false; // Reset the error flag at the start of each calculation.

  // Select all calorie input fields for each meal type.
  const breakfastNumberInputs = document.querySelectorAll("#breakfast input[type='number']");
  const lunchNumberInputs = document.querySelectorAll("#lunch input[type='number']");
  const dinnerNumberInputs = document.querySelectorAll("#dinner input[type='number']");
  const snacksNumberInputs = document.querySelectorAll("#snacks input[type='number']");
  const exerciseNumberInputs = document.querySelectorAll("#exercise input[type='number']");

  // Get the calorie totals for each meal and budget.
  const breakfastCalories = getCaloriesFromInputs(breakfastNumberInputs);
  const lunchCalories = getCaloriesFromInputs(lunchNumberInputs);
  const dinnerCalories = getCaloriesFromInputs(dinnerNumberInputs);
  const snacksCalories = getCaloriesFromInputs(snacksNumberInputs);
  const exerciseCalories = getCaloriesFromInputs(exerciseNumberInputs);
  const budgetCalories = getCaloriesFromInputs([budgetNumberInput]); // Wrap budgetNumberInput in an array for consistency.

  if (isError) { // If an error occurred during input validation, exit the function.
    return;
  }

  // Calculate the total consumed calories, remaining calories, and determine surplus/deficit.
  const consumedCalories = breakfastCalories + lunchCalories + dinnerCalories + snacksCalories;
  const remainingCalories = budgetCalories - consumedCalories + exerciseCalories;
  const surplusOrDeficit = remainingCalories < 0 ? 'Surplus' : 'Deficit'; // Determine whether there's a surplus or deficit.

  // Update the output display with the calculation results.
  output.innerHTML = `
  <span class="${surplusOrDeficit.toLowerCase()}">${Math.abs(remainingCalories)} Calorie ${surplusOrDeficit}</span>
  <hr>
  <p>${budgetCalories} Calories Budgeted</p>
  <p>${consumedCalories} Calories Consumed</p>
  <p>${exerciseCalories} Calories Burned</p>
  `; // Display the remaining, budgeted, consumed, and exercise calories.

  output.classList.remove('hide'); // Show the output element.
}

/**
 * Calculates the total calories from a list of input elements.
 * @param {NodeListOf<HTMLInputElement> | HTMLInputElement[]} list - A list of input elements (or an array containing one input).
 * @returns {number | null} The total calories, or null if there's an invalid input.
 */
function getCaloriesFromInputs(list) {
  let calories = 0; // Initialize the calorie total.

  for (const item of list) { // Loop through each input item.
    const currVal = cleanInputString(item.value); // Clean the input string.
    const invalidInputMatch = isInvalidInput(currVal); // Check for invalid scientific notation.

    if (invalidInputMatch) { // If invalid input is found:
      alert(`Invalid Input: ${invalidInputMatch[0]}`); // Alert the user about the invalid input.
      isError = true; // Set the error flag.
      return null; // Return null to indicate an error.
    }
    calories += Number(currVal); // Add the calorie value to the total.
  }
  return calories; // Return the total calories.
}

// --- Form Clearing ---

/**
 * Clears all input fields and resets the output display.
 */
function clearForm() {
  const inputContainers = Array.from(document.querySelectorAll('.input-container')); // Select all input containers.

  for (const container of inputContainers) { // Loop through each input container.
    container.innerHTML = ''; // Clear all inner HTML of the container.
  }

  budgetNumberInput.value = ''; // Clear the budget input field.
  output.innerText = ''; // Clear the output display text.
  output.classList.add('hide'); // Hide the output element.
}

// --- Event Listeners ---

addEntryButton.addEventListener("click", addEntry); // Add event listener for addEntry button.
calorieCounter.addEventListener("submit", calculateCalories); // Add event listener for form submission (calorie calculation).
clearButton.addEventListener("click", clearForm); // Add event listener for clear button.
