'use strict';

const youTubeKey = 'AIzaSyA5CfZ3ObPO2iBVszTgDhMuG-69Hcn8-Ko'; 
const youTubeURL = 'https://www.googleapis.com/youtube/v3/search?';

const tasteKey = '397350-PeterTar-FY2VDEP8';
const tasteUrl = 'https://tastedive.com/api/similar?';

function watchForm() {
  $('form').submit(event => {

    event.preventDefault();
    let search = $('#search').val();

    let searchString = search.replace(/\s/g, '+')

    getSimilar(searchString);
  });
}

function tasteCallback(json) {
  getYouTubeVideos(json.Similar.Results); 
}

function getSimilar(search) {
  var settings = {
    "url": `${tasteUrl}api_key=${tasteKey}&q=${search}&callback=tasteCallback`,
    "dataType": "jsonp",
    "method": "GET",
    "jsonpCallback": "tasteCallback",
    "timeout": 0,
  };
  
  $.ajax(settings).done(function (response) {});
}

function getYouTubeVideos(similarResults) {

  // Check if results are found before adding to the page
  if(similarResults.length === 0 && $("#footer-text").text() === "Enjoy...") {
    $("#footer-text").text("No results found.");
  }
  else if(similarResults.length === 0) {
    $(".robot-font").text("No results found.");
  }
  else {

    $("#footer-text").text("Enjoy...");

    $('.videos').remove();
    $('.delete').remove();

    for(let i=0;i<3 && i<similarResults.length;i++) {

      // Generate random number for index value
      let randomNum = Math.floor(Math.random() * similarResults.length);

      let searchString = similarResults[randomNum].Name.replace(/\s/g, '+');

      // Remove value to prevent duplicate results
      similarResults.splice(randomNum,1);

      const url = `${youTubeURL}key=${youTubeKey}&q=${searchString}&part=snippet&maxResults=2`;

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
  }
}

function displayVideos(responseJson) {

    for (let i = 0; i < responseJson.items.length; i++){  
      $('#video-list').append(`<li class="videos hidden">
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