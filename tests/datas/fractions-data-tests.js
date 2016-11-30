/* globals require describe it beforeEach afterEach*/

const chai = require("chai");
const sinonModule = require("sinon");

let expect = chai.expect;

describe("Test fractions data", () => {
    let sinon;
    beforeEach(() => {
        sinon = sinonModule.sandbox.create();
    });

    class Fraction {
        constructor(properties) {
            this.name = properties.name;
            this.alignment = properties.alignment;
            this.cities = properties.cities;
            this.planets = properties.planets;
        }

        save() {

        }

        static find() {}
        static findOne() {}
    }

    let data = require("../../data/fractions-data")({ Fraction });

    describe("getFractions()", () => {
        it("Expect to return 2 fractions", done => {
            // arrange
            let fractions = ["Avengers", "Fantastic Four"];
            sinon.stub(Fraction, "find", cb => {
                cb(null, fractions);
            });

            // act
            data.getFractions()
                .then(actualFractions => {
                    // assert
                    expect(actualFractions).to.eql(fractions);
                    done();
                });
        });
    });

    describe("getFractionById(id)", () => {
        let existingFractionId = 1;

        let fraction = {
            _id: existingFractionId,
            name: "Avengers"
        };

        let fractions = [fraction];

        beforeEach(() => {
            sinon.stub(Fraction, "findOne", (query, cb) => {
                let id = query._id;
                let foundFraction = fractions.find(fr => fr._id === id);
                cb(null, foundFraction);
            });
        });

        afterEach(() => {
            sinon.restore();
        });

        it("Expect to return the fraction", done => {
            data.getFractionById(existingFractionId)
                .then((actualFraction => {
                    expect(actualFraction).to.equal(fraction);
                    done();
                }));
        });

        it("Expect to return null, when no fraction with the id", done => {
            data.getFractionById(2)
                .then((actualFraction => {
                    expect(actualFraction).to.equal(null);
                    done();
                }));
        });
    });

    describe("Test createFraction()", () => {
        afterEach(() => {
            sinon.restore();
        });

        it("Expect to save the fraction", done => {
            sinon.stub(Fraction.prototype, "save", cb => {
                cb(null);
            });

            let name = "John's group";
            data.createFraction(name, "Good", [], [])
                .then(actualFraction => {
                    expect(actualFraction.name).to.equal(name);
                    done();
                });
        });

        it("Expect to fail, when name is empty", done => {
            sinon.stub(Fraction.prototype, "save", cb => {
                cb(null);
            });

            let name = "";
            data.createFraction(name, "Good", [], [])
                .catch(err => {
                    expect(err).not.to.be.null;
                    done();
                });
        });

        it("Expect to fail, when alignment is empty", done => {
            sinon.stub(Fraction.prototype, "save", cb => {
                cb(null);
            });

            let name = "";
            data.createFraction(name, "Good", [], [])
                .catch(err => {
                    expect(err).not.to.be.null;
                    done();
                });
        });

        it("Expect to fail, when alignment is invalid", done => {
            // Good, Evil, Neutral
            sinon.stub(Fraction.prototype, "save", cb => {
                cb(null);
            });

            let name = "";
            data.createFraction(name, "Good", [], [])
                .catch(err => {
                    expect(err).not.to.be.null;
                    done();
                });
        });

    });
});