//Fetch is a browser api so it won't work in node. Since this is a client side js file, it's fine

const weather = document.querySelector('form')
const search = document.querySelector('input')
const sucessMsg = document.getElementById('success-p')
const errorMsg = document.getElementById('error-p')



weather.addEventListener('submit', (e) => {
    e.preventDefault()

    sucessMsg.textContent = '...Loading'
    errorMsg.textContent = ''
    const location = search.value
    fetch('http://localhost:3000/Weather?address='+location).then( (response) => {
        response.json().then( (data) => {
            if(data.error){
                errorMsg.textContent = 'There was an error'
                sucessMsg.textContent =''
            }
            else{
                sucessMsg.textContent = data.forecast
            }
                
        })
    })
})