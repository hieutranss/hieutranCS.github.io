Vue.config.devtools = true

const resultsComponent = {
  template: `<div class="accordion" id="accordion">
  <div class="card" v-for="(result, index) in data">
  <div class="card-header" id="headingindex">
  <h5 class="mb-0">
  <button class="btn btn-link" type="button" data-toggle="collapse" v-bind:data-target="'#' + index">
  <div v-if= !result.box_art_url>
  {{result.name}} <br>
  {{result.viewer_count}}<br>
  </div>
  <div v-else>
  {{result.name}} <br>
  <a :href="result.url" target="_blank"> <img :src="result.box_art_url"></img></span></a>
  </div>
  </button>
  </h5>
  </div>
  <div v-bind:id="index" class="collapse" aria-labelledby="heading{{index}}" data-parent="#accordion">
  <div class="card-body">
  <div v-if= !result.art>
  <img :src="result.pic"></img>
  <p><a :href="result.url" target="_blank">{{result.title}}</span></a></p>
  </div>
  <div v-else>
  <a :href="result.url" target="_blank"> <img :src="result.art"></img></span></a>
  </div>
  </div>
  </div>
  </div>
  </div>`,
  props: ['data']
}


const socket = io()
const app = new Vue({
  el: '#reddit-app',
  data: {
    results: []
  },
  methods: {
    search: function () {
      if (!this.$refs.searchInput.value)
        return
      socket.emit('search', this.$refs.searchInput.value)
    },
    popular: function () {
      socket.emit('popular', "pop")
    },
    top_games: function () {
      socket.emit('top_games', "top") 
    }
  },
  components: {
    'results-component': resultsComponent
  } 
})

socket.on('search-Results', search => {
  app.results = []
  search.forEach(function(element) {
    if(element.data.length >= 1){
      element.data.forEach( (result) => {
        const name = result.name
        const box_art_url = 'https://static-cdn.jtvnw.net/ttv-boxart/' + `${name}` +'-144x192.jpg' 
        const url = 'https://www.twitch.tv/directory/game/' + `${name}` ;
        const tempObj = {name: name, box_art_url: box_art_url, url: url };
        app.results.push(tempObj)
      }) 
    }
    else{
      const box_art_url = 'https://i.gifer.com/PCt.gif'  
      app.results.push({name: name  ,box_art_url : box_art_url})
    }
  }) 
}) 

socket.on('games', games => {
  app.results = []
  games.forEach(function(element) {
    element.data.forEach( (result) => {
      const name = result.name;
      const art = 'https://static-cdn.jtvnw.net/ttv-boxart/' + `${name}` +'-144x192.jpg' 
      const url = 'https://www.twitch.tv/directory/game/' + `${name}` ;
      const tempObj = {name: name, art: art, url: url };
      app.results.push(tempObj)
    })
  })
})

socket.on('popular', popular => {
  app.results = []
  popular.forEach(function(element) {
    element.data.forEach( (result) => {
      const user_name = result.user_name
      const title = result.title
      const viewer_count = result.viewer_count +" viewers"
      const url = 'https://www.twitch.tv/' + `${user_name}` 
      const pic =  "https://static-cdn.jtvnw.net/previews-ttv/live_user_"+ `${user_name}`+ "-144x192.jpg"
      const tempObj = {name: user_name, title: title, viewer_count: viewer_count, url: url, pic: pic }
      app.results.push(tempObj)
    })
  })
})


socket.on('error-api', error => {
  const box_art_url = 'https://i.gifer.com/PCt.gif' 
  app.results.push({box_art_url : box_art_url})
})
