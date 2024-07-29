class carrinhoScreen {
    async product(name) {
        return await $(`-ios predicate string:name CONTAINS '${name}'`);
    }
}
module.exports = new carrinhoScreen()