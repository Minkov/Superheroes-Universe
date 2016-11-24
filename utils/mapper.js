/* globals module */

module.exports = {
    map(obj, ...props) {
        props.reduce((mapped, prop) => {
            mapped[prop] = obj[prop];
            return mapped;
        }, {});
    }
};