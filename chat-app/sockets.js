module.exports = (server) => {
	const
	io = require('socket.io')(server),
	moment = require('moment')

	let users = []
	const messages = []

	io.on('connection', socket => {

		socket.emit('refresh-messages', messages)
		socket.emit('refresh-users', users)

		socket.on('join-user', userName => {
			const user = {
				id: socket.id,
				name: userName,
				url: 'https://robohash.org/' + userName
			}

			users.push(user)

			let valueArr = users.map(function(item){ return item.name.toLowerCase()})
			let isDuplicate = valueArr.some(function(item, idx){ 
				return valueArr.indexOf(item) != idx 
			});

			if(isDuplicate == false){
				io.emit('successful-join', user)                
			}
			else{
				users = users.filter((thing, index, self) =>
					index === self.findIndex((t) => (
						t.name.toLowerCase() === thing.name.toLowerCase()
						)))
				io.emit('failed-join',{name: userName})
				return;
			}
 
		})
		socket.on('invalid-user', string => {
				io.emit('failed-join', "Invalid UserName")
		})

		socket.on('send-message', data => {
			const content = {
				user: data.user,
				url: data.user.url,
				message: data.message,
				date: moment(new Date()).format('MM/DD/YY h:mm a')
			}
			messages.push(content)

			io.emit('successful-message', content)
		})

		socket.on('log-out', user =>{
			users = users.filter(user => {
				return user.id != socket.id
			})

			io.emit('refresh-users', users)

		})

		socket.on('disconnect', () => {
			users = users.filter(user => {
				return user.id != socket.id
			})

			io.emit('refresh-users', users)
		})

	})
}
