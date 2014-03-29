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

        return this.replace(/\{([^{}]*)\}/g, function (m, key, index, source) {
            if (key == "") {
                return data[next++];
            } else {
                return getValue(key, data);
            }
        });
    }

    function getValue (key, data) {
        var props = key.split(".", 2);

        if (data && typeof data == "object") {
            data = data[props[0]];

            if (props.length == 2) {
                return getValue(props[1], data);
            } else {
                return (data == undefined) ? "" : data;
            }
        }

        return "";
    }

    formatiQ.configure = function (options) {
        if (options["extendStringPrototype"]) {
            String.prototype.format = format;
        }
    }

    exports.formatiQ = formatiQ;
}) (window);
