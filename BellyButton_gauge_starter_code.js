// Create the buildChart function.
function buildCharts(sample) {
  // Use d3.json to load the samples.json file 
  d3.json("samples.json").then((data) => {
    console.log(data);

    // Create a variable that holds the samples array. 
    var metadata = data.samples;
    // Create a variable that filters the samples for the object with the desired sample number.
    // Redundant???????????
    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);

    // 2. Create a variable that holds the first sample in the metadata array.
    var result = resultArray[0];

    // Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otuIds = result.otu_ids;
    var otuLabels = result.otu_labels;
    var sampleValues = result.sample_values;

    // 3. Create a variable that holds the washing frequency.
    var wFreq = result.wfreq
    
    // 4. Create the trace for the gauge chart.
    var gaugeData = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: wFreq,
        title: { text: "Belly Button Washing Frequency" },
        type: "indicator",
        mode: "gauge+number",
        gauge: {
          axis: { range: [null, 4]},
          steps: [
            { range: [0, 1], color: 'red'},
            { range: [1, 2], color: 'orange'},
            { range: [2, 3], color: 'yellow'},
            { range: [3, 4], color: 'green'},
          ],
          threshold: {
            line: { color: 'white', width: 3 },
            thickness: 0.5,
            value: 300
          }
        }
      }     
    ];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
     width: 600, height: 450, margin: { t: 0, b: 0 }
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge", gaugeData, gaugeLayout);
  });
}
