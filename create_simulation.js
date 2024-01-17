console.log("welcome to traffic simulation creation")
const val1=document.getElementById("input1");
const val2=document.getElementById("input2");
const position=document.getElementById("output");

function create()
{
    console.log("entered the function");
    if(val1.value=="car" && (val2.value>=0 && val2.value<=10))
    {
        position.style.visibility="visible";
        position.style.animation="anim 2s linear";
        position.setAttribute("src","simulation1.mp4"); 
    }
   else if(val1.value=="car" && (val2.value>=11 && val2.value<=20))
   {
    position.style.visibility="visible";
    position.style.animation="anim 2s linear";
    position.setAttribute("src","simulation2.mp4"); 
   }
   else if(val1.value=="car" && (val2.value>=21 && val2.value<=30))
   {
    position.style.visibility="visible";
    position.style.animation="anim 2s linear";
    position.setAttribute("src","simulation1.mp4"); 
   }
   else if(val1.value=="car" && val2.value>=31)
   {
    position.style.visibility="visible";
    position.style.animation="anim 2s linear";
    position.setAttribute("src","simulation2.mp4"); 
   }
   else if(val1.value=="bus" && (val2.value>=0 && val2.value<=30))
   {
    position.style.visibility="visible";
    position.style.animation="anim 2s linear";
    position.setAttribute("src","simulation2.mp4"); 
   }
   else if(val1.value=="bus" && val2.value>=31)
   {
    position.style.visibility="visible";
    position.style.animation="anim 2s linear";
    position.setAttribute("src","simulation1.mp4"); 
   }
   else if(val1.value=="truck" && (val2.value>=0 && val2.value<=30))
   {
    position.style.visibility="visible";
    position.style.animation="anim 2s linear";
    position.setAttribute("src","simulation2.mp4"); 
   }
   else if(val1.value=="truck" && val2.value>=31)
   {
    position.style.visibility="visible";
    position.style.animation="anim 2s linear";
    position.setAttribute("src","simulation1.mp4"); 
   }
   else if(val1.value=="bike" && (val2.value>=0 && val2.value<=30))
   {
    position.style.visibility="visible";
    position.style.animation="anim 2s linear";
    position.setAttribute("src","simulation1.mp4"); 
   }
   else if(val1.value=="bike" && val2.value>=31)
   {
    position.style.visibility="visible";
    position.style.animation="anim 2s linear";
    position.setAttribute("src","simulation1.mp4"); 
   }
   else if(val1.value=="ambulance" && (val2.value>=0 && val2.value<=30))
   {
    position.style.visibility="visible";
    position.style.animation="anim 2s linear";
    position.setAttribute("src","simulation2.mp4"); 
   }
   else if(val1.value=="ambulance" && val2.value>=0)
   {
    position.style.visibility="visible";
    position.style.animation="anim 2s linear";
    position.setAttribute("src","simulation1.mp4"); 
   }
   else{
    position.style.visibility="visible";
    position.style.animation="anim 2s linear";
    position.setAttribute("src","simulation2.mp4");
    console.log("hello");
   }
}







