function isValid(song, songs) {
  if(isDuplicate(song, songs)) {
    return {valid: false, message: "That song is already on the list."}
  }

  if(isBlank(song)) {
    return {valid: false, message: "Please enter both title and artist."}
  }
  return {valid: true, message: ""}
}

function isDuplicate(song, songs) {
  return songs.some(function (item) {
    return item.title === song.title && item.artist === song.artist
  })
}

function isBlank(song) {
  return song.title === "" || song.artist === ""
}


module.exports = isValid
