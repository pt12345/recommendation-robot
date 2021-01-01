'use strict';

const youTubeKey = 'AIzaSyA5CfZ3ObPO2iBVszTgDhMuG-69Hcn8-Ko'; 
const youTubeURL = 'https://www.googleapis.com/youtube/v3/search?';

const testeKey = '397350-PeterTar-FY2VDEP8';
const tasteUrl = '';

function getStatus() {
  const url = `${lolStatusURL}api_key=${lolKey}`;

  fetch(url)
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  })
  .then(responseJson => console.log(responseJson))
  .catch(err => {
    $('#js-error-message').text(`Something went wrong: ${err.message}`);
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
    getStatus();
  }
  
  $(watchPage);