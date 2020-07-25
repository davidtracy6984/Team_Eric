var data;
function init() {
    d3.json('/consumption').then(function(data) {
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
 d3.selectAll("#selDataset").on("change", updatePlotly); 
 function updatePlotly() {
    var selectValue = d3.select("#selDataset").node().value;
       stackedArea(selectValue);
    //   barChart(selectValue);
    //   bubbleChart(selectValue);
    //   gaugeChart(selectValue);
  }
function stackedArea(selectValue){
d3.json('/consumption').then(function(data) { 
    var petroleum_table = [];
    var rows = [];
 

// Grab States
for (i = 0; i< data.length; i++){
    //console.log(data[i].State);
    if ((data[i].EnergySource == 'PETROLEUM  BARRELS') && (data[i].TypeOfProducer == "TOTAL ELECTRIC POWER INDUSTRY")){
        rows = [];
        rows.push(data[i].Year,data[i].State,data[i].UseOfElectricity);
        petroleum_table.push(rows);   
     }
}
    console.log(petroleum_table);
    for (l = 0; l< petroleum_table.length; l++){
        if (petroleum_table[i][1] == selectValue){
            console.log(petroleum_table[i]);
        }
      }
    })
}
init();