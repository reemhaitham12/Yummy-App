
const loading = document.querySelector(".loading");
const loadering = document.querySelector(".Sppiner");
//! if you click on image icon ,the website will reload or refresh another food random 
// ! random food
window.onload = async function () {
    CloseNavbar();
    loading.classList.remove('d-none');
    try {
        await getRandomMeals(20);
    } catch (error) {
        console.error('Error fetching random meals on page load:', error);
    }
    loading.classList.add('d-none');
};

// ! using link api random meal
async function getRandomMeals(count) {
    CloseNavbar();
    try {
        searchBox.classList.add('d-none');
        Row.classList.add('d-none');
        loadering.classList.remove('d-none');

        let meals = new Set();
        while (meals.size < count) {
            const responseApi = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
            const response = await responseApi.json();
            if (response.meals && response.meals[0]) {
                meals.add(response.meals[0]);
            } else {
                console.error('No meal found');
            }
        }
        ShowFood(Array.from(meals));
        loadering.classList.add('d-none');
    } catch (error) {
        console.error('Error fetching random meals:', error);
        loadering.classList.add('d-none');
    }
}

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
                        class="card position-relative overflow-hidden rounded-3" onclick="MealId('${card[i].idMeal}')">
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
    loadering.classList.remove('d-none');
    const responseApi = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${word}`)
    const response = await responseApi.json();
    if (response.meals) {
        ShowFood(response.meals);
    } else {
        ShowFood([]);
    }
    loadering.classList.add('d-none');
}
// ! end in search by name

// ! start in search by letter
async function SearchLetter(letter) {
    Row.classList.add('d-none');
    loadering.classList.remove('d-none');
    const responseApi = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
    const response = await responseApi.json();
    if (response.meals) {
        ShowFood(response.meals);
    } else {
        ShowFood([]);
    }
    loadering.classList.add('d-none');
}
// ! end in search by letter

// ! Start MealId
async function MealId(FoodID) {
    CloseNavbar();
    Row.classList.add("d-none");
    const responseApi = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${FoodID}`);
    const response = await responseApi.json();
    if (response.meals && response.meals[0]) {
        ShowDetails(response.meals[0]);
    } else {
        console.error('Meal not found');
    }
}

// ! End MealId

// ! start Category
async function Category() {
    CloseNavbar();
    Row.classList.add('d-none');
    loadering.classList.remove('d-none');
    searchBox.classList.add('d-none');
    let responseApi = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    let response = await responseApi.json();
    ShowCategory(response.categories);
    loadering.classList.add('d-none');
}

// ! end Category

// ! start Show Category
function ShowCategory(card) {
    Row.classList.remove('d-none');
    let cartona = ``
    for (let i = 0; i < card.length; i++) {
        let shortDescription = card[i].strCategoryDescription.split(" ").slice(0, 30).join(" ");
        cartona += `
        <div class="col-lg-3">
                    <div
                        class="card position-relative overflow-hidden rounded-3" onclick="FilterCategory('${card[i].strCategory}')")">
                        <div class="image">
                            <img src="${card[i].strCategoryThumb}" alt=""
                                class="w-100 d-block">
                        </div>
                        <div class="titleCategory">
                            <h3 class="text-center">${card[i].strCategory}</h3>
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
    //  ! loading
    loadering.classList.remove('d-none');
    const responseApi = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${Category}`);
    const response = await responseApi.json();
    ShowFood(response.meals);
    loadering.classList.add('d-none');
}

// ? ---------------------------------------- ?//

// ! Start Area
async function Area() {
    CloseNavbar();
    Row.classList.add('d-none');
    // ! loading
    loadering.classList.remove('d-none');
    searchBox.classList.add('d-none');
    const responseApi = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    const response = await responseApi.json();
    ShowArea(response.meals);
    // ! loading
    loadering.classList.add('d-none');
}
// ! end Area

// ! start ShowArea
function ShowArea(card) {
    Row.classList.remove('d-none');
    let cartona = ``
    for (let i = 0; i < card.length; i++) {
        cartona += `
        <div class="col-lg-3">
                    <div class="home" onclick="FilterArea('${card[i].strArea}')")>
                        <i class="fa-solid fa-house-laptop"></i>
                        <h3>${card[i].strArea}</h3>
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
    loadering.classList.remove('d-none');
    const responseApi = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${Area}`);
    const response = await responseApi.json();
    ShowFood(response.meals[0]);
    loadering.classList.add('d-none');
}
// ? ---------------------------------------- ?//

