// ! navbar open and close //

$(document).ready(function () {
    $('.open-close-icon').on('click', function () {
        if ($('.navbar').hasClass('open')) {
            CloseNavbar();
        } else {
            OpenNavbar();
        }
    });
});

function OpenNavbar() {
    $('.navbar').animate({
        left: '0'
    }, 500);
    $('.navout').animate({
        left: '250px'
    }, 500);
    $('.navbar').addClass('open');
    $('.open-close-icon').removeClass('fa-align-justify').addClass('fa-x');
    animateNavbarItems(true);
}
function CloseNavbar() {
    $('.navbar').animate({
        left: '-250px'
    }, 500);
    $('.navout').animate({
        left: '0'
    }, 500);
    $('.navbar').removeClass('open');
    $('.open-close-icon').removeClass('fa-x').addClass('fa-align-justify');
    animateNavbarItems(false);
}
function animateNavbarItems(open) {
    if (open) {
        for (let i = 0; i < 5; i++) {
            $('.links ul li').eq(i).animate({
                top: 0
            }, (i + 5) * 100);
        }
    } else {
        for (let i = 0; i < 5; i++) {
            $('.links ul li').eq(i).animate({
                top: '100px'
            }, (i + 5) * 100);
        }
    }
}
// ! end  navbar open and close //

let Row = document.getElementById("Row");
// ! show foods col-lg-3
function ShowFood(card) {
    Row.classList.remove('d-none');
    let cartona = ``;
    for (let i = 0; i < card.length; i++) {
        cartona += `
        <div class="col-lg-3">
                    <div
                        class="card position-relative overflow-hidden rounded-3">
                        <div class="image">
                            <img src="${card[i].strMealThumb}" alt="" srcset=""
                                class="w-100 d-block">
                        </div>
                        <div class="title">
                            <h3 class="text-capitalize">${card[i].strMeal}</h3>
                        </div>
                    </div>
                </div>
        `
    }
    Row.innerHTML = cartona;
}
// ! End show foods col-lg-3

let searchBox = document.getElementById("searchBox");
// ! start show search page
function ShowSearch() {
    CloseNavbar();
    searchBox.classList.remove('d-none');
    searchBox.innerHTML = `
    <div class="row g-3">
                <div class="col-lg-6">
                    <input onkeyup="SearchName(this.value)" class="form-control me-2  bg-transparent "
                        type="search" placeholder="Search By Name">
                </div>
                <div class="col-lg-6">
                    <input onkeyup="SearchLetter(this.value)" class="form-control me-2  bg-transparent"
                        type="search" placeholder="Search By First Letter"
                        maxlength="1">
                </div>
            </div>
    `
    Row.innerHTML = ""
}
// ! end show search page

// ! start  in search by name
async function SearchName(word) {
    Row.classList.add('d-none');
    const responseApi = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${word}`)
    const response = await responseApi.json();
    if (response.meals) {
        ShowFood(response.meals);
    } else {
        ShowFood([]);
    }
}
// ! end in search by name

// ! start in search by letter
async function SearchLetter(letter) {
    Row.classList.add('d-none');
    const responseApi = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
    const response = await responseApi.json();
    if (response.meals) {
        ShowFood(response.meals);
    } else {
        ShowFood([]);
    }
}
// ! end in search by letter

// ! Start MealId
async function MealId(ID) {
    Row.classList.add("d-none");
    const responseApi = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ID}`);
    const response = await responseApi.json();
    ShowDetails(response.meals[0]);
}
// ! End MealId




// ! start Category
async function Category() {
    CloseNavbar();
    Row.classList.add('d-none');
    searchBox.classList.add('d-none');
    let responseApi = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    let response = await responseApi.json();
    // console.log(response)
    ShowCategory(response);
}

// ! end Category

// ! start Show Category
function ShowCategory(response) {
    Row.classList.remove('d-none');
    let cartona = ``
    for (let i = 0; i < response.categories.length; i++) {
        let shortDescription = response.categories[i].strCategoryDescription.split(" ").slice(0, 30).join(" ");
        cartona += `
        <div class="col-lg-3">
                    <div
                        class="card position-relative overflow-hidden rounded-3" onclick="FilterCategory('${response.categories[i].strCategory}')")">
                        <div class="image">
                            <img src="${response.categories[i].strCategoryThumb}" alt=""
                                class="w-100 d-block">
                        </div>
                        <div class="titleCategory">
                            <h3 class="text-center">${response.categories[i].strCategory}</h3>
                            <div class="description">
                                <p>${shortDescription}</p>
                            </div>
                        </div>
                    </div>
                </div>
        `
    }
    Row.innerHTML = cartona;
}

