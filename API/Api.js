const api_Url= 'https://api.wheretheiss.at/v1/satellites/25544'
async  function getIss(){
    const response =await fetch(api_Url)
    const data= await response.json();
    // console.log(data.latitude)
    // console.log(data.longitude)

    const {latitude, longitude}= data;
    document.getElementById('lat').textContent=latitude;
    document.getElementById('long').textContent=longitude;
}
getIss();

