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
    stackedArea("US-TOTAL");
    pieChart("US-TOTAL");
    gen_stackedArea("US-TOTAL");
    gen_pieChart("US-TOTAL");
    emm_pieChart("US-TOTAL");

}
d3.selectAll("#selDataset").on("change", updatePlotly);
function updatePlotly() {
    var selectValue = d3.select("#selDataset").node().value;
    stackedArea(selectValue);
    pieChart(selectValue);
    gen_stackedArea(selectValue);
    gen_pieChart(selectValue);
    //emm_stackedArea(selectValue);
    emm_pieChart(selectValue);
    //emm1(selectValue);
    //emm2(selectValue);
}
function stackedArea(selectValue) {
    d3.json('/consumption').then(function (data) {
        var petroleum_table = [];
        var coal_table = [];
        var naturalgas_table = [];
        var rows = [];


        var energy_source = ["NATURAL GAS  MCF", "COAL  SHORT TONS", "PETROLEUM  BARRELS"]

        for (i = 0; i < data.length; i++) {
            if ((data[i].EnergySource == energy_source[2]) && (data[i].TypeOfProducer == "TOTAL ELECTRIC POWER INDUSTRY")) {
                rows = [];
                rows.push(data[i].Year, data[i].State, data[i].UseOfElectricity);
                petroleum_table.push(rows);

            }
        }
        for (i = 0; i < data.length; i++) {
            if ((data[i].EnergySource == energy_source[1]) && (data[i].TypeOfProducer == "TOTAL ELECTRIC POWER INDUSTRY")) {
                rows = [];
                rows.push(data[i].Year, data[i].State, data[i].UseOfElectricity);
                coal_table.push(rows);

            }
        }
        for (i = 0; i < data.length; i++) {
            if ((data[i].EnergySource == energy_source[0]) && (data[i].TypeOfProducer == "TOTAL ELECTRIC POWER INDUSTRY")) {
                rows = [];
                rows.push(data[i].Year, data[i].State, data[i].UseOfElectricity);
                naturalgas_table.push(rows);

            }
        }
        var stacked_use_petroleum = [];
        var stacked_year_petroleum = [];

        for (l = 0; l < petroleum_table.length; l++) {
            if (petroleum_table[l][1] == selectValue) {
                stacked_year_petroleum.push(petroleum_table[l][0]);
                stacked_use_petroleum.push(petroleum_table[l][2]);
            }
        }
        var stacked_use_coal = [];
        var stacked_year_coal = [];

        for (k = 0; k < coal_table.length; k++) {
            if (coal_table[k][1] == selectValue) {
                stacked_year_coal.push(coal_table[k][0]);
                stacked_use_coal.push(coal_table[k][2]);
            }
        }
        var stacked_use_ng = [];
        var stacked_year_ng = [];

        for (m = 0; m < naturalgas_table.length; m++) {
            if (naturalgas_table[m][1] == selectValue) {
                stacked_year_ng.push(naturalgas_table[m][0]);
                stacked_use_ng.push(naturalgas_table[m][2]);
            }
        }


        var plotDiv = document.getElementById('stacked');
        var traces = [
            { x: stacked_year_petroleum, y: stacked_use_petroleum, stackgroup: 'one', name: "Petroleum" },
            { x: stacked_year_coal, y: stacked_use_coal, stackgroup: 'one', name: "Coal" },
            { x: stacked_year_ng, y: stacked_use_ng, stackgroup: 'one', name: "Natural Gas" }
        ];

        Plotly.newPlot('stacked', traces, { title: `Energy Use by Type for ${selectValue}` });
    })
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
// Begin Generation Table Work
function gen_stackedArea(selectValue) {
    d3.json('/generation').then(function (data) {
        var petroleum_table = [];
        var coal_table = [];
        var naturalgas_table = [];
        var rows = [];


        var energy_source = [
            "NATURAL GAS",
            "COAL",
            "PETROLEUM",
            "HYDROELECTRIC CONVENTIONAL",
            "WIND",
            "WOOD AND WOOD DERIVED FUELS",
            "GEOTHERMAL",
            "SOLAR THERMAL AND PHOTOVOLTAIC",
            "HYDROELECTRIC CONVENTIONAL",
            "NUCLEAR"]

        for (i = 0; i < data.length; i++) {

            if ((data[i].EnergySource == energy_source[2]) && (data[i].TypeOfProducer == "TOTAL ELECTRIC POWER INDUSTRY")) {
                rows = [];
                rows.push(data[i].Year, data[i].State, data[i].Generated);
                petroleum_table.push(rows);

            }
        }

        for (j = 0; j < data.length; j++) {

            if ((data[j].EnergySource == energy_source[1]) && (data[j].TypeOfProducer == "TOTAL ELECTRIC POWER INDUSTRY")) {
                rows = [];
                rows.push(data[j].Year, data[j].State, data[j].Generated);
                coal_table.push(rows);

            }
        }
        for (k = 0; k < data.length; k++) {
            if ((data[k].EnergySource == energy_source[0]) && (data[k].TypeOfProducer == "TOTAL ELECTRIC POWER INDUSTRY")) {
                rows = [];
                rows.push(data[k].Year, data[k].State, data[k].Generated);
                naturalgas_table.push(rows);

            }
        }
        var stacked_use_petroleum = [];
        var stacked_year_petroleum = [];

        for (l = 0; l < petroleum_table.length; l++) {
            if (petroleum_table[l][1] == selectValue) {
                stacked_year_petroleum.push(petroleum_table[l][0]);
                stacked_use_petroleum.push(petroleum_table[l][2]);
            }
        }
        var stacked_use_coal = [];
        var stacked_year_coal = [];

        for (m = 0; m < coal_table.length; m++) {
            if (coal_table[m][1] == selectValue) {
                stacked_year_coal.push(coal_table[m][0]);
                stacked_use_coal.push(coal_table[m][2]);
            }
        }
        var stacked_use_ng = [];
        var stacked_year_ng = [];

        for (n = 0; n < naturalgas_table.length; n++) {
            if (naturalgas_table[n][1] == selectValue) {
                stacked_year_ng.push(naturalgas_table[n][0]);
                stacked_use_ng.push(naturalgas_table[n][2]);
            }
        }


        //var plotDiv = document.getElementById('gen_stacked');
        var traces = [
            { x: stacked_year_petroleum, y: stacked_use_petroleum, stackgroup: 'one', name: "Petroleum" },
            { x: stacked_year_coal, y: stacked_use_coal, stackgroup: 'one', name: "Coal" },
            { x: stacked_year_ng, y: stacked_use_ng, stackgroup: 'one', name: "Natural Gas" }
        ];

        Plotly.newPlot('gen_stacked', traces, { title: `Energy Generation by Type for ${selectValue}` });
    })
}

function gen_pieChart(selectValue) {
    d3.json('/generation').then(function (data) {

        var pie_gen_table = [];
        var energyUse_table = [];
        var energySourceArray = [];
        var rows = [];


        //var energy_source = ["NATURAL GAS  MCF","COAL  SHORT TONS","PETROLEUM  BARRELS"]
        // var energySource = [];
        // for (l = 0; l < data.length; l++) {
        //     energySource.push(data[l].EnergySource);
        // }
        // var energySourceArray = [...new Set(energySource)];

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
                // rows = [];
                // rows.push(pie_gen_table[o][1],pie_gen_table[o][2]);
                // energyUse_table.push(rows);

            }


        }
        // Populate teh Pie Chart
        var data = [{
            values: energyUse_table, //values for data
            labels: energySourceArray,
            //labels: energyUse_table[1],
            type: 'pie'
        }];

        var layout = {
            title: `2018 Data for ${selectValue} Energy Generation`,
            height: 500,
            width: 500,
            margin: {
                l: 0,
                r: 0,
                b: 10,
                t: 25,
            }
        };

        Plotly.newPlot('gen_pie', data, layout);

    });
}
// START EMMISIONS WORK

