const input = document.getElementById('location')
const btn = document.getElementById('getWeather')
const weatherInfo = document.getElementById('weatherInfo')

const weatherLocation = document.querySelector('.weatherLocation')
const weatherIcon = document.querySelector('.icon')
const weatherDescription = document.querySelector('.description')
const weatherTemperature = document.querySelector('.temperature')



const googleApiKey = 'AIzaSyCmnp0kkjUyzAmvJF-CV655X9vYB0aRIxI'
const weatherApiKey = '214daee04b84851a546245da5431d069'

btn.addEventListener('click', async () => {
    const location = input.value

    // Step 01: Convert Location into Lat and Lng
    if (location) {
        const resp = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${googleApiKey}`)
        const data = await resp.json()
        const lat = data.results[0].geometry.location.lat
        const lng = data.results[0].geometry.location.lng

        // Step 02: Get Weather Data
        const getWeatherData = async () => {
            const weatherResp = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${weatherApiKey}&units=metric`)
            const weatherData = await weatherResp.json()

            const description = weatherData.weather[0].description
            const temp = Math.round(weatherData.main.temp)
            const icon = weatherData.weather[0].icon

            weatherLocation.innerText = location
            weatherDescription.innerText = description
            weatherTemperature.innerText = `${temp} °C`
            weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/w/${icon}.png" alt="">`


        }
        getWeatherData()

    }
})