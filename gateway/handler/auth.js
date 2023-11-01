/**
 * 鉴权类
 */
const aesCrypto = require('crypto-js/aes');
const utf8Encode = require("crypto-js/enc-utf8")

const AppConfig = require('../config/app.json');
const Error = require('../menu/Error')
class Auth {
    requestAuth(req) {
        //检查请求头中是否有appId
        console.log(req.headers);
        if (!req || !req.headers || !req.headers.app_id) {
            return new Error(401, "请求异常")
        }
        if (req.headers.app_id != AppConfig.appId) {
            return new Error(401, "请求异常")
        }
        var success =new Error().setSuccess();
        return success;
    }

    //加密
    encodeData(req,data) {
        let dataStr = JSON.stringify(data);
        let encryptedText = aesCrypto.encrypt(utf8Encode.parse(dataStr), AppConfig.appSecret).toString();
        return encryptedText
    }

    //解密
    decodeData(req) {
        //判断请求头中是否有debug标识,如果有则不解密,如果没有则需要解密
        if (!req.headers.debug) {
            return req.body.data;
        }
        if (req.headers.debug) {
            return "";
        }
        if (!req.body || !req.body.data) {
            return ""
        }
        //解密
        let dataStr = req.body.data;
        let decryptText = aesCrypto.decrypt(dataStr, AppConfig.appSecret).toString(utf8Encode)
        return decryptText.toString(utf8Encode);
    }
}

module.exports = new Auth