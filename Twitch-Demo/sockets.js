module.exports = (server) => {
  const
    axios = require('axios'),
    io = require('socket.io')(server)


  const helix = function(callback) {
    axios({
      method: 'POST',
      url: `https://id.twitch.tv/oauth2/token?client_id=${process.env.CLIENT}&client_secret=${process.env.SECRET}&grant_type=client_credentials`
    })
      .then(function(res) {
        callback(res.data.access_token);
      })
      .catch(function(err) {
        callback(err.response.data)
      })
  }


  io.on('connection', socket => {

    //top 20 games with high number of viewers
    socket.on('top_games', top => {
      const temp = [];
      helix(function(res) {
        axios({
          url: 'https://api.twitch.tv/helix/games/top',
          headers: {
            'Client-ID': process.env.CLIENT,
            'Authorization': "Bearer " + res
          }
        })
          .then(function(res) {
            temp.push(res.data.data)
          })
          .then(() => {
            io.emit("games", temp)
          })
          .catch(function(err) {
            io.emit('error-api', err)
          })
      })
    })

    //Returns a list of games that match the query either entirely or partially
    socket.on('catogories', search => {
      const temp = []
      helix(function(res) {
        axios({
          url: 'https://api.twitch.tv/helix/search/categories?query=' + `${search}`,
          headers: {
            'Client-ID': process.env.CLIENT,
            'Authorization': "Bearer " + res
          }
        })
          .then(function(res) {
            temp.push(res.data.data)
          })
          .then(() => {
            io.emit("games", temp)
          })
          .catch(function(err) {
            io.emit('error-api', err)
          })
      })
    })

    //Returns a list of channels that match the channel name or description either entirely or partially 
    //Results include both live and offline channels
    socket.on('channels', search => {
      const temp = []
      helix(function(res) {
        axios({
          url: 'https://api.twitch.tv/helix/search/channels?query=' + `${search}`,
          headers: {
            'Client-ID': process.env.CLIENT,
            'Authorization': "Bearer " + res
          }
        })
          .then(function(res) {
            temp.push(res.data.data)
          })
          .then(() => {
            io.emit("channels", temp)
          })
          .catch(function(err) {
            io.emit('error-api', err)
          })
      })
    })

    //Streams returned sorted by number of current viewers
    socket.on('popular', top => {
      const temp = [];
      helix(function(res) {
        axios({
          url: 'https://api.twitch.tv/helix/streams',
          headers: {
            'Client-ID': process.env.CLIENT,
            'Authorization': "Bearer " + res
          }
        })
          .then(function(res) {
            temp.push(res.data.data)
          })
          .then(() => {
            io.emit("streams", temp)
          })
          .catch(function(err) {
            io.emit('error-api', err)
          })
      })
    })

    //returns an embedded livestream
    socket.on('embed', user => {
      const temp = [];
     helix(function(res) {    
     axios({
          url: 'https://api.twitch.tv/helix/users?login=' + `${user}`,
          headers: {
            'Client-ID': process.env.CLIENT,
            'Authorization': "Bearer " + res
          }
        })
        .then(function (res) {
          if(res.data.data.length == 0){
            temp.push("empty")
          }
          else{
            temp.push(res.data.data[0].login)
          }        
        })
        .then(()=>{
          io.emit("embed", temp)
        })
        .catch(function (err){
          io.emit('error-api', err)
        })
     })
    })


  })

}
