
const button = document.querySelector('#menu-button');
const menu = document.querySelector('#menu');


button.addEventListener('click', () => {
  menu.classList.toggle('hidden');
});

let inputValue;
const loadFood = (inputValue) => {
  let inputText = document.getElementById("food-items");
  inputText.innerHTML="Food Items : "+inputValue;
  let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`
  fetch(url)
      .then(res => res.json())
      .then(data => showMeals(data.meals))
      .catch(error => console.log('Error: ', error));
}

loadFood(inputValue);

const showMeals = (meals) => {
  // console.log('Data is: ', meals);
  let container = document.getElementById("result-container");
  container.innerHTML = '';
  meals.forEach(meal => {
      let mealCard = document.createElement('div');    
      mealCard.classList = 'card card-compact bg-base-100 shadow-xl';
      
      mealCard.innerHTML = `
          <figure>
              <img src=${meal.strMealThumb} alt="Image of ${meal.strMeal}" />
          </figure>
          <div class="card-body">
              <h2 class="card-title">${meal.strMeal}</h2>
              <p title="${meal.strInstructions}" >${meal.strInstructions.slice(0,100)}...</p>
              <div class="card-actions justify-end">
                  <button onclick="handleShowDetails(${meal.idMeal})" class="btn w-full bg-[#F18B6A] text-white">Show Details</button>
              </div>
          </div>   
      `;
  container.appendChild(mealCard);
  });
}
const handleShowDetails = (mealId) =>{
  let url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
  fetch(url)
      .then(res => res.json())
      .then(data => showMealDetails(data.meals[0]))
      .catch(error => console.log('Error: ', error));
}

const showMealDetails = meal => {
  // console.log('Meal Details: ', meal);

  const showDetailsContainer = document.getElementById("meal-details-cotainer");
  showDetailsContainer.innerHTML = `
    <img class="h-96 mx-auto" src="${meal.strMealThumb}" alt="meal details image">
    <p class="mt-4 text-2xl text-semibild">Name: ${meal.strMeal}</p>
    <p class="mt-4 text-2xl text-semibild">Food Category: ${meal.strCategory}</p>
    <p class="text-semibild">Description: ${meal.strInstructions}</p>
    <p class="text-semibild pt-4 hover:cursor-pointer">More Details: <span class="text-blue-600">
       <a href="${meal.strSource}" target="_blank">${meal.strSource} </a> 
    </span></p>
    <p class="text-semibild pt-4 hover:cursor-pointer"> 
    <i class="fa-brands fa-youtube"></i> Watch Video: <span class="text-blue-600">
       <a href="${meal.strYoutube}" target="_blank">${meal.strYoutube} </a> 
    </span></p>
  `
  show_meal_details.showModal();    
}
window.onload = function() {
  let container = document.getElementById("btn-Potato");
  container.click();
  //loadFood('Potato');
};