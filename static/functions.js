/*
    FILE CONTAINING THE IMPLEMENTATION FO THE DIFFERENT FUNCTIONS TO MAKE THE PAGE WORKSS
*/
var myFunctions = {} || myFunctions; 

console.log('Hello');

myFunctions.loadFilesOnButtonClick = function (dest, filePicker, clickedButton) {

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


myFunctions.showImage = function (src, id){
    /*Function to show an image specifying the src */
    let image = document.getElementById(id);
    image.src = './data/' + src;
};



myFunctions.changeVisibility = function (id) {

    let toHideOrReveal = document.getElementById(id);

    if (toHideOrReveal.style.visibility === "hidden") {

        toHideOrReveal.style.visibility = "visible"

        return 'Hide';
    }

    else {
        toHideOrReveal.style.visibility = "hidden";
        return  'Reveal';
    }
};



myFunctions.setChoice = function (result, currentName, dest){
    console.log(result);
    dest[currentName] = result;
}



myFunctions.downloadResults = function (outputName, sources, responses){

    var hiddenElement = document.createElement('a');
    hiddenElement.download = outputName;
    console.log('Downloading');
    // start with the header file
    var textToSave = 'Filename,response\n';

    // Loop along the available files
    // NOTE: in this way we can take care of the full list of
    // available files and not just the seen by user
    for (const index in sources) {

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
