formatiQ
========

**formatiQ** is a easy tool to format data

#### formatiQ(str, data,..)

    formatiQ(
        "{0} {name}", 
        "Hello", {name: "Lisa"}
    )
    > "Hello Lisa"
    
But I prefer extend String.prototype
    
#### formatiQ.configure(options)

    formatiQ.configure({
        extendStringPrototype: true // default: false. true ~ String.prototype.format = function (data..) {...}
    });
    
You need to use this function when **formatiq.js** will be loaded.

#### Examples:

    "{} {} {}".format(1, 2, 3)
    > "1 2 3"

    "{} {} {}".format("ok".split(""))
    > "a s "

    "{0} {name}".format("Hello", {name: "Lisa"})
    > "Hello Lisa"

    or

    "{} {1.name}".format("Hello", {name: "Lisa"})
    > "Hello Lisa"

    "Name: {name}; City: {address.city}".format({name: "Alex", address: {city: "Paris", country: "France"}})
    > "Name: Alex; City: Paris"
