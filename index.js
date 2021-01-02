'use strict';

const youTubeKey = 'AIzaSyA5CfZ3ObPO2iBVszTgDhMuG-69Hcn8-Ko'; 
const youTubeURL = 'https://www.googleapis.com/youtube/v3/search?';

const tasteKey = '397350-PeterTar-FY2VDEP8';
const tasteUrl = 'https://tastedive.com/api/similar?';

function tasteCallback(json) {
  console.log("hi");
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
    "headers": {
      "Cookie": "__cfduid=d6087458c6a8933416cec86fef6ae0a381609518849; tk_s=.eJxNjEEKgCAQAL8Se-7S1ScEncSz2Cq1UCvkGoj09wwKus4MU2GL6IQig6qAJMWy2wMoGANTargHjJnlKBajf4TRP_bGhkmC77Q4CanplGdPJ6X2tcMXTYQrLY7hum7UbyoJ.EtJBag.ojkJHihavGP0q35xrpYB0SThvbE"
    },
  };
  
  $.ajax(settings).done(function (response) {
    //console.log(response);
  });

}

function getYouTubeVideos() {

  const url = `${youTubeURL}key=${youTubeKey}
    &q=League%20of%Legends&part=snippet&macResults=10`;

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
    
    for (let i = 0; i < responseJson.items.length; i++){  
        $('#video-list').append(`<li>
        <h3>${responseJson.items[i].snippet.title}</h3>
        <img src=${responseJson.items[i].snippet.thumbnails.default.url} alt="Video Thumbnail">
        </li>`)
    }

    $('#results').removeClass('hidden');   
}

  function watchPage() {
    getYouTubeVideos();
    getSimilar();
  }
  
  $(watchPage);