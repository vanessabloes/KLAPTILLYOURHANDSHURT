/*
This sketch shows how to use the .getSources function of p5.AudioIn().
Calling getSources allows access to the available devices within a callback.
This function is not compatible IE, Safari, or Firefox. Firefox allows for
user input access but provides a selection dialogue on request
instead of allowing for enumeration of devices. For Chrome, an
HTTPS connection is required to access device names.

 */
var audioGrab;
var numSources = 0;
var fft = [];
var audioGrabArray = [];
var sourceNames = [];

function setup() {
  // createCanvas(512, 400);
  // textSize(32);
  // textAlign(LEFT, CENTER);
  //we will use a new p5AudioIn to enumerate the
  //audio devices. This won't connect to any output.
  audioGrab = new p5.AudioIn();
  //analyzer = new p5.Amplitude();
  //console.log(analyzer);
  audioGrab.getSources(function (data) {
    getSourcesCallback(data);
  });
}

function getSourcesCallback(sourceList) {
  numSources = sourceList.length;
  //creating an array of all the available sources
  for (var i = 0; i < numSources; i++) {
    audioGrabArray[i] = new p5.AudioIn();
    audioGrabArray[i].setSource(i);
    audioGrabArray[i].start();
    //console.log(audioGrabArray);

    //from the FFT example
    //frequenties --> naar soundwaves
    fft[i] = new p5.FFT();
    fft[i].setInput(audioGrabArray[i]);
    //console.log(sourceList[i].label);

    //see if the browser is allowing us
    //to access the name of the device
    //otherwise we will ID the device with its
    //input array position
    if (sourceList[i].label) {
      sourceNames[i] = "device name: " + sourceList[i].label;
    } else {
      sourceNames[i] = "input array position: " + i;
    }
  }
}

function draw() {
  // background(200);
  for (var i = 0; i < numSources; i++) {
    var yPos = ((i + 1) / numSources) * height;
    var spectrum = fft[i].analyze();
    let clapDetection = spectrum.slice(1023);

    // console.log(clapDetection);

    let test1 = document.querySelector(`.gif1`);
    let test2 = document.querySelector(`.gif2`);

    // test.style.margintop = `${clapDetection}rem`;
    // test.textContent = `niet klappen`;

    if (clapDetection >= 0.1) {
      console.log("Fuck yessss!");
      // test.textContent = `klappen`;
      test1.style.marginBottom = `${clapDetection / 2}rem`;
      test2.style.marginBottom = `${clapDetection / 2}rem`;
    }

    // if (clapDetection < 1) {
    // console.log("OOHNEEE");
    // test.style.marginTop = `0`;
    // }

    // stroke(0);
    // line(0, ((i + 1) / numSources) * height, width, yPos);
    // beginShape();
    // vertex(0, ((i + 1) / numSources) * height);

    // noStroke();
    // fill(0, 255, 255);
    // for (j = 0; j < spectrum.length; j++) {
    // vertex(j, map(spectrum[j], 0, 1023, yPos, 0));
    // }
    endShape();

    //without using HTTPS, Chrome cannot give us device names (such as
    //'mic' or 'soundflower'). We can use this visualization to determine
    //which input array position number is the one we want.
    //The first two are typically "default" and "mic"
    //(default usually is the mic)

    // fill(0);
    // text(sourceNames[i], 10, yPos - (0.5 * height) / numSources);
  }
}
