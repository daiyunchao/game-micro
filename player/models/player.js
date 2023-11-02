class Player {
    constructor(deviceId, playerId, playerData) {
        this.deviceId = deviceId;
        this.playerId = playerId;
        this.playerData = playerData;
    }
    constructPlayer(payerInfo) {
        this.deviceId = payerInfo.deviceId;
        this.playerId = payerInfo.playerId;
        this.playerData = payerInfo.playerData;
    }
}

module.exports = Player;