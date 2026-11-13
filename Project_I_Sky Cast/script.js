
// ===================================
// SKYCAST - WEATHER DASHBOARD
// ===================================

// HTML Elements
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const searchError = document.getElementById("searchError");
const loading = document.getElementById("loading");
const dashboard = document.getElementById("dashboard");
const locationBtn = document.getElementById("locationBtn");
const themeToggle = document.getElementById("themeToggle");

let requestNumber = 0;

// Weather code descriptions and icons
function getWeatherInfo(code) {
    const weather = {
        0: ["Clear Sky", "fa-sun"],
        1: ["Mainly Clear", "fa-cloud-sun"],
        2: ["Partly Cloudy", "fa-cloud-sun"],
        3: ["Overcast", "fa-cloud"],
        45: ["Foggy", "fa-smog"],
        48: ["Rime Fog", "fa-smog"],
        51: ["Light Drizzle", "fa-cloud-rain"],
        53: ["Drizzle", "fa-cloud-rain"],
        55: ["Heavy Drizzle", "fa-cloud-showers-heavy"],
        61: ["Light Rain", "fa-cloud-rain"],
        63: ["Moderate Rain", "fa-cloud-rain"],
        65: ["Heavy Rain", "fa-cloud-showers-heavy"],
        71: ["Light Snow", "fa-snowflake"],
        73: ["Snow", "fa-snowflake"],
        75: ["Heavy Snow", "fa-snowflake"],
        77: ["Snow Grains", "fa-snowflake"],
        80: ["Rain Showers", "fa-cloud-showers-heavy"],
        81: ["Rain Showers", "fa-cloud-showers-heavy"],
        82: ["Heavy Showers", "fa-cloud-showers-heavy"],
        85: ["Snow Showers", "fa-snowflake"],
        86: ["Heavy Snow Showers", "fa-snowflake"],
        95: ["Thunderstorm", "fa-cloud-bolt"],
        96: ["Thunderstorm with Hail", "fa-cloud-bolt"],
        99: ["Heavy Thunderstorm", "fa-cloud-bolt"]
    };

    return weather[code] || ["Unknown Weather", "fa-cloud"];
}

// Fetch city coordinates
async function getCityCoordinates(city) {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Unable to search for this city.");
    }

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
        throw new Error("City not found. Please check the spelling.");
    }

    return data.results[0];
}

// Fetch weather information
async function getWeather(latitude, longitude) {
    const url = new URL("https://api.open-meteo.com/v1/forecast");

    const params = {
        latitude,
        longitude,
        current: [
            "temperature_2m",
            "relative_humidity_2m",
            "apparent_temperature",
            "is_day",
            "precipitation",
            "weather_code",
            "surface_pressure",
            "wind_speed_10m"
        ].join(","),
        hourly: [
            "temperature_2m",
            "precipitation_probability",
            "weather_code"
        ].join(","),
        daily: [
            "weather_code",
            "temperature_2m_max",
            "temperature_2m_min",
            "sunrise",
            "sunset",
            "uv_index_max",
            "precipitation_probability_max"
        ].join(","),
        timezone: "auto",
        forecast_days: 7
    };

    Object.entries(params).forEach(([key, value]) => {
        url.searchParams.set(key, value);
    });

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Unable to retrieve weather information.");
    }

    return await response.json();
}

// Display current weather
function displayCurrentWeather(place, data) {
    const current = data.current;
    const info = getWeatherInfo(current.weather_code);

    document.getElementById("cityName").textContent =
        `${place.name}, ${place.country}`;

    document.getElementById("currentDate").textContent =
        new Date(current.time).toLocaleString("en-IN", {
            weekday: "long",
            day: "numeric",
            month: "long",
            hour: "2-digit",
            minute: "2-digit"
        });

    document.getElementById("temperature").textContent =
        Math.round(current.temperature_2m);

    document.getElementById("weatherDescription").textContent = info[0];

    document.getElementById("weatherIcon").className =
        `fa-solid ${info[1]}`;

    document.getElementById("feelsLike").textContent =
        `Feels like ${Math.round(current.apparent_temperature)}°C`;

    document.getElementById("humidity").textContent =
        `${current.relative_humidity_2m}%`;

    document.getElementById("windSpeed").textContent =
        `${current.wind_speed_10m} km/h`;

    document.getElementById("pressure").textContent =
        `${Math.round(current.surface_pressure)} hPa`;

    document.getElementById("uvIndex").textContent =
        data.daily.uv_index_max[0];

    document.getElementById("sunrise").textContent =
        formatTime(data.daily.sunrise[0]);

    document.getElementById("sunset").textContent =
        formatTime(data.daily.sunset[0]);
}

// Format time
function formatTime(time) {
    return new Date(time).toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
    });
}

