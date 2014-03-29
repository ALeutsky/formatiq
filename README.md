formatiQ
========

formatiQ is a easy tool to format data


Examples:

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