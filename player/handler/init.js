const MongoClient = require('mongodb').MongoClient;
const Server = require('./server');
let generalConfig = require('../config/general.json');
class PlayerInit {
    async connectMongo() {
        let client = await MongoClient.connect(generalConfig.mongoUrl)
        Server.setDataBase(client.db(generalConfig.dbName));
    }
}

module.exports = new PlayerInit();