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
    var _slice = Array.prototype.slice;

    var formatiQ = function () {
        return format.apply(arguments[0], _slice.call(arguments, 1));
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
        var i = 0,
            keys = keys.split("."),
            n = keys.length;

        while (data && typeof data == "object" && i < n) {
            data = data[keys[i++]];
        }

        if (i < n) {
            return "";
        }

        return data;
    }

    formatiQ.configure = function (options) {
        if (options["extendStringPrototype"]) {
            String.prototype.format = format;
        }
    }

    exports.formatiQ = formatiQ;
}) (window);
