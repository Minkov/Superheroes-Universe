/* globals module */
module.exports = {
    loadOrCreatePlanet(Planet, name) {
        return new Promise((resolve, reject) => {
            Planet.findOne({ name }, (err, dbPlanet) => {
                let planet = dbPlanet;

                if (err) {
                    return reject(err);
                }

                if (planet) {
                    return resolve(planet);
                }

                planet = new Planet({ name });
                return this.save(planet)
                    .then(resolve)
                    .catch(reject);
            });
        });
    },
    loadOrCreateCountry(Country, name, planet) {
        return new Promise((resolve, reject) => {
            Country.findOne({ name }, (err, dbCountry) => {
                let country = dbCountry;

                if (err) {
                    return reject(err);
                }

                if (country) {
                    return resolve(country);
                }

                country = new Country({
                    name,
                    planet: {
                        _id: planet._id,
                        name: planet.name
                    }
                });
                return this.save(country)
                    .then(resolve)
                    .catch(reject);
            });
        });
    },
    loadOrCreateCity(City, name, country, planet) {
        return new Promise((resolve, reject) => {
            City.findOne({ name }, (err, dbCity) => {
                let city = dbCity;

                if (err) {
                    return reject(err);
                }

                if (city) {
                    return resolve(city);
                }

                city = new City({
                    name,
                    country: {
                        _id: country._id,
                        name: country.name
                    },
                    planet: {
                        _id: planet._id,
                        name: planet.name
                    }
                });
                return this.save(city)
                    .then(resolve)
                    .catch(reject);
            });
        });
    },
    loadOrCreatePower(Power, name) {
        return new Promise((resolve, reject) => {
            Power.findOne({ name }, (err, dbPower) => {
                let power = dbPower;

                if (err) {
                    return reject(err);
                }

                if (power) {
                    return resolve(power);
                }

                power = new Power({ name });
                return this.save(power)
                    .then(resolve)
                    .catch(reject);
            });
        });
    },
    loadOrCreateFraction(Fraction, name, planet, alignment) {
        return new Promise((resolve, reject) => {
            Fraction.findOne({ name }, (err, dbFraction) => {
                let fraction = dbFraction;

                if (err) {
                    return reject(err);
                }

                if (fraction) {
                    return resolve(fraction);
                }

                fraction = new Fraction({
                    name,
                    planet: {
                        _id: planet._id,
                        name: planet.name
                    },
                    alignment
                });
                return this.save(fraction)
                    .then(resolve)
                    .catch(reject);
            });
        });
    },
    update(model) {
        return new Promise((resolve, reject) => {
            model.save(err => {
                if (err) {
                    return reject(err);
                }
                return resolve(model);
            });
        });
    },
    getAll(Schema) {
        return this.getByQuery(Schema, {});
    },
    getById(Schema, id) {
        return new Promise((resolve, reject) => {
            Schema.findOne({ _id: id }, (err, obj) => {
                if (err) {
                    return reject(err);
                }
                return resolve(obj);
            });
        });
    },
    getByQuery(Schema, query) {
        return new Promise((resolve, reject) => {
            Schema.find(query, (err, objects) => {
                if (err) {
                    return reject(err);
                }

                return resolve(objects);
            });
        });
    },
    save(model) {
        return new Promise((resolve, reject) => {
            model.save(err => {
                if (err) {
                    return reject(err);
                }

                return resolve(model);
            });
        });
    }
};