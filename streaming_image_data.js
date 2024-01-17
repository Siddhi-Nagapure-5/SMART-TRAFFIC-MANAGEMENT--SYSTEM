const uploadBtn=document.getElementById("btn1");
const image_input=document.querySelector("#my-file");
var uploaded_image="";
const image_place=document.getElementById("#myImage");
var a="";
image_input.addEventListener("change",function(){

// console.log(image_input.value);
const reader=new FileReader();
reader.addEventListener("load",()=>{
    uploaded_image=reader.result;
    
// image_place.setAttribute(src,result);

 document.getElementById("myImage").setAttribute("src",uploaded_image);
// image_place.setAttribute("src",this.readAsDataURL(this.files[0]));
    

});
reader.readAsDataURL(this.files[0]);
console.log(this.files[0]);
});


const img=document.getElementById("myImage");
var c=document.getElementById("meCanvas");
var ctx=c.getContext("2d");
 window.onload=function(){
    var c=document.getElementById("meCanvas");
    var ctx=c.getContext("2d");
    var img=document.getElementById("myImage");
    ctx.canvas.width=window.innerWidth;
    ctx.canvas.height=window.innerHeight;
    ctx.drawImage(img,50,50,500,420);
    // uploaded_image=document.getElementsByTagName("img").getAttribute("src").value;

 };


//detect button code

const detectBtn=document.querySelector("#btn2");

detectBtn.addEventListener("click",function(){
    const date=new Date();
    const history=document.querySelector(".container2");
    history.insertAdjacentText=date+" ";
    // document.getElementById("myImage").setAttribute("src",a);
    const img=document.getElementById("myImage");
    cocoSsd.load().then(model=>{
        model.detect(img).then(predictions=>{
            console.log("Predictions :- ",predictions);
            var c=document.getElementById("meCanvas");
            var ctx=c.getContext("2d");
            var img=document.getElementById("myImage");
            ctx.canvas.width=window.innerWidth;
            ctx.canvas.height=window.innerHeight;
            ctx.drawImage(img,50,50,500,420);
            predictions.forEach(function(p){
            
                ctx.beginPath();
                ctx.font="bold 30px Arial";
                ctx.strokeStyle="#000";
                ctx.rect(p.bbox[0],p.bbox[1],p.bbox[2],p.bbox[3]);
                ctx.strokeStyle="#FFFF00";
                ctx.stroke();
                ctx.fillStyle="#FFFF00";
                ctx.fillText=(p.class,p.bbox[0],p.bbox[1]);
                const p1=document.getElementById('para');
            p1.innerText=`OBJECT DETECTED IS " ${p.class} " at ${p.bbox[0]},${p.bbox[1]} point `;
            p1.style='margin-left: '+predictions[p].bbox[0]+'px;margin-top: '+(predictions[p].bbox[1]-10)+'px; width: '+(predictions[p].bbox[2]-10)+'px; top:0;left:0;';
   
                // ctx.closePath();
            });
        });
    });
});












