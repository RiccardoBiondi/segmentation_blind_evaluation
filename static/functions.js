// Some global variables:

var now = new Date(); // current date
const GREEN_BETTER = "green";
const BLUE_BETTER = "blue";
const NO_BETTER = "none";

// define the constants to store the links to the input images and labels
const imageSrcs = [];
const blueSrcs = [];
const greenSrcs = [];

// this variable is used to store the responses for each match
var responses = {};

// counter to keep track of the current image to display. 
// TODO: if lower than 0 => get to the last slice 
let currentSlideNumber = 0;


function loadFiles(filePickerId, dest){

    let filePicker = document.getElementById(filePickerId);
    filePicker.click();
    filePicker.addEventListener('change', function(event){
        let files = event.target.files;
        // append it to the global LINKS array
        for (let i = 0; i < files.length; i++) {
            dest.push(files[i].webkitRelativePath);
        };
    }), false;
};


function changeVisibility(imageId, buttonId) {

    let image = document.getElementById(imageId);
    let button = document.getElementById(buttonId)

    if (image.style.visibility === "hidden") {

        image.style.visibility = "visible"
        button.innerHTML = 'Hide Label';
    }

    else {
        image.style.visibility = "hidden";
        button.innerHTML = 'Reveal Label';
    }
}


function setChoice(responseId){

    var current = document.getElementById('mainImage');
    var filename = current.name;

    // Update the global dictionary
    responses[filename + currentSlideNumber] = responseId;
    currentSlideNumber += 1;
    console.log(responses);

    // Print message box
}

function confirmUploadDirectories(){
    
    // check that you have select all the necessary files

    let uploadPage = document.getElementById("uploadPage");
    let evaluationPage = document.getElementById("evaluationPage");

    uploadPage.style.display = "none";
    evaluationPage.style.display  = "initial";
}

// Callbacks to upload the images


document.getElementById("uploadImage").addEventListener('click', function (event) { loadFiles("imagePicker", imageSrcs)});
document.getElementById("uploadBlue").addEventListener('click', function (event) { loadFiles("bluePicker", blueSrcs) });
document.getElementById("uploadGreen").addEventListener('click', function (event) { loadFiles("greenPicker", greenSrcs)});

//document.getElementById("confirmButton").addEventListener('click', confirmUploadDirectories());

// change the visibility of the green image overlay when click the correct button
document.getElementById("hideGreenImage").addEventListener("click", function () { changeVisibility("greenOverlay", "hideGreenImage")});
document.getElementById("hideBlueImage").addEventListener("click", function () { changeVisibility("blueOverlay", "hideBlueImage") });

// use the slider to change the opacity
let greenSlider = document.getElementById("greenOpacity");
// change the image opacity each time you drag the slider handler
greenSlider.oninput = function(){
    let greenOverlay = document.getElementById("greenOverlay");
    greenOverlay.style.opacity = this.value / 100;
}

let blueSlider = document.getElementById("blueOpacity");
// change the image opacity each time you drag the slider handler
blueSlider.oninput = function () {
    let blue0Overlay = document.getElementById("blueOverlay");
    blueOverlay.style.opacity = this.value / 100;
}


// add the callback for the preference
document.getElementById("betterBlue").addEventListener("click", function(){setChoice(BLUE_BETTER)});
document.getElementById("betterGreen").addEventListener("click", function () { setChoice(GREEN_BETTER)});