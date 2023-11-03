class Error {
    constructor(code, msg) {
        this.code = code;
        this.msg = msg;
        this.data = {};
    }
    setSuccess(data) {
        this.code = 0;
        this.msg = "";
        this.data = data;
        return this;
    }
}

module.exports = Error