/*
    FILE CONTAINING THE MESSAGES TO DISPLAY: ALLOWS ALSO TO CHOSE BETWEEN THE LANGUAGES
*/

var messages = messages || {};


messages.eng = {

    "upload help message": `<b>Uploading Page</b><br>
                            Upload the required images:<br>
                                <ul>
                                    <li><em>images</em>: base images to display</li>
                                    <li><em>blue</em>: the label that will be referred to as blue</li>
                                    <li><em>green</em>: the label that will be referred to as green</li>
                                </ul>
                            Once you have uploaded all the images, click on <em> Confirm Selection</em> to start the evaluation.`,
    "evaluation help message": `<b>Evaluation</b><br>
                                Chose which segmentation is better: the green, the blue or None of them.
                                Click on the corresponding button to make your choice.<br>
                                To navigate through the images, use the left and right arrows on the keyboard.<br>
                                Once you have finished your evaluation, download the results by clicking on the <em>Download</em> button.<br>
                                <em>Keybord Shortcuts</em>
                                <ul>
                                    <li>"q" : choose green as image preference</li>
                                    <li>"w" : choose None as image preference</li>
                                    <li>"e" : choose green as image preference</li>
                                    <li>"z" : hide/reveal the zoom lens</li>
                                    <li>"h" : hide/reveal the image labels</li>
                                </ul>`
    };


messages.ita = {
    "upload help message": `<b>Pagina di Caricamento</b><br>
                            Carica le immagini da confrontare:<br>
                                <ul>
                                    <li><em>immagini</em>: immagini di base </li>
                                </ul>`,
    "evaluation help message": `<b>Valutazione</b><br>`
};
