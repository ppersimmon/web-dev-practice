// Task 1

class Transport {
    ride() {
        throw new Error('ride() is not implemented')
    }

    stop() {
        throw new Error('stop() is not implemented')
    }
}
class Car extends Transport{
    constructor() {
        super();
        this.type = 'Car';
    }

    ride () {
        console.log(`${this.type} is riding`);
    }

    stop () {
        console.log(`${this.type} stopped`);
    }
}

class Bike extends Transport{
    constructor() {
        super();
        this.type = 'Bike';
    }

    ride () {
        console.log(`${this.type} is riding`);
    }

    stop () {
        console.log(`${this.type} stopped`);
    }
}

class TransportFactory {
    static createTransport(type) {
        switch (type) {
            case 'car':
                return new Car();
            case 'bike':
                return new Bike();
            default:
                throw new Error('Unknown type of transport');
        }
    }
}

const car = TransportFactory.createTransport('car');
const bike = TransportFactory.createTransport('bike');

car.ride();
car.stop();

bike.ride();
bike.stop();

// Task 2

const mainDiv = document.getElementById('characters');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const pageDisplay = document.getElementById('value');

let currentPage = 1;

async function loadCharacters(page) {
    const url = `https://rickandmortyapi.com/api/character/?page=${page}`;
    mainDiv.innerHTML = '<p class="loading">Loading...</p>';

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Something went wrong');
        }

        const data = await response.json();
        const { info, results } = data;

        renderList(results);
        updatePagination(info);

    } catch (error) {
        console.error('Error:', error);
    }
}

function renderList (characters) {
    mainDiv.innerHTML = characters.map(item =>
        `<div class="single-character">
            <img src="${item.image}" alt="${item.name}">
            
            <div class="info">
                <p>Name: <strong>${item.name}</strong></p>
                <p>Status: ${item.status}</p>
            </div> </div>`).join('');
}

function updatePagination (info) {
    if (info.next) {
        const nextUrl = new URL(info.next);
        const nextPage = Number(nextUrl.searchParams.get('page'));
        currentPage = nextPage - 1;
    } else {
        currentPage = info.pages;
    }

    pageDisplay.innerHTML = currentPage;

    prevButton.disabled = (currentPage === 1);
    nextButton.disabled = (currentPage === info.pages);
}

nextButton.addEventListener('click', () => {
    currentPage++;
    loadCharacters(currentPage);
});

prevButton.addEventListener('click', () => {
    currentPage--;
    loadCharacters(currentPage);
});

loadCharacters(currentPage);