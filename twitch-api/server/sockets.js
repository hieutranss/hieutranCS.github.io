module.exports = (server) => {
	const
	axios = require("axios")
	io = require('socket.io')(server),
	moment = require('moment')


	const client_id = 'jyr5c5h1keexg8dvp4nouhqv1b7b6d';

	const helix = axios.create({
		baseURL: 'https://api.twitch.tv/helix/',
		headers: {'Authorization': 'Bearer cfabdegwdoklmawdzdo98xt2fo512y'},
		headers: {'Client-ID': client_id}
	});

	io.on('connection', socket => {
		socket.on('search', search => {
			const searchResults = []
			helix.get('https://api.twitch.tv/helix/games?name='+`${search}`)
			.then(function (response) {
				searchResults.push(response.data)
			})
			.then(() =>{
				io.emit('search-Results', searchResults)
			})
			.catch((error) => {
				io.emit('error-api', error)
			}) 
		})


		socket.on("top_games", pop => { 
			const temp = []
			helix.get('https://api.twitch.tv/helix/games/top?first=20')
			.then(function (response) {
				temp.push(response.data)
			})
			.then(() =>{ 
				io.emit("games", temp)
			})
			.catch((error) =>{
				io.emit('error-api', error)
			})
		})              

		socket.on("popular", pop => { 
			const popularSubReddit = []
			helix.get('https://api.twitch.tv/helix/streams?first=20')
			.then(function (response) {
				popularSubReddit.push(response.data)
			})
			.then(() =>{
				io.emit("popular", popularSubReddit)
			})
			.catch((error) =>{
				io.emit('error-api', error)
			})
		})              
	})

}
