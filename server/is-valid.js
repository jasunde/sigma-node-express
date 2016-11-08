function isValid(song, songs) {
  return !isDuplicate(song, songs)
}

function isDuplicate(song, songs) {
  return songs.some(function (item) {
    return item.title === song.title && item.artist === song.artist
  })
}


module.exports = isValid
