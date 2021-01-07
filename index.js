'use strict';

const youTubeKey = 'AIzaSyA5CfZ3ObPO2iBVszTgDhMuG-69Hcn8-Ko'; 
const youTubeURL = 'https://www.googleapis.com/youtube/v3/search?';

const tasteKey = '397350-PeterTar-FY2VDEP8';
const tasteUrl = 'https://tastedive.com/api/similar?';

const etsyKey = 'q51b5thfg4uwjx8xvps4te4s';
const etsyURL = 'https://openapi.etsy.com/v2/listings/';

function tasteCallback(json) {
  console.log("hi");
  console.log(json.Similar.Results[0].Name);

  getYouTubeVideos(json.Similar.Results[0].Name);
  getEtsy(json.Similar.Results[0].Name);
}

function etsyCallback(json) {
  console.log("etsy");
  console.log(json);
}

function getSimilar() {
  const url = `${tasteUrl}api_key=${tasteKey}&q=mozart&callback=tasteCallback`;

  var settings = {
    "url": "https://tastedive.com/api/similar?api_key=397350-PeterTar-FY2VDEP8&q=mozart&callback=tasteCallback",
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

  var settings = {
    "url": "https://openapi.etsy.com/v2/listings/active?callback=getData&api_key=q51b5thfg4uwjx8xvps4te4s&keywords=dog",
    "dataType": "jsonp",
    "method": "GET",
    "success": "etsyCallback",
  };


  $.ajax({
    url: `https://openapi.etsy.com/v2/listings/active.js?callback=getData&api_key=q51b5thfg4uwjx8xvps4te4s&keywords=${etsySearch}`,
    dataType: 'jsonp',
    success: function(data) {
    console.log(data);
  }
  });
}

function getYouTubeVideos(videoSearch) {

  const url = `${youTubeURL}key=${youTubeKey}&q=${videoSearch}&part=snippet&macResults=10`;

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
    console.log(responseJson);
    for (let i = 0; i < responseJson.items.length; i++){  
        $('#video-list').append(`<li>
        <h3>${responseJson.items[i].snippet.title}</h3>
        <img src=${responseJson.items[i].snippet.thumbnails.default.url} alt="Video Thumbnail">
        </li>`)
    }

    $('#results').removeClass('hidden');   
}

  function watchPage() {
    
    getSimilar();
    
  }
  
  $(watchPage);