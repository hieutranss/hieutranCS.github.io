function scatterPlot() {

 var url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json'

var margin = 40,
    width = 1000,
    height = 500,
    barWidth = width/275

d3.json(url, function(data) {

var chart = d3.select('.holderScatter')
  .append('svg')
  .attr('width', 1100)
  .attr('height', 600)


var len = data.length

var value = []
for(var i =0; i < len ;i++){
   var parsedTime = data[i].Time.split(':')
    data[i].Time = new Date(Date.UTC(1970, 0, 1, 0, parsedTime[0], parsedTime[1]))
value.push( { Year : data[i].Year, Time: data[i].Time})
}
  

var xMax =  d3.max(data.map(function(d,i){
    return  d.Year + 2
  }))

var xMin =  d3.min(data.map(function(d,i){
    return d.Year - 1
  }))


 var xScale = d3.scaleLinear()
    .domain([xMin, xMax])
    .range([0, width])

var xAxis = d3.axisBottom(xScale)
              .tickFormat(d3.format("d")) 

var xChart = chart.append('g')
     .attr('id' ,'x-axis')
       .attr('transform', 'translate(60,510)')
     .call( xAxis )


var maxValue =  d3.extent(value.map(function(d){
    return d.Time
  }))


var yScale = d3.scaleTime()
                .domain(d3.extent(value.map(function(d){return d.Time})))
                .range([0, height])
 
var yAxis = d3.axisLeft( yScale )
                .tickFormat(d3.timeFormat("%M:%S"))


var yChart = chart.append('g')
     .attr('id' ,'y-axis')
       .attr('transform', 'translate(60,10)')
     .call( yAxis )

var yLabel = chart.append("text")
      .attr('transform' , "rotate(-90)")
        .attr('y' , 20)
        .attr('x' , -300)
      .style('font-size', '20')
      .text("Time in Minutes")

var tip = d3.tip()
  .attr('id', 'tooltipScatter')
  .offset([-8, 0])
  .direction('e')
  .html(function(d,i) {
    return  data[i].Name + '<br>' +  
       'Nationality: ' + data[i].Nationality + '<br>' +
       'Year: ' + d.Year  + ' , ' + 'Time: ' + d3.timeFormat("%M:%S")(d.Time) + '<br>' +
       'Doping: ' + data[i].Doping   
  })

 chart.call(tip)   

var color = d3.scaleOrdinal(d3.schemeCategory20)


var dot = chart.selectAll(".dot")
        .data(value)
        .enter()
        .append("circle")
        .attr("class", "dot")
        .attr('r',7)
        .attr('data-xvalue', function(d, i) {
         return d.Year
         })
        .attr('data-yvalue', function(d, i) {
         return d.Time.toISOString()
         })
        .attr("cx", function (d) { 
          return xScale(d.Year) + 60
           })
        .attr("cy", function (d) { 
          return yScale(d.Time) + 10
           })   
        .style('fill', function(d,i){
          if(data[i].Doping == ""){
            return 'black'
          }
          else{
            return color(4)
          }
        })       
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide)

var legend = chart.append('g')
   .attr("id","legend")
  
  legend.append('circle')
  .attr('r', 8)
  .attr('transform', 'translate(900,40)')
  .attr('fill', color(4))     

 legend.append('text')
  .attr('transform', 'translate(915,45)')
  .text('Doping')

  legend.append('circle')
  .attr('r', 8)
    .attr('transform', 'translate(900,70)')
  .attr('fill',"black")      

  legend.append('text')
  .attr('transform', 'translate(915,75)')
  .text('No Doping')

var text = chart.append('a')
                .attr("xlink:href", "https://en.wikipedia.org/wiki/List_of_doping_cases_in_cycling")
                .attr("xlink:show","new")
                .append('text')
                .text('Source')
                .attr('fill','red')
                .style("font-size", "20px")
                .attr('transform','translate(500,570)')
})
}