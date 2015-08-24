(function () {
  'use strict';

  angular.module('myApp.directives').directive('d3Bars', [ 
    function() { 

      return {
        restrict: 'EA',
        scope: {
          data: "=",
          label: "@",
          onClick: "&"
        },
        link: function(scope, iElement, iAttrs) {

          // watch for data changes and re-render
          scope.$watch('data', function(newVals, oldVals) {
            return scope.render(newVals);
          }, true);

          //Define elements outside of render function
          var chart, xAxis, yAxis, bars;

          //Define Transition Characteristics
          var transDuration = 1000;
          var transType = "sin-in-out";

          //SVG Size
          var margin = {top: 20, right: 20, bottom: 30, left: 40},
              width = 600 - margin.left - margin.right,
              height = 300 - margin.top - margin.bottom;

          //Define Axis Types
          var x = d3.scale.ordinal()
              .rangeRoundBands([0, width], .1);
          var y = d3.scale.linear()
              .range([height, 0]);

          //Define Axis Scales
          var xScale = d3.svg.axis()
              .scale(x)
              .orient("bottom");
          var yScale = d3.svg.axis()
              .scale(y)
              .orient("left")

          //Definte Functions to Isolate Data Attributes
          var value = function(d){
            return d.value;
          }
          var label = function(d){
            return d.name;
          }

          // define render function
          scope.render = function(rawData){

            //Prep Data
            var spaceCount  = _.countBy(rawData, function(d){return d.loc});
            var spaces      = Object.keys(spaceCount);

            var data = [];
            for(var n=0;n<spaces.length;n++){
              data.push({name:spaces[n],value:spaceCount[spaces[n]]})
            }

            data = _.sortBy(data, 'name');
            //End Prep Data


            console.log('Render Chart')
            //If the SVG Does Not Yet Exist
            if(!chart){
              console.log('Creating New Chart')

              //Create SVG and Axes
              chart = d3.select(iElement[0]).append("svg")
                  .attr("width", width + margin.left + margin.right)
                  .attr("height", height + margin.top + margin.bottom)
                .append("g")
                  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

              xAxis = chart.append("g")
                  .attr("class", "x axis")
                  .attr("transform", "translate(0," + height + ")")

              yAxis = chart.append("g")
                  .attr("class", "y axis")

              yAxis.append("text")
                  .attr("transform", "rotate(-90)")
                  .attr("y", 6)
                  .attr("dy", ".71em")
                  .style("text-anchor", "end")
                  .text("# of Radi-ites");
            }

            //Define Axis Domain
            x.domain(data.map(function(d) { return d.name; }));
            // y.domain([0, d3.max(data, function(d) { return value(d); })]);
            y.domain([0, 50]);
            
            //Draw Axes
            xAxis.transition().duration(transDuration).ease(transType).call(xScale)
            yAxis.transition().duration(transDuration).ease(transType).call(yScale)

            //Bind New Data Set
            bars = chart.selectAll(".bar")
                .data(data,label)

            //Attach Class to New Data
            bars.enter().append("rect")
                .on("click", function(d, i){return scope.onClick({item: d});})
                .attr("class", "bar")

            //Transition DOM Elements
            bars.transition().duration(transDuration).ease(transType)
                .attr("x", function(d) { return x(label(d)); })
                .attr("width", x.rangeBand())
                .attr("y", function(d) { return y(value(d)); })
                .attr("height", function(d) { return height - y(value(d)); });

            //Remove Exiting Elemets
            bars.exit().remove();
          };
        }
      };
    }]);

}());
