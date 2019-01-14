function treemap(){
   var chart = d3.select('.holder')
   .append('svg')
   .attr('width', 1000)
   .attr('height', 600)

   var legend = d3.select('.legend')
   .append('svg')
   .attr('width', 1000)
   .attr('height', 300)

   var map = chart.append('g')

   var legendChild = legend.append('g')

   var width = chart.node().getBoundingClientRect().width
   var height = width / 2


   var zoom = d3.zoom()
   .scaleExtent([1, 40])
   .translateExtent([[0,0], [width, height]])
   .extent([[0, 0], [width, height]])
   .on("zoom", zoomed)

   chart.call(zoom)

   var treemap = d3.treemap()
   .size([1000, 600])
   .paddingInner(1)


   var color = d3.scaleOrdinal().range(d3.schemeCategory20c)

   var tip = d3.tip()
   .attr('id', 'tooltip')
   .offset([-10, 0])
   .direction('e')
   .html(function(d,i) {
     return d
   })

   chart.call(tip)   

   var link = 'https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/kickstarter-funding-data.json'
   document.getElementById("title_TreeMap").innerHTML = 'Kickstarter Pledges'
   document.getElementById("description_TreeMap").innerHTML = 'Top 100 Most Kickstarter Pledges Campaigns'

   var para = new URLSearchParams(window.location.search)

   if(para.get('data') === 'movie'){
    document.getElementById("title_TreeMap").innerHTML = 'Movie Sales'
    document.getElementById("description_TreeMap").innerHTML = 'Top 100 Highest Grossing Movies'
    link = 'https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/movie-data.json'
  }
  else if(para.get('data') === 'game'){
    document.getElementById("title_TreeMap").innerHTML = 'Video Game Sales'
    document.getElementById("description_TreeMap").innerHTML = 'Top 100 Most Sold Console Games'
    link = 'https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/video-game-sales-data.json'
  }

  d3.json(link, function(error,data) {

    var root = d3.hierarchy(data, function(d) { 
      return d.children
    })
    .sum(function(d) {
      return d.value
    })
    .sort(function(a, b) {
      return b.height - a.height || b.value - a.value 
    })

    treemap(root)

    var arr =[]

    var child = map.selectAll("g")
    .data(root.leaves())
    .enter()
    .append("g")
    .attr("transform", function(d) { 
      return "translate(" + d.x0 + "," + d.y0 + ")" 
    })

    var tile =  child.append("rect")
    .attr("class","tile")
    .attr("id", function(d) { 
      return d.data.id
    })
    .attr("width", function(d) { 
      return d.x1 - d.x0
    })
    .attr("height", function(d) {
     return d.y1 - d.y0
   })
    .attr("fill", function(d) { 
      return color(d.data.category)
    })
    .attr("data-name", function(d){
      return d.data.name
    })
    .attr("data-category", function(d){
      arr.push(d.data.category)
      return d.data.category
    })
    .attr("data-value", function(d){
      return d.data.value
    })
    .on('mousemove', function(d){

      var tool = 'Name: ' + d.data.name + '<br>Category: ' + d.data.category + '<br>Value: ' + d.data.value 

      tip.attr("data-value", d.data.value)
      tip.show(tool)
    })
    .on('mouseout', tip.hide)


    child.append("text")
    .attr("class","name-size")
    .selectAll("tspan")
    .data(function(d) { 
      return d.data.name.split(/(?=[A-Z][^A-Z])/g)
    })
    .enter()
    .append("tspan")
    .attr("x", 4)
    .attr("y", function(d, i) { 
      return 13 + i * 10 
    })
    .text(function(d) { 
      return d 
    })

    var value = [...new Set(arr)]     

    var legendTile = legendChild.selectAll('g')
    .data(value)
    .enter()
    .append('g')
    .attr('id','legend')
    .attr('transform','translate(30,5)')

    var legendRect = legendTile.append("rect") 
    .attr('class','legend-item')
    .attr("x", function(d,i){
      return ( parseInt(i/5) * 250)
    })
    .attr("y", function(d,i){    
      return (i%5) * 60 + 20
    })
    .attr("width", 30)
    .attr("height", 30)
    .attr("fill",function(d,i){
      return color(d)
    })

 legendTile.append("text")
      .text("Item Category")
      .attr("transform", "translate(350,15)")

    legendTile.append("text")
    .attr("x",function(d,i){
      return (parseInt(i/5) * 250) + 40
    })
    .attr("y",function(d,i){    
      return ((i%5) * 60) + 40
    })
    .text(function(d){
      return d
    })

  })

  function zoomed(){
    map.attr("transform", d3.event.transform)
  }  


}