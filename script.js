const countriesContainer = document.querySelector(".countries-container");
const filterByRegion = document.querySelector('.filter-by-region')
const searchInput = document.querySelector('.search-container input')
let allCountriesData
const darkMode = document.querySelector('.dark-mode')
const darkModeText = document.querySelector('.dark-mode-text')
const modeIcon= document.querySelector('.dark-mode i')
fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data) => {
    renderCountries(data)
    allCountriesData = data
  });

  filterByRegion.addEventListener('change', (e) => {
  countriesContainer.innerHTML = ''  
  fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
  .then((res) => res.json())
  .then(renderCountries);
  })

  function renderCountries(data) {
    countriesContainer.innerHTML = '' 
    data.forEach((country) => {
      const countryCard = document.createElement("a");
      countryCard.href = `./country.html?name=${country.name.common}`
      countryCard.classList.add("country-card");
      countryCard.innerHTML = `
            <img src="${country.flags.svg}" alt="${country.name.common} flag">
            <div class="card-text">
                <h3 class="card-title">${country.name.common}</h3>
                <p><b>Population: </b>${country.population.toLocaleString('en-IN')}</p>
                <p><b>Region: </b>${country.region}</p>
                <p><b>Capital: </b>${country.capital}</p>
            </div>
            `;

      countriesContainer.append(countryCard);
    });

  }

  searchInput.addEventListener('input', (e) => {
    // console.log(e.target.value)
    // console.log(allCountriesData)
    const filteredcountries = allCountriesData.filter((country) => country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
    renderCountries(filteredcountries)
  })

  darkMode.addEventListener('click', () => {
    document.body.classList.toggle('dark')

    if (darkModeText.innerText == 'Dark Mode'){
        darkModeText.innerText = 'Light Mode'
        modeIcon.classList.remove(`fa-regular`, `fa-moon`)
        modeIcon.classList.add(`fa-regular`, `fa-sun`)

        
    } else {
      darkModeText.innerText = 'Dark Mode'
      modeIcon.classList.remove(`fa-regular`, `fa-sun`)
      modeIcon.classList.add(`fa-regular`, `fa-moon`)
    }
      
  })