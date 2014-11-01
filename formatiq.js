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
        dateFormat   = /%([0]?)([a-z])/gi; // conversion, key


    // Tools
    var arraySlice = Array.prototype.slice;

    var isFunction = function (v) {
        return typeof v == "function";
    }

    var isMoment = function (val) {
        return false;
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
