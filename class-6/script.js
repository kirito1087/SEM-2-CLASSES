let abcd = document.querySelector("#input");
let btn = document.querySelector("#butto");
let iconImg = document.querySelector(".weather-status .icon img");

// Icon URLs (royalty-free PNGs)
const ICONS = {
    sun: "https://cdn.jsdelivr.net/gh/erikflowers/weather-icons/svg/wi-day-sunny.svg",
    moon: "https://cdn.jsdelivr.net/gh/erikflowers/weather-icons/svg/wi-night-clear.svg",
    cloud: "https://cdn.jsdelivr.net/gh/erikflowers/weather-icons/svg/wi-cloudy.svg",
    rain: "https://cdn.jsdelivr.net/gh/erikflowers/weather-icons/svg/wi-rain.svg",
    snow: "https://cdn.jsdelivr.net/gh/erikflowers/weather-icons/svg/wi-snow.svg"
};

function pickIcon(temp, hour, conditionText) {
    // Prioritize precipitation
    const cond = conditionText.toLowerCase();
    if (cond.includes("rain") || cond.includes("drizzle") || cond.includes("shower")) return ICONS.rain;
    if (cond.includes("snow") || cond.includes("sleet") || cond.includes("ice")) return ICONS.snow;
    if (cond.includes("cloud") || cond.includes("overcast")) return ICONS.cloud;
    // Night or day
    if (hour >= 20 || hour < 6) {
        if (temp < 5) return ICONS.snow;
        return ICONS.moon;
    }
    if (temp >= 30) return ICONS.sun;
    if (temp < 5) return ICONS.snow;
    return ICONS.sun;
}

btn.addEventListener("click",()=>{
        let c = abcd.value;
        if(c!=""){
                // alert("i was clicked")
                alert("i was clicked")
                // Call API
                fetch(`https://api.weatherapi.com/v1/current.json?key=c7236d36debb4636a18170654262201&q=${c}&aqi=no`)
                .then((response) => response.json())
                .then((data) => {
                        // update DOM
                        document.querySelector(".temperature").textContent = `${data.current.temp_c} °C`;
                        document.querySelector(".location").textContent = data.location.name;
                        document.querySelector(".time").textContent = data.location.localtime.split(" ")[1];
                        document.querySelector(".day").textContent = new Date(data.location.localtime).toLocaleString("en-US", { weekday: "long" });
                        document.querySelector(".date").textContent = data.location.localtime.split(" ")[0];
                        // Set icon based on temp and time
                        if (iconImg) {
                            let temp = data.current.temp_c;
                            let localtime = data.location.localtime;
                            let hour = 12;
                            if (localtime) {
                                let t = localtime.split(" ")[1];
                                if (t) hour = parseInt(t.split(":")[0], 10);
                            }
                            let iconUrl = pickIcon(temp, hour, data.current.condition.text || "");
                            iconImg.src = iconUrl;
                            iconImg.alt = data.current.condition.text || "weather icon";
                        }
                        abcd.value = "";
                })
                .catch((error) => {
                        console.error("Error fetching weather data:", error);
                });
        }
});