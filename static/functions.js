
function setSliderAndButtonProperties(){

    // change the slider and button properties (widht, position)
    // according to the input image
    console.log('Ciao');
    let slider = document.getElementById("greenOpacity");
    let button = document.getElementById("hideGreenImage");
    let referenceImage = document.getElementById("greenOverlay");

    slider.style.width = referenceImage.style.width;
    button.style.width = referenceImage.style.width;

}

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

// change the visibility of the green image overlay when click the correct button
document.getElementById("hideGreenImage").addEventListener("click", function () { changeVisibility("greenOverlay", "hideGreenImage")});

// use the slider to change the opacity
let greenSlider = document.getElementById("greenOpacity");
// change the image opacity each time you drag the slider handler
greenSlider.oninput = function(){
    let greenOverlay = document.getElementById("greenOverlay");
    greenOverlay.style.opacity = this.value / 100;
}

setSliderAndButtonProperties();