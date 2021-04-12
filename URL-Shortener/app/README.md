URL Shortener Microservice Project

ou can POST a URL to /api/shorturl/new and get a JSON response with original_url and short_url properties.<br>
When you visit /api/shorturl/<short_url>, you will be redirected to the original URL.<br>
If you pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain { error: 'invalid url' }

