/* globals module */

let createRequest = () => {
    return {};
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

            this.fireEvents("end");

            return this;
        },
        json(obj) {
            this.params.model = obj;
            return this;
        },
        send(model) {
            this.params.model = model;
        },
        status(newStatus) {
            this.params.status = newStatus;
        },

        on(eventName, cb) {
            this.events[eventName] = this.events[eventName] || [];
            this.events[eventName].push(cb);
        },

        fireEvents(...eventNames) {
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