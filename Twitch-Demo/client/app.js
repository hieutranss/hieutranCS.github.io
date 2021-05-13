Vue.config.devtools = true

const resultsComponent = {
  template: `
  <div class="row justify-content-md-center" >
   <div class="card" v-for="(result, index) in data">
  <div class="card-header" id="headingindex">
  
   <div v-if= !result.game>
    <a :href="result.url" target="_blank"> {{result.name}}</span></a>
  <br>
  <a :href="result.url" target="_blank"><img :src="result.thumbnail"></img></span></a>
  </div>

  <div v-else-if= result.title>
  <a :href="result.url" target="_blank">{{result.name}}</span></a>
<br>
<a :href="result.game_url" target="_blank">{{result.game}}</span></a>
  <br>
  <a :href="result.url" target="_blank"><img :src="result.thumbnail"></img></span></a>
  </div>

  <div v-else-if= result.url_err>
  {{result.name}}
  <img :src="result.url_err"></img></span>
  </div>

  <div v-else>
  <a :href="result.url" target="_blank">{{result.name}}</span></a>
    <br>
      <a :href="result.game_url" target="_blank">{{result.game}}</span></a>
    <br>
  <a :href="result.url" target="_blank"> <img :src="result.thumbnail"></img></span></a>
  </div>

  <div v-if="result.channel == 0">
  <div><h3> Invalid Channel Name </h3></div>
  </div>
  <div v-else-if= result.channel_url>
  <div> 
   <iframe
    :src= "result.channel_url"
    height="720"
    width="1280"
    allowfullscreen="true"
    muted="false"
    >
</iframe>
  </div>
  </div>

  </div>
  </div>
  </div>
  `,
  props: ['data']
}

const socket = io()
const app = new Vue({
  el: '#twitch-app',
  data: {
    results: []
  },
  methods: {
    s_channels: function() {
      if (!this.$refs.searchInput.value)
        return
      socket.emit('channels', this.$refs.searchInput.value)
    },
    s_catogories: function() {
      if (!this.$refs.searchInput.value)
        return
      socket.emit('catogories', this.$refs.searchInput.value)
    },
    popular: function() {
      socket.emit('popular', "pop")
    },
    top_games: function() {
      socket.emit('top_games', "top")
    },
    embed: function() {
      if (!this.$refs.searchInput.value)
        return
      socket.emit('embed', this.$refs.searchInput.value )
    }
  },
  components: {
    'results-component': resultsComponent
  }
})

//channel search results
socket.on('channels', search => {
  app.results = []
  search[0].forEach(function(res) {
    const name = res.display_name;
    const game = res.game_name;
    const url = "https://www.twitch.tv/" + name;
    const game_url = "https://www.twitch.tv/directory/game/" + game;
    const thumbnail = res.thumbnail_url;
    const tempObj = { name: name, thumbnail: thumbnail, url: url, game: game ,game_url:game_url};
    app.results.push(tempObj)
  })
})

//top 20 popular games + category search results
socket.on('games', games => {
  app.results = []
  games[0].forEach(function(res) {
    const name = res.name;
    const urlify = res.name.trim().replace(/\s/g, "%20");
    const thumbnail = "https://static-cdn.jtvnw.net/ttv-boxart/" + `${urlify}` + "-144x192.jpg";
    const url = "https://www.twitch.tv/directory/game/" + `${urlify}`;
    const tempObj = { name: name, thumbnail: thumbnail, url: url };
    app.results.push(tempObj)
  })
})

//Gets information about active streams.
socket.on('streams', popular => {
  app.results = []
   popular[0].forEach(function(res) {
   const name = res.user_name;
   const game = res.game_name;
   const title = res.title;
   const thumbnail = "https://static-cdn.jtvnw.net/previews-ttv/live_user_"+ `${res.user_login}` +"-440x248.jpg";
   const url = "https://www.twitch.tv/" + `${res.user_login}`;
   const game_url = "https://www.twitch.tv/directory/game/" + game
   const tempObj = { name: name,game:game, url:url,title: title, thumbnail: thumbnail, game_url:game_url };
    app.results.push(tempObj)
  })
})

//Non-Interactive Inline Frames for Live Streams
socket.on('embed', login =>{
app.results = []
if(login[0] == "empty"){
  const tempObj = {channel: "0"};
 app.results.push(tempObj);
}
else{
const channel_url = "https://player.twitch.tv/?channel="+`${login[0]}`+"&parent=tvdemo.htcs.repl.co"
const tempObj = {channel:login[0] ,channel_url:channel_url };
 app.results.push(tempObj);
}
})

socket.on('error-api', err => {
  app.results = [];
  const url_err = 'https://i.gifer.com/PCt.gif';
  const name = "Invalid Request";
  const tempObj = {name:name , url_err: url_err};
  app.results.push(tempObj);
})