// Some global variables:

var now = new Date(); // current date
const GREEN_BETTER = "green";
const BLUE_BETTER = "blue";
const NO_BETTER = "none";
const OUTNAME = "responses_" + now.toLocaleDateString() + ".csv"
const BORDER_HIGHLIGHT = "0px 0px 10px 10px gold" // control the border to highligh the selection

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
        // change the text on the button to notify the folder selection
        clickedButton.innerHTML = "Uploaded " + files.length + " files from: " + files[0].webkitRelativePath.split('/')[0];
    });
};


function changeVisibility() {

    let greenLabel = document.getElementById("greenOverlay");
    let blueLabel = document.getElementById("blueOverlay");

    let button = document.getElementById("hideButton");

    if (greenLabel.style.visibility === "hidden") {

        greenLabel.style.visibility = "visible"
        blueLabel.style.visibility = "visible"

        button.innerHTML = 'Hide Label';
    }

    else {
        greenLabel.style.visibility = "hidden";
        blueLabel.style.visibility = "hidden";
        button.innerHTML = 'Reveal Label';
    }
};


function setChoice(responseId){

    var current = document.getElementById('mainImage');
    var filename = current.name;

    // Update the global dictionary
    responses[filename + currentSlideIndex] = responseId;

    //document.getElementById("evaluationCounter").innerHTML = "Evaluated: " + Object.keys(responses).length + "/" + imageSrcs.length;
    highlightPreference(currentSlideIndex);
};


