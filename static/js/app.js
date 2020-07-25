var data;
function init() {
    d3.json('/consumption').then(function (data) {
        //console.log(data);
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
    stackedArea("US-TOTAL");
    pieChart("US-TOTAL");
    fido_USMAP("US-TOTAL");
}
d3.selectAll("#selDataset").on("change", updatePlotly);
function updatePlotly() {
    var selectValue = d3.select("#selDataset").node().value;
    stackedArea(selectValue);
    fido_USMAP(selectValue);
    pieChart(selectValue);
    // Nothing
    //   gaugeChart(selectValue);
}
function stackedArea(selectValue) {
    d3.json('/consumption').then(function (data) {
        var petroleum_table = [];
        var coal_table = [];
        var naturalgas_table = [];
        var rows = [];


        var energy_source = ["NATURAL GAS  MCF", "COAL  SHORT TONS", "PETROLEUM  BARRELS"]

        for (i = 0; i < data.length; i++) {
            //for (eric = 0; eric<energy_source.length; eric++){


            if ((data[i].EnergySource == energy_source[2]) && (data[i].TypeOfProducer == "TOTAL ELECTRIC POWER INDUSTRY")) {
                rows = [];
                rows.push(data[i].Year, data[i].State, data[i].UseOfElectricity);
                petroleum_table.push(rows);

            }
        }
        for (i = 0; i < data.length; i++) {
            //for (eric = 0; eric<energy_source.length; eric++){


            if ((data[i].EnergySource == energy_source[1]) && (data[i].TypeOfProducer == "TOTAL ELECTRIC POWER INDUSTRY")) {
                rows = [];
                rows.push(data[i].Year, data[i].State, data[i].UseOfElectricity);
                coal_table.push(rows);

            }
        }
        for (i = 0; i < data.length; i++) {
            //for (eric = 0; eric<energy_source.length; eric++){


            if ((data[i].EnergySource == energy_source[0]) && (data[i].TypeOfProducer == "TOTAL ELECTRIC POWER INDUSTRY")) {
                rows = [];
                rows.push(data[i].Year, data[i].State, data[i].UseOfElectricity);
                naturalgas_table.push(rows);

            }
        }
        var stacked_use_petroleum = [];
        var stacked_year_petroleum = [];

        //console.log(petroleum_table);
        for (l = 0; l < petroleum_table.length; l++) {
            if (petroleum_table[l][1] == selectValue) {
                // console.log(petroleum_table[l]);
                stacked_year_petroleum.push(petroleum_table[l][0]);
                stacked_use_petroleum.push(petroleum_table[l][2]);
            }
        }
        var stacked_use_coal = [];
        var stacked_year_coal = [];

        //console.log(petroleum_table);
        for (k = 0; k < coal_table.length; k++) {
            if (coal_table[k][1] == selectValue) {
                // console.log(coal_table[l]);
                stacked_year_coal.push(coal_table[k][0]);
                stacked_use_coal.push(coal_table[k][2]);
            }
        }
        //console.log(stacked_use_coal);
        var stacked_use_ng = [];
        var stacked_year_ng = [];

        //console.log(petroleum_table);
        for (m = 0; m < naturalgas_table.length; m++) {
            if (naturalgas_table[m][1] == selectValue) {
                // console.log(coal_table[l]);
                stacked_year_ng.push(naturalgas_table[m][0]);
                stacked_use_ng.push(naturalgas_table[m][2]);
            }
        }
        //console.log(stacked_use_coal);


        var plotDiv = document.getElementById('stacked');
        var traces = [
            { x: stacked_year_petroleum, y: stacked_use_petroleum, stackgroup: 'one', name: "Petroleum" },
            { x: stacked_year_coal, y: stacked_use_coal, stackgroup: 'one', name: "Coal" },
            { x: stacked_year_ng, y: stacked_use_ng, stackgroup: 'one', name: "Natural Gas" }
        ];

        Plotly.newPlot('stacked', traces, { title: `Energy Use by Type for ${selectValue}` });
    })
}
function fido_USMAP(selectValue) {
    d3.json('/consumption').then(function (data) {

        var tempYear = [];
        for (l = 0; l < data.length; l++) {
            tempYear.push(data[l].Year);
        }
        //var distinctYear = [...new Set(tempYear)];
        //console.log(distinctYear);

    });
        
        

        // d3.json('/consumption').then(function(err, rows){
        //     function unpack(rows, key) {
        //         return rows.map(function(row) {return row[key]; });
        // }
        
        

        var data = [{
            type: 'choropleth',
            locationmode: 'USA-states',
            locations: selectValue,
            //z: unpack(rows, 'EnergySource'),
            //text: unpack(rows, 'UseOfElectricity'),
            autocolorscale: true
        }];
        
        var layout = {
            title: '2014 US Popultaion by State',
                geo:{
                    scope: 'usa',
                    countrycolor: 'rgb(255, 255, 255)',
                    showland: true,
                    landcolor: 'rgb(217, 217, 217)',
                    showlakes: true,
                    lakecolor: 'rgb(255, 255, 255)',
                    subunitcolor: 'rgb(255, 255, 255)',
                    lonaxis: {},
                    lataxis: {}
                }
            };
            Plotly.newPlot("USMAP", data, layout, {showLink: false});
             
        
    

}

function pieChart(selectValue) {
    d3.json('/consumption').then(function (data) {

        var pieConsumtion_table = [];
        var energyUse_table = [];
        var rows = [];


        //var energy_source = ["NATURAL GAS  MCF","COAL  SHORT TONS","PETROLEUM  BARRELS"]
        var energySource = [];
        for (l = 0; l < data.length; l++) {
            energySource.push(data[l].EnergySource);
        }
        var energySourceArray = [...new Set(energySource)];

        //console.log(energySourceArray);

        for (eric = 0; eric < data.length; eric++) {

            if ((data[eric].Year == "2018") && (data[eric].TypeOfProducer == "TOTAL ELECTRIC POWER INDUSTRY")) {
                rows = [];
                rows.push(data[eric].State, data[eric].UseOfElectricity, data[eric].EnergySource);
                pieConsumtion_table.push(rows);
            }
        }

        for (j = 0; j < pieConsumtion_table.length; j++) {

            if (pieConsumtion_table[j][0] == selectValue) {
                energyUse_table.push(pieConsumtion_table[j][1]);
            }
        }

        // Populate teh Pie Chart
        var data = [{
            values: energyUse_table, //values for data
            labels: energySourceArray,
            type: 'pie'
        }];

        var layout = {
            title: `2018 Data for ${selectValue} Energy use`,
            height: 500,
            width: 500,
            margin: {
                l: 80,
                r: 50,
                b: 10,
                t: 25,
            }
        };

        Plotly.newPlot('pie', data, layout);

    });
}

init();
