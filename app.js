const input = document.getElementById("input");
const button = document.getElementById("button");
const errormsg = document.querySelector("p");
const list = document.querySelector(".card-group");

localStorage.setItem("apikey","3ffd2d9d9549ad2e76a36427ef916dca");


const getData = async () => {
    let apikey = localStorage.getItem("apikey");
    let request = input.value;
    let type = "metric";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${request}&appid=${apikey}&units=${type}`;
    try {
        const response = await axios.get(url);
        const {weather, name, sys, main} = response.data;
        const iconUrl = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0].icon}.svg`
        list.innerHTML += `
        <div class="card-deck">
                <div class="card m-3">
                    <img src="${iconUrl}" class="mx-auto d-block" alt="..." style="width: 8rem; height: 6rem " >
                    <div class="card-body text-center">
                        <h5 class="card-title">${name} <sup>${sys.country}</sup></h5>
                        <p class="card-text">${Math.round(main.temp)}<sup>°C</sup></p>
                        <p class="card-text text-uppercase">${weather[0].description}</p>
                    </div>
                </div>
            </div>
        ` 
        errormsg.innerHTML = "";
        input.value = "";
    } catch (error) {
        errormsg.innerHTML = error;
    }
}

button.addEventListener("click", (e) =>{
    e.preventDefault();
    getData()
})