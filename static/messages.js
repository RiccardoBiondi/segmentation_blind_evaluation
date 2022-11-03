/*
    FILE CONTAINING THE MESSAGES TO DISPLAY: ALLOWS ALSO TO CHOSE BETWEEN THE LANGUAGES
*/

var messages = messages || {};


messages.eng = {

    "upload help message": `<b>Uploading Page</b><br>
                            Upload the required images:<br>
                                <ul>
                                    <li><em>images</em>: base images to display</li>
                                    <li><em>blue</em>: label that will be refered as blue</li>
                                    <li><em>green</em>: label that will be refered as gren</li>
                                </ul>
                            Once you have uploaded all the images, click on <em> Confirm Selection</em> to start the evaluation.`,
    "evaluation help message": `<b>Evaluation</b><br>
                                For each image, chose if it is better the green image, the blue one or None of them and click to 
                                the corresponding button.<br>
                                To navigate trought the images use the left and the right arrows on the keybords.
                                Once you have finished your evaluation, download the results clicking on the <em>Download</em> button.
                                
                                <em>Keybord Shortcuts</em>
                                <ul>
                                    <li>"q" : choose green as image preference</li>
                                    <li>"w" : choose None as image preference</li>
                                    <li>"e" : choose green as image preference</li>
                                    <li>"z" : hide/reveal the zoom lens</li>
                                    <li>"h" : hide/reveal the image labels</li>

                                </ul>`

};
