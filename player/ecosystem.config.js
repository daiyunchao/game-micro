module.exports = {
    apps: [
      {
        name: "game-micro-player-001",
        script: "services/player.service.js",
        exec_mode: "cluster",
        autorestart: true,
        watch: true,
        max_memory_restart: "1G",
        env: {
          NODE_ENV: "production",
          NODE_ID: "player_001"
        }
      },
      {
        name: "game-micro-player-002",
        script: "services/player.service.js",
        exec_mode: "cluster",
        autorestart: true,
        watch: true,
        max_memory_restart: "1G",
        env: {
          NODE_ENV: "production",
          NODE_ID: "player_002"
        }
      }
    ]
  };