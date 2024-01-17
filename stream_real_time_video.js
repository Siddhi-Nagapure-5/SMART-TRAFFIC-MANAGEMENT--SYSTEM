//store the resulting model into the global scope of our page
var model=undefined;

const video=document.getElementById("webcam");
const liveView=document.getElementById("liveView");
const demosSection=document.getElementById("demos");
const enableWebcamButton=document.getElementById("webcamButton");
const history=document.getElementById("record");
//check if webcam access is supported
function getUserMediaSupported(){
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
}

//if webcam supported,add event listener to button for user wants to activate it to call enable webcam function which we will define here
if(getUserMediaSupported()){
    enableWebcamButton.addEventListener('click',enableCam);
}
else
{
    console.warn('getUserMedia() is not supported by your browser ');
}
//webcam supporting function is defined here
//enable the live webcam view and start classification

function enableCam(event)
{
    //only continue if coco-ssd has finished loading
    if(!model){return;}

    //hide the button once clicked

    event.target.classList.add('removed');

    //getUseMedia parameters to force video but not audio
    const constraints={
        video:true
    };

    //Activate the webcam stream
    navigator.mediaDevices.getUserMedia(constraints).then(function(stream){
        video.srcObject=stream;
        video.addEventListener('loadeddata',predictWebCam);
    });
}


//Before we can use COCO-SSD class we must wait for it to finish loading.
//Machine learning models can be large and take a moment to get everyting needed to run
//Note:- cocoSsd is an external object loaded from our streaming_real_timevideo.html
//script tag import so ignore any warning in glitch

//LOADING THE MODEL here first

cocoSsd.load().then(function(loadedModel){
    model=loadedModel;
    //show demo section now model is ready to use
    demosSection.classList.remove('invisible');
});

//PREDICT A WEBCAM VIDEO FRAME here

var children=[];
var str="";

function predictWebCam(){
    //Now let's start classifying frame in the stream.
    model.detect(video).then(function(predictions){
        
//remove previous bounding boxes/highlighting we did before in the frame

for(let i=0;i<children.length;i++)
{
    liveView.removeChild(children[i]);
}
children.splice(0);


        //Now lets loop through predictions and draw them to the live view if they have a high confidence score.
      for(let n=0;n<predictions.length;n++)
      {
        //If we are over 66% sure we are sure we classified it right,draw it!
        if(predictions[n].score>0.66)
        {
            const p=document.createElement('p');
            p.innerText=predictions[n].class+' - with '+ Math.round(parseFloat(predictions[n].score)*100)+'% confidence.';
            p.style='margin-left: '+predictions[n].bbox[0]+'px;margin-top: '+(predictions[n].bbox[1]-10)+'px; width: '+(predictions[n].bbox[2]-10)+'px; top:0;left:0;';
            
            str=predictions[n].class+' - with '+ Math.round(parseFloat(predictions[n].score)*100)+'% confidence.';
         //drawing bounding box here
          const highlighter=document.createElement('div');
          highlighter.setAttribute('class','highlighter');
          highlighter.style='left: '+predictions[n].bbox[0]+'px; top: '+predictions[n].bbox[1]+'px; width: '+
          predictions[n].bbox[2]+'px; height: '+predictions[n].bbox[3]+'px;';

          str=`${str} --> here detected object is ${predictions[n].class}`;
          
          if(predictions[n].class=="person")
          {
            str=str+"please travel slowly because this is the traffic lane and take your way properly while travelling";
          }
          else if(predictions[n].class=="vehicle")
          {
         str=str+" YOU MUST KEEP THE SPEED AS NEEDED DO NOT INCREASE IT IF GONE BELOW PRESCRIBED LEVEL YOU WILL BE PUNISHED FOR IT AS PERBELOW UIDELINES AND POLICIES.."
          }

          liveView.appendChild(highlighter);
          liveView.appendChild(p);
          children.push(highlighter);
          children.push(p);
          history.innerText=str;
       
        }
      }


//Call this function again to keep predicting when the browser is ready
//continue this animation loop
window.requestAnimationFrame(predictWebCam);






    });
}










