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
    gen_pieChart("US-TOTAL");

}
d3.selectAll("#selDataset").on("change", updatePlotly);
function updatePlotly() {
    var selectValue = d3.select("#selDataset").node().value;
    gen_pieChart(selectValue);
}

function gen_pieChart(selectValue) {
    d3.json('/generation').then(function (data) {

        var pie_gen_table = [];
        var energyUse_table = [];
        var energySourceArray = [];
        var rows = [];

        for (eric = 0; eric < data.length; eric++) {

            if ((data[eric].Year == "2018") && (data[eric].TypeOfProducer == "TOTAL ELECTRIC POWER INDUSTRY") &&(data[eric].EnergySource !== "US-TOTALS")) {
                rows = [];
                rows.push(data[eric].State, data[eric].Generated, data[eric].EnergySource);
                pie_gen_table.push(rows);
            }
        }
        for (o = 0; o < pie_gen_table.length; o++) {

            if (pie_gen_table[o][0] == selectValue) {
                energyUse_table.push(pie_gen_table[o][1]);
                energySourceArray.push(pie_gen_table[o][2])
            }


        }
        // Populate the Pie Chart
        var data = [{
            values: energyUse_table, //values for data
            labels: energySourceArray,
            //labels: energyUse_table[1],
            type: 'pie'
        }];

        var layout = {
            title: `2018 Data for ${selectValue} Energy Generation`,
            height: 900,
            width: 900,
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

        Plotly.newPlot('gen_pie', data, layout);

    });
}

init();
