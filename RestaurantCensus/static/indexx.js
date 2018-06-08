// var $tbody = document.querySelector("tbody");
// var $countyInput = document.querySelector("#county");
// var $stateInput = document.querySelector("#state");
// var $storecountInput = document.querySelector("#storecount");
// var $medianincomeInput = document.querySelector("#medianincome");
// var $searchBtn = document.querySelector("#search");
// var $recordCounter = document.querySelector("#recordCounter");
// var $pages = document.querySelector("#pages");
// var $loadBtn = document.querySelector("#load");
// var $nextBtn = document.querySelector("#next");
// var $prevBtn = document.querySelector("#prev");

// $searchBtn.addEventListener("click", handleSearchButtonClick);
// $loadBtn.addEventListener("click", handleReloadButtonClick);
// $nextBtn.addEventListener("click", handleNextButtonClick);
// $prevBtn.addEventListener("click", handlePrevButtonClick);
// $pages.addEventListener("change", handlePagesChange);

// var filteredData = dataSet;
// var count = 0;

//adding in random dropdown//
// function addDropdown() {
//     console.log("inside addDropdown()");

    // Take response and assign to sampleNames array
    d3.json("/state", function (error, response) 
    {
        if (error) return console.warn(error);
     
        var dropDown = document.getElementById("selDataset")
     
        for (var i=0; i< response.length; i++){
            var optionChoice = document.createElement("option");
            optionChoice.innerHTML = response[i];
            optionChoice.setAttribute("value", response[i]);
            dropDown.appendChild(optionChoice);
        }
        optionChanged(response[0])
     });
var defaultSample = "HI"

function init(sample){
    // sample metadata panel
    d3.json("/metadata/" + sample, function(error, response){
        if (error) return console.warn(error);

        // get list of keys from response
        var responseKeys = Object.keys(response);

        // identify correct div
        var sampleInfoPanel = document.querySelector("#sample-metadata");
       
        // reset HTML to be nothing
        sampleInfoPanel.innerHTML = null;

        // loop through response keys and create a P element for each including
        // response key and value
        for (var i=0; i<responseKeys.length; i++){
            var dataPoint = document.createElement('p');
            dataPoint.innerHTML = responseKeys[i] + ": " + response[responseKeys[i]];
            sampleInfoPanel.appendChild(dataPoint)
        };

    });

 //pie chart 
  var data = [{
    values: [1, 3, 5, 8],
    labels: ["Section 1", "Section 2", "Section 3", "Section 4"],
    text: ["A", "B", "C", "D"],
    type: "pie"
  }];

  var layout = {
    margin: {
      b: 0,
      t: 10,
      pad: 0
    },
    title: false,
    height: 350,
    width: 500
  };

  Plotly.plot("pie", data, layout);



  // scatter plot 
  var trace1 = {
    x: [1, 2, 3, 4],
    y: [10, 11, 12, 13],
    text: ['A size: 20', 'B size: 40', 'C size: 60', 'D size: 100'],
    mode: 'markers',
    hoverinfo: 'text',
    marker: {
      color:['rgb(215,48,39)','rgb(244,109,67)', 'rgb(253,174,97)','rgb(254,224,144)'],
      size: [40, 60, 80, 100]
    }
  };

  var data = [trace1];

  var layout = {
    margin: {
      l: 25,
      r: 250,
      b: 25,
      t: 10,
      pad: 0
    },
    xaxis: {title: "OTU ID's"},

    showlegend: false,
    height: 400,
    width: 1200
  };

  Plotly.newPlot('scatterPlot', data, layout);



function updatePlots(newdata) {

      // Declare variables
  plotText = [];
  plotColor = []; 
  otuTop10 = []; 
  otuDescAll  = [];

 

  d3.json("/otu", function (error, response) {
    

    // Add top 10 otu_id's to array for pie
    for (var i = 0; i < 10; i++) {
      otuTop10.push(otuDescAll[newdata[0].otu_id[i]]);
    }


    for (var i = 0; i < newdata[0].otu_id.length; i++) {
      plotText.push("(" + newdata[0].otu_id[i] + "," + newdata[0].sample_values[i] + ")" + "<br>" + otuDescAll[newdata[0].otu_id[i]]);
      color1 = pickHex([0, 0, 51], [51, 0, 0], ((i) / newdata[0].otu_id.length));
      color2 = 'rgb(' + color1[0] + ', ' + color1[1] + ', ' + color1[2] + ')';
      scatterPlotColor.push(color2);
    }

    // Restyle 
    Plotly.restyle("scatterPlot", "text", [plotText]);
    Plotly.restyle("scatterPlot", "marker.color", [plotColor]);

});

// Get html element for pie chart
var PIE = document.getElementById("pie");
  
// Restyle the pie chart-----????
Plotly.restyle(PIE, "values", [[newdata[0].sample_values][0].slice(0, 10)]);
Plotly.restyle(PIE, "labels", [[newdata[0].otu_id][0].slice(0, 10)]);
Plotly.restyle(PIE, "text", [otuTop10]);


// Restyle the scatter plot  
Plotly.restyle("scatterPlot", "x", [newdata[0].otu_id]);
Plotly.restyle("scatterPlot", "y", [newdata[0].sample_values]);
Plotly.restyle("scatterPlot", "marker.size", [newdata[0].sample_values]);

}

// attempt at the gauge


function generateNewGauge(washFreq){
    
    if (washFreq > 4) {
      var level = washFreq * 20;
    }
    else if (washFreq == 4) {
      var level = washFreq * 15;
    }
    else {
      var level = washFreq * 10;
    }
  
    var degrees = 180 - level,
      radius = .5;
    var radians = degrees * Math.PI / 180;
    var x = radius * Math.cos(radians);
    var y = radius * Math.sin(radians);
  
    
    var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
      pathX = String(x),
      space = ' ',
      pathY = String(y),
      pathEnd = ' Z';
    var path = mainPath.concat(pathX, space, pathY, pathEnd);
  
    var data = [{
      type: 'scatter',
      x: [0], y: [0],
      marker: { size: 28, color: '850000' },
      showlegend: false,
      name: 'scrubs per week',
      text: washFreq,
      hoverinfo: 'text+name'
    },
    {
      values: [50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50],
      rotation: 90,
      text: ["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
      textinfo: 'text',
      textposition: 'inside',
      marker: {
        colors: ['rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)',
          'rgba(170, 202, 42, .5)', 'rgba(202, 209, 95, .5)',
          'rgba(210, 206, 145, .5)', 'rgba(232, 226, 202, .5)',
          'rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)',
          'rgba(170, 202, 42, .5)',
          'rgba(255, 255, 255, 0)']
      },
      labels: ['9', '8', '7', '6', '5', '4', '3', '2', '1', '0'],
      hoverinfo: 'label',
      hole: .5,
      type: 'pie',
      showlegend: false
    }];
  
    var layout = {
      shapes: [{
        type: 'path',
        path: path,
        fillcolor: '850000',
        line: {
          color: '850000'
        }
      }],
      title: 'Belly Button Washing Frequency (Scrubs per Week)',
      height: 400,
      width: 400,
      xaxis: {
        zeroline: false, showticklabels: false,
        showgrid: false, range: [-1, 1]
      },
      yaxis: {
        zeroline: false, showticklabels: false,
        showgrid: false, range: [-1, 1]
      }
    };
  
    Plotly.newPlot('gauge', data, layout);
  }


 
  
  // Calling init to create default Pie Chart and Scatter Plot
  init();
  
  // Calling addDropdown to crate dropdown list of samples
  addDropdown();

  }