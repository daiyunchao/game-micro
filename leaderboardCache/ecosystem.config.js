module.exports = {
    apps: [
      {
        name: "game-micro-leaderboardCache-001",
        script: "services/leaderboardCache.service.js",
        exec_mode: "cluster",
        autorestart: true,
        watch: false,
        max_memory_restart: "1G",
        env: {
          NODE_ENV: "production",
          NODE_ID: "leaderboardCache_001"
        }
      }
    ]
  };