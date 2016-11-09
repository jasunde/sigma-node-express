$(document).ready(function() {
  var timer;
  var $feedback = $('#feedback');

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
        getSongs();
        giveFeedback('Song added');
      },
      error: function(response) {
        giveFeedback(response.responseText);
      }

    });

  });

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
    var date;

    for (var i = 0; i < songs.length; i++) {
      $("#songContainer").append('<div class="song"></div>');
      var $el = $("#songContainer").children().last();
      $el.append('<h3>' + songs[i].title + '</h3>');
      $el.append('<p>By: ' + songs[i].artist + '</p>');

      date = new Date(songs[i].dateAdded || '1998');
      $el.append('<p>Date Added: ' + date.toLocaleString() + '</p>');
    }

  }

  function giveFeedback(message) {
    clearTimeout(timer);
    $feedback.removeClass('fadeOut').text(message);
    timer = setTimeout(function () {
      $feedback.addClass('fadeOut');
    }, 5000);
  }

});
