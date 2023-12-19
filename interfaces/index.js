let cars = [];

//--------------------------------------------------------------------------------
function uuidv4() 
{
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0, 
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function formatDate(dateString) 
{
    return dateString.split('T')[0]; // Extracts the date part before the 'T'
}
//--------------------------------------------------------------------------------

// Get from API
async function getFromAPI() 
{
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

async function addToAPI(car) 
{
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(car)
    });
}

async function holdToAPI(carID, holdStatus) 
{
    console.log(JSON.stringify({ hold: holdStatus }));
    const response = await fetch(`${url}/${carID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(holdStatus)
    });
}

async function sellToAPI(carID)
{
    const response = await fetch(`${url}/${carID}`, 
    {
        method: 'DELETE',
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });


}

//--------------------------------------------------------------------------------
async function handleOnLoad()
{
    let cars = await getFromAPI();
    populateTable(cars);
}

function populateTable(cars)
{
    let html = '';

    cars.forEach(car => {
        const formattedDate = formatDate(car.date);
        html += `
            <tr class="center">
                <td>${car.make}</td>
                <td>${car.model}</td>
                <td>${car.mileage} miles</td>
                <td>${formattedDate}</td>
                <td>
                    ${car.hold ? 
                        `<button onclick="handleUnHold('${car.carID}')" class="btn btn-warning btn-sm">UnHold</button>` :
                        `<button onclick="handleHold('${car.carID}')" class="btn btn-success btn-sm">Hold</button>`}
                </td>            
                <td><button onclick="handleSell('${car.carID}')" class="btn btn-danger btn-sm">Sell</button></td>
            </tr>`;
    });
    
    document.getElementById('carList').innerHTML=html;
}
//--------------------------------------------------------------------------------


async function handleAddCar() {
    console.log("start")

    const car = {
        carID: uuidv4(),
        make: document.getElementById('make').value,
        model: document.getElementById('model').value,
        mileage: document.getElementById('mileage').value,
        date: document.getElementById('date').value,
        hold: false,
        deleted: false
    };

    console.log("added data")
    
    await addToAPI(car); // Send data to API
    console.log("sent to api")
    cars.push(car); // Add to local array
    localStorage.setItem('cars', JSON.stringify(cars));
    console.log("populate")
    populateTable();
    console.log("populated")
    document.getElementById('make').value = '';
    document.getElementById('model').value = '';
    document.getElementById('mileage').value = '';
    document.getElementById('date').value = '';
}



async function handleHold(carID) 
{
    const car = cars.find(car => car.carID === carID);
    car.hold = true;
    await holdToAPI(carID, car.hold);
    localStorage.setItem('cars', JSON.stringify(cars));
    populateTable();
}

async function handleUnHold(carID) 
{
    const car = cars.find(car => car.carID === carID);
    car.hold = false;
    await holdToAPI(carID, car.hold);
    localStorage.setItem('cars', JSON.stringify(cars));
    populateTable();
}

async function handleSell(carID)
{
    await sellToAPI(carID);
    cars = cars.filter(car => car.carID != carID);
    localStorage.setItem('cars', JSON.stringify(cars));

    populateTable();
}