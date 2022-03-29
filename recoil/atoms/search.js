const {atom} = require("recoil");

const searchOpenState = atom({
    key: 'searchOpenState', // unique ID (with respect to other atoms/selectors)
    default: false, // default value (aka initial value)
});

export {searchOpenState};