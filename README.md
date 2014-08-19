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


### Dates

**Built-in format**

**format_spec** ::= %\[0]\[part]
**part**        ::= Y | y | M | D | H | h | m | s
**0**           ::= zero-padding

**%Y**  - full year: 2014
**%y**  - short year: 14
**%M**  - months: 1..12
**%0M** - months: 01..12
**%D**  - dates: 1..31
**%0D** - dates: 01..31
**%H**  - hours: 0..23
**%0H** - hours: 00..23
**%h**  - hours: 0..12
**%0h** - hours: 00..12
**%m**  - minutes: 0..59
**%0m** - minutes: 00..59
**%s**  - seconds: 0..59
**%0s** - seconds: 00..59

**Moment JS**

Html:

    <script src="/vendor/moment/moment.js"></script>
    <script src="/vendor/formatiq/formatiq.js"></script>
    <script src="/vendor/formatiq/ext/date.moment.js"></script>

JavaScript:

    formatiQ.configure({
        extendStringPrototype: true,
        extendDatePrototype: true
    });

    var d = new Date();
    d.format("YYYY-MM-DD");
    > "2014-08-01"

    "{:YYYY-MM-DD}".format(d);
    > "2014-08-01"


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

    "{0:%Y-%0M-%0D}, {0:%0D.%0M.%y}".format(new Date());
    > "2014-08-01, 01.08.14"

    "{:%Y-%0M-%0DT%0H:%0m:%0s}".format(new Date());
    > "2014-08-01T08:01:12"

    "{:%H:%0m}".format(new Date());
    > "8:01"
