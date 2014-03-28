/**
 * formatiQ - library to work with strings
 * @author Alexander Leutsky
 * @license MIT
 */

/**
 * String.prototype.format
 * Using: "Hello {0}!".format("Alex")
 * @return {String}
 */
String.prototype.format = function () {
    var i, k, arg,
        next = 0,
        args = arguments,
        data = [];

    for (i = 0; i < args.length; i++) {
        arg = args[i];
        data.push(arg);

        if (typeof arg === "object") {
            for (k in arg) {
                data[k] = arg[k];
            }
        }
    }

    return this.replace(/\{([^{}]*)\}/g, function (m, key, index, source) {
        if (key == "") {
            return data[next++];
        } else {
            return data[key];
        }
    });
}
