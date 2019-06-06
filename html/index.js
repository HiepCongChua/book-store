let user = {
    name : 'hiep',
    pass:1234567
};
// co = user.pass
const {pass,...userWthoutPass} = user;
console.log({
    ...userWthoutPass,
    // token
});