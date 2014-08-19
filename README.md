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

**Options:**

**extendStringPrototype: true|false** (default: false)

    "{}".format(1);
    > "1"

**extendDatePrototype: true|false** (default: false)

    var d = new Date();
    d.format("%Y-%0M-%0D");
    > "2014-08-01"

**supportMomentJS: true|false** (default: false)

    var d = moment();
    "{:YYYY-MM-DD}".format(d);
    > "2014-08-01"
    
You need to use this function when **formatiq.js** will be loaded.

### Examples:

Base:

    "{} {} {}".format(1, 2, 3)
    > "1 2 3"

    "{0} {name}".format("Hello", {name: "Lisa"})
    > "Hello Lisa"

    or

    "{} {1.name}".format("Hello", {name: "Lisa"})
    > "Hello Lisa"

    "Name: {name}; City: {address.city}".format({name: "Alex", address: {city: "Paris", country: "France"}})
    > "Name: Alex; City: Paris"

Functions and object methods:

    var func = function () {
        return document.title;
    }
    "{}".format(func);
    > "Home page"

    var person = {
        first_name: "Alice",
        last_name: "Black",
        getFullName: function () {
            return this.first_name + " " + this.last_name;
        }
    }
    "{person.getFullName}".format({person: person});
    > "Alice Black"

Dates:

