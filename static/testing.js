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

 });

 
  
//attempto build out scatter plot for state by state data--- having trouble



    function optionChanged(chosenSample){
   
    d3.json("/metadata/" + chosenSample, function(error, response){

        if (error) return console.warn(error);

        console.log(response);

        var responseKeys = Object.keys(response);

        console.log(responseKeys);

        var sampleInfoPanel = document.querySelector("#sample-metadata");

        sampleInfoPanel.innerHTML = null;

        for (var i=0; i<responseKeys.length; i++){
            var dataPoint = document.createElement('p');
            dataPoint.innerHTML = responseKeys[i] + ": " + response[responseKeys[i]];
            sampleInfoPanel.appendChild(dataPoint)
        };
        


    })

}

