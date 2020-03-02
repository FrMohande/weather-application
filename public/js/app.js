console.log('Bienvenue sur France 2 météo');

let messageOne = document.querySelector('#message-1');
let messageTwo = document.querySelector('#message-2');

const inputSearch = document.querySelector('input[type=search]');
const weatherForm = document
    .querySelector('form')
    .addEventListener('submit', function(e) {
        e.preventDefault();
        const url = './weather?address=' + inputSearch.value;

        messageOne.textContent = 'Chargement';
        messageTwo.textContent = '';

        fetch(url).then(response => {
            response.json().then(result => {
                if (result.error) {
                    messageOne.textContent = result.error;
                    messageTwo.textContent = '';
                } else {
                    messageOne.textContent = result.data.place;
                    messageTwo.textContent = result.forecastData;
                }
            });
        });
    });
