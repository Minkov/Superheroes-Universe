/* globals module */

const getRandom = require("./get-random");

const powersCount = 100,
    superheroesCount = 1000,
    fractionsCount = 50,
    citiesCount = 100,
    countriesCount = 50,
    planetsCount = 10,
    alignments = ["Good", "Evil", "Neutral"];

let planets = Array.from({ length: planetsCount })
    .map((_, index) => {
        return {
            _id: index + 1,
            name: `Planet ${index}`
        };
    });

let countries = Array.from({ length: countriesCount })
    .map((_, index) => {
        return {
            _id: index + 1,
            name: `Country ${index}`
        };
    });

let cities = Array.from({ length: citiesCount })
    .map((_, index) => {
        return {
            _id: index + 1,
            name: `City ${index}`
        };
    });
let powers = Array.from({ length: powersCount })
    .map((_, index) => {
        return {
            _id: index + 1,
            name: `Power ${index}`
        };
    });

let fractions = Array.from({ length: fractionsCount })
    .map((_, index) => {
        return {
            _id: index,
            alignment: getRandom.element.of(alignments),
            name: `Fraction ${index}`
        };
    });

let superheroes = Array.from({ length: superheroesCount })
    .map((_, index) => {
        return {
            name: `Superhero ${index}`,
            secretIdentity: `Identity ${index}`,
            powersNames: getRandom
                .arrayWithLength
                .between(3)
                .and(10)
                .of(powers)
                .map(power => power.name),
            fractionNames: getRandom
                .arrayWithLength
                .between(2)
                .and(5)
                .of(fractions)
                .map(fraction => fraction.name),
            cityName: getRandom.element.of(cities).name,
            countryName: getRandom.element.of(countries).name,
            planetName: getRandom.element.of(planets).name,
            story: getRandom.text.withLength(getRandom.number.lesserThan(100)),
            alignment: getRandom.element.of(alignments),
            imageUrl: getRandom.text.withLength(getRandom.number.lesserThan(20)),
        };
    });

console.log("Text...");
console.log(getRandom.text.withLength(12));

module.exports = {
    get superheroes() {
        let length = 1000;

        // name, secretIdentity, powersNames, cityName,
        // countryName, planetName, story, alignment,
        // imageUrl, fractionsNames

    }
};