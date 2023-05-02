const api_Url= 'https://api.wheretheiss.at/v1/satellites/25544'
//making a map with tile
const map = L.map('map').setView([0, 0],0);
const deathIcon = L.icon({
    iconUrl: 'img/deathstar.webp',

    iconSize:     [50, 95], // size of the icon
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
});
const marker = L.marker([0, 0],{icon:deathIcon}).addTo(map);


async  function getIss(){
    const response =await fetch(api_Url)
    const data= await response.json();

    // console.log(data.latitude)
    // console.log(data.longitude)

    const {latitude, longitude}= data;

    // const marker = L.marker([latitude, longitude]).addTo(map);
    marker.setLatLng([latitude,longitude])
    document.getElementById('lat').textContent=latitude;
    document.getElementById('long').textContent=longitude;
}
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
getIss();

