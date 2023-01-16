const hamburger = document.querySelector(".nav__hamburger");
const navList = document.querySelector(".nav__wrapper");

hamburger.addEventListener("click", openMenu);

function openMenu() {
  hamburger.classList.toggle("is-active");
  navList.classList.toggle("open");
  navList.classList.toggle("closed");
}


function changeLanguage(){
  let options = document.querySelectorAll(".nav__language-select-options .language-option");
  options.forEach(option=>{
    option.addEventListener("click", (e)=>{
      changeLanguageSelector(e.target.dataset.language)
    })
  })
}

function changeLanguageSelector(language){
  let listOfLanguagesElements = document.querySelectorAll(".language-option");
  let listOfLanguages = [];
  let arrow = document.createElement("img");
  let selectorWrapper = document.querySelector(".nav__language-select-selected-option");
  let selectedLanguage = createLanguageOption(language);
  let selectOptions = document.querySelector(".nav__language-select-options");


  listOfLanguagesElements.forEach(e=>listOfLanguages.push(e.dataset.language))
  arrow.setAttribute("alt", "arrow");
  arrow.setAttribute("src", "./images/arrow.svg");
  selectorWrapper.innerHTML="";
  selectorWrapper.appendChild(selectedLanguage);
  selectorWrapper.appendChild(arrow);
  selectOptions.innerHTML="";
  listOfLanguages.forEach(e=>e!==language ? selectOptions.appendChild(createLanguageOption(e)): "");
  changeLanguage();
}

function createLanguageOption(language){
  let selectedLanguageWrapper = document.createElement("p");
  let img = document.createElement("img");
  let span = document.createElement("span");

  img.setAttribute("alt", `${language} flag`);
  img.setAttribute("src", `./images/${language}.svg`);
  span.innerHTML=language;
  selectedLanguageWrapper.dataset.language = language;
  selectedLanguageWrapper.classList.add("language-option");
  selectedLanguageWrapper.appendChild(span);
  selectedLanguageWrapper.appendChild(img);

  return selectedLanguageWrapper;
}

changeLanguage()