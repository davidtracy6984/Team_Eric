d3.json('/consumption').then(function(data) {
    //console.log(data[0].State);
var graph_data = [];
for (i = 0; i< data.length; i++){
    //console.log(data[i].State);
    if (data[i].State == 'AK'){
         graph_data.push(data[i].Year);   
     }
}
console.log(graph_data);
   var selection = graph_data;
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