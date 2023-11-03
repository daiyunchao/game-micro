module.exports = {
    apps: [
      {
        name: "game-micro-leaderboardCache-001",
        script: "services/leaderboardCache.service.js",
        exec_mode: "cluster",
        autorestart: true,
        watch: true,
        max_memory_restart: "1G",
        env: {
          NODE_ENV: "production",
          NODE_ID: "leaderboard_001"
        }
      }
    ]
  };