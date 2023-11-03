module.exports = {
    apps: [
      {
        name: "game-micro-adminApi-001",
        script: "services/adminApi.service.js",
        exec_mode: "cluster",
        autorestart: true,
        watch: false,
        max_memory_restart: "1G",
        env: {
          NODE_ENV: "production",
          NODE_ID: "adminApi_001"
        }
      }
    ]
  };