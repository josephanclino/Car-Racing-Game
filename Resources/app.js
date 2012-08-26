//Note: You will be required to test this app on your device, 
//as accelerometer effect cannot be generated on simulator


//create window
var win = Titanium.UI.createWindow({ 
    title:'Car Game',
    backgroundColor:'#fff'
});



var lbl = Ti.UI.createLabel({
	text: 'Car X = ',
	top: 20,
	left: 50,
	color: '#fff'
});


//create a road
var road = Ti.UI.createView({
	backgroundColor:'#000',
	width : Titanium.Platform.displayCaps.platformWidth - 40,
    height : Titanium.Platform.displayCaps.platformHeight,
    top: 0,
    left: 20
});
win.add(road);

//road.add(lbl);

//create a car, that we would manipulate with accelerometer left to right
var car = Ti.UI.createView({
    backgroundImage : "/images/car.png",
    //borderRadius : 30,
    width : 96,
    height : 160,
    left: Titanium.Platform.displayCaps.platformWidth/2, //place car sprite at the mid of screen
    top: Titanium.Platform.displayCaps.platformHeight/2
});
 
//add car to window
road.add(car);
 
//open window
win.open();
 
//get last measure time
var lastTime = new Date().getTime();
 
//get time offset
var offset = 1;
 
//create filter (value between 0.5 and 1, where 1 is no filtering)
var filter = 0.1;
 
//last values
var last_x = 0;
var last_y = 0;

//speed for left to right tilt
var SPEED = 20;

 
//get accelerometer data
Titanium.Accelerometer.addEventListener('update',function(e)
{
    //get current time
    var now = new Date().getTime();
     
    //check if time offset is passed
    if(lastTime + offset < now)
    {
        //use last value, apply filter and store new value
        last_x = e.x  + last_x * (1 - filter);
        last_y = e.y  + last_y * (1 - filter);
 		
 		
        //move car accordingly (20 times as accelerometer)
        //we have to restrict the car movement left to right based on the tilt
        car.left += (last_x*SPEED); 
        //car.top -= (last_y*SPEED);
        
        //lbl.text = "Car X = "+ car.left;
        
        //restrict car from moving out of road
        if(car.left <= 0){
        	car.left = 0;
        } 
        if(car.left >= (road.width - car.width)){
        	car.left = (road.width - car.width);
        } 
        
        //show crash message if car is out of road
        //to-do
         
        //store last update time
        lastTime = now;
    }
});
 
//disable orientation switching
if (Ti.Platform.osname == 'android'){
    Ti.Gesture.addEventListener('orientationchange', function(e) {
        var curAct = Ti.Android.currentActivity;
        curAct.setRequestedOrientation(Ti.Android.SCREEN_ORIENTATION_PORTRAIT);
    });
}else{
	win.orientationModes = [
    	Titanium.UI.PORTRAIT
	];
}
