/*
    FILE WHICH CONTAINS THE CALLBACKS TO MAKE THE PAGE INTERACTIVE
*/

/*Define a closed environment to avoid the direct access to the window object*/

(function (){
    // main variables 
    let currentSlideIndex = 0;
    let preferences = {};

    const NOW = new Date();
    const GREEN_BETTER = "green";
    const BLUE_BETTER = "blue";
    const NONE_BETTER = "none";
    const BORDER_HIGHLIGHT = "0px 0px 10px 10px gold" ;
    const OUTNAME = "responses_" + NOW.toLocaleDateString() + ".csv";

    // some usefull function wrapping
    function showCurrentSlide(n) {
        /* Function to show the current image to evaluate*/

        // Force the wrap around
        if (n > imageSrcs.length - 1) { currentSlideIndex = 0 };
        if (n < 0) { currentSlideIndex = imageSrcs.length - 1 };

        // now show the images
        myFunctions.showImage(imageSrcs[currentSlideIndex], 'mainImage');
        myFunctions.showImage(imageSrcs[currentSlideIndex], 'mainImageBis');
        myFunctions.showImage(greenSrcs[currentSlideIndex], 'greenOverlay');
        myFunctions.showImage(blueSrcs[currentSlideIndex], 'blueOverlay');
        highlightPreference(currentSlideIndex);
        // upload the image current
        document.getElementById("imageCounter").innerHTML = "Image " + (currentSlideIndex + 1) + "/" + imageSrcs.length;
    }; 

    function highlightPreference(slideNumber) {

        // slide number is the number of the current slice
        // if you have expressed a preference, this will be hightlighted during the visualization
        if (preferences[slideNumber] === BLUE_BETTER) {

            // set the margin of the green image to the default values
            document.getElementById("mainImage").style.boxShadow = "none"
            document.getElementById("mainImageBis").style.boxShadow = BORDER_HIGHLIGHT
        } else if (preferences[slideNumber] === GREEN_BETTER) {
            // set the margin of the blue image to the default values
            document.getElementById("mainImageBis").style.boxShadow = "none"
            document.getElementById("mainImage").style.boxShadow = BORDER_HIGHLIGHT

        } else if (preferences[slideNumber] === NONE_BETTER) {
            document.getElementById("mainImageBis").style.boxShadow = BORDER_HIGHLIGHT
            document.getElementById("mainImage").style.boxShadow = BORDER_HIGHLIGHT
        }

        else {
            document.getElementById("mainImageBis").style.boxShadow = "none"
            document.getElementById("mainImage").style.boxShadow = "none"
        }
    }

    // array to store the relaticve path to the main images and the segmentation to evaluate
    let imageSrcs = [];
    let blueSrcs = [];
    let greenSrcs = [];

    // file pickers to upload the required files
    let imageFilePicker = document.getElementById("imagePicker");
    let blueFilePicker = document.getElementById("bluePicker");
    let greenFilePicker = document.getElementById("greenPicker");

    // buttons to trigger the upload event
    let imageUploadButton = document.getElementById("uploadImage");
    let blueUploadButton = document.getElementById("uploadBlue");
    let greenUploadButton = document.getElementById("uploadGreen");


    // upload the images on click
    imageUploadButton.addEventListener('click', (event) => { myFunctions.loadFilesOnButtonClick(imageSrcs, imageFilePicker, imageUploadButton) });
    blueUploadButton.addEventListener('click', (event) => { myFunctions.loadFilesOnButtonClick(blueSrcs, blueFilePicker, blueUploadButton) });
    greenUploadButton.addEventListener('click', (event) => { myFunctions.loadFilesOnButtonClick(greenSrcs, greenFilePicker, greenUploadButton) });

    
    // confirm the selection
    // When you press the button, there is chack on the consinstency of the inputs, if so the selection is confirmed 
    // and  the images loaded.
    
    document.getElementById('confirmButton').addEventListener('click', (event) => {

        if (imageSrcs.lengt == 0 || blueSrcs.length == 0 || greenSrcs.length == 0){
            alert("Please, specify all the reuired directories");
        } else if (imageSrcs.length == blueSrcs.length && imageSrcs.length == greenSrcs.length){
            document.getElementById("uploadPage").style.display = "none";
            document.getElementById("evaluationPage").style.display = "flex";
            showCurrentSlide(currentSlideIndex);
        }
    })

    // add button to hide or reveal the segmentation label
    document.getElementById("hideButton").addEventListener("click", (event) => {
        let message = myFunctions.changeVisibility('greenOverlay');
        myFunctions.changeVisibility('blueOverlay');
        document.getElementById("hideButton").innerHTML = message;
    });

    // add the function to control the overlays opacity
    ;

    // change the image opacity each time you drag the slider handler
    document.getElementById("setOpacity").oninput = function () {
        let greenOverlay = document.getElementById("greenOverlay");
        let blueOverlay = document.getElementById("blueOverlay");
        greenOverlay.style.opacity = this.value / 100;
        blueOverlay.style.opacity = this.value / 100;
    }


    // set the choice
    document.getElementById("betterBlue").addEventListener("click", (evant) => { 
            myFunctions.setChoice(BLUE_BETTER, currentSlideIndex, preferences);
            document.getElementById("evaluationCounter").innerHTML = "Evaluated: " + Object.keys(preferences).length + "/" + imageSrcs.length;
            highlightPreference(currentSlideIndex);
         });
    document.getElementById("betterGreen").addEventListener("click", (evant) => {
        myFunctions.setChoice(GREEN_BETTER, currentSlideIndex, preferences);
        document.getElementById("evaluationCounter").innerHTML = "Evaluated: " + Object.keys(preferences).length + "/" + imageSrcs.length;
        highlightPreference(currentSlideIndex);
    });

    document.getElementById("betterNone").addEventListener("click", (evant) => {
        myFunctions.setChoice(NONE_BETTER, currentSlideIndex, preferences);
        document.getElementById("evaluationCounter").innerHTML = "Evaluated: " + Object.keys(preferences).length + "/" + imageSrcs.length;
        highlightPreference(currentSlideIndex);
    });


    // and now the shortcuts
    document.addEventListener('keydown', (event) => {
        switch (event.code) {
            // If left arrow is pressed
            case "ArrowLeft":
                currentSlideIndex -= 1;
                showCurrentSlide(currentSlideIndex);
                break;
            // If right arrow is pressed
            case "ArrowRight":
                currentSlideIndex += 1;
                showCurrentSlide(currentSlideIndex);
                break;
        }
    }, false);


    // Dowload the results
    document.getElementById("downloadButton").addEventListener("click", (event) => {
        myFunctions.downloadResults(OUTNAME, imageSrcs, preferences);
    });

})();




