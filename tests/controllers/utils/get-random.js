const symbols = "qwertyuiopasdfghjklzxcvbnm.!?\"';1234567890QWERTYUIOPASDFGHJKLZXCVBNM";

const defaultNumberFrom = 0;

const getRandom = {
    number: {
        between(from) {
            return {
                and(to) {
                    return parseInt((Math.random() * (to - from)) + from, 10);
                }
            };
        },
        lesserThan(to) {
            return this.between(defaultNumberFrom)
                .and(to);
        },
        lesserThanOrEqualTo(to) {
            return this.between(defaultNumberFrom)
                .and(to + 1);
        }
    },
    element: {
        of(objects) {
            return getRandom.arrayWithLength
                .between(1)
                .and(1)
                .of(objects)[0];
        }
    },
    arrayWithLength: {
        withUniqueElements: {
            between(from) {
                return {
                    and(to) {
                        return {
                            of(objects) {
                                if (objects.length < to - from) {
                                    throw new Error("Random objects must be less than all objects");
                                }

                                let selectedIndexes = [];
                                let length = getRandom.number.between(from).and(to);

                                while (selectedIndexes.length < length) {
                                    let index = getRandom.number.lesserThan(objects.length);
                                    if (selectedIndexes.indexOf(index) < 0) {
                                        selectedIndexes.push(index);
                                    }
                                }

                                return selectedIndexes.map(index => objects[index]);
                            }
                        };
                    }
                };
            }
        },
        between(from) {
            return {
                and(to) {
                    return {
                        of(objects) {
                            if (objects.length < to - from) {
                                throw new Error("Random objects must be less than all objects");
                            }

                            let selectedIndexes = [];
                            let length = getRandom.number.between(from).and(to);

                            while (selectedIndexes.length < length) {
                                let index = getRandom.number.lesserThan(objects.length);
                                selectedIndexes.push(index);
                            }

                            return selectedIndexes.map(index => objects[index]);
                        }
                    };
                }
            };
        }
    },
    text: {
        withLength(length) {
            return getRandom
                .arrayWithLength
                .between(length)
                .and(length)
                .of(symbols)
                .join("");
        }
    }
};