/**
 * formatiQ - library to work with strings
 * @author Alexander Leutsky
 * @license MIT
 */

/**
 * String.prototype.format
 * Using: "Hello {0}!".format("Alex")
 */
(function (root) {
    var fn = {},
        stringFormat = /{([^{}:!]*)(?:|!([^{}:]*))(?:|:([^{}]*))}/g, // field_name, conversion, format_spec
        dateFormat   = /%([0]?)([a-z])/gi, // conversion, key
        formatSpec   = /^(?:(?:(.?)([<>=^]))|)([+= ]?)(#?)(0?)(\d*)(,?)(?:\.(\d*)|)([A-Za-z%]?)$/; // [[fill]align][sign][#][0][width][,][.precision][type]


    // Tools
    var arraySlice = Array.prototype.slice;

    var isFunction = function (v) {
        return typeof v == "function";
    }

    var isMoment = function (val) {
        return false;
    }

    function fillString (char, len) {
        var r = "";
        for (var i = 0; i < len; i++) {
            r += char;
        }
        return r;
    }


    var formatBySpec = function (spec, value) {
        /*
        0 -
        1 - fill
        2 - align
        3 - sign
        4 - #
        5 - 0
        6 - width
        7 - ,
        8 - precision
        9 - type
         */
        var pspec = formatSpec.exec(spec);

        console.log(pspec);

        if (!pspec[0]) {
            return value;
        }

        var result = "";

        var fill = pspec[1],
            align = pspec[2],
            width = pspec[6] * 1,
            precision = pspec[8],
            type = pspec[9],
            lcType;

        if (!type) {
            type = lcType = "s";
        } else {
            lcType = type.toLowerCase();
        }

        switch (lcType) {
            case "f":
                value = value.toFixed(precision === "" || precision === undefined ? 6 : precision);

                break;
        }

        if (width > value.length) {
            if (!align) {
                align = ">";
                fill  = " ";
            } else {
                if (!fill) {
                    fill = " ";
                }
            }

            switch (align) {
                case "<":
                    value = value + fillString(fill, width - value.length);
                    break;
                case ">":
                    value = fillString(fill, width - value.length) + value;
                    break;
                case "=":
                    break;
                case "^":
                    break;
            }
        }

        return value;
    }


    // Date format
    fn.formatDate = function (format) {
        var date = this;

        return format.replace(dateFormat, function (m, conv, key) {
            var value;

            switch (key) {
                case "Y":
                    value = date.getFullYear();
                    break;
                case "y":
                    value = (date.getFullYear() + "").slice(-2);
                    break;
                case "M":
                    value = date.getMonth() + 1;
                    break;
                case "D":
                    value = date.getDate();
                    break;
                case "H":
                    value = date.getHours();
                    break;
                case "h":
                    value = date.getHours() % 12;
                    break;
                case "m":
                    value = date.getMinutes();
                    break;
                case "s":
                    value = date.getSeconds();
                    break;
                default:
                    value = "";
            }

            if (conv === "0" && value < 10) {
                value = "0" + value;
            }

            return value;
        });
    }


    // Format strings
    function formatString () {
        var i, k, arg,
            next = 0,
            args = arguments,
            data = [];

        for (i = 0; i < args.length; i++) {
            arg = args[i];
            data.push(arg);

            if (typeof arg === "object" && !(arg instanceof Array)) {
                for (k in arg) {
                    data[k] = arg[k];
                }
            }
        }

        return this.replace(stringFormat, function (m, key, conv, spec) {
            var value;

            if (key == "") {
                value = data[next++];

                if (isFunction(value)) {
                    value = value();
                }
            } else {
                value = getValue(key, data);
            }

            /*
             if (conv) {

             }
             */

            if (value === undefined || value === null) {
                value = "";
            }

            if (spec) {
                if (value instanceof Date) {
                    value = fn.formatDate.call(value, spec);
                } else if (isMoment(value)) {
                    value = value.format(spec);
                } else {
                    value = formatBySpec(spec, value);
                }
            }

            return value;
        });
    }

    function getValue (keys, data) {
        var value,
            i = 0,
            keys = keys.split("."),
            n = keys.length;

        while (data && typeof data == "object" && i < n) {
            value = data[keys[i++]];
            data = isFunction(value) ? value.call(data) : value;
        }

        return (i < n) ? "" : data;
    }


    // Initialization
    var formatiQ = function () {
        return formatString.apply(arguments[0], arraySlice.call(arguments, 1));
    }

    formatiQ.configure = function (options) {
        if (options["extendStringPrototype"]) {
            String.prototype.format = formatString;
        }

        if (options["extendDatePrototype"]) {
            Date.prototype.format = fn.formatDate;
        }

        if (options["supportMomentJS"]) {
            isMoment = function (val) {
                return moment.isMoment(val);
            }
        }
    }


    if (typeof module !== 'undefined' && typeof exports !== 'undefined' && module.exports == exports) {
        exports = module.exports = formatiQ;
    } else {
        root.formatiQ = formatiQ;
    }
}) (this);
