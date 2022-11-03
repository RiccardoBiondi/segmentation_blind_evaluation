/*
    FILE CONTAINING THE IMPLEMENTATION FO THE DIFFERENT FUNCTIONS TO MAKE THE PAGE WORKSS
*/
var utilities = {} || utilities; 

utilities.loadFilesOnButtonClick = function (dest, filePicker, clickedButton) {

    /*Trigger the filePicker event, load all the files inside the specified directory
    and store them inside dest. After the loading, display on the clicked button the number of 
    uploaded files and their source.*/
    filePicker.click();
    filePicker.addEventListener('change', (event) => {
        let files = event.target.files;
            // append it to the global LINKS array
        for (let i = 0; i < files.length; i++) {
            dest.push(files[i].webkitRelativePath);
        };
        clickedButton.innerHTML = "Uploaded " + files.length + " files from: " + files[0].webkitRelativePath.split('/')[0];
    });
};


utilities.showImage = function (src, id){
    /*Function to show an image specifying the src */
    let image = document.getElementById(id);
    image.src = './data/' + src;
};



utilities.changeVisibility = function (id) {
    let toHideOrReveal = document.getElementById(id);

    if (toHideOrReveal.style.visibility === "hidden") {

        toHideOrReveal.style.visibility = "visible";

        return 'Hide';
    }

    else {
        toHideOrReveal.style.visibility = "hidden";
        return  'Reveal';
    }
};



utilities.setChoice = function (result, currentName, dest){
    dest[currentName] = result;
}



utilities.downloadResults = function (outputName, sources, responses){

    var hiddenElement = document.createElement('a');
    hiddenElement.download = outputName;
    // start with the header file
    var textToSave = 'Filename,response\n';

    // Loop along the available files
    // NOTE: in this way we can take care of the full list of
    // available files and not just the seen by user
    for (const index of sources) {

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
            textToSave += index + ',' + "miss" + '\n';
        }
    }

    // append the file content
    hiddenElement.href = 'data:attachment/text,' + encodeURI(textToSave);
    // trigger a click
    hiddenElement.click();
}


// add the functions for the magnifier

utilities.getBackgroundSize = function (image, overlay, zoom) {
    baseImageSize = (image.width * zoom) + "px " + (image.height * zoom) + "px";

    if (overlay.style.visibility == 'visible') {
        overlaySize = baseImageSize;
    } else {
        overlaySize = "0";
    }

    return overlaySize + "," + baseImageSize;
}


utilities.magnify = function (image, overlay, glass, zoom) {

    /* Create magnifier glass: */
    /*Reveal the glass*/
    overlay.parentElement.insertBefore(glass, image);
    overlay.parentElement.insertBefore(glass, overlay);
    //image.parentElement.insertBefore(glass, overlay);
    /* Set background properties for the magnifier glass: */
    glass.style.backgroundImage = "url('" + overlay.src + "'), url('" + image.src + "')";
    glass.style.backgroundRepeat = "no-repeat", "no-repeat";
    glass.style.backgroundSize = utilities.getBackgroundSize(image, overlay, zoom)
    let w = glass.offsetWidth / 2;
    let h = glass.offsetHeight / 2;

    /* Execute a function when someone moves the magnifier glass over the image: */
    glass.addEventListener("mousemove", moveMagnifier);
    overlay.addEventListener("mousemove", moveMagnifier);
    image.addEventListener("mousemove", moveMagnifier);

    function moveMagnifier(e) {
        var pos, x, y;

        /* Prevent any other actions that may occur when moving over the image */
        e.preventDefault();
        /* Get the cursor's x and y positions: */
        pos = getCursorPos(e);
        x = pos.x;
        y = pos.y;
        /* Prevent the magnifier glass from being positioned outside the image: */
        if (x > image.width - (w / zoom)) { x = image.width - (w / zoom); }
        if (x < w / zoom) { x = w / zoom; }
        if (y > image.height - (h / zoom)) { y = image.height - (h / zoom); }
        if (y < h / zoom) { y = h / zoom; }
        /* Set the position of the magnifier glass: */
        glass.style.left = (x - w) + "px";
        glass.style.top = (y - h) + "px";
        /* Display what the magnifier glass "sees": */
        glass.style.backgroundPosition = "-" + ((x * zoom) - w + 3) + "px -" + ((y * zoom) - h + 3) + "px";
    }

    function getCursorPos(e) {
        var a, x = 0, y = 0;
        e = e || window.event;
        /* Get the x and y positions of the image: */
        a = image.getBoundingClientRect();
        /* Calculate the cursor's x and y coordinates, relative to the image: */
        x = e.pageX - a.left;
        y = e.pageY - a.top;
        /* Consider any page scrolling: */
        x = x - window.pageXOffset;
        y = y - window.pageYOffset;
        return { x: x, y: y };
    }
}