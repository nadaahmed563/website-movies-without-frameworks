// loading Page

$(document).ready(function()
{
    let colorBox = $(".colors-box").outerWidth();
    $("#optionBox").animate({left :`-${colorBox}`} , 0);
    $("#loading .spinner").fadeOut(1000 , ()=>{
        $("#loading .spinner").parent().fadeOut(1000 , ()=>{
            $("#loading").remove();
            $("body").css("overflow-y" , "auto");

        })
    });
})
// start Header
const menuBtn = document.querySelector(".menu-btn");
const menuItems = document.querySelector(".menu-items");
const expandBtn = document.querySelectorAll(".expand-btn");

// open toggle
menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("open");
  menuItems.classList.toggle("open");
});

// mobile menu expand
expandBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.classList.toggle("open");
  });
});

// End Header
// start slider
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}
// End slider

// start page content
// display movies when click in the tab

let apiLink = "https://api.themoviedb.org/3/movie/now_playing?api_key=eba8b9a7199efdcb0ca1f96879b83c44";
let allMovies = [];
let element1 = document.querySelector(".types .element1 a");
let element2 = document.querySelector(".types .element2 a");
let element3 = document.querySelector(".types .element3 a");
function movies() {
    let myHttp = new XMLHttpRequest();
    myHttp.open('Get', apiLink),
    myHttp.send()
    myHttp.addEventListener('readystatechange', function () {
        if (myHttp.readyState == 4 && myHttp.status == 200) {
            allMovies = (JSON.parse(myHttp.response).results);
            displayMovies();
        }
    });
}

movies();
function displayMovies() {
    let cartoona = ``;
    for (let i = 0; i < allMovies.length; i++) {

        cartoona += ` <div class="item">
            <img src="${"https://image.tmdb.org/t/p/w500" + allMovies[i].poster_path}" style="width:100%"/>
            <div class="layer">
            <div class="info">
            <h3>${allMovies[i].original_title}</h>
            <p class="overview">${allMovies[i].overview}</p>
            <p>rate: ${allMovies[i].vote_average}</p>
            <p> ${allMovies[i].release_date}</p>
      </div>
      </div>
      </div>
        `

    }

    document.getElementById('postsRow').innerHTML = cartoona;

}


element1.addEventListener("click", function () {
    element1.style.backgroundColor  = "#e71c61";
    element1.style.color = "white";
    element2.style.backgroundColor  = "white";
    element2.style.color = "#e71c61";
    element3.style.backgroundColor  = "white";
    element3.style.color = "#e71c61";
    apiLink = "https://api.themoviedb.org/3/trending/all/day?api_key=eba8b9a7199efdcb0ca1f96879b83c44",
        movies();
})

element2.addEventListener("click", function () {
    element2.style.backgroundColor  = "#e71c61";
    element2.style.color = "white";
    element1.style.backgroundColor  = "white";
    element1.style.color = "#e71c61";
    element3.style.backgroundColor  = "white";
    element3.style.color = "#e71c61";
    apiLink = "https://api.themoviedb.org/3/movie/popular?api_key=eba8b9a7199efdcb0ca1f96879b83c44",
        movies();
})

element3.addEventListener("click", function () {
    element3.style.backgroundColor  = "#e71c61";
    element3.style.color = "white";
    element1.style.backgroundColor  = "white";
    element1.style.color = "#e71c61";
    element2.style.backgroundColor  = "white";
    element2.style.color = "#e71c61";
    apiLink = "https://api.themoviedb.org/3/movie/top_rated?api_key=eba8b9a7199efdcb0ca1f96879b83c44",
        movies();
})
// end page content

// Start Validation
var userContacts;
if (localStorage.getItem('ourContacts') != null) {
  userContacts = JSON.parse(localStorage.getItem('ourContacts'));
}
else {
  userContacts = [];
}
function addContact() 
{
        if (contactFirstNameCheck(userFirstName.value) && contactLastNameCheck(userLastName.value) && contactEmailCheck(userEmail.value) && contactNumCheck(userNum.value) && contactmsgCheck(userMessage.value)) 
        {
           

            var usermsgContact =
            {
                firstName: userFirstName.value,
                lastName: userLastName.value,
                email: userEmail.value,
                number: userNum.value,
                message : userMessage.value
            }
            userContacts.push(usermsgContact);   
            localStorage.setItem('ourContacts', JSON.stringify(userContacts));
            console.log(userContacts);
            clearForm();
            submitBtn.style.backgroundColor = "white";
            submitBtn.style.color = "#e71c61";
        }
        


    
       else {
           for (var i = 0; i < alerts.length; i++) {
            alerts[i].style.display="block";
            submitBtn.style.backgroundColor = "transparent";
        }
      }
   


}

function clearForm() {
  userFirstName.value = "";
  userLastName.value = "";
  userEmail.value = "";
  userNum.value = "";
  userMessage.value=";"

}


let userFirstName = document.getElementById("firstName");
let userLastName = document.getElementById("lastName");
let userEmail = document.getElementById("email")
let userNum = document.getElementById("number")
let userMessage = document.getElementById("message");
let firstNameAlert = document.getElementById("firstNameAlert");
let lastNameAlert = document.getElementById("lastNameAlert");
let emailAlert = document.getElementById("emailAlert");
let numberAlert = document.getElementById("numberAlert");
let msgAlert = document.getElementById("msgAlert");
let submitBtn = document.getElementById("submitBtn");
var alerts = document.querySelectorAll("p.alert");


userFirstName.onkeyup = function showNameError() {
  var firstNameRejex = /^[A-Z][a-z]{2,8}$/
  if (!firstNameRejex.test(userFirstName.value) || userFirstName.value == null || userFirstName.value == "") {
      firstNameAlert.style.display = "block";
  }
  else {
    firstNameAlert.style.display = "none";
  }
}
userLastName.onkeyup = function showNameError() {
  var lastNameRejex = /^[A-Z][a-z]{2,8}$/
  if (!lastNameRejex.test(userLastName.value) || userLastName.value == null || userLastName.value == "") {
      lastNameAlert.style.display = "block";
  }
  else {
    lastNameAlert.style.display = "none";
  }
}
userEmail.onkeyup = function showEmailError() {
  var emailRejex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  if (!emailRejex.test(userEmail.value) || userEmail.value == null || userEmail.value == "") {
      emailAlert.style.display = "block";
  }
  else {
    emailAlert.style.display = "none";
  }
}

userNum.onkeyup = function showNumberError() {
  var numberRejex = /^(002)?01[0125][0-9]{8}$/
  if (!numberRejex.test(userNum.value) || userNum.value == null || userNum.value == "") {
      numberAlert.style.display = "block";
  }
  else {

    numberAlert.style.display = "none";

  }
}
userMessage.onkeyup = function showDescError() {
  var msgRejex = /^[a-z]{2,100}/
  if (!msgRejex.test(userMessage.value) || userMessage.value == null || userMessage.value == "") {
      msgAlert.style.display = "block";
  }
  else {
      msgAlert.style.display = "none";

  }
}
function contactFirstNameCheck(firstName) {
  if (firstName == null || firstName == "") {
      return false;
  }
  return true;
}
function contactLastNameCheck(lastName) {
  if (lastName == null || lastName == "") {
      return false;
  }
  return true;
}
function contactEmailCheck(email) {
  if (email == null || email == "") {
      return false;
  }
  return true;
}
function contactNumCheck(number) {
  if (number == null || number == "") {
      return false;
  }
  return true;
}
function contactmsgCheck(msg) {
  if (msg == null || msg == "") {
      return false;
  }
  return true;
}