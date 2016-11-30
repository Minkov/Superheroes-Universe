/* globals require describe it beforeEach afterEach*/

const chai = require("chai");
const sinonModule = require("sinon");

const mocks = require("./utils/request-response-mocks");

let expect = chai.expect;

describe("Test fractions controller", () => {
    let sinon;
    let data = {
        getFractions: () => {},
        getFractionById: id => {}
    };

    beforeEach(() => {
        sinon = sinonModule.sandbox.create();
    });

    afterEach(() => {
        sinon.restore();
    });

    it("getFractions", done => {
        let controller = require("../../controllers/fractions-controller")(data);

        const fractions = [{
            _id: 1,
            name: "Avengers"
        }];

        sinon.stub(data, "getFractions", () => {
            return Promise.resolve(fractions);
        });

        let req = mocks.createRequest();

        let res = mocks.createResponse();

        res.on("end", () => {
            expect(res.params.model.model).eqls(fractions);
            done();
        });

        controller.getFractions(req, res);
    });

});