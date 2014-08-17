/**
 * formatiQ - library to work with strings
 * @author Alexander Leutsky
 * @license MIT
 */

/**
 * String.prototype.format
 * Using: "Hello {0}!".format("Alex")
 */
(function (exports) {
    var arraySlice = Array.prototype.slice;

    var isFunction = function (v) {
        return typeof v == "function";
    }

    function format () {
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

        return this.replace(/\{([^{}]*)\}/g, function (m, key) {
            var value;

            if (key == "") {
                value = data[next++];

                if (isFunction(value)) {
                    value = value();
                }
            } else {
                value = getValue(key, data);
            }

            if (value === undefined || value === null) {
                value = "";
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


    var formatiQ = function () {
        return format.apply(arguments[0], arraySlice.call(arguments, 1));
    }

    formatiQ.configure = function (options) {
        if (options["extendStringPrototype"]) {
            String.prototype.format = format;
        }
    }

    exports.formatiQ = formatiQ;
}) (window);