// Display hourly forecast
function displayHourlyForecast(data) {
    const container = document.getElementById("hourlyForecast");

    const hourly = data.hourly;
    const currentTime = data.current.time;

    let startIndex = hourly.time.findIndex(
        time => time >= currentTime
    );

    if (startIndex === -1) startIndex = 0;

    const forecast = hourly.time.slice(startIndex, startIndex + 6);

    container.innerHTML = forecast.map((time, index) => {
        const actualIndex = startIndex + index;
        const info = getWeatherInfo(hourly.weather_code[actualIndex]);

        const label = index === 0
            ? "Now"
            : formatTime(time);

        return `
            <div class="hour-card">
                <p>${label}</p>
                <i class="fa-solid ${info[1]}"></i>
                <h3>${Math.round(hourly.temperature_2m[actualIndex])}°C</h3>
                <p>${hourly.precipitation_probability[actualIndex]}% rain</p>
            </div>
        `;
    }).join("");
}

// Display 7-day forecast
function displayWeeklyForecast(data) {
    const container = document.getElementById("weeklyForecast");
    const daily = data.daily;

    container.innerHTML = daily.time.map((date, index) => {
        const info = getWeatherInfo(daily.weather_code[index]);

        const day = index === 0
            ? "Today"
            : new Date(date + "T12:00:00").toLocaleDateString(
                "en-IN",
                { weekday: "long" }
            );

        return `
            <div class="week-card">
                <span class="week-day">${day}</span>

                <span class="week-condition">
                    <i class="fa-solid ${info[1]}"></i>
                    ${info[0]}
                </span>

                <span class="week-rain">
                    ${daily.precipitation_probability_max[index] ?? 0}% rain
                </span>

                <span class="week-temp">
                    ${Math.round(daily.temperature_2m_max[index])}° /
                    ${Math.round(daily.temperature_2m_min[index])}°
                </span>
            </div>
        `;
    }).join("");
}

// Main weather search function
async function searchWeather(city) {
    const thisRequest = ++requestNumber;

    if (!city.trim()) {
        searchError.textContent = "Please enter a city name.";
        return;
    }

    searchError.textContent = "";
    loading.classList.remove("hidden");
    dashboard.classList.add("hidden");
    searchBtn.disabled = true;

    try {
        const place = await getCityCoordinates(city.trim());

        const data = await getWeather(
            place.latitude,
            place.longitude
        );

        // Ignore older search results
        if (thisRequest !== requestNumber) return;

        displayCurrentWeather(place, data);
        displayHourlyForecast(data);
        displayWeeklyForecast(data);

        dashboard.classList.remove("hidden");

        cityInput.value = place.name;

    } catch (error) {
        if (thisRequest === requestNumber) {
            searchError.textContent = error.message;
        }

    } finally {
        if (thisRequest === requestNumber) {
            loading.classList.add("hidden");
            searchBtn.disabled = false;
        }
    }
}

// Search button
searchBtn.addEventListener("click", () => {
    searchWeather(cityInput.value);
});

// Enter key search
cityInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        searchWeather(cityInput.value);
    }
});

// Current location
locationBtn.addEventListener("click", () => {
    if (!navigator.geolocation) {
        searchError.textContent =
            "Location is not supported by your browser.";
        return;
    }

    searchError.textContent = "";
    loading.classList.remove("hidden");
    dashboard.classList.add("hidden");

    navigator.geolocation.getCurrentPosition(
        async (position) => {
            try {
                const thisRequest = ++requestNumber;

                const { latitude, longitude } = position.coords;

                const data = await getWeather(latitude, longitude);

                if (thisRequest !== requestNumber) return;

                const place = {
                    name: "Your Location",
                    country: ""
                };

                displayCurrentWeather(place, data);
                displayHourlyForecast(data);
                displayWeeklyForecast(data);

                dashboard.classList.remove("hidden");

            } catch (error) {
                searchError.textContent = error.message;
            } finally {
                loading.classList.add("hidden");
            }
        },

        () => {
            loading.classList.add("hidden");
            searchError.textContent =
                "Unable to access your location. Please allow location permission.";
        }
    );
});

// Dark mode toggle
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    const isDark = document.body.classList.contains("dark-mode");

    themeToggle.innerHTML = isDark
        ? '<i class="fa-solid fa-sun"></i><span>Light Mode</span>'
        : '<i class="fa-solid fa-moon"></i><span>Dark Mode</span>';

    localStorage.setItem("skycast-theme", isDark ? "dark" : "light");
});

// Restore saved theme
if (localStorage.getItem("skycast-theme") === "dark") {
    document.body.classList.add("dark-mode");

    themeToggle.innerHTML =
        '<i class="fa-solid fa-sun"></i><span>Light Mode</span>';
}

console.log("SkyCast Weather Dashboard initialized successfully!");
const favoriteBtn = document.getElementById("favoriteBtn");

let favoriteCities = JSON.parse(
    localStorage.getItem("skycastFavorites") || "[]"
);

favoriteBtn.addEventListener("click", () => {
    const city = document.getElementById("cityName").textContent.trim();

    if (!city || city === "Search for a city") {
        return;
    }

    if (favoriteCities.includes(city)) {
        favoriteCities = favoriteCities.filter(item => item !== city);
        favoriteBtn.textContent = "☆";
    } else {
        favoriteCities.push(city);
        favoriteBtn.textContent = "★";
    }

    localStorage.setItem(
        "skycastFavorites",
        JSON.stringify(favoriteCities)
    );

    alert("Favorite cities updated!");
});