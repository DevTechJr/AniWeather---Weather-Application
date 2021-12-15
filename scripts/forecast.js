const key = "TsYlUAHgkH8sphGy8YRxO0Ozqqrsz5FQ";

const getCity = async (city) => {
  const response = await fetch(
    `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${key}&q=${city}`
  );
  const data = await response.json();
  return data[0];
};

getCity("manchester")
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log("error");
  });
