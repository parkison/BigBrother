(function () {
  'use strict';

  angular.module('myApp.directives').directive('d3Dots', [ 
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
          var svg, chart, xAxis, yAxis, dots, text;

          //Define Transition Characteristics
          var transDuration = 1000;
          var transType = "sin-in-out";

          //SVG Size
          var margin = {top: 20, right: 20, bottom: 30, left: 40},
              width = 1500 - margin.left - margin.right,
              height = 400 - margin.top - margin.bottom;

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
              svg = d3.select(iElement[0]).append("svg")
                  .attr("width", width + margin.left + margin.right)
                  .attr("height", height + margin.top + margin.bottom)

              chart = svg.append("g")
                  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

              xAxis = chart.append("g")
                  .attr("class", "x axis")
                  .attr("transform", "translate(0," + height + ")")

            }

            //Define Axis Domain
            x.domain(data.map(function(d) { return d.name; }));
            // y.domain([0, d3.max(data, function(d) { return value(d); })]);
            y.domain([0, 50]);

            //Bind New Data Set
            dots = chart.selectAll(".dot")
                .data(data,label)

            text = chart.selectAll(".txt")
                .data(data,label);

            //Attach Class to New Data
            dots.enter().append("circle")
                .on("click", function(d, i){return scope.onClick({item: d});})
                .attr("class", "dot")

            text.enter().append("text")
                .attr("class", "txt")

            //Transition DOM Elements
            dots.transition().duration(transDuration).ease(transType)
                .attr("cx", function(d) { return x(label(d))+x.rangeBand()/2; })
                .attr("r", function(d) { return value(d)*8; })
                .attr("cy", function(d) { return y(25); })

            text.transition().duration(transDuration).ease(transType)
                .text(function(d){return label(d)})
                .attr("x", function(d) { return x(label(d))+x.rangeBand()/2; })
                .attr("y", function(d) { return y(25); })
                .attr("text-anchor", "middle")

            //Remove Exiting Elemets
            text.exit().remove();
            dots.exit().remove();
          };
        }
      };
    }]);

}());
