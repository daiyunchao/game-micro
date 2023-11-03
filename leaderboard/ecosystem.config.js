module.exports = {
    apps: [
      {
        name: "game-micro-leaderboard-001",
        script: "services/leaderboard.service.js",
        exec_mode: "cluster",
        autorestart: true,
        watch: true,
        max_memory_restart: "1G",
        env: {
          NODE_ENV: "production",
          NODE_ID: "leaderboard_001"
        }
      },
      {
        name: "game-micro-leaderboard-002",
        script: "services/leaderboard.service.js",
        exec_mode: "cluster",
        autorestart: true,
        watch: true,
        max_memory_restart: "1G",
        env: {
          NODE_ENV: "production",
          NODE_ID: "leaderboard_002"
        }
      }
    ]
  };