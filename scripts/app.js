const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");

const time = document.querySelector("img.time");
const icon = document.querySelector(".icon");

const cityData = async (city) => {
  const cityDetail = await getCity(city);
  const weather = await getWeather(cityDetail.Key);

  return {
    cityDetail: cityDetail,
    weather: weather,
  };
};

const updateUI = (data) => {
  const cityDetail = data.cityDetail;
  const weather = data.weather[0];
  const iconNumber = data.weather[0].WeatherIcon;

  icon.innerHTML = `<img src="img/icons/${iconNumber}.svg" alt="" />
  <!-- icon -->`;

  // let timeSrc = null;
  // if (weather.IsDayTime) {
  //   timeSrc = "img/day.svg";
  // } else {
  //   timeSrc = "img/night.svg";
  // }

  const timeSrc = weather.IsDayTime ? "img/day.svg" : "img/night.svg";

  time.setAttribute("src", timeSrc);

  // Update UI with weather
  details.innerHTML = `
    <h5 class="my-3 text-secondary">${cityDetail.EnglishName}, ${cityDetail.Country.EnglishName}</h5>
    <div class="my-3 weatherDetails">${weather.WeatherText}</div>
    <div class="display-4 my-4">
      <span>${weather.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
    </div>`;
  console.log(weather.Temperature.Metric.Value);

  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};

cityForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const city = cityForm.city.value.trim();
  cityForm.reset();
  cityData(city)
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));

  localStorage.setItem("city", city);
});

if (localStorage.getItem("city")) {
  cityData(localStorage.getItem("city"))
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));
}
