$(document).ready(function() {
  console.log("it's alive!");

  $("#postSongForm").on("submit", function(event) {
    event.preventDefault();
    var newSong = {};

    var formArray = $(this).serializeArray();
    $.each(formArray, function(i, field) {
      newSong[field.name] = field.value;
    });

    // send song object to the Server
    $.ajax({
      type: 'POST',
      url: '/songs',
      data: newSong,
      success: function(response) {
        console.log(response);
        if(response == "Created") {
          getSongs();
        } else {
          // TODO: give response as feedback on the DOM
        }
      }
    })

  })

  getSongs();

  function getSongs() {
    $.ajax({
      type: 'GET',
      url: '/songs',
      success: function(songData) {
        songsToDom(songData);
      }
    });
  }

  function songsToDom(songs) {
    $("#songContainer").empty();

    for (var i = 0; i < songs.length; i++) {
      $("#songContainer").append('<div class="song"></div>');
      var $el = $("#songContainer").children().last();
      $el.append('<h3>' + songs[i].title + '</h3>');
      $el.append('<p>By: ' + songs[i].artist + '</p>');
    }

  }



});
