/*
    FILE WHICH CONTAINS THE CALLBACKS TO MAKE THE PAGE INTERACTIVE
*/

/*Define a closed environment to avoid the direct access to the window object*/

(function (){
    // main variables 
    let zoomFactor = 1; // default zoom factor: corresponds to no zoom 
    let currentSlideIndex = 0;
    let preferences = {};

    const NOW = new Date();
    const GREEN_BETTER = "green";
    const BLUE_BETTER = "blue";
    const NONE_BETTER = "none";
    const BORDER_HIGHLIGHT = "0px 0px 10px 10px gold" ;
    const OUTNAME = "responses_" + NOW.toLocaleDateString() + ".csv";


    // set the help message text
    document.getElementById("uploadHelpMessage").innerHTML = messages.eng['upload help message'];
    document.getElementById("evaluationHelpMessage").innerHTML = messages.eng['evaluation help message'];

    // some usefull function wrapping
    function showCurrentSlide(n) {
        /* Function to show the current image to evaluate*/

        // Force the wrap around
        if (n > imageSrcs.length - 1) { currentSlideIndex = 0 };
        if (n < 0) { currentSlideIndex = imageSrcs.length - 1 };

        // now show the images
        utilities.showImage(imageSrcs[currentSlideIndex], 'mainImage');
        utilities.showImage(imageSrcs[currentSlideIndex], 'mainImageBis');
        utilities.showImage(greenSrcs[currentSlideIndex], 'greenOverlay');
        utilities.showImage(blueSrcs[currentSlideIndex], 'blueOverlay');
        highlightPreference(imageSrcs[currentSlideIndex]);
        // upload the image current
        document.getElementById("imageCounter").innerHTML = "Image " + (currentSlideIndex + 1) + "/" + imageSrcs.length;
    }; 

    function highlightPreference(slideIdentifier) {
        // slideIdentifier is the ientifier of the soice to highlight
        // if you have expressed a preference, this will be hightlighted during the visualization
        if (preferences[slideIdentifier] === BLUE_BETTER) {

            // set the margin of the green image to the default values
            document.getElementById("mainImage").style.boxShadow = "none"
            document.getElementById("mainImageBis").style.boxShadow = BORDER_HIGHLIGHT
        } else if (preferences[slideIdentifier] === GREEN_BETTER) {
            // set the margin of the blue image to the default values
            document.getElementById("mainImageBis").style.boxShadow = "none"
            document.getElementById("mainImage").style.boxShadow = BORDER_HIGHLIGHT

        } else if (preferences[slideIdentifier] === NONE_BETTER) {
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

    let greenOverlay = document.getElementById("greenOverlay");
    let blueOverlay = document.getElementById("blueOverlay");

    let imageA = document.getElementById('mainImage');
    let imageB = document.getElementById('mainImageBis');
    // upload the images on click
    imageUploadButton.addEventListener('click', (event) => { utilities.loadFilesOnButtonClick(imageSrcs, imageFilePicker, imageUploadButton) });
    blueUploadButton.addEventListener('click', (event) => { utilities.loadFilesOnButtonClick(blueSrcs, blueFilePicker, blueUploadButton) });
    greenUploadButton.addEventListener('click', (event) => { utilities.loadFilesOnButtonClick(greenSrcs, greenFilePicker, greenUploadButton) });

    
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
        let message = utilities.changeVisibility('greenOverlay');
        utilities.changeVisibility('blueOverlay');
        document.getElementById("hideButton").innerHTML = message;
    });

    // add the function to control the overlays opacity
    ;

    // change the image opacity each time you drag the slider handler
    document.getElementById("setOpacity").oninput = function () {

        greenOverlay.style.opacity = this.value / 100;
        blueOverlay.style.opacity = this.value / 100;
    }


    // set the choice
    document.getElementById("betterBlue").addEventListener("click", (evant) => { 
            utilities.setChoice(BLUE_BETTER, imageSrcs[currentSlideIndex], preferences);
            document.getElementById("evaluationCounter").innerHTML = "Evaluated: " + Object.keys(preferences).length + "/" + imageSrcs.length;
            highlightPreference(imageSrcs[currentSlideIndex]);
         });
    document.getElementById("betterGreen").addEventListener("click", (evant) => {
        utilities.setChoice(GREEN_BETTER, imageSrcs[currentSlideIndex], preferences);
        document.getElementById("evaluationCounter").innerHTML = "Evaluated: " + Object.keys(preferences).length + "/" + imageSrcs.length;
        highlightPreference(imageSrcs[currentSlideIndex]);
    });

    document.getElementById("betterNone").addEventListener("click", (evant) => {
        utilities.setChoice(NONE_BETTER, imageSrcs[currentSlideIndex], preferences);
        document.getElementById("evaluationCounter").innerHTML = "Evaluated: " + Object.keys(preferences).length + "/" + imageSrcs.length;
        highlightPreference(imageSrcs[currentSlideIndex]);
    });



    // Dowload the results
    document.getElementById("downloadButton").addEventListener("click", (event) => {
        utilities.downloadResults(OUTNAME, imageSrcs, preferences);
    });

    // callbacks for the magnifier lens

    let zoomLensA = document.getElementById('zoomLensA');// get the zoom lens
    let zoomLensB = document.getElementById('zoomLensB');// get the zoom lens


    // display the zoom lens on mouse moving
    greenOverlay.addEventListener("mousemove", (event) => { utilities.magnify(imageA, greenOverlay, zoomLensA, zoomFactor) }, false);
    blueOverlay.addEventListener("mousemove", (event) => { utilities.magnify(imageB, blueOverlay, zoomLensB, zoomFactor) }, false);

    // hide and reveal the magnifier
    document.getElementById('revealZoomLens').addEventListener('click', (event) => {

        let message = utilities.changeVisibility('zoomLensA');
        utilities.changeVisibility('zoomLensB');
        utilities.magnify(imageA, greenOverlay, zoomLensA, zoomFactor);
        utilities.magnify(imageB, blueOverlay, zoomLensB, zoomFactor);

        document.getElementById("revealZoomLens").innerHTML = message + " Lens";
    }, false);

    // change the zoom factor
    document.getElementById('zoomLevel').oninput = function () {

        zoomFactor = this.value;

        utilities.magnify(imageA, greenOverlay, zoomLensA, zoomFactor);
        utilities.magnify(imageB, blueOverlay, zoomLensB, zoomFactor);

    }



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
            // green selection key
            case "KeyQ":
                document.getElementById("betterGreen").click();
                break;
            // blue selection key
            case "KeyE":
                document.getElementById("betterBlue").click();
                break;
            // none selection key
            case "KeyW":
                document.getElementById("betterNone").click();
                break;
            // hide/reveal label key
            case "KeyH":
                document.getElementById("hideButton").click();
                utilities.magnify(imageA, greenOverlay, zoomLensA, zoomFactor);
                utilities.magnify(imageB, blueOverlay, zoomLensB, zoomFactor);
                break;

            // hide/reveal zoom lens key
            case "KeyZ":
                document.getElementById("revealZoomLens").click();
                break;
        }
    }, false);


})();