// ! end Show Category

// ! Filter by Category
async function FilterCategory(Category) {
    Row.classList.add("d-none");
    const responseApi = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${Category}`);
    const response = await responseApi.json();
    ShowFood(response.meals);
}

// ? ---------------------------------------- ?//

// ! Start Area
async function Area() {
    CloseNavbar();
    Row.classList.add('d-none');
    searchBox.classList.add('d-none');
    const responseApi = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    const response = await responseApi.json();
    ShowArea(response);
}
// ! end Area

// ! start ShowArea
function ShowArea(response) {
    Row.classList.remove('d-none');
    let cartona = ``
    for (let i = 0; i < response.meals.length; i++) {
        cartona += `
        <div class="col-lg-3">
                    <div class="home" onclick="FilterArea('${response.meals[i].strArea}')")>
                        <i class="fa-solid fa-house-laptop"></i>
                        <h3>${response.meals[i].strArea}</h3>
                    </div>
                </div>
        `
    }
    Row.innerHTML = cartona;
}
// ! end ShowArea

// ! Filter by Area
async function FilterArea(Area) {
    Row.classList.add("d-none");
    const responseApi = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${Area}`);
    const response = await responseApi.json();
    ShowFood(response.meals);
}
// ? ---------------------------------------- ?//

// ! start Ingredients
async function Ingredients() {
    CloseNavbar();
    Row.classList.add('d-none');
    searchBox.classList.add('d-none');
    const responseApi = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    const response = await responseApi.json();
    ShowIngredients(response);
}
// ! end Ingredients

// ! start Show Ingredients
function ShowIngredients(response) {
    Row.classList.remove('d-none');
    let cartona = ``;
    for (let i = 0; i < response.meals.length; i++) {
        if (response.meals[i].strDescription) {
            let shortDescription = response.meals[i].strDescription.split(" ").slice(0, 30).join(" ");
            cartona += `
            <div class="col-lg-3">
                <div class="cards"onclick="FilterIngredients('${response.meals[i].strIngredient}')") >
                    <i class="fa-solid fa-drumstick-bite"></i>
                    <h3 class="text-capitalize">${response.meals[i].strIngredient}</h3>
                    <p>${shortDescription}</p>
                </div>
            </div>
            `;
        }
    }
    Row.innerHTML = cartona;
}
// ! end Show Ingredients

// ! Filter by Ingredients
async function FilterIngredients(Ingredients) {
    Row.classList.add("d-none");
    const responseApi = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${Ingredients}`);
    const response = await responseApi.json();
    ShowFood(response.meals);
}

// ? ---------------------------------------- ?//

// ! start build Details
function ShowDetails(food) {
    searchBox.classList.add('d-none');
    let Tags = ``
    for (let i = 0; i < Tags.length; i++) {
        Tags += `
        <li class="m-2 p-2">
        ${Tags[i]}
        </li>
    `
    }
    let recipes = ``
    for (let i = 1; i <= 20; i++) {
        if (food[`strIngredient${i}`]) {
            recipes += `<li class="m-2 p-1">${food[`strMeasure${i}`]} ${food[`strIngredient${i}`]}</li>`;
        }
    }
    let cartona = `
    <div class="col-lg-5">
                    <div class="details overflow-hidden">
                        <div class="image">
                            <img src="${food.strMealThumb}" class="w-75" alt="">
                        </div>
                        <div class="title">
                            <h2>${food.strMeal}</h2>
                        </div>
                    </div>
                </div>
                <div class="col-lg-7">
                    <div class="details">
                        <div class="description">
                            <h2>Instructions</h2>
                            <p>${food.strInstructions}</p>
                            <h3><span>Area : </span>${food.strArea}</h3>
                            <h3><span>Category : </span>${food.strCategory}</h3>
                            <h3><span>Recipes : </span>
                                <ul class="list-unstyled d-flex flex-wrap">
                                ${recipes}
                                </ul>
                            </h3>
                            <h3><span>Tags : </span>
                                <ul class="list-unstyled d-flex flex-wrap">
                                    ${Tags}
                                </ul>
                            </h3>
                            <a href="${food.strSource}" target="_blank"><button class="btn btn-success">Source</button></a>
                            <a href="${food.strYoutube}" target="_blank"><button class="btn btn-danger">Youtube</button></a>
                        </div>
                    </div>
                </div>
    `
    Row.innerHTML = cartona;
}
// ! End build Details 













