const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#msg-1');
const messageTwo = document.querySelector('#msg-2');

weatherForm.addEventListener('submit', (e) => {

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    // Prevents page from auto refreshing when submitting the form
    e.preventDefault();

    const location = search.value;

    // Only works for client side JS. Fetch data from the url then 
    // perform the function
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = '';
                messageTwo.textContent = data.error;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecastData;
            }
        });
    });
});