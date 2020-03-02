console.log('Bienvenu sur France 2 météo');

const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

const inputSearch = document.querySelector('input[type=search]');
const weatherForm = document
    .querySelector('form')
    .addEventListener('submit', function(e) {
        e.preventDefault();
        const url = './weather?address=' + inputSearch.value;
        messageOne.textContent = 'Loading';
        messageOne.textContent = '';

        fetch(url).then(response => {
            response.json().then(result => {
                if (result.error) {
                    messageOne.textContent = result.error;
                    messageOne.textContent = '';
                } else {
                    messageOne.textContent = result.data.place;
                    messageTwo.textContent = result.forecastData;
                }
                console.log(response);
                console.log(result);
            });
        });
    });
