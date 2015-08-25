(function () {
  'use strict';

  angular.module('myApp.directives').directive('d3Floor', [ 
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

          //Define Circle Scaling Factor
          var scaling = 300;

          //Define Transition Characteristics
          var transDuration = 1000;
          var transType = "sin-in-out";

          //SVG Size
          var margin = {top: 0, right:0, bottom: 0, left: 0},
              width = 900 - margin.left - margin.right,
              height = 900 - margin.top - margin.bottom;

          //Define Axis Types
          var x = d3.scale.linear()
              .range([0, width]);
          var y = d3.scale.linear()
              .range([0,height]);

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
          var xPosition = function(area){
            if(area=="Rainier"){return 7.5}
            else if(area=="Baker"){return 7.5}
            else if(area=="Develop2"){return 38}
            else if(area=="MtHood"){return 53}
            else if(area=="Develop"){return 19}
            else{return 0}
          }

          var yPosition = function(area){
            if(area=="Rainier"){return 22}
            else if(area=="Baker"){return 29.5}
            else if(area=="Develop2"){return 90}
            else if(area=="MtHood"){return 67}
            else if(area=="Develop"){return 38}
            else{return 0}
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

              chart.append("image")
                .attr("xlink:href", "img/floorplan.png")
                .attr("width", width)
                .attr("height", height);

              xAxis = chart.append("g")
                  .attr("class", "x axis")
                  .attr("transform", "translate(0," + height + ")")

            }

            //Define Axis Domain
            x.domain([0,100]);
            y.domain([0,100]);

            //Bind New Data Set
            dots = chart.selectAll(".dot")
                .data(data,label)

            //Attach Class to New Data
            dots.enter().append("circle")
                .on("click", function(d, i){return scope.onClick({item: d});})
                .attr("class", "dot")
                .style('opacity', .5)

            

            //Transition DOM Elements
            dots.transition().duration(transDuration).ease(transType)
                .attr("cx", function(d) { return x(xPosition(label(d))); })
                .attr("r", function(d) { return value(d)*width/scaling; })
                .attr("cy", function(d) { return y(yPosition(label(d))); })

            //Remove Exiting Elemets
            dots.exit().remove();
          };
        }
      };
    }]);

}());
