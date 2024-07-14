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
    Row.innerHTML = '';
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
    Row.innerHTML = '';
    const responseApi = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
    const response = await responseApi.json();
    console.log(response);
    if (response.meals) {
        ShowFood(response.meals);
    } else {
        ShowFood([]);
    }
}
// ! end in search by letter

// ! start Category
async function Category() {
    CloseNavbar();
    Row.innerHTML = ""
    searchBox.innerHTML = ""
    let responseApi = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    let response = await responseApi.json();
    // console.log(response)
    ShowCategory(response);
}

// ! end Category

// ! start Show Category
function ShowCategory(response) {
    let cartona = ``
    for (let i = 0; i < response.categories.length; i++) {
        let shortDescription = response.categories[i].strCategoryDescription.split(" ").slice(0, 30).join(" ");
        cartona += `
        <div class="col-lg-3">
                    <div
                        class="card position-relative overflow-hidden rounded-3">
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

// ! Start Area
async function Area() {
    CloseNavbar();
    Row.innerHTML = "";
    // searchBox.innerHTML = "";
    searchBox.classList.add('d-none');
    const responseApi = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    const response = await responseApi.json();
    ShowArea(response);
}
// ! end Area

// ! start ShowArea
function ShowArea(response) {
    let cartona = ``
    for (let i = 0; i < response.meals.length; i++) {
        cartona += `
        <div class="col-lg-3">
                    <div class="home">
                        <i class="fa-solid fa-house-laptop"></i>
                        <h3>${response.meals[i].strArea}</h3>
                    </div>
                </div>
        `
    }
    Row.innerHTML = cartona;
}
// ! end ShowArea

// ! start Ingredients
async function Ingredients() {
    CloseNavbar();
    Row.innerHTML = "";
    searchBox.innerHTML = "";
    const responseApi = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    const response = await responseApi.json();
    ShowIngredients(response);
}
// ! end Ingredients

// ! start Show Ingredients
function ShowIngredients(response) {
    let cartona = ``;
    for (let i = 0; i < response.meals.length; i++) {
        if (response.meals[i].strDescription) {
            let shortDescription = response.meals[i].strDescription.split(" ").slice(0, 30).join(" ");
            cartona += `
            <div class="col-lg-3">
                <div class="cards">
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













