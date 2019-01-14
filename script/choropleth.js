 function choropleth(){
    var url = 'https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/for_user_education.json'
    var url2 ='https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/counties.json'

    const path = d3.geoPath()

    var chart = d3.select('.choropleth')
    .append('svg')
    .attr('width', 1050)
    .attr('height', 650)
    .attr('transform', 'translate(80,10)')

    var map = chart.append('g')

    var width = chart.node().getBoundingClientRect().width
    var height = width / 2


    var zoom = d3.zoom()
    .scaleExtent([1, 40])
    .translateExtent([[0,0], [width, height]])
    .extent([[0, 0], [width, height]])
    .on("zoom", zoomed)

    chart.call(zoom)


    d3.queue()
    .defer(d3.json, url2)
    .defer(d3.json, url)
    .await((error,county,edu) => {

      var max =  d3.max(edu.map(function(d,i){
        return  d.bachelorsOrHigher
      }))

      var min =  d3.min(edu.map(function(d,i){
        return d.bachelorsOrHigher
      }))


      var color = d3.scaleQuantize()
      .domain([min, max, (max-min)/8])
      .range(d3.schemeRdBu[9])


      var tip = d3.tip()
      .attr('id', 'tooltip')
      .offset([-10, 0])
      .direction('n')
      .html(function(d,i) {
       return d
     })

      chart.call(tip)   

      map.selectAll('path')
      .data(topojson.feature(county, county.objects.counties).features)
      .enter()
      .append('path')
      .attr("class", "county")
      .attr("data-fips", function(d) {
        return d.id
      })
      .attr("data-education", function(d) {
        var result = edu.filter(function( obj ) {
          return obj.fips == d.id
        })
        return result[0].bachelorsOrHigher
      })
      .attr("fill", function(d) { 
        var result = edu.filter(function( obj ) {
          return obj.fips == d.id
        })
        return color(result[0].bachelorsOrHigher)
      })
      .attr("d", path)
      .on('mousemove', function(d) {

        var result = edu.filter(function( obj ) {
          return obj.fips == d.id
        })
        var tool = result[0]['area_name'] + ', ' + result[0]['state'] + ' : ' + result[0].bachelorsOrHigher + '%'

        tip.attr("data-education", result[0].bachelorsOrHigher)
        tip.show(tool)
      })
      .on('mouseout', tip.hide)


      var legend = chart.append("g")
      .attr("id", "legend")
      .attr("transform", "translate(900,300)")


      legend = chart.append("text")
      .text("Percentage Chart")
      .attr("transform", "translate(900,280)")

      var legendLinear = d3.legendColor()
      .shapeWidth(20)
      .orient('vertical')
      .scale(color)

      var legendCall = chart.select("#legend")
      .call(legendLinear)

    })

    function zoomed(){
      map.attr("transform", d3.event.transform)
    }  
  }
