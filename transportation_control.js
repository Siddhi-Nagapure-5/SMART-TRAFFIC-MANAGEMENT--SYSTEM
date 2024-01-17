const laneCapacity={
1:"2400-2500 vehicles/hour",
2:"2800 vehicles/hour",
3:"3840 vehicles/hour",
4:"9000 PCU/hour"
};

const avgVehicleSpeeds={
"car":"32-48 km/h",
"bus":"54 km/h",
"bicycle":"20-23 km/h",
"bike":"40 km/h",
"truck":"20 km/h",
"ambulance":"80 km/h",
"person":"5.1 km/h",
};

function approach1()
{
    console.log("THIS IS THE APPROACH 1");
    const val1=document.getElementById("input1");
    const val2=document.getElementById("input2");
    const position=document.getElementById("output")
    if(val1.value=="1" && (val2.value>=0 && val2.value<=2500))
    {
       str=`The one lane road with ${val2.value} capacity is very safer and efficient to travel.You can definitely use one lane road for this number of vehicle transportation.<br>The maximum capacity of one lane road is approximately upto 2500 vehicles/hour.`
       position.innerText=str;
    }
    else if(val1.value=="2" && (val2.value>=0 && val2.value<=2800))
    {
        console.log(laneCapacity[2]);
        str=`The two lane road with ${val2.value} capacity is very safer and efficient to travel.You can definitely use two lane road for this number of vehicle transportation.<br>The maximum capacity of two lane road is approximately upto 2800 vehicles/hour.`
        position.innerText=str;
    }
    else if(val1.value=="3" && (val2.value>=0 && val2.value<=3840))
    {
       console.log(laneCapacity[3]);
       str=`The three lane road with ${val2.value} capacity is very safer and efficient to travel.You can definitely use three lane road for this number of vehicle transportation.<br>The maximum capacity of three lane road is approximately upto 3840 vehicles/hour.`
       position.innerText=str;
    }
    else if(val1.value=="4" && (val2.value>=0 && val2.value<=9000))
    {
       console.log(laneCapacity[4]);
       str=`The four lane road with ${val2.value} capacity is very safer and efficient to travel.You can definitely use four lane road for this number of vehicle transportation.<br>The maximum capacity of four lane road is approximately upto 9000 PCU/hour.`
       position.innerText=str;
    }
    else{
        // console.log(laneCapacity[4]);
        str=`The ${val1.value} lane road with ${val2.value} capacity is very safer and efficient to travel.You can definitely use ${val1.value} lane road for this number of vehicle transportation.<br>The maximum capacity of one lane road is approximately upto 9000 PCU/hour.`
        position.innerText=str;
    }



}

