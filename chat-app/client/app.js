   //client side
    // Chat Component
    const chatComponent = {
      template: ` <div class="chat-box" id="content" >
      <p v-for="data in content">
      <img v-bind:src="data.user.url" class="circle" width="30px">  
      <span><strong>{{data.user.name}}</strong> <small>{{data.date}}</small><span>
      <br />
      {{data.message}}
      </p>
      </div>`,
      props: ['content']
    }

    // Users Component
    const usersComponent = {
      template: ` <div class="user-list">
      <h6>Active Users ({{users.length}})</h6>
      <ul v-for="user in users">
      <li>
      <img v-bind:src="user.url" class="circle" width="30px">                      
      <span>{{user.name}}</span>
      </li>
      <hr>
      </ul>
      </div>`,
      props: ['users']
    }

    // Welcome Component
    const userWelcome = {
      template: ` <div  class="user-welcome" style="color:yellow;text-align:center">
      <h4>{{welcome.i}}</h4>
      <img v-bind:src="user.url" class="circle" width="50px">                      
      <h4>{{user.name}}</h4>
      </div>`,
      props: ['user','welcome']
    }
    const socket = io()
    const app = new Vue({
      el: '#chat-app',
      data: {
        loggedIn: false,
        userName: '',
        invalid: false,
        user: {},
        users: [],
        message: '',
        welcome:{},
        url:'',
        messages: []
      },
      methods: {
        logOut: function(){
          app.loggedIn = false
          app.invalid = false
          app.userName = ''
          app.user = ''
          app.welcome = {}
          socket.emit("log-out", this.userName)     
        },
        joinUser: function () {
         if(this.userName.trim().length === 0){
          socket.emit('invalid-user', this.userName)
        }   
        else{
         socket.emit('join-user', this.userName.trim())
       }      
     },
     sendMessage: function () {
      if (!this.message)
        return

      socket.emit('send-message', { message: this.message, user: this.user })
    }
  },
  components: {
    'users-component': usersComponent,
    'welcome-component' : userWelcome,
    'chat-component': chatComponent
  }
})


    socket.on('refresh-messages', messages => {
      app.messages = messages
    })
    socket.on('refresh-users', users => {
      app.users = users
    })

    socket.on('successful-join', user => {
      if (user.name === app.userName.trim()) {
        app.user = user
        app.loggedIn = true
      }
      app.welcome['i'] = 'Welcome'
      app.users.push(user)
    })

    socket.on('failed-join',users  => {
      app.invalid = true
    })

    socket.on('successful-message', content => {
      app.message = ''
      app.messages.push(content)
    })

