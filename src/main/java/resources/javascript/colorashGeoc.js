var canvas;
var context;
var canvasWidth = resize(490);
var canvasHeight = resize(220);
var padding = resize(25);
var lineWidth = resize(8);
var colorPurple = "#cb3594";
var colorGreen = "#239b1f";
var colorYellow = "#ffcf33";
var colorBrown = "#986928";
var colorBlue = "#0910CB";
var colorRed = "#CB0B0F";
var colorOrange = "#CB5A00";
var colorTuqoise = "#09B7CB";
var outlineImage = new Image();
var crayonImage = new Image();
var markerImage = new Image();
var eraserImage = new Image();
var crayonBackgroundImage = new Image();
var markerBackgroundImage = new Image();
var eraserBackgroundImage = new Image();
var crayonTextureImage = new Image();
var clickX = new Array();
var clickY = new Array();
var clickColor = new Array();
var clickTool = new Array();
var clickSize = new Array();
var clickDrag = new Array();
var paint = false;
var curColor = colorPurple;
var curTool = "crayon";
var curSize = "normal";
var mediumStartX = resize(18);
var mediumStartY = resize(19); //
var mediumImageWidth = resize(93);
var mediumImageHeight = resize(46); //
var drawingAreaX = resize(111);
var drawingAreaY = resize(11);
var drawingAreaWidth = resize(267);
var drawingAreaHeight = resize(200);
var toolHotspotStartY = resize(23);
var toolHotspotHeight = resize(38);
var sizeHotspotStartY = resize(157);
var sizeHotspotHeight = resize(36);
var sizeHotspotWidthObject = new Object();
sizeHotspotWidthObject.huge = resize(39);
sizeHotspotWidthObject.large = resize(25);
sizeHotspotWidthObject.normal = resize(18);
sizeHotspotWidthObject.small = resize(16);
var totalLoadResources = 8;
var curLoadResNum = 0;

function initalize() {
    canvas;
    context;
     canvasWidth = resize(490);
     canvasHeight = resize(220);
     padding = resize(25);
     lineWidth = resize(8);
     colorPurple = "#cb3594";
     colorGreen = "#239b1f";
     colorYellow = "#ffcf33";
     colorBrown = "#986928";
     colorBlue = "#0910CB";
     colorRed = "#CB0B0F";
     colorOrange = "#CB5A00";
     colorTuqoise = "#09B7CB";
     outlineImage = new Image();
     crayonImage = new Image();
     markerImage = new Image();
     eraserImage = new Image();
     crayonBackgroundImage = new Image();
     markerBackgroundImage = new Image();
     eraserBackgroundImage = new Image();
     crayonTextureImage = new Image();
     clickX = new Array();
     clickY = new Array();
     clickColor = new Array();
     clickTool = new Array();
     clickSize = new Array();
     clickDrag = new Array();
     paint = false;
     curColor = colorPurple;
     curTool = "crayon";
     curSize = "normal";
     mediumStartX = resize(18);
     mediumStartY = resize(19); //
     mediumImageWidth = resize(93);
     mediumImageHeight = resize(46); //
     drawingAreaX = resize(111);
     drawingAreaY = resize(11);
     drawingAreaWidth = resize(267);
     drawingAreaHeight = resize(200);
     toolHotspotStartY = resize(23);
     toolHotspotHeight = resize(38);
     sizeHotspotStartY = resize(157);
     sizeHotspotHeight = resize(36);
     sizeHotspotWidthObject = new Object();
    sizeHotspotWidthObject.huge = resize(39);
    sizeHotspotWidthObject.large = resize(25);
    sizeHotspotWidthObject.normal = resize(18);
    sizeHotspotWidthObject.small = resize(16);
     totalLoadResources = 8;
     curLoadResNum = 0;
}
/**
 * Calls the redraw function after all neccessary resources are loaded.
 */
function resourceLoaded()
{
    if(++curLoadResNum >= totalLoadResources){
        redraw();
    }
}

function resize(a) {
    return a * 2;
}

