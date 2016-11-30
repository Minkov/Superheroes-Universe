/* globals require describe it beforeEach afterEach*/

const chai = require("chai");
const sinonModule = require("sinon");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

let expect = chai.expect;

describe("Test fractions router", () => {
    let sinon;
    let data = {
        getFractions: () => {},
        getFractionById: id => {}
    };

    let fractions = [{
        _id: 1,
        name: "Avengers",
        alignment: "Good",
        cities: ["New York"],
        planets: ["Earth"]
    }, {
        _id: 2,
        name: "Fantastic Four",
        alignment: "Good",
        cities: ["New York"],
        planets: ["Earth"]
    }];

    beforeEach(() => {
        sinon = sinonModule.sandbox.create();
    });

    afterEach(() => {
        sinon.restore();
    });

    describe("GET /fractions", () => {
        it("expect to return 2 fractions", done => {
            sinon.stub(data, "getFractions", () => {
                return Promise.resolve(fractions);
            });

            let app = require("../../config/application")({ data });
            require("../../routers")({ data, app });

            chai.request(app)
                .get("/fractions")
                .end((req, res) => {
                    expect(res.status).equals(200);
                    done();
                });
        });
    });

    describe("GET /fractions/:id", () => {
        beforeEach(() => {
            sinon.stub(data, "getFractionById", id => {
                let fraction = fractions.find(fr => fr._id === id);
                return Promise.resolve(fraction || null);
            });
        });

        it("GET fractions/:id", done => {
            let app = require("../../config/application")({ data });
            require("../../routers")({ data, app });

            chai.request(app)
                .get("/fractions/1")
                .end((req, res) => {
                    expect(res.status).equals(200);
                    done();
                });
        });

        it("GET fractions/:id, id is invalid", done => {
            let app = require("../../config/application")({ data });
            require("../../routers")({ data, app });

            chai.request(app)
                .get("/fractions/3")
                .end((req, res) => {
                    expect(res.status).equals(404);
                    done();
                })
                .catch(err => {
                    console.log(err);
                    done();
                });
        });
    });
});