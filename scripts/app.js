const cityForm = document.querySelector("form");

const cityData = async (city) => {
  const cityDetail = await getCity(city);
  const weather = await getWeather(cityDetail.Key);

  return {
    cityDetail: cityDetail,
    weather: weather,
  };
};

cityForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const city = cityForm.city.value.trim();
  cityForm.reset();
  cityData(city)
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
});
