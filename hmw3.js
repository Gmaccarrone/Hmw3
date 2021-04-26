function  createResultSpotify(json,i){
  
  const div = document.createElement('div');
  div.classList.add('spotifyAlbum');
  div.id = 'album'+i;

  const txt = document.createElement('a');
  txt.innerText = json.albums.items[i].name;
  txt.classList.add('nameAlbum');
  txt.id = 'nameAlbum'+i;
  txt.setAttribute('href',json.albums.items[i].uri)
  
  const img = document.createElement('img');
  img.id = 'img'+i;

  img.classList.add("spotifyResultImg");
  img.src = json.albums.items[i].images[0].url;

  
  div.appendChild(img);
  div.appendChild(txt);
  return div;
}

function createNotFoundImg(){
  const div = document.createElement('div');
  div.id = 'albumNotFound';

  const txt = document.createElement('a');
  txt.innerText = 'Non abbiamo trovato niente :('
  txt.id = 'nameAlbumNotFound';
  
  const img = document.createElement('img');
  img.id = "spotifyResultImgNotFound";
  img.src = 'https://www.crearecreativita.it/wp-content/uploads/2015/07/trex.gif';

  div.appendChild(txt);
  div.appendChild(img);
  return div;
}

function IMDBCreateNotFoundImg(){
  const div = document.createElement('div');
  div.id = 'IMDBNotFound';

  const txt = document.createElement('a');
  txt.innerText = 'Non abbiamo trovato niente :('
  txt.id = 'IMDBNameNotFound';
  
  const img = document.createElement('img');
  img.id = "IMDBResultImgNotFound";
  img.src = 'https://www.crearecreativita.it/wp-content/uploads/2015/07/trex.gif';

  div.appendChild(txt);
  div.appendChild(img);
  return div;
}

function onSpotifyJson(json){

  const box = document.querySelector('#spotifyResults');
  const spotifyBox= document.querySelector('#spotifyBox');
  spotifyBox.classList.remove('hidden');
  const spotifyTitleBox = document.querySelector('#spotifyTitleBox');
  spotifyTitleBox.classList.remove('hidden');
  const spotifyTitle = document.querySelector('#spotifyTitle');
  spotifyTitle.classList.remove('hidden');
  const spotifyLogo = document.querySelector('#spotifyLogo');
  spotifyLogo.classList.remove('hidden');

  box.innerHTML = '';
  if(json.albums.items.length !== 0){
    for(i = 0; i < 10; i++) {
      box.appendChild(createResultSpotify(json,i));
    } 
  }
  else{box.appendChild(createNotFoundImg())}
}

function onSpotifyResponse(response)
{
  return response.json();
}

function showBox(){
  const box = document.querySelector('#IMDBBox');
  box.classList.remove('hidden');
  const poster = document.querySelector('#IMDBPoster');
  poster.classList.remove('hidden');
  const title = document.querySelector('#IMDBTitle');
  title.classList.remove('hidden');
  const logo = document.querySelector('#IMDBLogo');
  logo.classList.remove('hidden');
  const rate = document.querySelector('#IMDBRate');
  rate.classList.remove('hidden');
  const rateTxt = document.querySelector('#IMDBRateTxt');
  rateTxt.classList.remove('hidden');
  const resTitle = document.querySelector('#IMDBResultTitle');
  resTitle.classList.remove('hidden');
  const info = document.querySelector('#IMDBInfo');
  info.classList.remove('hidden');
  
  const det = document.querySelector('#IMDBDetails');
  det.classList.remove('hidden');
}

function hideWaitingBox(){
  const titles = document.querySelectorAll('.waitingTitle');
  const div = document.querySelector('#waitingDiv');
  const img = document.querySelector('#waitingImg');
  img.classList.add('hidden');
  div.classList.add('hidden');
  for(i = 0; i < titles.length; i++){
    console.log(titles[i]);
    titles[i].classList.add('hidden');}
}

