const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');
const app = express();
const contentDisposition = require('content-disposition');
const PORT = 8080;

app.use(cors());

app.use(express.static('client'));


app.listen(PORT, () => {
	console.log(`Server Works !!! At port ${PORT}`);
});

app.get('/downloadmp3', async (req, res, next) => {
	try {
		var url = req.query.url;
		if(!ytdl.validateURL(url)) {
			return res.sendStatus(400);
		}
		let title;

		await ytdl.getInfo(url).then(info => {			
			title = encodeURIComponent(info.videoDetails.title.replace(/ /g, ""));
			console.log(title);						
		})

res.setHeader('Content-Disposition', 'attachment;filename*=UTF-8\'\''+`${title}.mp3`);

ytdl(url, {
	format: 'mp3',
	filter: 'audioonly',
}).pipe(res);

} catch (err) {
	console.error(err);
}
});

app.get('/downloadmp4', async (req, res, next) => {
	try {
		let url = req.query.url;
		if(!ytdl.validateURL(url)) {
			return res.sendStatus(400);
		}
		let title;

		await ytdl.getInfo(url).then(info => {
    		title = encodeURIComponent(info.videoDetails.title.replace(/ /g, ""));   		
		})

      res.setHeader('Content-Disposition', 'attachment;filename*=UTF-8\'\''+`${title}.mp4`);

		ytdl(url, {
			format: 'mp4',
		}).pipe(res);

	} catch (err) {
		console.error(err);
	}
});