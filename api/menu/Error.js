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
    setServerError(){
        this.code = 500;
        this.msg = "服务器错误";
        return this;
    }
}

module.exports = Error