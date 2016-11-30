/* globals require describe it beforeEach afterEach*/

const chai = require("chai");
const sinonModule = require("sinon");

const mocks = require("./utils/mocks");

let expect = chai.expect;

describe("Test fractions controller", () => {
    let sinon;
    let data = {
        getFractions: () => {},
        getFractionById: id => {},
    };

    const fractions = [{
        _id: 1,
        name: "Avengers"
    }];

    beforeEach(() => {
        sinon = sinonModule.sandbox.create();

        sinon.stub(data, "getFractions", () => {
            return Promise.resolve(fractions);
        });

        sinon.stub(data, "getFractionById", id => {
            let fraction = fractions.find(fr => fr._id === Number(id));
            return Promise.resolve(fraction || null);
        });
    });

    afterEach(() => {
        sinon.restore();
    });

    it("getFractions", done => {
        let controller = require("../../controllers/fractions-controller")({ data });
        let req = mocks.createRequest();

        let res = mocks.createResponse();

        res.on("end", () => {
            expect(res.params.model.model).eqls(fractions);
            done();
        });

        controller.getFractions(req, res);
    });

});