function approach2()
{
    console.log("THIS IS THE APPROACH 2");

    const val1=document.getElementById("input3");
    const val2=document.getElementById("input4");
    const val3=document.getElementById("input5");

    if(val2.value=="car" && (val3.value>=0 && val3.value<=48))
    {
        str=`On ${val1.value} road the ${val2.value} vehicle can safely travel with ${val3.value} speed km/hour along with 
        maintaining the efficient transportation system.With no issues of accidents with proper maintenance of transportation system.This can be the preferred speed.The maximum average speed the ${val2.value} can approximately have is ${avgVehicleSpeeds[0]}.`
        position.innerText=str;
    }
    else
    {
      str=`Actually according to the transportation system based on reports for the average speeds the vehicles can have, the ${val2.value} must have its speed approximately upto ${avgVehicleSpeeds[0]}. So that transportation system can be efficiently maintained without any excceeding delay`
    }
   
    if(val2.value=="bus" && (val3.value>=0 && val3.value<=48))
    {
        str=`On ${val1.value} road the ${val2.value} vehicle can safely travel with ${val3.value} speed km/hour along with 
        maintaining the efficient transportation system.With no issues of accidents with proper maintenance of transportation system.This can be the preferred speed.The maximum average speed the ${val2.value} can approximately have is ${avgVehicleSpeeds[1]}.`
        position.innerText=str;
    }
    else
    {
      str=`Actually according to the transportation system based on reports for the average speeds the vehicles can have, the ${val2.value} must have its speed approximately upto ${avgVehicleSpeeds[1]}. So that transportation system can be efficiently maintained without any excceeding delay`
    }

    if(val2.value=="bicycle" && (val3.value>=0 && val3.value<=48))
    {
        str=`On ${val1.value} road the ${val2.value} vehicle can safely travel with ${val3.value} speed km/hour along with 
        maintaining the efficient transportation system.With no issues of accidents with proper maintenance of transportation system.This can be the preferred speed.The maximum average speed the ${val2.value} can approximately have is ${avgVehicleSpeeds[2]}.`
        position.innerText=str;
    }
    else
    {
      str=`Actually according to the transportation system based on reports for the average speeds the vehicles can have, the ${val2.value} must have its speed approximately upto ${avgVehicleSpeeds[2]}. So that transportation system can be efficiently maintained without any excceeding delay`
    }

    if(val2.value=="bike" && (val3.value>=0 && val3.value<=48))
    {
        str=`On ${val1.value} road the ${val2.value} vehicle can safely travel with ${val3.value} speed km/hour along with 
        maintaining the efficient transportation system.With no issues of accidents with proper maintenance of transportation system.This can be the preferred speed.The maximum average speed the ${val2.value} can approximately have is ${avgVehicleSpeeds[3]}.`
        position.innerText=str;
    }
    else
    {
      str=`Actually according to the transportation system based on reports for the average speeds the vehicles can have, the ${val2.value} must have its speed approximately upto ${avgVehicleSpeeds[3]}. So that transportation system can be efficiently maintained without any excceeding delay`
    }
    if(val2.value=="truck" && (val3.value>=0 && val3.value<=48))
    {
        str=`On ${val1.value} road the ${val2.value} vehicle can safely travel with ${val3.value} speed km/hour along with 
        maintaining the efficient transportation system.With no issues of accidents with proper maintenance of transportation system.This can be the preferred speed.The maximum average speed the ${val2.value} can approximately have is ${avgVehicleSpeeds[4]}.`
        position.innerText=str;
    }
    else
    {
      str=`Actually according to the transportation system based on reports for the average speeds the vehicles can have, the ${val2.value} must have its speed approximately upto ${avgVehicleSpeeds[4]}. So that transportation system can be efficiently maintained without any excceeding delay`
    }
    if(val2.value=="ambulance" && (val3.value>=0 && val3.value<=48))
    {
        str=`On ${val1.value} road the ${val2.value} vehicle can safely travel with ${val3.value} speed km/hour along with 
        maintaining the efficient transportation system.With no issues of accidents with proper maintenance of transportation system.This can be the preferred speed.The maximum average speed the ${val2.value} can approximately have is ${avgVehicleSpeeds[5]}.`
        position.innerText=str;
    }
    else
    {
      str=`Actually according to the transportation system based on reports for the average speeds the vehicles can have, the ${val2.value} must have its speed approximately upto ${avgVehicleSpeeds[5]}. So that transportation system can be efficiently maintained without any excceeding delay`
    }
    if(val2.value=="person" && (val3.value>=0 && val3.value<=48))
    {
        str=`On ${val1.value} road the ${val2.value}  can safely travel with ${val3.value} speed km/hour along with 
        maintaining the efficient transportation system.With no issues of accidents with proper maintenance of transportation system.This can be the preferred speed.The maximum average speed the ${val2.value} can approximately have is ${avgVehicleSpeeds[6]}.`
        position.innerText=str;
    }
    else
    {
      str=`Actually according to the transportation system based on reports for the average speeds the person can have its speed approximately upto ${avgVehicleSpeeds[6]}. So that transportation system can be efficiently maintained without any excceeding delay.`
    }


}








