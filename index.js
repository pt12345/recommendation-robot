'use strict';

const youTubeKey = 'AIzaSyA5CfZ3ObPO2iBVszTgDhMuG-69Hcn8-Ko'; 
const youTubeURL = 'https://www.googleapis.com/youtube/v3/search?';

const tasteKey = '397350-PeterTar-FY2VDEP8';
const tasteUrl = 'https://tastedive.com/api/similar?';

const etsyKey = 'q51b5thfg4uwjx8xvps4te4s';
const etsyURL = 'https://openapi.etsy.com/v2/listings/';

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    let search = $('#search').val();

    let searchString = search.replace(/\s/g, '+')

    console.log('search string = ' + searchString);

    getSimilar(searchString);
  });
}

function tasteCallback(json) {
  console.log("similar")
  console.log(json);

  let randomNum = Math.floor(Math.random() * json.Similar.Results.length);
  getYouTubeVideos(json.Similar.Results[randomNum].Name);

  randomNum = Math.floor(Math.random() * json.Similar.Results.length);
  getEtsy(json.Similar.Results[randomNum].Name);

  
   
}

function etsyCallback(responseJson) {
  console.log("etsy");
  console.log(responseJson.results);

  for (let i = 0; i < responseJson.results.length; i++){  
    $('#product-list').append(`<li class="products hidden">
    <img src=${responseJson.results[i].MainImage.url_170x135}
    <h3>${responseJson.results[i].title}</h3>
    </li>`)
  }

  $('.product-header').removeClass('hidden');
  $('.products').removeClass('hidden');  
}


function getSimilar(search) {
  console.log("search");
  console.log(search);
  const url = `${tasteUrl}api_key=${tasteKey}&q=mozart&callback=tasteCallback`;

  var settings = {
    "url": `https://tastedive.com/api/similar?api_key=397350-PeterTar-FY2VDEP8&q=${search}&callback=tasteCallback`,
    "dataType": "jsonp",
    "method": "GET",
    "jsonpCallback": "tasteCallback",
    "timeout": 0,
  };
  
  $.ajax(settings).done(function (response) {
    //console.log(response);
  });

}

function getEtsy(etsySearch) {

  let searchString = etsySearch.replace(/\s/g, '+');

  console.log("estsy search = " + searchString);

  $.ajax({
    url: `https://openapi.etsy.com/v2/listings/active.js?callback=getData&api_key=q51b5thfg4uwjx8xvps4te4s&keywords=${searchString}&includes=MainImage`,
    dataType: 'jsonp',
    success: etsyCallback,
  });

}

function getYouTubeVideos(videoSearch) {

  let searchString = videoSearch.replace(/\s/g, '+');

  console.log("youtube search = " + searchString);

  const url = `${youTubeURL}key=${youTubeKey}&q=${searchString}&part=snippet&macResults=10`;

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(responseJson => displayVideos(responseJson))
      .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
      });
  }

  function displayVideos(responseJson) {
    console.log("youtube")
    console.log(responseJson);
    for (let i = 0; i < responseJson.items.length; i++){  
        $('#video-list').append(`<li class="videos hidden">
        <h3>${responseJson.items[i].snippet.title}</h3>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/${responseJson.items[i].id.videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </li>`)
    }

    $('.video-header').removeClass('hidden');
    $('.videos').removeClass('hidden');
}

  function watchPage() {  
    watchForm();
  }
  
  $(watchPage);