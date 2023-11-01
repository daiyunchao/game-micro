class CommonTools {
    generateRandomNumber() {
        const min = 1000000;
        const max = 10000000;
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}

module.exports = new CommonTools;