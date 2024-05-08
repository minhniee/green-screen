
var fgimage = null;
var bgimage = null;
var bgcanvas;
var fgcanvas;



function uploadFg() {
    fgcanvas = document.getElementById("fgcanvas");

    var fileinput = document.getElementById("fginput");
    fgimage = new SimpleImage(fileinput);

    fgimage.drawTo(fgcanvas);

}

function uploadBg() {
    bgcanvas = document.getElementById("bgcanvas");

    var fileinput = document.getElementById("bginput");
    bgimage = new SimpleImage(fileinput);

    bgimage.drawTo(bgcanvas);

}

function createComposite() {
    var output = new SimpleImage(fgimage.getWidth(), fgimage.getHeight())
    var greenThreshold = 240;
    for (var px of fgimage.values()) {
        var x = px.getX();
        var y = px.getY();
        if (px.getGreen() > greenThreshold) {
            var bgpixel = bgimage.getPixel(x, y);
            output.setPixel(x, y, bgpixel);
        } else {
            output.setPixel(x, y, px);
        }
    }

    return output;
}

// function createComposite() {
//     // this function creates a new image with the dimensions of the foreground image and returns the composite green screen image
//     var output = new SimpleImage(fgimage.getWidth(),fgimage.getHeight());
//     var greenThreshold = 240;
//     for (var pixel of fgimage.values()) {
//       var x = pixel.getX();
//       var y = pixel.getY();
//       if (pixel.getGreen() > greenThreshold) {
//         //pixel is green, use background
//         var bgPixel = bgimage.getPixel(x,y);
//         output.setPixel(x,y,bgPixel);
//       }
//       else {
//         //pixel is not green, use foreground
//         output.setPixel(x,y,pixel);
//       }
//     }
//     return output;
//   }


function doScreen() {
    if (fgimage == null || !fgimage.complete()) {
        alert("Fgground is not loaded")
    }
    if (bgimage == null || !bgimage.complete()) {
        alert("bgground is not loaded")
    }

    clearCanvas();
    var finalImage = createComposite();
    finalImage.drawTo(fgcanvas);

}
function clearCanvas() {
    doClear(bgcanvas);
    doClear(fgcanvas);
}

function doClear(canvas) {
    var context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
}

var x = null;
function myFunction() {
  var x = 2;
}
myFunction();
if (x == null) {
  alert("x is null");
}