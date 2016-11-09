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
        giveFeedback(response, 'bg-success text-success');
      },
      error: function(response) {
        console.log(response);
        giveFeedback(response.responseText, 'bg-danger text-danger');
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
      var $col = $('<div class="song col-sm-4"><div class="panel panel-default"></div></div>');
      var $el = $col.find('.panel');
      $el.append('<div class="panel-heading"><h3>' + songs[i].title + '</h3></div>');
      $el.append('<div class="panel-body"><p>By: ' + songs[i].artist + '</p></div>');

      $el = $col.find('.panel-body');
      date = new Date(songs[i].dateAdded || '1998');
      $el.append('<p>Added: ' + date.toLocaleString() + '</p>');

      // $col.append($el);
      $("#songContainer").append($col);
    }

  }

  function giveFeedback(message, cls) {
    clearTimeout(timer);
    $feedback.attr('class', cls).text(message);
    timer = setTimeout(function () {
      $feedback.addClass('fadeOut');
    }, 3000);
  }

});
