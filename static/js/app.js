d3.json('/consumption').then(function(all_data) {
    // console.log(all_data);
graph_data = []

for (i = 0; i< all_data.length; i++){

    if (all_data[i].State=="US-TOTALS"){
        graph_data.push (all_data[i]);   
    }
}
console.log(graph_data);
});
