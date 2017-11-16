'use strict';

var expect = require('chai').expect;

describe('Index unit tests', function () {
    var subject = require('../../src/index');
    var event;
    beforeEach(function () {
        event = { ResourceProperties: { JSON: { 'Hello': 'World' } } };
    });

    describe('validate', function () {
        it('should succeed', function (done) {
            subject.validate(event);
            done();
        });
        it('should fail if JSON is not set', function (done) {
            delete event.ResourceProperties.JSON;
            function fn() {
                subject.validate(event);
            }
            expect(fn).to.throw(/Missing required property JSON/);
            done();
        });
    });

    describe('create', function () {
        it('should succeed', function (done) {
            subject.create(event, {}, function (error, response) {
                expect(error).to.equal(null);
                expect(response.String).to.equal(JSON.stringify(event.ResourceProperties.JSON));
                done();
            });
        });
    });

    describe('update', function () {
        it('should succeed', function (done) {
            subject.update(event, {}, function (error, response) {
                expect(error).to.equal(null);
                expect(response.String).to.equal(JSON.stringify(event.ResourceProperties.JSON));
                done();
            });
        });
    });

    describe('delete', function () {
        it('should succeed', function (done) {
            subject.delete(event, {}, function (error, response) {
                expect(error).to.equal(undefined);
                expect(response).to.equal(undefined);
                done();
            });
        });
    });
});
