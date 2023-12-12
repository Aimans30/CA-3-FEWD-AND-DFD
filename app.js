// Fetch a random meal from the API and display it
function fetchRandomMeal() {
  fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(response => response.json())
    .then(data => {
      const meal = data.meals[0];
      const mealImageURL = meal.strMealThumb;
      const mealName = meal.strMeal;

      // Display random meal image and name in the #randomMeal section
      document.getElementById('randomMeal').innerHTML = `
        <img src="${mealImageURL}" alt="Meal Image">
        <p>${mealName}</p>
      `;

      // Set up modal functionality for displaying meal ingredients
      const modal = document.getElementById('mealModal');
      const closeBtn = document.querySelector('.close');

      document.getElementById('randomMeal').addEventListener('click', () => {
        const ingredients = getIngredients(meal);
        displayIngredients(ingredients);
        modal.style.display = 'block';
      });

      closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
      });

      window.addEventListener('click', (event) => {
        if (event.target === modal) {
          modal.style.display = 'none';
        }
      });
    
      // Fetch meal categories and populate the category list
      // fetchMealCategories();
    })
    .catch(error => console.log('Error fetching random meal:', error));

  }
// Function to retrieve meal ingredients
function getIngredients(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    if (ingredient) {
      ingredients.push(ingredient);
    } else {
      break;
    }
  }
  return ingredients;
}

// Function to display meal ingredients in the modal
function displayIngredients(ingredients) {
  const ingredientList = document.getElementById('mealIngredients');
  ingredientList.innerHTML = '';
  ingredients.forEach(ingredient => {
    const listItem = document.createElement('li');
    listItem.textContent = ingredient;
    ingredientList.appendChild(listItem);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  fetchRandomMeal();
});

function searchByCategory() {
  const userInput = document.getElementById('categoryInput').value;
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${userInput}`)
      .then(response => response.json())
      .then(data => displaySearchedMealImages(data.meals))
      .catch(error => console.error('Error fetching meal images:', error));
}


// Function to display searched meal images and text below
function displaySearchedMealImages(meals) {
  const searchedMealContainer = document.getElementById('searchedMealContainer');
  searchedMealContainer.innerHTML = ''; // Clear previous images

  if (meals && meals.length > 0) {
    meals.forEach(meal => {
      const mealDiv = document.createElement('div');
      mealDiv.classList.add('meal-item');

      const mealImage = document.createElement('img');
      mealImage.src = meal.strMealThumb;
      mealImage.alt = meal.strMeal;
      mealImage.style.alignItems = 'center';

      const mealName = document.createElement('p');
      mealName.textContent = meal.strMeal;
      mealName.style.marginTop = '10px';
      mealName.style.marginLeft='1px'; // Adding margin top to the <p> tag

      mealDiv.appendChild(mealImage);
      mealDiv.appendChild(mealName);

      searchedMealContainer.appendChild(mealDiv);
    });
  } else {
    searchedMealContainer.innerHTML = 'No meal images found for this category.';
  }
}     