const countryName = new URLSearchParams(location.search).get("name");
const flagImg = document.querySelector(".country-details img");
const countryH1 = document.querySelector(".details-text-container h1");
const nativeName = document.querySelector(".native-name");
const population = document.querySelector(".population");
const region = document.querySelector(".region");
const subRegion = document.querySelector(".sub-region");
const capital = document.querySelector(".capital");
const topLevelDomain = document.querySelector(".top-level-domain");
const currencies = document.querySelector(".currencies");
const languages = document.querySelector(".languages");
const borderCountries = document.querySelector(".border-countries");
const darkMode = document.querySelector(".dark-mode");
const darkModeText = document.querySelector(".dark-mode-text");
const modeIcon = document.querySelector(".dark-mode i");

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then((res) => res.json())
  .then(([country]) => {
    console.log(country);
    flagImg.src = country.flags.svg;
    countryH1.innerText = country.name.common;
    if (country.name.nativeName) {
      nativeName.innerText = Object.values(country.name.nativeName)[0].common;
    } else {
      nativeName.innerText = country.name.common;
    }
    population.innerText = country.population.toLocaleString("en-IN");
    region.innerText = country.region;
    if (country.subRegion) {
      subRegion.innerText = country.subregion;
    }
    if (country.capital) {
      capital.innerText = country.capital?.[0];
    }

    topLevelDomain.innerText = country.tld.join(" , ");
    if (country.currencies) {
      currencies.innerText = Object.values(country.currencies)
        .map((currency) => currency.name)
        .join(", ");
    }

    if (country.languages) {
      languages.innerText = Object.values(country.languages).join(", ");
    }
    if (country.borders) {
      country.borders.forEach((border) => {
        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res) => res.json())
          .then(([borderCountry]) => {
            const borderCountryTag = document.createElement("a");
            borderCountryTag.innerText = borderCountry.name.common;
            borderCountryTag.href = `country.html?name=${borderCountry.name.common}`;
            borderCountries.append(borderCountryTag);
          });
      });
    }
  });

darkMode.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  if (darkModeText.innerText == "Dark Mode") {
    darkModeText.innerText = "Light Mode";
    modeIcon.classList.remove(`fa-regular`, `fa-moon`);
    modeIcon.classList.add(`fa-regular`, `fa-sun`);
    initalMode = "Light Mode";
  } else {
    darkModeText.innerText = "Dark Mode";
    modeIcon.classList.remove(`fa-regular`, `fa-sun`);
    modeIcon.classList.add(`fa-regular`, `fa-moon`);
    initalMode = "Dark Mode";
  }
});