function clearCanvasGrid(canvasID){
    canvas = document.getElementById(canvasID); //because we are looping //each location has its own canvas ID
    context = canvas.getContext('2d');
    //context.beginPath();

    // Store the current transformation matrix
    context.save();

    // Use the identity matrix while clearing the canvas
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Restore the transform
    context.restore(); //CLEARS THE SPECIFIC CANVAS COMPLETELY FOR NEW DRAWING
}

function changeBack(a) {
    outlineImage.src = a;
}
function downloadAll() {
    var canvas = document.getElementById("canvas");
// draw to canvas...
    canvas.toBlob(function(blob) {
        saveAs(blob, "pretty image.png");
    });
}

function deleteAll() {
    var canvass = document.getElementById("canvas");
    canvass.getContext.clearRect(0, 0, canvass.width, canvass.height);
}

function deleteOld(name) {
    document.getElementById('canvas').remove();
    context.clearRect(0, 0, canvas.width, canvas.height);
    initalize();
    prepareCanvas(name);
};

/**
 * Creates a canvas element, loads images, adds events, and draws the canvas for the first time.
 */
function prepareCanvas(name)
{
    // Create the canvas (Neccessary for IE because it doesn't know what a canvas element is)
    var canvasDiv = document.getElementById('canvasDiv');
    canvas = document.createElement('canvas');
    canvas.setAttribute('width', canvasWidth);
    canvas.setAttribute('height', canvasHeight);
    canvas.setAttribute('id', 'canvas');
    canvasDiv.appendChild(canvas);
    if(typeof G_vmlCanvasManager !== 'undefined') {
        canvas = G_vmlCanvasManager.initElement(canvas);
    }
    context = canvas.getContext("2d"); // Grab the 2d canvas context

    // Note: The above code is a workaround for IE 8 and lower. Otherwise we could have used:
    //     context = document.getElementById('canvas').getContext("2d");

    // Load images
    // -----------
    crayonImage.onload = function() { resourceLoaded();
    };
    crayonImage.src = "../images/crayon-outline.png";
    //context.drawImage(crayonImage, 0, 0, 100, 100);

    markerImage.onload = function() { resourceLoaded();
    };
    markerImage.src = "../images/marker-outline.png";

    eraserImage.onload = function() { resourceLoaded();
    };
    eraserImage.src = "../images/eraser-outline.png";

    crayonBackgroundImage.onload = function() { resourceLoaded();
    };
    crayonBackgroundImage.src = "../images/crayon-background.png";

    markerBackgroundImage.onload = function() { resourceLoaded();
    };
    markerBackgroundImage.src = "../images/marker-background.png";

    eraserBackgroundImage.onload = function() { resourceLoaded();
    };
    eraserBackgroundImage.src = "../images/eraser-background.png";

    crayonTextureImage.onload = function() { resourceLoaded();
    };
    crayonTextureImage.src = "../images/crayon-texture.png";

    outlineImage.onload = function() { resourceLoaded();
    };
    outlineImage.src = name;

   /* outlineImage.onload = function() { resourceLoaded();
    };
    outlineImage.src = "../images/contur3.png";
    outlineImage.onload = function() { resourceLoaded();
    };
    outlineImage.src = "../images/contur4.png";*/

    // Add mouse events
    // ----------------
    $('#canvas').mousedown(function(e)
    {
        // Mouse down location
        var mouseX = e.pageX - this.offsetLeft;
        var mouseY = e.pageY - this.offsetTop;

        if(mouseX < drawingAreaX) // Left of the drawing area
        {
            if(mouseX > mediumStartX)
            {
                if(mouseY > mediumStartY/2 && mouseY < (mediumStartY + mediumImageHeight)/2){
                    curColor = colorPurple;
                }else if(mouseY > mediumStartY/2 + mediumImageHeight/2 && mouseY < (mediumStartY + mediumImageHeight * 2)/2 + 15){
                    curColor = colorGreen;
                }else if(mouseY > mediumStartY/2 + (mediumImageHeight* 2)/2 && mouseY < (mediumStartY + mediumImageHeight * 3)/2 + 30){
                    curColor = colorYellow;
                }else if(mouseY > mediumStartY/2 + (mediumImageHeight * 3)/2 && mouseY < (mediumStartY+ mediumImageHeight * 4)/2 + 30){
                    curColor = colorBrown;
                }/////////////////////////////////////////////
                else if(mouseY > mediumStartY/2 + (mediumImageHeight * 4)/2 && mouseY < (mediumStartY+ mediumImageHeight * 5)/2  + 30){
                    curColor = colorBlue;
                }
                else if(mouseY > mediumStartY/2 + (mediumImageHeight * 5)/2 && mouseY < (mediumStartY+ mediumImageHeight * 6)/2  + 30){
                    curColor = colorRed;
                }
                else if(mouseY > mediumStartY/2 + (mediumImageHeight * 6)/2 && mouseY < (mediumStartY+ mediumImageHeight * 7)/2  + 30){
                    curColor = colorOrange;
                }
                else if(mouseY > mediumStartY/2 + (mediumImageHeight * 7)/2 && mouseY < (mediumStartY+ mediumImageHeight * 8)/2  + 30){
                    curColor = colorTuqoise;
                }

            }
        }
        else if(mouseX > drawingAreaX + drawingAreaWidth) // Right of the drawing area
        {
            if(mouseY > toolHotspotStartY)
            {
                if(mouseY > sizeHotspotStartY)
                {
                    var sizeHotspotStartX = drawingAreaX + drawingAreaWidth;
                    if(mouseY < sizeHotspotStartY + sizeHotspotHeight && mouseX > sizeHotspotStartX)
                    {
                        if(mouseX < sizeHotspotStartX + sizeHotspotWidthObject.huge){
                            curSize = "huge";
                        }else if(mouseX < sizeHotspotStartX + sizeHotspotWidthObject.large + sizeHotspotWidthObject.huge){
                            curSize = "large";
                        }else if(mouseX < sizeHotspotStartX + sizeHotspotWidthObject.normal + sizeHotspotWidthObject.large + sizeHotspotWidthObject.huge){
                            curSize = "normal";
                        }else if(mouseX < sizeHotspotStartX + sizeHotspotWidthObject.small + sizeHotspotWidthObject.normal + sizeHotspotWidthObject.large + sizeHotspotWidthObject.huge){
                            curSize = "small";
                        }
                    }
                }
                else
                {
                    if(mouseY < toolHotspotStartY + toolHotspotHeight){
                        curTool = "crayon";
                    }else if(mouseY < toolHotspotStartY + toolHotspotHeight * 2){
                        curTool = "marker";
                    }else if(mouseY < toolHotspotStartY + toolHotspotHeight * 3){
                        curTool = "eraser";
                    }
                }
            }
        }
        else if(mouseY > drawingAreaY && mouseY < drawingAreaY + drawingAreaHeight)
        {
            // Mouse click location on drawing area
        }
        paint = true;
        addClick(mouseX, mouseY, false);
        redraw();
    });
    $('#canvas').mousemove(function(e){
        if(paint===true){
            addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
            redraw();
        }
    });

    $('#canvas').mouseup(function(e){
        paint = false;
        redraw();
    });

    $('#canvas').mouseleave(function(e){
        paint = false;
    });
////////////////////////////////////////////////////////////////

}
function clearCanvas() {
    var ctx = canvas.getContext('2d');     // gets reference to canvas context
    ctx.beginPath();    // clear existing drawing paths
    ctx.save();         // store the current transformation matrix

    // Use the identity matrix while clearing the canvas
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.restore();        // restore the transform
}


