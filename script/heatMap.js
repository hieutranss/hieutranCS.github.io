function heatMap() {
  
var url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json'

var width = 1200 - 90 - 50,
height = 550 - 30 - 100

 var chart = d3.select('.holderHeat')
  .append('svg')
  .attr('width', 1200)
  .attr('height', 580)


d3.json(url, function(data) {

  var dataM = data.monthlyVariance
  var len = data.length

  var xScale = d3.scaleLinear()
  .domain(d3.extent(data.monthlyVariance,function(d){return d.year}))
  .range([0, width])

  var xAxis = d3.axisBottom(xScale)
  .ticks(20)
  .tickSize(15)
  .tickFormat(function(d){return d})

  var xChart = chart.append('g')
  .attr('id' ,'x-axis')
  .style("font", "15px times")
  .attr('transform', 'translate(80,430)')
  .call( xAxis )


  var yScale = d3.scaleTime()
  .domain([new Date(2015, 0, 1), new Date(2015, 11, 31)])
  .range([0, height])

  var yAxis = d3.axisLeft( yScale )
  .tickSize(15)
  .tickFormat(d3.timeFormat('%B'))


  var yChart = chart.append('g')
  .attr('id' ,'y-axis')
  .style("font", "15px times")
  .attr('transform', 'translate(80,10)')
  .call( yAxis )


  var tip = d3.tip()
  .attr('id', 'tooltip')
  .offset([-10, 0])
  .direction('e')
  .html(function(d,i) {
   return d
 })

  chart.call(tip)   

  var range = ['#5e4fa4', '#3288bd', '#66c2a5', '#abdda4', '#e6f598', '#ffffbf', '#fee08b', '#fdae61', '#f46d43', '#d53e4f', '#9e0142']


  var color = d3.scaleQuantize()
  .domain(d3.extent(dataM, function(d, i){
    var temp = data.baseTemperature + d.variance
    return temp
  }))
  .range(range)

  var map = chart.selectAll(".heat-map")
  .data(data.monthlyVariance)
  .enter()
  .append("rect")
  .attr("class", "cell")
  .attr('data-month', function(d, i) {
   return d.month -1 
 })
  .attr('data-year', function(d, i) {
   return d.year
 })
  .attr('data-temp', function(d, i) {
    return d.variance + data.baseTemperature
  })
  .attr('x', function(d){
    return xScale(d.year)+ 80
  })
  .attr('y', function(d){
    return (d.month -1) * 34 + 9
  })  
  .attr('width', 4)
  .attr('height', 47)
  .attr("fill", function(d){
    var temp = data.baseTemperature + d.variance
    return color(temp)
  })
  .on('mouseover', function(d, i){
    var tooltip =   d3.timeFormat("%B")(new Date(d.year, d.month - 1)) + " - " + d3.timeFormat("%Y")(new Date(d.year, d.month - 1)) + "<br>"
    + "temperature : " + d3.format(".1f")(data.baseTemperature + d.variance) + "℃" + "<br>"
    + "variance : " + d3.format("+.1f")(d.variance) + "℃" 

    tip.attr("data-year", d.year)
    tip.show(tooltip)
  })
  .on('mouseout', tip.hide)



  var legend = chart.append("g")
  .attr("id", "legend")
  .attr("transform", "translate(50,500)")

 legend = chart.append("text")
 .attr('id','heatDes')
      .text("Temperature Chart")
      .attr("transform", "translate(500,490)")

  var legendLinear = d3.legendColor()
  .shapeWidth(100)
  .cells(11)
  .orient('horizontal')
  .scale(color)

  var legendCall = chart.select("#legend")
  .call(legendLinear)

})

}