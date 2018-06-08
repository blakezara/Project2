var $tbody = document.querySelector("tbody");
var $countyInput = document.querySelector("#county");
var $stateInput = document.querySelector("#state");
var $storecountInput = document.querySelector("#storecount");
var $medianincomeInput = document.querySelector("#medianincome");
var $searchBtn = document.querySelector("#search");
var $recordCounter = document.querySelector("#recordCounter");
var $pages = document.querySelector("#pages");
var $loadBtn = document.querySelector("#load");
var $nextBtn = document.querySelector("#next");
var $prevBtn = document.querySelector("#prev");

$searchBtn.addEventListener("click", handleSearchButtonClick);
$loadBtn.addEventListener("click", handleReloadButtonClick);
$nextBtn.addEventListener("click", handleNextButtonClick);
$prevBtn.addEventListener("click", handlePrevButtonClick);
$pages.addEventListener("change", handlePagesChange);

var filteredData = dataSet;
var count = 0;

//adding in random dropdown//
function addDropdown() {
    console.log("inside addDropdown()");
    
    // put list of sample names into an array
    s = [];
    queryURL = 'http://localhost:5000/state';
    // Take response and assign to sampleNames array
    d3.json(queryURL, function (error, response) 
    {
      if (error) {
        console.log(error);
      }
      else {
        s = response;
  
        // Add each item as option to dropdown  
        for (var i = 0; i < s.length; i++) {
          d3.select("#selDataset").append("option")
            .attr("value", s[i]["name"])
            .text(s[i]);
        }
  
        optionChanged(s[0]);
  
      }
    }
);
  
  }


function handleNextButtonClick() {
    count++;
    renderTable();
}
function handlePrevButtonClick() {
    count--;
    renderTable();
}

function handlePagesChange() {
    renderTable();
}


function handleSearchButtonClick() {
    var filterCounty = $countyInput.value.trim();
    var filterState = $stateInput.value.trim().toLowerCase();
    var filterStoreCount = $storecountInput.value.trim().toLowerCase();
    var filterMedianIncome = $medianincomeInput.value.trim().toLowerCase();

    if (filterCounty != "") {
        filteredData = filteredData.filter(function (county) {
        var dataCounty = county.county;
        return dataCounty === filterCounty;
    });

    }

    if (filterState != "") {
        filteredData = filteredData.filter(function (state) {
            var dataState = state.state;
            return dataState === filterState;
        });
    }

    if (filterStoreCount != "") {
        filteredData = filteredData.filter(function (storecount) {
            var dataStoreCount = storecount.storecount;
            return dataStoreCount === filterStoreCount;
        });
    }

    if (filterMedianIncome != "") {
        filteredData = filteredData.filter(function (medianincome) {
            var dataMedianIncome = medianincome.medianincome;
            return dataMedianIncome === filterMedianIncome;
        });
    }

    renderTable();
}

function handleReloadButtonClick() {
    count = 0;
    filteredData = dataSet;
    $CountyInput.value = '';
    $stateInput.value = '';
    $storecountInput.value = '';
    $medianincomeInput.value = '';

    renderTable();
}

function renderTable() {
    $tbody.innerHTML = "";

    var pages = Number(document.getElementById("pages").value);

    var start = count * pages + 1;
    var end = start + pages - 1;
    var btn;

    if (end > filteredData.length) {
      end = filteredData.length;
      btn = document.getElementById("next");
      btn.disabled = true;
    }
    else {
      btn = document.getElementById("next");
      btn.disabled = false;
    }

    if (start == 1) {
      btn = document.getElementById("prev");
      btn.disabled = true;
    }
    else {
      btn = document.getElementById("prev");
      btn.disabled = false;
    }

    $recordCounter.innerText = "From Record: " + start + " to: " + end + " of " + filteredData.length;
    for (var i = 0; i < pages; i++) {
        var item = filteredData[i+(count * pages)];
        var fields = Object.keys(item);
        var $row = $tbody.insertRow(i);
        for (var j = 0; j < fields.length; j++) {
            var field = fields[j];
            var $cell = $row.insertCell(j);
            $cell.innerText = item[field];
        }
    }
}

renderTable();