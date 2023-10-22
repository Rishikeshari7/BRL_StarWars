const api = 'https://swapi.dev/api/';
const searchInput = document.getElementById('search');
const searchButton = document.getElementById('search-button');
const loader = document.getElementById('loader');
const results = document.getElementById('results');
const downloadButton = document.getElementById('download-button');

searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        fetchAndDisplayData(searchTerm);
    }
});

function fetchAndDisplayData(searchTerm) {
    loader.style.display = 'block';
    results.innerHTML = '';

    fetch(`${api}${searchTerm}`)
        .then(response => response.json())
        .then(data => {
            loader.style.display = 'none';

            if (data.results.length === 0) {
                results.innerHTML = 'No results found.';
                return;
            }
            data.results.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'result';

                    if(searchTerm==='people'){
                        itemDiv.innerHTML = `
                        <h2>${item.name}</h2>
                        <p>Height: ${item.height}</p>
                        <p>Mass: ${item.mass}</p>
                        <p>Gender: ${item.gender}</p>
                        <p>Birth: ${item.birth_year}</p>
                        <hr>  
                    `;
                    }
                    else if (searchTerm==='vehicles'){
                        itemDiv.innerHTML = `<h2>${item.name}</h2>
                        <p>Model: ${item.model}</p>
                        <p>Manufacturer: ${item.manufacturer}</p>
                        <p>Class: ${item.vehicle_class}</p>
                        <hr>
                        `;
                    }
                    else if (searchTerm==='starships'){
                        itemDiv.innerHTML = ` <h2>${item.name}</h2>
                        <p>Model: ${item.model}</p>
                        <p>Manufacturer: ${item.manufacturer}</p>
                        <p>Class: ${item.starship_class}</p>
                        <hr>
                        `;
                    }
                    else if (searchTerm==='films'){
                        itemDiv.innerHTML = ` <h2>${item.title}</h2>
                        <p>Episode: ${item.episode_id}</p>
                        <p>Director: ${item.director}</p>
                        <p>Producer: ${item.producer}</p>
                        <p>Release: ${item.release_date}</p>
                        <hr>
                        `;
                    }
                    else if (searchTerm==='planets'){
                        itemDiv.innerHTML = ` <h2>${item.name}</h2>
                        <p>Rotation: ${item.rotation_period}</p>
                        <p>Diameter: ${item.diameter}</p>
                        <p>Climate: ${item.climate}</p>
                        <p>Gravity: ${item.gravity}</p>
                        <p>Terrain: ${item.terrain}</p>
                        <p>Population: ${item.population}</p>
                        <hr>
                        `;
                    }
                    
                    else {
                        // itemDiv.innerHTML = `<h2>{Search for 'people','vehicles','films','starships'}</h2>`;
                       let  para =document.createElement('p');
                        para.textContent="Search only  'people','vehicles','films','starships'.";
                        itemDiv.appendChild(para);
                    }
                

                results.appendChild(itemDiv);
            });
        })
        .catch(error => {
            loader.style.display = 'none';
            console.error('Error:', error);
        });
}
// -----------------------------------------------------------------------------------


downloadButton.addEventListener('click', () => {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        const dataToDownload = results.textContent;
        const blob = new Blob([dataToDownload], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'starwars_data.json';
        a.click();
    }
});
