console.log('Client side javascript loaded!!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const locationElement = document.querySelector('#location')
const forecastElement = document.querySelector('#forecast')
const errorElement = document.querySelector('#error')


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const location = search.value
    errorElement.textContent = 'loading...'
    locationElement.textContent = ''
    forecastElement.textContent = ''
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                errorElement.textContent = data.error
            } else {
                locationElement.textContent = data.location
                forecastElement.textContent = data.forecast
                errorElement.textContent = ''
            }
        })
    })
})