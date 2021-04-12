Timestamp Microservice Project

A request to /api/timestamp/:date? with a valid date should return a JSON object with a unix key that is a Unix timestamp of the input date in milliseconds<br>
A request to /api/timestamp/:date? with a valid date should return a JSON object with a utc key that is a string of the input date in the format: Thu, 01 Jan 1970 00:00:00 GMT<br>
A request to /api/timestamp/1451001600000 should return { unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" }<br>
Project can handle dates that can be successfully parsed by new Date(date_string)<br>
If the input date string is invalid, the api returns an object having the structure { error : "Invalid Date" }<br>
An empty date parameter should return the current time in a JSON object with a unix key<br>
An empty date parameter should return the current time in a JSON object with a utc key<br>