function IMDBNotFound(){
  hideWaitingBox();
  const notFound = document.querySelectorAll('#IMDBNotFound');
  console.log(notFound);
  if(notFound.length > 0){
    for(i = 0; i<notFound.length; i++)
    notFound[i].innerHTML = '';
  }
  const box = document.querySelector('#IMDBBox');
  box.classList.remove('hidden');
  const title = document.querySelector('#IMDBTitle');
  title.classList.remove('hidden');
  const logo = document.querySelector('#IMDBLogo');
  logo.classList.remove('hidden');


  const poster = document.querySelector('#IMDBPoster');
  poster.classList.add('hidden');
  const rate = document.querySelector('#IMDBRate');
  rate.classList.add('hidden');
  const rateTxt = document.querySelector('#IMDBRateTxt');
  rateTxt.classList.add('hidden');

  const det = document.querySelector('#IMDBDetails');
  det.classList.add('hidden');
  const resTitle = document.querySelector('#IMDBResultTitle');
  resTitle.classList.add('hidden');
  const info = document.querySelector('#IMDBInfo');
  info.classList.add('hidden');

  const container = document.querySelector('#IMDBResult');
  
  container.appendChild(IMDBCreateNotFoundImg());  

}

function onDetJson(json)
{
  console.log(json);
  showBox();
  hideWaitingBox();
  const notFound = document.querySelectorAll('#IMDBNotFound');
  console.log(notFound);
  if(notFound.length > 0){
    for(i = 0; i<notFound.length; i++)
    notFound[i].innerHTML = '';
  }


  const plot = document.querySelector('#IMDBPlot');
  const tit = document.querySelector('#IMDBResultTitle');;
  const img = document.querySelector('#IMDBPoster');
  const auth = document.querySelector('#IMDBAuth');
  const gen = document.querySelector('#IMDBGenres');
  const date = document.querySelector('#IMDBdate');
  const rate = document.querySelector('#IMDBRate');

  img.src = json.title.image.url;
  tit.textContent = json.title.title;
  rate.textContent = json.ratings.rating;
  gen.textContent = "Genere: ";
  for(i = 0; i<json.genres.length; i++)
  gen.textContent += json.genres[i]+" ";
  auth.textContent = "Autore descrizione: ";
  date.textContent = "Data: " + json.releaseDate;

  if(json.plotSummary !== undefined) {
    auth.textContent += json.plotSummary.author;
    plot.textContent = json.plotSummary.text
  }
  else {  
    auth.textContent += json.plotOutline.author; 
    plot.textContent = json.plotOutline.text 
  }

}

function onDetResponse(response)
{
  return response.json();
}

function onIMDBJson(json){
  //ottenuto l'id del primo risultato facciamo un'altra query per avere più dettagli

  fetch("https://imdb8.p.rapidapi.com/title/get-overview-details?tconst="+json.d[0].id+"&currentCountry=IT", {
	  "method": "GET",
	  "headers": {
		  "x-rapidapi-key": "44bcd0ada3mshce3431aa446ca15p1b0349jsne61e14cb45e7",
		  "x-rapidapi-host": "imdb8.p.rapidapi.com"
	  }
  }).then(onDetResponse).then(onDetJson);
}

function onIMDBResponse(response)
{
  return response.json();
}

function search(event){
    event.preventDefault();
    const title = document.querySelector("#query");
    const titleURI = encodeURIComponent(title.value);
    //richiesta spotify
    fetch("https://api.spotify.com/v1/search?type=album&q=" + titleURI,
    {
      headers:
      {
        'Authorization': 'Bearer ' + token
      }
    }
  ).then(onSpotifyResponse).then(onSpotifyJson);

  //richiesta IMDB per trovare l'id di un titolo secondo la nostra ricerca
  fetch("https://imdb8.p.rapidapi.com/auto-complete?q="+titleURI, {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "44bcd0ada3mshce3431aa446ca15p1b0349jsne61e14cb45e7",
		"x-rapidapi-host": "imdb8.p.rapidapi.com"
	  }
  }).then(onIMDBResponse).then(onIMDBJson).catch(IMDBNotFound);
}

const form = document.querySelector("#searchBar");
form.addEventListener('submit', search);


//chiediamo il token di spotify (Oauth2)
function onTokenJson(json)
{
  token = json.access_token;
}
function onTokenResponse(response)
{
  return response.json();
}

const clientId = '0a68456dbd954d87827ecc15f1d8eb22';
const clientSecret = '29d22585e22c4a44bdfbd9f9697b0f94';
let token;
fetch("https://accounts.spotify.com/api/token",
	{
   method: "post",
   body: 'grant_type=client_credentials',
   headers:
   {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + btoa(clientId +':'+ clientSecret)
   }
  }
).then(onTokenResponse).then(onTokenJson);