var mymap = L.map('mapid').setView([-0.0610732,109.3422024], 14);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <ahref="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 20,
	id: 'mapbox.streets',
	accessToken: 'pk.eyJ1IjoiYmlsbHlhIiwiYSI6ImNqbzlkemt2NzFnMjYzcHFtZmY4end0aGwifQ.3pk7USh_iTem1klxTGFmog'
}).addTo(mymap);

function findLocation(x,y) {
// console.log(x,y);
	for (var i=0; i< places.length;i++) {
		if (places[i].lokasi[0]==x &&
			places[i].lokasi[1]==y) {
			return i;
		}
	}
	return -1;
}

function showLocation(e) {
//console.log("you clicked " + e.latlng.lat + " dan "+e.latlng.lng);
	let ix = findLocation(e.latlng.lat,e.latlng.lng);
	if (ix >= 0) {
		gmb.style.display = "inline";
		gmb.src = places[ix].gambar;
		rev.innerHTML = places[ix].review;
	}
}

(async function (){
	const URL = "peta.json";
	try {
		let resp = await(fetch(URL));
		let resp2 = await resp.json();
		localStorage.setItem('places', JSON.stringify(resp2.places));//
	}
	catch(err){
		console.log(err);
	}
})( );


let gmb = document.getElementById("gambar1");
let rev = document.getElementById("review");

/
let places = JSON.parse(localStorage.getItem('places'));
for (var p of places) {
	var marker = L.marker(p.lokasi).addTo(mymap)
		.bindPopup(p.sponsor);
	marker.on('click', showLocation);
}