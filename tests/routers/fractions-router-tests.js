/* globals require describe it beforeEach afterEach before after*/

const chai = require("chai");
const sinonModule = require("sinon");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

let expect = chai.expect;

describe("Test fractions router", () => {
    let sinon;

    let controller = {
        getFractions: (req, res) => {},
        getFractionDetails: (req, res) => {},
        createFraction: (req, res) => {}
    };

    let controllers = {
        fractions: controller
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

        sinon.stub(controller, "getFractions", (req, res) => {
            res.render("fractions/list", {
                model: fractions
            });
        });
        sinon.stub(controller, "getFractionDetails", (req, res) => {
            let fraction = fractions.find(fr => fr._id === +req.params.id);

            res.render("fractions/details", {
                model: fraction || null
            });
        });
        sinon.stub(controller, "createFraction", (req, res) => {
            res.render("fractions/list", {
                model: fractions
            });
        });
    });

    afterEach(() => {
        sinon.restore();
    });

    describe("GET /fractions", () => {
        it("expect to return 2 fractions", done => {
            let app = require("../../config/application")({ data: {} });
            require("../../routers/fractions-router")({ app, controllers });

            chai.request(app)
                .get("/fractions")
                .end((req, res) => {
                    expect(res.status).equals(200);
                    done();
                });
        });
    });

    describe("GET /fractions/:id", () => {
        it("Valid ID", done => {
            let app = require("../../config/application")({ data: {} });
            require("../../routers/fractions-router")({ app, controllers });

            chai.request(app)
                .get("/fractions/1")
                .end((req, res) => {
                    expect(res.status).equals(200);
                    done();
                });
        });

        // it("Invalid ID", done => {
        //     let app = require("../../config/application")({ data: {} });
        //     require("../../routers/fractions-router")({ app, controllers });

        //     chai.request(app)
        //         .get("/fractions/3")
        //         .end((err, res) => {
        //             expect(err).not.to.be.null;
        //             expect(res.status).equals(404);
        //             done();
        //         });
        // });
    });
});