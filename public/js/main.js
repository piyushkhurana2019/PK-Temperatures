const submitBtn = document.getElementById("submitBtn");
const cityName = document.getElementById("cityName");
const city_name = document.getElementById("city_name");
const temp_status = document.getElementById("temp_status");
const temp_real_val = document.getElementById("temp_real_val");
const data_hide = document.querySelector(".middle_layer");


const day = document.getElementById("day");
const time = document.getElementById("time");

function updateDayTime() {
  const curDate = new Date();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  day.textContent = days[curDate.getDay()];
  let hours =  curDate.getHours();
  let minutes =  curDate.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  const strTime = hours + ":" + minutes + " " + ampm;
  time.textContent = strTime;
}

setInterval(updateDayTime, 1000);


const getInfo = async (event) => {
  event.preventDefault(); // due to this our page will not get relod after clickinig on submit button
  let cityVal = cityName.value;

  if (cityVal === "") {
    city_name.innerText = `please write the name before search`;
    data_hide.classList.add("data_hide");
  } else {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=37f7c3a100dc84f0c2a85526bb35162b`;
      const response = await fetch(url);
      const data = await response.json(); // to convert the readable stream to string
      const arrData = [data]; // to convert string into array in order to easily access all the things inside the object

      city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
      temp_real_val.innerText = arrData[0].main.temp;
      console.log(data);

      const tempMood = arrData[0].weather[0].main;

      //condition to check sunny or cloudy
      if (tempMood == "Clear") {
        temp_status.innerHTML =
          "<i class='fas  fa-sun' style='color: #eccc68;'></i>";
      } else if (tempMood == "Clouds") {
        temp_status.innerHTML =
          "<i class='fas  fa-cloud' style='color: #f1f2f6;'></i>";
      } else if (tempMood == "Rain") {
        temp_status.innerHTML =
          "<i class='fas  fa-cloud-rain' style='color: #a4b0be;'></i>";
      } else {
        temp_status.innerHTML =
          "<i class='fas  fa-sun' style='color: #eccc68;'></i>";
      }
      data_hide.classList.remove("data_hide");
    } catch {
      city_name.innerText = `please write the city name properly`;
      data_hide.classList.add("data_hide");
    }
  }
};

submitBtn.addEventListener("click", getInfo);