/**
 * Adds a point to the drawing array.
 * @param x
 * @param y
 * @param dragging
 */
function addClick(x, y, dragging)
{
    clickX.push(x);
    clickY.push(y);
    clickTool.push(curTool);
    clickColor.push(curColor);
    clickSize.push(curSize);
    clickDrag.push(dragging);
}

/**
 * Clears the canvas.
 */
/**
 * Erase board
*/// function to clear the canvas ( http://coursesweb.net/ )
// cnv = the object with the canvas element


/**
 * Redraws the canvas.
 */
function redraw()
{
    // Make sure required resources are loaded before redrawing
    if(curLoadResNum < totalLoadResources){ return; }

    clearCanvas();

    var locX;
    var locY;
    if(curTool === "crayon")
    {
        // Draw the crayon tool background
        context.drawImage(crayonBackgroundImage, 0, 0, canvasWidth, canvasHeight);

        // Purple
        locX = (curColor === colorPurple) ? resize(18) : resize(52);
        locY = resize(14);
        context.beginPath();
        context.moveTo(locX + resize(58), locY + resize(20));
        context.lineTo(locX + resize(58), locY + resize(25));
        context.lineTo(locX + resize(29), locY + resize(25));
        context.lineTo(locX + resize(29), locY + resize(23));
        context.lineTo(locX + resize(11), locY + resize(17));
        context.lineTo(locX + resize(11), locY + resize(9));
        context.lineTo(locX + resize(29), locY + resize(3));
        context.lineTo(locX + resize(29), locY + resize(1));
        context.lineTo(locX + resize(58), locY + resize(1));
        context.closePath();
        context.fillStyle = colorPurple;
        context.fill();

        if(curColor === colorPurple){
            context.drawImage(crayonImage, locX, locY-20, mediumImageWidth, mediumImageHeight);
        }else{
            context.drawImage(crayonImage, 0, 0, resize(59), mediumImageHeight - 40, locX+20, locY-15, resize(59), mediumImageHeight+2);
        }

        // Green=
        locX = (curColor === colorGreen) ? resize(18) : resize(52);
        locY += resize(25);

        context.beginPath();
        context.moveTo(locX + resize(58), locY + resize(20));
        context.lineTo(locX + resize(58), locY + resize(25));
        context.lineTo(locX + resize(29), locY + resize(25));
        context.lineTo(locX + resize(29), locY + resize(23));
        context.lineTo(locX + resize(11), locY + resize(17));
        context.lineTo(locX + resize(11), locY + resize(9));
        context.lineTo(locX + resize(29), locY + resize(3));
        context.lineTo(locX + resize(29), locY + resize(1));
        context.lineTo(locX + resize(58), locY + resize(1));
        context.closePath();
        context.fillStyle = colorGreen;
        context.fill();

        if(curColor === colorGreen){
            context.drawImage(crayonImage, locX, locY-20, mediumImageWidth, mediumImageHeight);
        }else{
            context.drawImage(crayonImage, 0, 0, resize(59), mediumImageHeight - 40, locX+20, locY-15, resize(59), mediumImageHeight+2);
        }

        // Yellow
        locX = (curColor === colorYellow) ? resize(18) : resize(52);
        locY += resize(25);

        context.beginPath();
        context.moveTo(locX + resize(58), locY + resize(20));
        context.lineTo(locX + resize(58), locY + resize(25));
        context.lineTo(locX + resize(29), locY + resize(25));
        context.lineTo(locX + resize(29), locY + resize(23));
        context.lineTo(locX + resize(11), locY + resize(17));
        context.lineTo(locX + resize(11), locY + resize(9));
        context.lineTo(locX + resize(29), locY + resize(3));
        context.lineTo(locX + resize(29), locY + resize(1));
        context.lineTo(locX + resize(58), locY + resize(1));
        context.closePath();
        context.fillStyle = colorYellow;
        context.fill();

        if(curColor === colorYellow){
            context.drawImage(crayonImage, locX, locY-20, mediumImageWidth, mediumImageHeight);  ////////// locY trebuie mutat
        }else{
            context.drawImage(crayonImage, 0, 0, resize(59), mediumImageHeight - 40, locX+20, locY-15, resize(59), mediumImageHeight+2);
        }


        // Brown
        locX = (curColor === colorBrown) ? resize(18) : resize(52);
        locY += resize(25);

        context.beginPath();
        context.moveTo(locX + resize(58), locY + resize(20));
        context.lineTo(locX + resize(58), locY + resize(25));
        context.lineTo(locX + resize(29), locY + resize(25));
        context.lineTo(locX + resize(29), locY + resize(23));
        context.lineTo(locX + resize(11), locY + resize(17));
        context.lineTo(locX + resize(11), locY + resize(9));
        context.lineTo(locX + resize(29), locY + resize(3));
        context.lineTo(locX + resize(29), locY + resize(1));
        context.lineTo(locX + resize(58), locY + resize(1));
        context.closePath();
        context.fillStyle = colorBrown;
        context.fill();

        if(curColor === colorBrown){
            context.drawImage(crayonImage, locX, locY-20, mediumImageWidth, mediumImageHeight);
        }else{
            context.drawImage(crayonImage, 0, 0, resize(59), mediumImageHeight - 40, locX+20, locY-15, resize(59), mediumImageHeight+2);
        }

        // Blue
        locX = (curColor === colorBlue) ? resize(18) : resize(52);
        locY += resize(25);

        context.beginPath();
        context.moveTo(locX + resize(58), locY + resize(20));
        context.lineTo(locX + resize(58), locY + resize(25));
        context.lineTo(locX + resize(29), locY + resize(25));
        context.lineTo(locX + resize(29), locY + resize(23));
        context.lineTo(locX + resize(11), locY + resize(17));
        context.lineTo(locX + resize(11), locY + resize(9));
        context.lineTo(locX + resize(29), locY + resize(3));
        context.lineTo(locX + resize(29), locY + resize(1));
        context.lineTo(locX + resize(58), locY + resize(1));
        context.closePath();
        context.fillStyle = colorBlue;
        context.fill();

        if(curColor === colorBlue){
            context.drawImage(crayonImage, locX, locY-20, mediumImageWidth, mediumImageHeight);
        }else{
            context.drawImage(crayonImage, 0, 0, resize(59), mediumImageHeight - 40, locX+20, locY-15, resize(59), mediumImageHeight+2);
        }


        locX = (curColor === colorRed) ? resize(18) : resize(52);
        locY += resize(25);

        context.beginPath();
        context.moveTo(locX + resize(58), locY + resize(20));
        context.lineTo(locX + resize(58), locY + resize(25));
        context.lineTo(locX + resize(29), locY + resize(25));
        context.lineTo(locX + resize(29), locY + resize(23));
        context.lineTo(locX + resize(11), locY + resize(17));
        context.lineTo(locX + resize(11), locY + resize(9));
        context.lineTo(locX + resize(29), locY + resize(3));
        context.lineTo(locX + resize(29), locY + resize(1));
        context.lineTo(locX + resize(58), locY + resize(1));
        context.closePath();
        context.fillStyle = colorRed;
        context.fill();

        if(curColor === colorRed){
            context.drawImage(crayonImage, locX, locY-20, mediumImageWidth, mediumImageHeight);
        }else{
            context.drawImage(crayonImage, 0, 0, resize(59), mediumImageHeight - 40, locX+20, locY-15, resize(59), mediumImageHeight+2);
        }
        // Orange
        locX = (curColor === colorOrange) ? resize(18) : resize(52);
        locY += resize(25);

        context.beginPath();
        context.moveTo(locX + resize(58), locY + resize(20));
        context.lineTo(locX + resize(58), locY + resize(25));
        context.lineTo(locX + resize(29), locY + resize(25));
        context.lineTo(locX + resize(29), locY + resize(23));
        context.lineTo(locX + resize(11), locY + resize(17));
        context.lineTo(locX + resize(11), locY + resize(9));
        context.lineTo(locX + resize(29), locY + resize(3));
        context.lineTo(locX + resize(29), locY + resize(1));
        context.lineTo(locX + resize(58), locY + resize(1));
        context.closePath();
        context.fillStyle = colorOrange;
        context.fill();

        if(curColor === colorOrange){
            context.drawImage(crayonImage, locX, locY-20, mediumImageWidth, mediumImageHeight);
        }else{
            context.drawImage(crayonImage, 0, 0, resize(59), mediumImageHeight - 40, locX+20, locY-15, resize(59), mediumImageHeight+2);
        }
        ////Turqoise
        locX = (curColor === colorTuqoise) ? resize(18) : resize(52);
        locY += resize(25);

        context.beginPath();
        context.moveTo(locX + resize(58), locY + resize(20));
        context.lineTo(locX + resize(58), locY + resize(25));
        context.lineTo(locX + resize(29), locY + resize(25));
        context.lineTo(locX + resize(29), locY + resize(23));
        context.lineTo(locX + resize(11), locY + resize(17));
        context.lineTo(locX + resize(11), locY + resize(9));
        context.lineTo(locX + resize(29), locY + resize(3));
        context.lineTo(locX + resize(29), locY + resize(1));
        context.lineTo(locX + resize(58), locY + resize(1));
        context.closePath();
        context.fillStyle = colorTuqoise;
        context.fill();

        if(curColor === colorTuqoise){
            context.drawImage(crayonImage, locX, locY-20, mediumImageWidth, mediumImageHeight);
        }else{
            context.drawImage(crayonImage, 0, 0, resize(59), mediumImageHeight - 40, locX+20, locY-15, resize(59), mediumImageHeight+2);
        }
    }
    else if(curTool === "marker")
    {
        // Draw the marker tool background
        context.drawImage(markerBackgroundImage, 0, 0, canvasWidth, canvasHeight);

        // Purple
        // Purple
        locX = (curColor === colorPurple) ? resize(18) : resize(52);
        locY = resize(14);
        context.beginPath();
        context.moveTo(locX + resize(58), locY + resize(20));
        context.lineTo(locX + resize(58), locY + resize(25));
        context.lineTo(locX + resize(29), locY + resize(25));
        context.lineTo(locX + resize(29), locY + resize(23));
        context.lineTo(locX + resize(11), locY + resize(17));
        context.lineTo(locX + resize(11), locY + resize(9));
        context.lineTo(locX + resize(29), locY + resize(3));
        context.lineTo(locX + resize(29), locY + resize(1));
        context.lineTo(locX + resize(58), locY + resize(1));
        context.closePath();
        context.fillStyle = colorPurple;
        context.fill();

        if(curColor === colorPurple){
            context.drawImage(markerImage, locX, locY-20, mediumImageWidth, mediumImageHeight);
        }else{
            context.drawImage(markerImage, 0, 0, resize(59), mediumImageHeight - 40, locX+20, locY-15, resize(59), mediumImageHeight+2);
        }

        // Green
        locX = (curColor === colorGreen) ? resize(18) : resize(52);
        locY += resize(25);
        context.beginPath();
        context.moveTo(locX + resize(58), locY + resize(20));
        context.lineTo(locX + resize(58), locY + resize(25));
        context.lineTo(locX + resize(29), locY + resize(25));
        context.lineTo(locX + resize(29), locY + resize(23));
        context.lineTo(locX + resize(11), locY + resize(17));
        context.lineTo(locX + resize(11), locY + resize(9));
        context.lineTo(locX + resize(29), locY + resize(3));
        context.lineTo(locX + resize(29), locY + resize(1));
        context.lineTo(locX + resize(58), locY + resize(1));
        context.closePath();
        context.fillStyle = colorGreen;
        context.fill();

        if(curColor === colorGreen){
            context.drawImage(markerImage, locX, locY-20, mediumImageWidth, mediumImageHeight);
        }else{
            context.drawImage(markerImage, 0, 0, resize(59), mediumImageHeight - 40, locX+20, locY-15, resize(59), mediumImageHeight+2);
        }

        // Yellow
        locX = (curColor === colorYellow) ? resize(18) : resize(52);
        locY += resize(25);
        context.beginPath();
        context.moveTo(locX + resize(58), locY + resize(20));
        context.lineTo(locX + resize(58), locY + resize(25));
        context.lineTo(locX + resize(29), locY + resize(25));
        context.lineTo(locX + resize(29), locY + resize(23));
        context.lineTo(locX + resize(11), locY + resize(17));
        context.lineTo(locX + resize(11), locY + resize(9));
        context.lineTo(locX + resize(29), locY + resize(3));
        context.lineTo(locX + resize(29), locY + resize(1));
        context.lineTo(locX + resize(58), locY + resize(1));
        context.closePath();
        context.fillStyle = colorYellow;
        context.fill();

        if(curColor === colorYellow){
            context.drawImage(markerImage, locX, locY-20, mediumImageWidth, mediumImageHeight);
        }else{
            context.drawImage(markerImage, 0, 0, resize(59), mediumImageHeight - 40, locX+20, locY-15, resize(59), mediumImageHeight+2);
        }

        // Brown
        locX = (curColor === colorBrown) ? resize(18) : resize(52);
        locY += resize(25);
        context.beginPath();
        context.moveTo(locX + resize(58), locY + resize(20));
        context.lineTo(locX + resize(58), locY + resize(25));
        context.lineTo(locX + resize(29), locY + resize(25));
        context.lineTo(locX + resize(29), locY + resize(23));
        context.lineTo(locX + resize(11), locY + resize(17));
        context.lineTo(locX + resize(11), locY + resize(9));
        context.lineTo(locX + resize(29), locY + resize(3));
        context.lineTo(locX + resize(29), locY + resize(1));
        context.lineTo(locX + resize(58), locY + resize(1));
        context.closePath();
        context.fillStyle = colorBrown;
        context.fill();

        if(curColor === colorBrown){
            context.drawImage(markerImage, locX, locY-20, mediumImageWidth, mediumImageHeight);
        }else{
            context.drawImage(markerImage, 0, 0, resize(59), mediumImageHeight - 40, locX+20, locY-15, resize(59), mediumImageHeight+2);
        }
        locX = (curColor === colorBlue) ? resize(18) : resize(52);
        locY += resize(25);
        context.beginPath();
        context.moveTo(locX + resize(58), locY + resize(20));
        context.lineTo(locX + resize(58), locY + resize(25));
        context.lineTo(locX + resize(29), locY + resize(25));
        context.lineTo(locX + resize(29), locY + resize(23));
        context.lineTo(locX + resize(11), locY + resize(17));
        context.lineTo(locX + resize(11), locY + resize(9));
        context.lineTo(locX + resize(29), locY + resize(3));
        context.lineTo(locX + resize(29), locY + resize(1));
        context.lineTo(locX + resize(58), locY + resize(1));
        context.closePath();
        context.fillStyle = colorBlue;
        context.fill();

        if(curColor === colorBlue){
            context.drawImage(markerImage, locX, locY-20, mediumImageWidth, mediumImageHeight);
        }else{
            context.drawImage(markerImage, 0, 0, resize(59), mediumImageHeight - 40, locX+20, locY-15, resize(59), mediumImageHeight+2);
        }
        locX = (curColor === colorRed) ? resize(18) : resize(52);
        locY += resize(25);
        context.beginPath();
        context.moveTo(locX + resize(58), locY + resize(20));
        context.lineTo(locX + resize(58), locY + resize(25));
        context.lineTo(locX + resize(29), locY + resize(25));
        context.lineTo(locX + resize(29), locY + resize(23));
        context.lineTo(locX + resize(11), locY + resize(17));
        context.lineTo(locX + resize(11), locY + resize(9));
        context.lineTo(locX + resize(29), locY + resize(3));
        context.lineTo(locX + resize(29), locY + resize(1));
        context.lineTo(locX + resize(58), locY + resize(1));
        context.closePath();
        context.fillStyle = colorRed;
        context.fill();

        if(curColor === colorRed){
            context.drawImage(markerImage, locX, locY-20, mediumImageWidth, mediumImageHeight);
        }else{
            context.drawImage(markerImage, 0, 0, resize(59), mediumImageHeight - 40, locX+20, locY-15, resize(59), mediumImageHeight+2);
        }
        locX = (curColor === colorOrange) ? resize(18) : resize(52);
        locY += resize(25);
        context.beginPath();
        context.moveTo(locX + resize(58), locY + resize(20));
        context.lineTo(locX + resize(58), locY + resize(25));
        context.lineTo(locX + resize(29), locY + resize(25));
        context.lineTo(locX + resize(29), locY + resize(23));
        context.lineTo(locX + resize(11), locY + resize(17));
        context.lineTo(locX + resize(11), locY + resize(9));
        context.lineTo(locX + resize(29), locY + resize(3));
        context.lineTo(locX + resize(29), locY + resize(1));
        context.lineTo(locX + resize(58), locY + resize(1));
        context.closePath();
        context.fillStyle = colorOrange;
        context.fill();

        if(curColor === colorOrange){
            context.drawImage(markerImage, locX, locY-20, mediumImageWidth, mediumImageHeight);
        }else{
            context.drawImage(markerImage, 0, 0, resize(59), mediumImageHeight - 40, locX+20, locY-15, resize(59), mediumImageHeight+2);
        }
        locX = (curColor === colorTuqoise) ? resize(18) : resize(52);
        locY += resize(25);
        context.beginPath();
        context.moveTo(locX + resize(58), locY + resize(20));
        context.lineTo(locX + resize(58), locY + resize(25));
        context.lineTo(locX + resize(29), locY + resize(25));
        context.lineTo(locX + resize(29), locY + resize(23));
        context.lineTo(locX + resize(11), locY + resize(17));
        context.lineTo(locX + resize(11), locY + resize(9));
        context.lineTo(locX + resize(29), locY + resize(3));
        context.lineTo(locX + resize(29), locY + resize(1));
        context.lineTo(locX + resize(58), locY + resize(1));
        context.closePath();
        context.fillStyle = colorTuqoise;
        context.fill();

        if(curColor === colorTuqoise){
            context.drawImage(markerImage, locX, locY-20, mediumImageWidth, mediumImageHeight);
        }else{
            context.drawImage(markerImage, 0, 0, resize(59), mediumImageHeight - 40, locX+20, locY-15, resize(59), mediumImageHeight+2);
        }
    }
    else if(curTool === "eraser")
    {
        context.drawImage(eraserBackgroundImage, 0, 0, canvasWidth, canvasHeight);
        context.drawImage(eraserImage, resize(18), resize(19), mediumImageWidth, mediumImageHeight);
    }else{
        alert("Error: Current Tool is undefined");
    }

    if(curSize === "small"){
        locX = resize(467);
    }else if(curSize === "normal"){
        locX = resize(450);
    }else if(curSize === "large"){
        locX = resize(428);
    }else if(curSize === "huge"){
        locX = resize(399);
    }
    locY = resize(189);
    context.beginPath();
    context.rect(locX, locY, resize(2), resize(12));
    context.closePath();
    context.fillStyle = '#333333';
    context.fill();

    // Keep the drawing in the drawing area
    context.save();
    context.beginPath();
    context.rect(drawingAreaX, drawingAreaY, drawingAreaWidth, drawingAreaHeight);
    context.clip();

    var radius;
    var i = 0;
    for(; i < clickX.length; i++)
    {
        if(clickSize[i] === "small"){
            radius = 2;
        }else if(clickSize[i] === "normal"){
            radius = 5;
        }else if(clickSize[i] === "large"){
            radius = 10;
        }else if(clickSize[i] === "huge"){
            radius = 20;
        }else{
            alert("Error: Radius is zero for click " + i);
            radius = 0;
        }

        context.beginPath();
        if(clickDrag[i] && i){
            context.moveTo(clickX[i-1], clickY[i-1]);
        }else{
            context.moveTo(clickX[i], clickY[i]);
        }
        context.lineTo(clickX[i], clickY[i]);
        context.closePath();

        if(clickTool[i] === "eraser"){
            //context.globalCompositeOperation = "destination-out"; // To erase instead of draw over with white
            context.strokeStyle = 'white';
        }else{
            //context.globalCompositeOperation = "source-over";	// To erase instead of draw over with white
            context.strokeStyle = clickColor[i];
        }
        context.lineJoin = "round";
        context.lineWidth = radius;
        context.stroke();
    }
    //context.globalCompositeOperation = "source-over";// To erase instead of draw over with white
    context.restore();

    // Overlay a crayon texture (if the current tool is crayon)
    if(curTool === "crayon"){
        context.globalAlpha = 0.4; // No IE support
        context.drawImage(crayonTextureImage, 0, 0, canvasWidth, canvasHeight);
    }
    context.globalAlpha = 1; // No IE support

    // Draw the outline image
    context.drawImage(outlineImage, drawingAreaX, drawingAreaY, drawingAreaWidth, drawingAreaHeight);
}


/**/