// ! start Ingredients
async function Ingredients() {
    CloseNavbar();
    Row.classList.add('d-none');
    // ! loading
    loadering.classList.remove('d-none');
    searchBox.classList.add('d-none');
    const responseApi = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    const response = await responseApi.json();
    ShowIngredients(response.meals);
    // ! loading
    loadering.classList.add('d-none');
}
// ! end Ingredients

// ! start Show Ingredients
function ShowIngredients(card) {
    Row.classList.remove('d-none');
    let cartona = ``;
    for (let i = 0; i < card.length; i++) {
        if (card[i].strDescription) {
            let shortDescription = card[i].strDescription.split(" ").slice(0, 30).join(" ");
            cartona += `
            <div class="col-lg-3">
                <div class="cards"onclick="FilterIngredients('${card[i].strIngredient}')") >
                    <i class="fa-solid fa-drumstick-bite"></i>
                    <h3 class="text-capitalize">${card[i].strIngredient}</h3>
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
    // ! loading
    loadering.classList.remove('d-none');
    const responseApi = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${Ingredients}`);
    const response = await responseApi.json();
    ShowFood(response.meals);
    // ! loading
    loadering.classList.add('d-none');
}

// ? ---------------------------------------- ?//

// ! start build Details


function ShowDetails(food) {
    console.log("ShowDetails called with:", food);
    searchBox.innerHTML = '';
    Row.innerHTML = '';

    let Tags = ``;
    if (food.strTags) {
        let tagsArray = food.strTags.split(',');
        for (let i = 0; i < tagsArray.length; i++) {
            Tags += `
            <li class="m-2 p-2 alert alert-danger">
            ${tagsArray[i]}
            </li>
            `;
        }
    }

    let recipes = ``;
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
                <h3><span>Recipes : </span></h3>
                <ul class="list-unstyled d-flex flex-wrap">
                    ${recipes}
                </ul>
                <h3><span>Tags : </span></h3>
                <ul class="list-unstyled d-flex flex-wrap">
                        ${Tags}
                    </ul>
                <a href="${food.strSource}" target="_blank"><button class="btn btn-success">Source</button></a>
                <a href="${food.strYoutube}" target="_blank"><button class="btn btn-danger">Youtube</button></a>
            </div>
        </div>
    </div>
    `;
    Row.classList.remove('d-none');
    Row.innerHTML = cartona;
}

// ! end build Details



// ! contact us
function ShowContact() {
    CloseNavbar();
    Row.classList.remove('d-none');
    searchBox.classList.remove('d-none');
    loadering.classList.remove('d-none');
    let cartona = `
    <div class="contact">
        <div class="row g-3">
            <div class="col-lg-6">
                <div class="input-group mb-3">
                    <input type="text" class="form-control" id="nameInput"
                        placeholder="Enter Your Name" onkeyup="validationName(this)">
                </div>
                <ul class="alert alert-danger p-0 invalid-feedback">
                    <li>Name Is Required</li>
                    <li>Minimum Length 2 and Maximum 20</li>
                </ul>
            </div>
            <div class="col-lg-6">
                <div class="input-group mb-3">
                    <input type="text" class="form-control" id="phoneInput"
                        placeholder="Enter Your Phone" onkeyup="validationPhone(this)">
                    <ul class="alert alert-danger p-0 invalid-feedback">
                        <li>Phone Is Required</li>
                        <li>Must have 11 numbers</li>
                    </ul>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="input-group mb-3">
                    <input type="password" class="form-control" id="passwordInput"
                        placeholder="Enter Your Password" onkeyup="validationPassword(this)">
                    <ul class="alert alert-danger p-0 invalid-feedback">
                        <li>Password Is Required</li>
                        <li>Minimum eight characters, at least one letter and one number</li>
                    </ul>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="input-group mb-3">
                    <input type="text" class="form-control" id="emailInput"
                        placeholder="Enter Your Email" onkeyup="validationEmail(this)">
                    <ul class="alert alert-danger p-0 invalid-feedback">
                        <li>Email Is Required</li>
                        <li>Invalid Email Format</li>
                    </ul>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="input-group mb-3">
                    <input type="text" class="form-control" id="ageInput"
                        placeholder="Enter Your Age" onkeyup="validationAge(this)">
                    <ul class="alert alert-danger p-0 invalid-feedback">
                        <li>Age Is Required</li>
                        <li>Minimum 10, Maximum 80</li>
                    </ul>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="input-group mb-3">
                    <input type="password" class="form-control" id="repasswordInput"
                        placeholder="Re-enter Password" onkeyup="validateRePassword(this, document.querySelector('#passwordInput'))">
                    <ul class="alert alert-danger p-0 invalid-feedback">
                        <li>Password Is Required</li>
                        <li>Minimum eight characters, at least one letter and one number</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="d-flex justify-content-center mt-3">
            <button class="btn btn-outline-danger" id="submitBtn" disabled>Submit</button>
        </div>
    </div>
    `;
    Row.innerHTML = cartona;
    loadering.classList.add('d-none');
    const AllInput = document.querySelectorAll(".form-control");
    AllInput.forEach(input => {
        input.addEventListener('input', function() {
            validateForm(AllInput);
        });
    });
    const btnSubmit = document.getElementById("submitBtn");
    btnSubmit.addEventListener('click', function (e) {
        e.preventDefault();
        BtnSubmit();
    });
}

function validateForm(inputs) {
    let isValid = true;
    inputs.forEach(input => {
        switch (input.getAttribute('placeholder')) {
            case 'Enter Your Name':
                if (!validationName(input)) isValid = false;
                break;
            case 'Enter Your Phone':
                if (!validationPhone(input)) isValid = false;
                break;
            case 'Enter Your Password':
                if (!validationPassword(input)) isValid = false;
                break;
            case 'Enter Your Email':
                if (!validationEmail(input)) isValid = false;
                break;
            case 'Enter Your Age':
                if (!validationAge(input)) isValid = false;
                break;
            case 'Re-enter Password':
                if (!validateRePassword(input, document.querySelector('#passwordInput'))) isValid = false;
                break;
        }
    });

    const btnSubmit = document.getElementById("submitBtn");
    if (isValid) {
        btnSubmit.removeAttribute('disabled');
    } else {
        btnSubmit.setAttribute('disabled', 'disabled');
    }

    return isValid;
}

function  BtnSubmit() {
    const formData = {};
    const inputs = document.querySelectorAll(".form-control");
    inputs.forEach(input => {
        formData[input.id] = input.value;
    });
    localStorage.setItem("formData", JSON.stringify(formData));
    inputs.forEach(input => {
        input.value = "";
    });
    window.location.reload();
    window.onload = async function () {
        CloseNavbar();
        loading.classList.remove('d-none');
        try {
            await getRandomMeals(20);
        } catch (error) {
            console.error('Error fetching random meals on page load:', error);
        }
        loading.classList.add('d-none');
    };
}


function validationName(input) {
    const value = input.value.trim();
    const regex = /^[a-zA-Z\u00C0-\u017F'\s]{2,20}$/; // Letters and spaces, 2 to 20 characters
    const valid = regex.test(value);

    if (valid) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
    } else {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
    }

    return valid;
}

function validationPhone(input) {
    const value = input.value.trim();
    const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/; // Phone number format
    const valid = regex.test(value);

    if (valid) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
    } else {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
    }

    return valid;
}

function validationPassword(input) {
    const value = input.value.trim();
    const regex = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d!#$%&?^*@~() "]{8,}$/; // Minimum eight characters, at least one letter and one number
    const valid = regex.test(value);

    if (valid) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
    } else {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
    }

    return valid;
}

function validationEmail(input) {
    const value = input.value.trim();
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // Email format
    const valid = regex.test(value);

    if (valid) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
    } else {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
    }

    return valid;
}

function validationAge(input) {
    const value = input.value.trim();
    const regex = /^(1[0-9]|[2-7][0-9]|80)$/; // Age between 10 and 80
    const valid = regex.test(value);

    if (valid) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
    } else {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
    }

    return valid;
}

function validateRePassword(input, passwordInput) {
    const value = input.value.trim();
    const password = passwordInput.value.trim();
    const valid = value === password;

    if (valid) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
    } else {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
    }

    return valid;
}
