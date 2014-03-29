/**
 * formatiQ vs str.format
 */

function benchmark () {
    var startTime, i,
        n = 1000000,
        inputStr = "Test {}; Name: {name}, Age {age}, City: {address.city}; {2.1}",
        data1 = [inputStr, "formatiQ", {name: "Alex", age: 12, address: {city: "Moscow", street: "Lenina st"}}, [1, [12, 44]]],
        data2 = ["formatiQ", {name: "Alex", age: 12, address: {city: "Moscow", street: "Lenina st"}}, [1, [12, 44]]];


    function getTime () {
        return (new Date()).getTime();
    }

    startTime = getTime();
    for (i = 0; i < n; i++) {
        formatiQ.apply(this, data1);
    }
    console.log("formatiQ:", Math.floor(n * 1000 / (getTime() - startTime)), "operations per second");


    startTime = getTime();
    for (i = 0; i < n; i++) {
        inputStr.format.apply(inputStr, data2);
    }
    console.log("String.prototype.format:", Math.floor(n * 1000 / (getTime() - startTime)), "operations per second");
}