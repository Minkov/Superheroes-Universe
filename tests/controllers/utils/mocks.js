/* globals module */

let createRequest = () => {
    return {
        query: {},
        addQuery(name, value) {
            this.query[name] = value;
            return this;
        }
    };
};

let createResponse = () => {
    return {
        params: {
            model: {},
            url: "",
            status: -1
        },
        events: [],
        render(url, model) {
            this.params.model = model;
            this.params.url = url;

            this._fireEvents("end");

            return this;
        },
        json(obj) {
            this.params.model = obj;
            return this;
        },
        send(model) {
            this.params.model = model;
            return this;
        },
        status(newStatus) {
            this.params.status = newStatus;
            return this;
        },

        on(eventName, cb) {
            this.events[eventName] = this.events[eventName] || [];
            this.events[eventName].push(cb);
            return this;
        },

        _fireEvents(...eventNames) {
            eventNames
                .forEach(eventName => {
                    if (typeof this.events[eventName] !== "undefined") {
                        this.events[eventName]
                            .forEach(cb => {
                                cb();
                            });
                    }
                });
        }

    };
};

module.exports = { createRequest, createResponse };