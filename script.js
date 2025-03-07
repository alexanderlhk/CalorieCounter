const calorieCounter = document.getElementById('calorie-counter');
const budgetNumberInput = document.getElementById('budget');
const entryDropdown = document.getElementById('entry-dropdown');
const addEntryButton = document.getElementById('add-entry');
const clearButton = document.getElementById('clear');
const output = document.getElementById('output');
let isError = false;

/**
 * Removes plus signs, minus signs, and whitespace from a string.
 * @param {string} str - The string to clean.
 * @returns {string} The cleaned string.
 */
function cleanInputString(str) {
  const regex = /[+-\s]/g; // Regular expression to match +, -, and whitespace.
  return str.replace(regex, ''); // Replace matched characters with an empty string.
}

/**
 * Checks if a string contains an invalid scientific notation pattern (e.g., "123e45").
 * @param {string} str - The string to check.
 * @returns {RegExpMatchArray | null} Returns the matched part if invalid scientific notation is found, otherwise null.
 */
function isInvalidInput(str) {
  const regex = /\d+e\d+/i; // Regular expression to match scientific notation (e.g., 1e2, 12e34). /i for case-insensitive
  return str.match(regex); // Returns null if no match found
}

/**
 * Adds a new entry (name and calories) input field to the selected entry type.
 */
function addEntry() {
  const targetInputContainer = document.querySelector(`#${entryDropdown.value} .input-container`); // Select the input container based on the dropdown value.
  const entryNumber = targetInputContainer.querySelectorAll('input[type="text"]').length + 1; // Count existing entries and increment for the new entry.
  const HTMLString = `
  <label for="${entryDropdown.value}-${entryNumber}-name">Entry ${entryNumber} Name</label>
  <input type="text" id="${entryDropdown.value}-${entryNumber}-name" placeholder="Name" />
  <label for="${entryDropdown.value}-${entryNumber}-calories">Entry ${entryNumber} Calories</label>
  <input
    type="number"
    min="0"
    id="${entryDropdown.value}-${entryNumber}-calories"
    placeholder="Calories"
  />`; // HTML string for a new entry.
  targetInputContainer.insertAdjacentHTML('beforeend', HTMLString); // Insert the new entry HTML at the end of the container.
}

/**
 * Calculates the total calories from the input fields.
 * @param {Event} e - The event object.
 */
function calculateCalories(e) {
  e.preventDefault(); // Prevents default form submission behaviour
  isError = false; // Reset the error flag for each calculation.

  const breakfastNumberInputs = document.querySelectorAll("#breakfast input[type='number']"); // Select all calorie input fields in breakfast section
  // ... (more code would go here to select other meals, and use getCaloriesFromInputs. but its missing here)

}

/**
 * Gets the total calories from a list of input elements.
 * @param {NodeListOf<HTMLInputElement>} list - A list of input elements (e.g., from querySelectorAll).
 * @returns {number | null} The total calories, or null if there's an invalid input.
 */
function getCaloriesFromInputs(list) {
  let calories = 0;

  for (const item of list) {
    const currVal = cleanInputString(item.value); // Clean the input string.
    const invalidInputMatch = isInvalidInput(currVal); // Check for invalid scientific notation.

    if (invalidInputMatch) {
      alert(`Invalid Input: ${invalidInputMatch[0]}`); // Alert the user about the invalid input.
      isError = true; // Set the error flag.
      return null; // Return null to indicate an error.
    }
    calories += Number(currVal); // Add the calorie value to the total.
  }
  return calories; // Return the total calories.
}

addEntryButton.addEventListener("click", addEntry); // Add event listener for addEntry button.
