/* globals require describe it beforeEach afterEach*/

const chai = require("chai");
const sinonModule = require("sinon");

const mocks = require("./utils/mocks");

let expect = chai.expect;

const superheroes = [{
    _id: 1,
    name: "Batman",
    secretIdentity: "Bruce wayne"
}];

describe("Test superheroes controller", () => {
    let sinon;
    let data = {
        getSuperheroes: () => {},
        getSuperheroById: id => {},
        createSuperhero: () => {}
    };

    beforeEach(() => {
        sinon = sinonModule.sandbox.create();

        sinon.stub(data, "getSuperheroes", () => {
            let count = superheroes.length;
            return Promise.resolve({ superheroes, count });
        });

        sinon.stub(data, "getSuperheroById", id => {
            let superhero = superheroes.find(sh => sh._id === Number(id));
            return Promise.resolve(superhero || null);
        });

        sinon.stub(data, "createSuperhero", () => {

        });
    });

    afterEach(() => {
        sinon.restore();
    });
    describe("getSuperheroes", () => {
        it("expect to work", done => {
            let controller = require("../../controllers/superheroes-controller")({ data });

            let req = mocks.createRequest();

            let res = mocks.createResponse();

            res.on("end", () => {
                expect(res.params.model.model).eqls(superheroes);
                done();
            });

            controller.getSuperheroes(req, res);
        });

        it("expect to work", done => {
            let controller = require("../../controllers/superheroes-controller")({ data });

            let req = mocks.createRequest();

            let res = mocks.createResponse();

            res.on("end", () => {
                expect(res.params.model.model).eqls(superheroes);
                done();
            });

            controller.getSuperheroes(req, res);
        });

    });
});