const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");

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
  const weather = data.weather;
  // Update UI with weather
  details.innerHTML = `
    <h5 class="my-3 text-secondary">${data}</h5>
    <div class="my-3 weatherDetails">${data}</div>
    <div class="display-4 my-4">
      <span>${data}</span>
      <span>${data}&deg;C</span>
    </div>`;
};

cityForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const city = cityForm.city.value.trim();
  cityForm.reset();
  cityData(city)
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
});
