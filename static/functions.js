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
let currentSlideIndex = 0;

function loadFiles(filePickerId, dest, buttonId){

    let filePicker = document.getElementById(filePickerId);
    let clickedButton = document.getElementById(buttonId)
    filePicker.click();
    filePicker.addEventListener('change', function(event){
    let files = event.target.files;
        // append it to the global LINKS array
    for (let i = 0; i < files.length; i++) {
        dest.push(files[i].webkitRelativePath);
        };
    
        clickedButton.innerHTML = "Uploaded " + files.length + " files from: " + files[0].webkitRelativePath.split('/')[0];
    });

    // change the text on the button to notify the folder selection
    
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
};

function setChoice(responseId){

    var current = document.getElementById('mainImage');
    var filename = current.name;

    // Update the global dictionary
    responses[filename + currentSlideIndex] = responseId;
    // Print message box
    console.log(responses);
};

function confirmUploadDirectories(){
    

    // Ensure thet ypu have specified all the directories paths
    if (imageSrcs.lengt == 0 || blueSrcs.length == 0 || greenSrcs.length == 0){

        alert("Pelase specify all the required directories");
    }
    // if all directories contains the same number of images you can proceed with the analysis
    else if (imageSrcs.length == blueSrcs.length && imageSrcs.length == greenSrcs.length ){
        let uploadPage = document.getElementById("uploadPage");
        let evaluationPage = document.getElementById("evaluationPage");

        uploadPage.style.display = "none";
        evaluationPage.style.display  = "flex";

        // show the first slide
        for (link of imageSrcs) {
            document.getElementById('list').innerHTML += `
                <img src="./data/${link}" id="${link}" title="${link}" style="width:100px; height: 100px" onclick=Enlarge(this); />
                `;
        }
        showCurrentSlide(currentSlideIndex);
    } else {

        // if different number of images display an alert message

        alert("All the folders must contains the same number of images");
    }

 
};

function showImage(src, id){
    /*Function to show an image specifying the src */ 
    let image = document.getElementById(id);
    image.src = './data/' + src;
    image.parentElement.style.display = "block";
};

function showCurrentSlide(n){
    /* Function to show the current image to evaluate*/

    // Force the wrap around
    if (n > imageSrcs.length - 1) { currentSlideIndex = 0 };
    if (n < 0) { currentSlideIndex = imageSrcs.length - 1 };

    // now show the images

    showImage(imageSrcs[currentSlideIndex], 'mainImage');
    showImage(imageSrcs[currentSlideIndex], 'mainImageBis');
    showImage(greenSrcs[currentSlideIndex], 'greenOverlay');
    showImage(blueSrcs[currentSlideIndex], 'blueOverlay');

};

// Function to move torugh the images
function moveImage(step){

    currentSlideIndex += step;
    showCurrentSlide(currentSlideIndex);
};
// Callbacks to upload the images


document.getElementById("uploadImage").addEventListener('click', function () { loadFiles("imagePicker", imageSrcs, "uploadImage")});
document.getElementById("uploadBlue").addEventListener('click', function () { loadFiles("bluePicker", blueSrcs, "uploadBlue") });
document.getElementById("uploadGreen").addEventListener('click', function () { loadFiles("greenPicker", greenSrcs, "uploadGreen")});

//document.getElementById("confirmButton").addEventListener('click', confirmUploadDirectories());

// change the visibility of the green image overlay when click the correct button
/*
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
    let blueOverlay = document.getElementById("blueOverlay");
    blueOverlay.style.opacity = this.value / 100;
}
*/

// add the callback for the preference
document.getElementById("betterBlue").addEventListener("click", function(){setChoice(BLUE_BETTER)});
document.getElementById("betterGreen").addEventListener("click", function () { setChoice(GREEN_BETTER)});
document.getElementById("noneBetter").addEventListener("click", function () { setChoice(NO_BETTER)});

// Add keybord shortcut

// KeyBoard shortcuts
document.addEventListener('keydown', (event) => {
    switch (event.code) {
        // If left arrow is pressed
        case "ArrowLeft":
            moveImage(-1);
            break;
        // If right arrow is pressed
        case "ArrowRight":
            moveImage(+1);
            break;
    }
}, false);