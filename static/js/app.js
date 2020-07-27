var data;
function init() {
    d3.json('/consumption').then(function (data) {
        var importedState = [];
        for (l = 0; l < data.length; l++) {
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
                .attr("value", function () {
                    return value;
                });
        });
    });
    con_stackedArea("US-TOTAL");
    gen_pieChart("US-TOTAL");
    Solar();
    Wind();
    Emm1();
    Emm2();

}
d3.selectAll("#selDataset").on("change", updatePlotly);
function updatePlotly() {
    var selectValue = d3.select("#selDataset").node().value;
    con_stackedArea(selectValue);
    gen_pieChart(selectValue);
    // Solar();
    // Wind();
    // Emm1();
    // Emm2();
}

function Solar(){
  d3.json('/solar').then(function(data){
    var state_14 = [];
    var gwh_14 = [];
    var state_19 = [];
    var gwh_19 = [];

    for(eric = 0; eric < data.length; eric++){
      if (data[eric].Year == "2014"){
        state_14.push(data[eric].State);
        gwh_14.push(data[eric].GWH);
      }
      else {
        state_19.push(data[eric].State);
        gwh_19.push(data[eric].GWH);
      }
    }

    // Populate the Pie Chart
    var data = [{
        values: gwh_14, //values for data
        labels: state_14,
        type: 'pie'
    }];

    var layout = {
        title: "Solar 2014",
        height: 400,
        width: 400,
        margin: {
            l: 0,
            r: 0,
            b: 10,
            t: 25,
        },
        legend :{
          x:1,
        }
    };

    Plotly.newPlot('solar14', data, layout);

    var data = [{
        values: gwh_19, //values for data
        labels: state_19,
        type: 'pie'
    }];

    var layout = {
        title: "Solar 2019",
        height: 400,
        width: 400,
        margin: {
            l: 0,
            r: 0,
            b: 10,
            t: 25,
        },
        legend :{
          x:1,
        }
    };

    Plotly.newPlot('solar19', data, layout);

  });
}

function Wind(){
  d3.json('/wind').then(function(data){
    var state_14 = [];
    var gwh_14 = [];
    var state_19 = [];
    var gwh_19 = [];

    for(eric = 0; eric < data.length; eric++){
      if (data[eric].Year == "2014"){
        state_14.push(data[eric].State);
        gwh_14.push(data[eric].GWH);
      }
      else {
        state_19.push(data[eric].State);
        gwh_19.push(data[eric].GWH);
      }
    }

    // Populate the Pie Chart
    var data = [{
        values: gwh_14, //values for data
        labels: state_14,
        type: 'pie'
    }];

    var layout = {
        title: "Wind 2014",
        height: 400,
        width: 400,
        margin: {
            l: 0,
            r: 0,
            b: 10,
            t: 25,
        },
        legend :{
          x:1,
        }
    };

    Plotly.newPlot('wind14', data, layout);

    var data = [{
        values: gwh_19, //values for data
        labels: state_19,
        type: 'pie'
    }];

    var layout = {
        title: "Wind 2019",
        height: 400,
        width: 400,
        margin: {
            l: 0,
            r: 0,
            b: 10,
            t: 25,
        },
        legend :{
          x:1,
        }
    };

    Plotly.newPlot('wind19', data, layout);

  });
}

function Emm1(){
  d3.json('/emission_1').then(function(data){
    var Sector_use = [];
    var Percentage_use = [];

    for(eric = 0; eric < data.length; eric++){
      Sector_use.push(data[eric].UseSector)
      Percentage_use.push(data[eric].UsePercentage)
    }

    // Populate the Pie Chart
    var data = [{
        values: Percentage_use, //values for data
        labels: Sector_use,
        type: 'pie'
    }];

    var layout = {
        title: "Emission By Use",
        height: 400,
        width: 400,
        margin: {
            l: 0,
            r: 0,
            b: 10,
            t: 25,
        },
        legend :{
          x:1,
        }
    };

    Plotly.newPlot('emission1', data, layout);

  });
}

function Emm2(){
  d3.json('/emission_2').then(function(data){
    var Sector_use = [];
    var Percentage_use = [];

    for(eric = 0; eric < data.length; eric++){
      Sector_use.push(data[eric].UseSector)
      Percentage_use.push(data[eric].UsePercentage)
    }

    // Populate the Pie Chart
    var data = [{
        values: Percentage_use, //values for data
        labels: Sector_use,
        type: 'pie'
    }];

    var layout = {
        title: "Emission By Sector",
        height: 400,
        width: 400,
        margin: {
            l: 0,
            r: 0,
            b: 10,
            t: 25,
        },
        legend :{
          x:1,
        }
    };

    Plotly.newPlot('emission2', data, layout);

  });
}

function con_stackedArea(selectValue) {
    d3.json('/consumption').then(function (data) {
        var petroleum_table = [];
        var coal_table = [];
        var naturalgas_table = [];
        var engSrcUnique = [];
        var yearTable = [];

        for (l = 0; l< data.length; l++){
          engSrcUnique.push(data[l].EnergySource);
        }
        var energy_source = [...new Set(engSrcUnique)];

        function srcTable(source){
          var tempTbl = [];
          for (i = 0; i<data.length; i++){
            if ((data[i].EnergySource == source) && (data[i].TypeOfProducer == "TOTAL ELECTRIC POWER INDUSTRY")
                 && (data[i].State == selectValue)){
                   tempTbl.push(data[i].UseOfElectricity);
            //     rows = [];
            //     rows.push(data[i].Year,data[i].State,data[i].UseOfElectricity);
            //     tempTbl.push(rows);
            }
          }
          return tempTbl
        }
        petroleum_table = srcTable(energy_source[1]);
        coal_table = srcTable(energy_source[0]);
        naturalgas_table = srcTable(energy_source[2]);

        for (j = 0; j< data.length; j++){
          yearTable.push(data[j].Year);
        }
        var years = [...new Set(yearTable)];

        var traces = [
            { x: years, y: petroleum_table, stackgroup: 'one', name: "Petroleum" },
            { x: years, y: coal_table, stackgroup: 'one', name: "Coal" },
            { x: years, y: naturalgas_table, stackgroup: 'one', name: "Natural Gas" }
        ];

        var layout = {
          title: {
            text: `Energy Consumption by Type for ${selectValue}`
          },
          xaxis: {
            text : "Year"
          },
          yaxis: {
            text : "Consumption"
          }
        };

        Plotly.newPlot('conStack', traces, layout);
        //{ title: `Energy Consumption by Type for ${selectValue}` }
    })
}

function gen_pieChart(selectValue) {
    d3.json('/generation').then(function (data) {

        var pie_gen_table = [];
        var energyGen = [];
        var energySource = [];

        for (i = 0; i < data.length; i++){
          if ((data[i].Year == "2018") && (data[i].TypeOfProducer == "TOTAL ELECTRIC POWER INDUSTRY") &&
              (data[i].EnergySource !== "US-TOTALS") && data[i].State == selectValue){
                energyGen.push(data[i].Generated);
                energySource.push(data[i].EnergySource);
              }
        }

        // Populate the Pie Chart
        var data = [{
            values: energyGen, //values for data
            labels: energySource,
            type: 'pie'
        }];

        var layout = {
            title: `2018 Data for ${selectValue} Energy Generation`,
            height: 700,
            width: 700,
            margin: {
                l: 0,
                r: 0,
                b: 10,
                t: 25,
            },
            legend :{
              x:1,
            }
        };

        Plotly.newPlot('genPie', data, layout);

    });
}

init();
