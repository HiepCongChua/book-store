const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const mess_1 = document.querySelector('#message-1');
const mess_2 = document.querySelector('#message-2');
// weatherForm.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const location = search.value;
//     const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=pk.eyJ1IjoiY29tbmd1b2kiLCJhIjoiY2p1dGtiYXNmMDh5NDQ0dDhiaDhsczl6MCJ9.I0YnE_vUCd_aa0KnRM3jsQ`;
//     fetch(url)
//         .then(res => {
//             return res.json();
//         })
//         .then(data => {
//             console.log(data);

//            return(data.features[0]);
//         })
//         .then(data=>{
//         const long = data.center[0];
//         const lat = data.center[1];
//         const url = `https://api.darksky.net/forecast/af8b4ff5d65bc5455bb409d48f932716/${long},${lat}`;

//         return fetch(url)

//         })
//         .then(data=>{
//             console.log(data);
//         })
//         .catch(err=>{
//             console.log(err);
//         })
// });
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    const url = `/weather?address=${encodeURIComponent(location)}`;

   fetch(url)
   .then(res=>{
       return res.json();
   })
   .then(data=>{
       if(!data.hasOwnProperty('error')){
       mess_1.textContent = data.forecast;
       mess_2.textContent = data.location;
       return
       }
       mess_1.textContent = data.error;
       
       
   })
   .catch(err=>{
    //    mess_1.textContent = 
    console.log(err);
   })
});
