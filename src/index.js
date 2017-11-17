'use strict';

var pub = {};

pub.validate = function (event) {
    if (!event.ResourceProperties.JSON) {
        throw new Error('Missing required property JSON');
    }
};

pub.create = function (event, _context, callback) {
    setImmediate(function () {
        var json = event.ResourceProperties.JSON;
        if (event.ResourceProperties.TypeCast) {
            json = typeCastPrimitives(json);
        }

        var data = {
            String: JSON.stringify(json)
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

function typeCastPrimitives(data) {
    if (Array.isArray(data)) {
        for (var i = 0; i < data.length; i++) {
            data[i] = typeCastPrimitives(data[i]);
        }
    } else if (typeof data === 'object') {
        Object.getOwnPropertyNames(data).forEach(function (propertyName) {
            data[propertyName] = typeCastPrimitives(data[propertyName]);
        });
    } else if (/^[0-9]+$/.test(data)) {
        data = parseInt(data);
    } else if (/^[0-9]+.[0-9]+$/.test(data)) {
        data = parseFloat(data);
    } else if (data === 'true') {
        data = true;
    } else if (data === 'false') {
        data = false;
    }

    return data;
}