function confirmUploadDirectories(){

    // Ensure thet yOu have specified all the directories paths
    if (imageSrcs.lengt == 0 || blueSrcs.length == 0 || greenSrcs.length == 0){

        alert("Pelase specify all the required directories");
    } else if (imageSrcs.length == blueSrcs.length && imageSrcs.length == greenSrcs.length ){
        // if all directories contains the same number of images you can proceed with the analysis

        // hide the upload page and reveal the evaluation one
        document.getElementById("uploadPage").style.display = "none";
        document.getElementById("evaluationPage").style.display = "flex";
        showCurrentSlide(currentSlideIndex);

    } else {
        // Display an alert message if you have chose folders with different number
        // of images
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
    highlightPreference(currentSlideIndex);
    // upload the image current
    //document.getElementById("imageCounter").innerHTML = "Image " + (currentSlideIndex + 1) + "/" + imageSrcs.length;
}; 



function moveImage(step){
    // Function to move torugh the images

    currentSlideIndex += step;
    showCurrentSlide(currentSlideIndex);

    //TODO: add function to highlight the selection on the list bar
};


function highlightPreference(slideNumber){

    // slide number is the number of the current slice
    // if you have expressed a preference, this will be hightlighted during the visualization
    if (responses[slideNumber] === BLUE_BETTER){

        console.log(BLUE_BETTER);
        // set the margin of the green image to the default values
        document.getElementById("mainImage").style.boxShadow = "none"
        document.getElementById("mainImageBis").style.boxShadow =  BORDER_HIGHLIGHT
    } else if (responses[slideNumber] === GREEN_BETTER){
        console.log(GREEN_BETTER);
        // set the margin of the blue image to the default values
        document.getElementById("mainImageBis").style.boxShadow = "none"
        document.getElementById("mainImage").style.boxShadow = BORDER_HIGHLIGHT

    } else if (responses[slideNumber] === NO_BETTER){
        document.getElementById("mainImageBis").style.boxShadow = BORDER_HIGHLIGHT
        document.getElementById("mainImage").style.boxShadow = BORDER_HIGHLIGHT
    }

    else {
        document.getElementById("mainImageBis").style.boxShadow = "none"
        document.getElementById("mainImage").style.boxShadow = "none"
    }
}


function downloadResults(){

    var hiddenElement = document.createElement('a');
    hiddenElement.download = OUTNAME;
    console.log('Downloading');
    // start with the header file
    var textToSave = 'Filename,response\n';

    // Loop along the available files
    // NOTE: in this way we can take care of the full list of
    // available files and not just the seen by user
    for (const index in imageSrcs) {

        // get the associated response
        let value = responses[index];

        // If it was inserted
        if (value != undefined) {
            // create the file row with info to dump
            textToSave += index + ',' + value + '\n';
        }
        // If it was NOT inserted
        else {
            // insert missing values
            textToSave += index + ',' + MISSING_VALUE + '\n';
        }
    }

    // append the file content
    hiddenElement.href = 'data:attachment/text,' + encodeURI(textToSave);
    // trigger a click
    hiddenElement.click();
}


/*********************************************************************************
 *            START THE CALLBACKS TO MANAGE THE IONTERACTION WITH THE PAGE       *
 *********************************************************************************/

// SESSION TO UPLOAD THE IMAGES

document.getElementById("uploadImage").addEventListener('click', function () { loadFiles("imagePicker", imageSrcs, "uploadImage")});
document.getElementById("uploadBlue").addEventListener('click', function () { loadFiles("bluePicker", blueSrcs, "uploadBlue") });
document.getElementById("uploadGreen").addEventListener('click', function () { loadFiles("greenPicker", greenSrcs, "uploadGreen")});
document.getElementById("confirmButton").addEventListener('click', confirmUploadDirectories, false);

// set the help text
document.getElementById("helpMessage")


// change the visibility of the green image overlay when click the correct button
// SESSION TO DISPLAY THE IMAGES

//document.getElementById("hideButton").addEventListener("click", changeVisibility);

/*
// use the slider to change the opacity
let opacitySlider = document.getElementById("setOpacity");
// let contrastSlider = document.getElementById("setContrast");
// let brightnessSlider = document.getElementById("setBrightness");

// change the image opacity each time you drag the slider handler
opacitySlider.oninput = function(){
    let greenOverlay = document.getElementById("greenOverlay");
    let blueOverlay = document.getElementById("blueOverlay");
    greenOverlay.style.opacity = this.value / 100;
    blueOverlay.style.opacity = this.value / 100;
}
*/
/*
contrastSlider.oninput = function(){

    img1.style.filter = "contrast(" + this.value + "%) " + "brightness(" + brightnessSlider.value + "%);";
    img2.style.filter = "contrast(" + this.value + "%) " + "brightness(" + brightnessSlider.value + "%);";
}

brightnessSlider.oninput = function () {

    img1.style.filter = "contrast(" + contrastSlider.value + "%) " + "brightness(" + this.value + "%);";
    img2.style.filter = "contrast(" + contrastSlider.value + "%) " + "brightness(" + this.value + "%);";

    console.log(img1.style.filter);
}


document.getElementById("resetButton").addEventListener("click", function(){

    // set all the sliders to the dafault value
    opacitySlider.value = 100;
    contrastSlider.value = 100;
    brightnessSlider.value = 100;

    // set contrast and brightness to 100% each.
    img1.style.filter = "contrast(" + contrastSlider.value +"%) " + "brightness(" + brightnessSlider.value + "%);";
    img2.style.filter = "contrast(" + contrastSlider.value + "%) " + "brightness(" + brightnessSlider.value + "%);";
    // set the opacity to 100% and make the labels visible
    document.getElementById("greenOverlay").style.opacity = 1;
    document.getElementById("greenOverlay").style.visibility = "visible";

    document.getElementById("blueOverlay").style.opacity = 1;
    document.getElementById("blueOverlay").style.visibility = "visible";
    document.getElementById("hideButton").innerHTML = "Hide Label"

    // set also the slider values to the dafault one
 
})

*/

// add the callback for the preference
//document.getElementById("betterBlue").addEventListener("click", function(){ setChoice(BLUE_BETTER) });
//document.getElementById("betterGreen").addEventListener("click", function () { setChoice(GREEN_BETTER) });
//document.getElementById("noneBetter").addEventListener("click", function () { setChoice(NO_BETTER) });

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

//document.getElementById("downloadButton").addEventListener("click", downloadResults);