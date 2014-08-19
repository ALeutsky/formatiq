/**
 * formatiQ momentJS extension
 */

(function (window, formatiQ, moment) {
    if (!(formatiQ && moment)) {
        return;
    }

    formatiQ.fn.formatDate = function (format) {
        return moment(this).format(format);
    }

    formatiQ.configure({
        supportMomentJS: true
    });
}) (window, formatiQ, moment);