function emm_stackedArea(selectValue) {
    d3.json('/emissions').then(function (data) {
        var petroleum_table = [];
        var coal_table = [];
        var naturalgas_table = [];
        var rows = [];


        var energy_source = [
            "NATURAL GAS",
            "COAL",
            "PETROLEUM",
            "HYDROELECTRIC CONVENTIONAL",
            "WIND",
            "WOOD AND WOOD DERIVED FUELS",
            "GEOTHERMAL",
            "SOLAR THERMAL AND PHOTOVOLTAIC",
            "HYDROELECTRIC CONVENTIONAL",
            "NUCLEAR"]

        for (i = 0; i < data.length; i++) {
            //for (eric = 0; eric<energy_source.length; eric++){


            if ((data[i].EnergySource == energy_source[2]) && (data[i].TypeOfProducer == "TOTAL ELECTRIC POWER INDUSTRY")) {
                rows = [];
                rows.push(data[i].Year, data[i].State, data[i].Generated);
                petroleum_table.push(rows);

            }
        }

        for (j = 0; j < data.length; j++) {

            if ((data[j].EnergySource == energy_source[1]) && (data[j].TypeOfProducer == "TOTAL ELECTRIC POWER INDUSTRY")) {
                rows = [];
                rows.push(data[j].Year, data[j].State, data[j].Generated);
                coal_table.push(rows);

            }
        }
        for (k = 0; k < data.length; k++) {


            if ((data[k].EnergySource == energy_source[0]) && (data[k].TypeOfProducer == "TOTAL ELECTRIC POWER INDUSTRY")) {
                rows = [];
                rows.push(data[k].Year, data[k].State, data[k].Generated);
                naturalgas_table.push(rows);

            }
        }
        var stacked_use_petroleum = [];
        var stacked_year_petroleum = [];

        for (l = 0; l < petroleum_table.length; l++) {
            if (petroleum_table[l][1] == selectValue) {
                stacked_year_petroleum.push(petroleum_table[l][0]);
                stacked_use_petroleum.push(petroleum_table[l][2]);
            }
        }
        var stacked_use_coal = [];
        var stacked_year_coal = [];

        for (m = 0; m < coal_table.length; m++) {
            if (coal_table[m][1] == selectValue) {
                stacked_year_coal.push(coal_table[m][0]);
                stacked_use_coal.push(coal_table[m][2]);
            }
        }
        var stacked_use_ng = [];
        var stacked_year_ng = [];

        for (n = 0; n < naturalgas_table.length; n++) {
            if (naturalgas_table[n][1] == selectValue) {
                stacked_year_ng.push(naturalgas_table[n][0]);
                stacked_use_ng.push(naturalgas_table[n][2]);
            }
        }


        //var plotDiv = document.getElementById('gen_stacked');
        var traces = [
            { x: stacked_year_petroleum, y: stacked_use_petroleum, stackgroup: 'one', name: "Petroleum" },
            { x: stacked_year_coal, y: stacked_use_coal, stackgroup: 'one', name: "Coal" },
            { x: stacked_year_ng, y: stacked_use_ng, stackgroup: 'one', name: "Natural Gas" }
        ];

        Plotly.newPlot('emm_stacked', traces, { title: `Energy Generation by Type for ${selectValue}` });
    })
}

