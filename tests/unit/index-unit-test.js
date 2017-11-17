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
        it('should succeed with type cast', function (done) {
            event.ResourceProperties.TypeCast = true;
            event.ResourceProperties.JSON     = {
                int: '1',
                float: '2.2',
                truey: 'true',
                falsey: 'false',
                string: 'string1',
                array: [
                    '3',
                    '4.4',
                    'true',
                    'false',
                    'string2',
                    {
                        string: 'string3',
                        int: '8'
                    },
                    ['6']
                ],
                object: {
                    int: '7'
                }
            };
            subject.create(event, {}, function (error, response) {
                expect(error).to.equal(null);
                expect(response.String).to.equal(JSON.stringify(event.ResourceProperties.JSON));
                var json = JSON.parse(response.String);
                expect(json.int).to.equal(1);
                expect(json.float).to.equal(2.2);
                expect(json.truey).to.equal(true);
                expect(json.falsey).to.equal(false);
                expect(json.string).to.equal('string1');
                expect(json.array[0]).to.equal(3);
                expect(json.array[1]).to.equal(4.4);
                expect(json.array[2]).to.equal(true);
                expect(json.array[3]).to.equal(false);
                expect(json.array[4]).to.equal('string2');
                expect(json.array[5].string).to.equal('string3');
                expect(json.array[5].int).to.equal(8);
                expect(json.array[6][0]).to.equal(6);
                expect(json.object.int).to.equal(7);
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
