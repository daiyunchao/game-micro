class Error{
    constructor(code,msg){
        this.code = code;
        this.msg = msg;
    }
    setSuccess(){
        this.code = 0;
        this.msg = "";
        return this;
    }
}

module.exports =  Error