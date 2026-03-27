const apiKey = "85e1b42e337887f30dfd238980c52086";

async function getWeather() {

    const cityInput = document.getElementById("city");

    const city = cityInput.value.trim();

    if (city === "") {

        alert("City name empty");

        return;
    }

    try {
        const response = await fetch(

            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`

        );

        if (!response.ok) {

            throw new Error("City not found");
        }

        const data = await response.json();

        document.getElementById("cityName").innerText = data.name;

        document.getElementById("temp").innerText = Math.round(data.main.temp) + " °C";
            
        document.getElementById("condition").innerText =data.weather[0].main;
            
        document.getElementById("humidity").innerText =  data.main.humidity + " %";
            
        document.getElementById("wind").innerText =  data.wind.speed + " km/h";


        const weather = data.weather[0].main;

if(weather === "Rain"){
document.body.style.backgroundImage = "url('rainfall.jpg')";
}

else if(weather === "Snow"){
document.body.style.backgroundImage = "url('snowfall.jpg')";
}

else if(weather === "Clear"){
document.body.style.backgroundImage = "url('sunny 1.jpg')";
}

else if(weather === "Clouds"){
document.body.style.backgroundImage = "url('cloudy.jpg')";
}
           

        const now = new Date();

const days = [

    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"

];


document.getElementById("day").innerText ="📅 " + days[now.getDay()];
    


const timezone = data.timezone;


const utcTime = new Date(Date.now() + new Date().getTimezoneOffset() * 60000);

const cityTime = new Date(utcTime.getTime() + timezone * 1000);


const date = cityTime.toLocaleDateString("en-GB", {

  day: "2-digit",
  month: "2-digit",
  year: "numeric"
});

// Format time
const time = cityTime.toLocaleTimeString("en-US", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: true
});

// Show DATE + TIME
document.getElementById("dateTime").innerText = `${date} | ${time}`;
        cityInput.value = "";

    } catch (error) {
        alert("City not found ");
    }
}

// ⌨ Enter key support
document.getElementById("city").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        getWeather();
    }
});