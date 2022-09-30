// This code was inspired by Dom's Tutorial

// Specify the url
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";


// Define Bargraph function
function DrawBarGraph(sampleId)
{
    
    // Read in the json data
    d3.json(url).then(data => {
        
        // Define the samples
        let samples = data.samples;
        let resultArray = samples.filter(s => s.id == sampleId);
        let result = resultArray[0];
        
        // Create variables for chart
        let otu_ids = result.otu_ids;
        let otu_labels = result.otu_labels;
        let sample_values = result.sample_values;

       // Create a bar trace object
        let barData = {
            x: sample_values.slice(0,10).reverse(),
            y: otu_ids.slice(0,10).map(otuId => `OTU ${otuId}`),
            type: 'bar',
            text: otu_labels.slice(0,10).reverse(),
            orientation: 'h'
        };

        // Put the trace object int an array
        let barArray = [barData];

        // Create a barlayout object
        let barLayout = {
            title: `Top 10 Bacteria cultures found for ${sampleId}`
        }

        // Call the Plotly function
        Plotly.newPlot("bar", barArray, barLayout);
    });
}


// Defint Bubble chart function
function DrawBubbleChart(sampleId)
{


    // Read in the json data
    d3.json(url).then(data => {
        
        // Defint the samples
        let samples = data.samples;
        let resultArray = samples.filter(s => s.id == sampleId);
        let result = resultArray[0];
        
        // Create variables for chart
        let otu_ids = result.otu_ids;
        let otu_labels = result.otu_labels;
        let sample_values = result.sample_values;

        // Create a bubble trace object
        let bubbleData = {
            x: otu_ids,
            y: sample_values,
            type: "bubble",
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
        };

        // Put the trace object into an array
        let bubbleArray = [bubbleData];

        // Create a bubble layout object
        let bubbleLayout = {
            title: `Bacteria Cultures Per sample`,
            margin: {t: 25},
            hovermode: "closest",
            xaxis: {title: "OTU ID"}
        }

        // Call the Plotly function
        Plotly.newPlot("bubble", bubbleArray, bubbleLayout);
    });
}

function ShowMetaData(sampleId)
{
    console.log(`Show Meta Data: ${sampleId}`);

    d3.json(url).then(data => {
    console.log(data);

        let samples = data.samples;
        let resultArray = samples.filter(s => s.id == sampleId);
        let result = resultArray[0];
        console.log(result);

        let metadata = data.metadata;
        let metaArray = metadata.filter(m => m.id == sampleId);
        let metaResult = metaArray[0];

        let metaData = `
            <h5>Id : ${metaResult.id}<h5/>
            <h5>Ethnicity : ${metaResult.ethnicity}<h5>
            <h5>Gender : ${metaResult.gender}<h5>
            <h5>Age : ${metaResult.age}<h5>
            <h5>Location : ${metaResult.location}<h5>
            <h5>BB Type : ${metaResult.bbtype}<h5>
            <h5>W Freq : ${metaResult.wfreq}<h5>
            `;
        d3.select('#sample-metadata').html(metaData);
    });
}

function optionChanged(sampleId)
{
    // console.log(`Option Changed: ${sampleId}`)
    DrawBarGraph(sampleId);
    DrawBubbleChart(sampleId);
    ShowMetaData(sampleId);
}

function InitDashboard(sampleId)
{
    let selector = d3.select("#selDataset");

    d3.json(url).then(data => {
    

        let sampleNames = data.names;
        

        for (let i = 0;i < sampleNames.length; i++){
            
            let sampleId = sampleNames[i];
            // console.log(sampleId);
            selector.append("option").text(sampleId).property("value", sampleId);
        };

        let intialId = selector.property("value");
        // console.log(intialId);

        DrawBarGraph(intialId);
        DrawBubbleChart(intialId);
        ShowMetaData(intialId);

    });
}

InitDashboard();