sqlite3 graceide.db "

delete from clickData;

delete from files;

delete from filestates; 
"

sqlite3 graceide.db "

insert into files VALUES(1236549, 'calc.grace');

/* State 1*/

insert into filestates VALUES(3204211, 1236549, 1435621552.486, 'method pi {3.141592634} //simple method 

// Convert from miles to kilometers
method milesToKilometers(miles : Number) -> Number {
// YOUR CODE HERE
}

// Calculate area of triangle
method triangleArea(base : Number, height: Number) -> Number {
// YOUR CODE HERE
}

// Convert from grams to ounces
method gramsToOunces(grams : Number) -> Number {
// YOUR CODE HERE
}

// Compute surface of a sphere
method sphereArea(radius : Number) -> Number {
// YOUR CODE HERE
}

// Convert from kelvin to fahrenheit
method kelvinToFahrenheit(kelvin : Number) -> Number {
// YOUR CODE HERE
}

// Compute cost of item
method costOfItemInDollars(quantity : Number, priceInCents: Number) -> Number {
// YOUR CODE HERE
}

milesToKilometers(124)          // Should be 199.516
triangleArea(20,30)             // Should be 300
gramsToOunces(15)               // Should be 0.52911 ~ 0.529109
sphereArea(21)                  // Should be 5541.77 ~ 5541.769406
kelvinToFahrenheit(30)          // Should be -405.67
costOfItemInDollars(3,1299)     // Should be 389700
 ');

/* State 2*/

insert into filestates VALUES(3204212, 1236549, 1435621752.496, 'method pi {3.141592634} //simple method 

// Convert from miles to kilometers
method milesToKilometers(miles : Number) -> Number {
    var kilometers := miles * 1.609
    print ''{kilometers} kilometers''
}

// Calculate area of triangle
method triangleArea(base : Number, height: Number) -> Number {
// YOUR CODE HERE
}

// Convert from grams to ounces
method gramsToOunces(grams : Number) -> Number {
// YOUR CODE HERE
}

// Compute surface of a sphere
method sphereArea(radius : Number) -> Number {
// YOUR CODE HERE
}

// Convert from kelvin to fahrenheit
method kelvinToFahrenheit(kelvin : Number) -> Number {
// YOUR CODE HERE
}

// Compute cost of item
method costOfItemInDollars(quantity : Number, priceInCents: Number) -> Number {
// YOUR CODE HERE
}

milesToKilometers(124)          // Should be 199.516
triangleArea(20,30)             // Should be 300
gramsToOunces(15)               // Should be 0.52911 ~ 0.529109
sphereArea(21)                  // Should be 5541.77 ~ 5541.769406
kelvinToFahrenheit(30)          // Should be -405.67
costOfItemInDollars(3,1299)     // Should be 389700
 ');

/* State 3*/

insert into filestates VALUES(3204213, 1236549, 1435621782.496, 'method pi {3.141592634} //simple method 

// Convert from miles to kilometers
method milesToKilometers(miles : Number) -> Number {
    var kilometers := miles * 1.609
    print ''{kilometers} kilometers''
}

// Calculate area of triangle
method triangleArea(base : Number, height: Number) -> Number {
    var area := (base*height)/2
    print ''Area is {area}''
}

// Convert from grams to ounces
method gramsToOunces(grams : Number) -> Number {
// YOUR CODE HERE
}

// Compute surface of a sphere
method sphereArea(radius : Number) -> Number {
// YOUR CODE HERE
}

// Convert from kelvin to fahrenheit
method kelvinToFahrenheit(kelvin : Number) -> Number {
// YOUR CODE HERE
}

// Compute cost of item
method costOfItemInDollars(quantity : Number, priceInCents: Number) -> Number {
// YOUR CODE HERE
}

milesToKilometers(124)          // Should be 199.516
triangleArea(20,30)             // Should be 300
gramsToOunces(15)               // Should be 0.52911 ~ 0.529109
sphereArea(21)                  // Should be 5541.77 ~ 5541.769406
kelvinToFahrenheit(30)          // Should be -405.67
costOfItemInDollars(3,1299)     // Should be 389700
 ');

/* State 4*/

insert into filestates VALUES(3204214, 1236549, 1435621792.496, 'method pi {3.141592634} //simple method 

// Convert from miles to kilometers
method milesToKilometers(miles : Number) -> Number {
    var kilometers := miles * 1.609
    print ''{kilometers} kilometers''
}

// Calculate area of triangle
method triangleArea(base : Number, height: Number) -> Number {
    var area := (base*height)/2
    print ''Area is {area}''
}

// Convert from grams to ounces
method gramsToOunces(grams : Number) -> Number {
    var ounces := grams * 0.035274
    print ''{ounces} ounces''
}

// Compute surface of a sphere
method sphereArea(radius : Number) -> Number {
// YOUR CODE HERE
}

// Convert from kelvin to fahrenheit
method kelvinToFahrenheit(kelvin : Number) -> Number {
// YOUR CODE HERE
}

// Compute cost of item
method costOfItemInDollars(quantity : Number, priceInCents: Number) -> Number {
// YOUR CODE HERE
}

milesToKilometers(124)          // Should be 199.516
triangleArea(20,30)             // Should be 300
gramsToOunces(15)               // Should be 0.52911 ~ 0.529109
sphereArea(21)                  // Should be 5541.77 ~ 5541.769406
kelvinToFahrenheit(30)          // Should be -405.67
costOfItemInDollars(3,1299)     // Should be 389700
 ');

/* State 5*/

insert into filestates VALUES(3204215, 1236549, 1435622052.496, 'method pi {3.141592634} //simple method 

// Convert from miles to kilometers
method milesToKilometers(miles : Number) -> Number {
    var kilometers := miles * 1.609
    print ''{kilometers} kilometers''
}

// Calculate area of triangle
method triangleArea(base : Number, height: Number) -> Number {
    var area := (base*height)/2
    print ''Area is {area}''
}

// Convert from grams to ounces
method gramsToOunces(grams : Number) -> Number {
    var ounces := grams * 0.035274
    print ''{ounces} ounces''
}

// Compute surface of a sphere
method sphereArea(radius : Number) -> Number {
    var area := 4 * (radius ^ 2) * pi
    print ''Area is {area}''
}

// Convert from kelvin to fahrenheit
method kelvinToFahrenheit(kelvin : Number) -> Number {
// YOUR CODE HERE
}

// Compute cost of item
method costOfItemInDollars(quantity : Number, priceInCents: Number) -> Number {
// YOUR CODE HERE
}

milesToKilometers(124)          // Should be 199.516
triangleArea(20,30)             // Should be 300
gramsToOunces(15)               // Should be 0.52911 ~ 0.529109
sphereArea(21)                  // Should be 5541.77 ~ 5541.769406
kelvinToFahrenheit(30)          // Should be -405.67
costOfItemInDollars(3,1299)     // Should be 389700
 ');

/* State 6*/

insert into filestates VALUES(3204216, 1236549, 1435622082.496, 'method pi {3.141592634} //simple method 

// Convert from miles to kilometers
method milesToKilometers(miles : Number) -> Number {
    var kilometers := miles * 1.609
    print ''{kilometers} kilometers''
}

// Calculate area of triangle
method triangleArea(base : Number, height: Number) -> Number {
    var area := (base*height)/2
    print ''Area is {area}''
}

// Convert from grams to ounces
method gramsToOunces(grams : Number) -> Number {
    var ounces := grams * 0.035274
    print ''{ounces} ounces''
}

// Compute surface of a sphere
method sphereArea(radius : Number) -> Number {
    var area := 4 * (radius ^ 2) * pi
    print ''Area is {area}''
}

// Convert from kelvin to fahrenheit
method kelvinToFahrenheit(kelvin : Number) -> Number {
// YOUR CODE HERE
}

// Compute cost of item
method costOfItemInDollars(quantity : Number, priceInCents: Number) -> Number {
// YOUR CODE HERE
}

milesToKilometers(124)          // Should be 199.516
triangleArea(20,30)             // Should be 300
gramsToOunces(15)               // Should be 0.52911 ~ 0.529109
sphereArea(21)                  // Should be 5541.77 ~ 5541.769406
kelvinToFahrenheit(30)          // Should be -405.67
costOfItemInDollars(3,1299)     // Should be 389700
 ');

/* State 7*/

insert into filestates VALUES(3204217, 1236549, 1435622092.496, 'method pi {3.141592634} //simple method 

// Convert from miles to kilometers
method milesToKilometers(miles : Number) -> Number {
    var kilometers := miles * 1.609
    print ''{kilometers} kilometers''
}

// Calculate area of triangle
method triangleArea(base : Number, height: Number) -> Number {
    var area := (base*height)/2
    print ''Area is {area}''
}

// Convert from grams to ounces
method gramsToOunces(grams : Number) -> Number {
    var ounces := grams * 0.035274
    print ''{ounces} ounces''
}

// Compute surface of a sphere
method sphereArea(radius : Number) -> Number {
    var area := 4 * (radius ^ 2) * pi
    print ''Area is {area}''
}

// Convert from kelvin to fahrenheit
method kelvinToFahrenheit(kelvin : Number) -> Number {
    var fahrenheit := ((kelvin * 9) / 5) - 459.67
    print ''{fahrenheit} fahrenheit''
}

// Compute cost of item
method costOfItemInDollars(quantity : Number, priceInCents: Number) -> Number {
// YOUR CODE HERE
}

milesToKilometers(124)          // Should be 199.516
triangleArea(20,30)             // Should be 300
gramsToOunces(15)               // Should be 0.52911 ~ 0.529109
sphereArea(21)                  // Should be 5541.77 ~ 5541.769406
kelvinToFahrenheit(30)          // Should be -405.67
costOfItemInDollars(3,1299)     // Should be 389700
 ');

/* State Final*/

insert into filestates VALUES(3204218, 1236549, 1435622152.496, 'method pi {3.141592634} //simple method 

// Convert from miles to kilometers
method milesToKilometers(miles : Number) -> Number {
    var kilometers := miles * 1.609
    print ''{kilometers} kilometers''
}

// Calculate area of triangle
method triangleArea(base : Number, height: Number) -> Number {
    var area := (base*height)/2
    print ''Area is {area}''
}

// Convert from grams to ounces
method gramsToOunces(grams : Number) -> Number {
    var ounces := grams * 0.035274
    print ''{ounces} ounces''
}

// Compute surface of a sphere
method sphereArea(radius : Number) -> Number {
    var area := 4 * (radius ^ 2) * pi
    print ''Area is {area}''
}

// Convert from kelvin to fahrenheit
method kelvinToFahrenheit(kelvin : Number) -> Number {
    var fahrenheit := ((kelvin * 9) / 5) - 459.67
    print ''{fahrenheit} fahrenheit''
}

// Compute cost of item
method costOfItemInDollars(quantity : Number, priceInCents: Number) -> Number {
    var cost := quantity * priceInCents * 100
    print ""$ {cost}""
}

milesToKilometers(124)          // Should be 199.516
triangleArea(20,30)             // Should be 300
gramsToOunces(15)               // Should be 0.52911 ~ 0.529109
sphereArea(21)                  // Should be 5541.77 ~ 5541.769406
kelvinToFahrenheit(30)          // Should be -405.67
costOfItemInDollars(3,1299)     // Should be 389700
 ');

"