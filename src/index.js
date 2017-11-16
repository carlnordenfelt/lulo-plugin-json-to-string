'use strict';

var pub = {};

pub.validate = function (event) {
    if (!event.ResourceProperties.JSON) {
        throw new Error('Missing required property JSON');
    }
};

pub.create = function (event, _context, callback) {
    setImmediate(function () {
        var data = {
            String: JSON.stringify(event.ResourceProperties.JSON)
        };
        callback(null, data);
    });
};

pub.delete = function (_event, _context, callback) {
    return setImmediate(callback);
};

pub.update = function (event, context, callback) {
    return pub.create(event, context, callback);
};

module.exports = pub;
