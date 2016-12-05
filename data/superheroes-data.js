/* globals module require Promise */

const dataUtils = require("./utils/data-utils"),
    mapper = require("../utils/mapper");

const MIN_PATTERN_LENGTH = 3;

module.exports = function(models) {
    let {
        Fraction,
        Superhero,
        City,
        Country,
        Planet,
        Power
    } = models;

    return {
        createSuperhero(name, secretIdentity, powersNames, cityName, countryName, planetName, story, alignment, imageUrl, fractionsNames, user) {
            let planet,
                country,
                city,
                superhero,
                powers,
                fractions;

            return dataUtils.loadOrCreatePlanet(Planet, planetName)
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
                    let powersPromises = powersNames.map(powerName => dataUtils.loadOrCreatePower(Power, powerName));
                    return Promise.all(powersPromises);
                })
                .then(dbPowers => {
                    powers = dbPowers;
                    let fractionsPromises = fractionsNames.map(fractionName => dataUtils.loadOrCreateFraction(Fraction, fractionName, planet, alignment));
                    return Promise.all(fractionsPromises);
                })
                .then(dbFractions => {
                    fractions = dbFractions;

                    superhero = new Superhero({
                        name,
                        secretIdentity,
                        story,
                        alignment,
                        imageUrl,
                        city: mapper.map(city, "_id", "name"),
                        country: mapper.map(country, "_id", "name"),
                        planet: mapper.map(planet, "_id", "name"),
                        powers: powers.map(power => mapper.map(power, "_id", "name")),
                        fractions: fractions.map(fraction => mapper.map(fraction, "_id", "name")),
                        user: mapper.map(user, "_id", "username")
                    });

                    return dataUtils.save(superhero);
                })
                .then(dbSuperhero => {
                    superhero = dbSuperhero;
                    let fractionsPromises = fractions.map(fraction => {
                        let mapped = mapper.map(superhero, "_id", "name");
                        fraction.superheroes.push(mapped);
                        return dataUtils.update(fraction);
                    });
                    return Promise.all(fractionsPromises);
                })
                .then(() => {
                    return superhero;
                });
        },
        getSuperheroes({ page, pageSize }) {
            let skip = (page - 1) * pageSize,
                limit = page * pageSize;

            return Promise.all([
                new Promise((resolve, reject) => {
                    Superhero.find()
                        .sort({ name: 1 })
                        .skip(skip)
                        .limit(limit)
                        .exec((err, superheroes) => {
                            if (err) {
                                return reject(err);
                            }

                            return resolve(superheroes);
                        });
                }), new Promise((resolve, reject) => {
                    Superhero.count({})
                        .exec((err, count) => {
                            if (err) {
                                return reject(err);
                            }

                            return resolve(count);
                        });
                })
            ]).then(results => {
                let [superheroes, count] = results;
                return { superheroes, count };
            });
        },
        getNewestSuperheroes(count) {
            return new Promise((resolve, reject) => {
                Superhero.find({})
                    .sort({ createdAt: -1 })
                    .limit(count)
                    .exec((err, superheroes) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve(superheroes);
                    });
            });
        },
        addSuperheroToFavorites(superheroId, user) {
            return dataUtils.getById(Superhero, superheroId)
                .then(superhero => {
                    user.superheroes.push(superhero);
                    return dataUtils.save(user);
                });
        },
        removeSuperheroFromFavorites(superheroId, user) {
            return dataUtils.getById(Superhero, superheroId)
                .then(superhero => {
                    let index = user.superheroes.findIndex(sh => sh.name === superhero.name);
                    user.superheroes.splice(index, 1);
                    return dataUtils.save(user);
                });
        },
        searchSuperheroes({ pattern, page, pageSize }) {
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

            let skip = (page - 1) * pageSize,
                limit = page * pageSize;

            return new Promise((resolve, reject) => {
                Superhero.find()
                    .where(query)
                    .skip(skip)
                    .limit(limit)
                    .exec((err, superheroes) => {
                        if (err) {
                            return reject(err);
                        }

                        return resolve(superheroes || []);
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