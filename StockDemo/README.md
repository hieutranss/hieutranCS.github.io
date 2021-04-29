<h4> Stock App </h4>

<p>
User input a stock symbol to get all info of the stock.<br>
Cryptocurrencies are currently not supported.<br>
There will be a chart from yahoo finance if the user wants to know more about the stock.

Demo link:    <a href="https://stockdemo.htcs.repl.co/" target="_blank">Stock Demo</a>


The project used JavaScript.<br>
Used express to write handlers for requests with different HTTPs at different URL paths.<br>
Used ejs as a template to generate HTML markup with plain JavaScript.<br>
Used APIs from <a href="https://api.stocktwits.com/developers/docs/api" target="_blank">api.stocktwits.com</a> to check if the symbol is available, then use it to get data from ALPHA VANTAGE.
Used axios to get data from <a href="https://www.alphavantage.co/documentation/" target="_blank">alphavantage.co</a> and then render the requested data to ejs, and display it.<br>
Since replit.com will not keep the project running constantly, I used <a href="https://uptimerobot.com " target="_blank">uptimerobot</a> to keep the project alive for testing purposes.
</p>
