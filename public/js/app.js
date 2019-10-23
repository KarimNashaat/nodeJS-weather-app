const form = document.querySelector('form')
const input = document.querySelector('input')
const weather = document.querySelector('#p1')
const locationText = document.querySelector('#p2')

form.addEventListener('submit', (event) =>{
    event.preventDefault()
    weather.textContent = 'Loading..' 
    locationText.textContent = '..'
    const address = input.value
    fetch('http://localhost:3000/weather?address='+ address).then((response) => {
    response.json().then((data) => {
        if(data.error){
            weather.textContent = data.error
        }
        else {
            weather.textContent = data.weather
            locationText.textContent = data.location
        }
    })
})
})
