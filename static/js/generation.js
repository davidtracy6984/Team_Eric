var data;
function init() {
    d3.json('/generation').then(function(data) {
         //console.log(data);
    var importedState = [];
     for (l = 0; l< data.length; l++){
         importedState.push(data[l].State);
     }
     var dropdownArray = [...new Set(importedState)];
         //Data for drop down menu
        var selection = dropdownArray;
        var selector = d3.select("#selDataset");
        selection.forEach(value => {
          selector
            .append("option")
            .text(value)
            .attr("value", function() {
              return value;
            });
        });
      });
    }