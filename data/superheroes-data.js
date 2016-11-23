/* globals module require Promise */

const dataUtils = require("./utils/data-utils"),
    mapper = require("../utils/mapper");

const MIN_PATTERN_LENGTH = 3;

module.exports = function(models) {
    let {
        Superhero,
        City,
        Country,
        Planet,
        Power
    } = models;

    return {
        createSuperhero(name, secretIdentity, alignment, story, imageUrl, cityName, countryName, planetName, ...powerNames) {
            let planet,
                country,
                city,
                superhero,
                powers;

            dataUtils.loadOrCreatePlanet(Planet, planetName)
                .then(dbPlanet => {
                    planet = dbPlanet;
                    return dataUtils.loadOrCreateCountry(Country, countryName, planet);
                })
                .then(dbCountry => {
                    country = dbCountry;
                    return dataUtils.loadOrCreateCity(City, cityName, country, planet);
                })
                .then(dbCity => {
                    city = dbCity;
                    let powersPromises = powerNames.map(powerName => dataUtils.loadOrCreatePower(Power, powerName));
                    return Promise.all(powersPromises);
                })
                .then(dbPowers => {
                    powers = dbPowers;
                    superhero = new Superhero({
                        name,
                        secretIdentity,
                        story,
                        alignment,
                        city: mapper.map(city, "_id", "name"),
                        country: mapper.map(country, "_id", "name"),
                        planet: mapper.map(planet, "_id", "name"),
                        powers: powers.map(power => mapper.map(power, "_id", "name")),
                        fractions: []
                    });
                    return dataUtils.save(superhero);
                });
        },
        getSuperheroes({ pattern, page, pageSize }) {
            let query = {};
            if (typeof pattern === "string" && pattern.length >= MIN_PATTERN_LENGTH) {
                query.$or = [{
                    name: new RegExp(`.*${pattern}.*`, "gi")
                }, {
                    secretIdentity: new RegExp(`.*${pattern}.*`, "gi")
                }, {
                    story: new RegExp(`.*${pattern}.*`, "gi")
                }];
            }

            let options = {
                skip: (page - 1) * pageSize,
                limit: page * pageSize
            };

            return new Promise((resolve, reject) => {
                Superhero.find()
                    .where(query)
                    .skip(options.skip)
                    .limit(options.limit)
                    .exec((err, superheroes) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve(superheroes);
                    });
            });
        },
        getSuperheroById(id) {
            return new Promise((resolve, reject) => {
                Superhero.findOne({ _id: id }, (err, superhero) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(superhero);
                });
            });
        }
    };
};