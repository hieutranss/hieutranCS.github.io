function barChart() {
var url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json'

var margin = 40,
width = 800,
height = 500,
barWidth = width/275

d3.json(url, function(data) {


  var chart = d3.select('.holderBar')
  .append('svg')
  .attr('width', width + 100)
  .attr('height', height + 100)


  var len = data.data.length

  var value = []
  for(var i =0; i < len ;i++){
    value.push( { x : new Date(data.data[i][0]), y: data.data[i][1]})
  }
  

  var xMax =  d3.max(data.data.map(function(d){
    return new Date(d[0])
  }))

  var xMin =  d3.min(data.data.map(function(d){
    return new Date(d[0])
  }))


  var xScale = d3.scaleTime()
  .domain([xMin, xMax])
  .range([0, width])

  var xAxis = d3.axisBottom(xScale) 

  var xChart = chart.append('g')
  .attr( 'id' ,'x-axis')
   .attr('transform', 'translate(60,510)')
  .call( xAxis )


  var maxValue =  d3.max(data.data.map(function(d){
    return d[1]
  }))


  var yScale = d3.scaleLinear()
  .domain([maxValue, 0])
  .range([0, height])

  var yAxis = d3.axisLeft( yScale )

  var yChart = chart.append('g')
   .attr( 'id' ,'y-axis')
   .attr('transform', 'translate(60,10)')
  .call( yAxis )

  var barWidth = Math.ceil(width / len)

  var yLabel = chart.append("text")
  .attr('transform' , "rotate(-90)")
   .attr( 'y' , 100)
  .style("text-anchor", "end")
  .text("GDP values")

  var tip = d3.tip()
  .attr('id', 'tooltip')
  .offset([-10, 0])
  .html(function(d,i) {
    return data.data[i][0] + '<br>' +  "<span style='color:#580c6d'>" + '$' + d.y.toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') +  "</span>" +' Billion'
  })


  var bar = chart.selectAll(".bar")
  .data(value)
  .enter()
  .append("rect")
  .attr("class", "bar")
  .attr('data-date', function(d, i) {
   return value[i].x
 })
  .attr('data-gdp', function(d, i) {
   return value[i].y
 })
  .attr("x", function (d) { 
    return xScale(d.x) + 60
  })
  .attr("y", function (d) { 
    return yScale(d.y) + 10
  })
  .attr("width", barWidth)
  .attr("height", function (d) { 
    return height - yScale(d.y)
  })
  .on('mouseover', tip.show)
  .on('mouseout', tip.hide)
  .call(tip)
  
  var text = chart.append('a')
  .attr("xlink:href", "http://research.stlouisfed.org/fred2/data/GDP.txt")
  .attr("xlink:show","new")
  .append('text')
  .text('Source')
  .attr('fill','red')
  .style("font-size", "20px")
  .attr('transform','translate(400,570)')


})
}