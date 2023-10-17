//  window.setTimeout((){
//         var loader = document.getElementById('loader');
//         loader.style.display = 'none';
//     },1000);
   
var currentPage = 1;
var endpoint = 'people';

    function fetchData(endpoint, direction) {
        if (direction === 'next') {
            currentPage++;
        } else if (direction === 'prev' && currentPage > 1) {
            currentPage--;
        }

        // currentEndpoint = endpoint;
        
        var apiUrl = `https://swapi.dev/api/${endpoint}/?page=${currentPage}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                display(data.results);
                pageChange(data);
            })
            .catch(error => {
                console.error('Error fetching data:');
            });
        // var response= await fetch(apiUrl);
        // var data=response.json();
        // display(data.results);
        // pageChange(data);
    }

    function display(data) {
        var bigBox = document.getElementById('Content');
        bigBox.innerHTML = '';

        data.forEach(item => {
            var li = document.createElement('li');
            let count =0;
            for (var key in item) {
                var div = document.createElement('div');
                div.innerHTML = `<strong>${key}:</strong> ${item[key]}`;
                li.appendChild(div);
                count++;
                if(count==8){
                    break;
                }
            }
            bigBox.appendChild(li);
        });
    }

    function pageChange(data) {
        var prevBtn = document.getElementById('prevBtn');
        var nextBtn = document.getElementById('nextBtn');

        if (data.previous) {
            prevBtn.disabled = false;
        } else {
            prevBtn.disabled = true;
        }

        if (data.next) {
            nextBtn.disabled = false;
        } else {
            nextBtn.disabled = true;
        }
    }

    fetchData('people', 1);