function emm_pieChart(selectValue) {
    d3.json('/emissions').then(function (data) {

        var pieConsumtion_table = [];
        var energyUse_table = [];
        var rows = [];

        //var energy_source = ["NATURAL GAS  MCF","COAL  SHORT TONS","PETROLEUM  BARRELS"]
        var energySource = [];
        for (l = 0; l < data.length; l++) {
            energySource.push(data[l].EnergySource);
        }
        var energySourceArray = [...new Set(energySource)];
        for (eric = 0; eric < data.length; eric++) {

            if ((data[eric].Year == "2018") && (data[eric].TypeOfProducer == "TOTAL ELECTRIC POWER INDUSTRY")) {
                rows = [];
                rows.push(data[eric].State, data[eric].Generated, data[eric].EnergySource);
                pieConsumtion_table.push(rows);
            }
        }
        //console.log(pieConsumtion_table);
        for (o = 0; o < pieConsumtion_table.length; o++) {

            if (pieConsumtion_table[o][0] == selectValue) {
                energyUse_table.push(pieConsumtion_table[o][1]);

            }

        }

        // Populate teh Pie Chart
        var data = [{
            values: energyUse_table, //values for data
            labels: energySourceArray,
            type: 'pie'
        }];

        var layout = {
            title: `2018 Data for ${selectValue} Emissions`,
            height: 500,
            width: 500,
            margin: {
                l: 0,
                r: 0,
                b: 10,
                t: 25,
            }
        };

        Plotly.newPlot('emm_pie', data, layout);

    });
}
function emm1(selectValue){

}
function emm2(selectValue){

}

init();
