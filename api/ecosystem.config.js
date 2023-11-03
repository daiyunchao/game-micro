module.exports = {
    apps: [
      {
        name: "game-micro-api-001",
        script: "services/api.service.js",
        exec_mode: "cluster",
        autorestart: true,
        watch: false,
        max_memory_restart: "1G",
        env: {
          NODE_ENV: "production",
          NODE_ID: "api_001"
        }
      },
      {
        name: "game-micro-api-002",
        script: "services/api.service.js",
        exec_mode: "cluster",
        autorestart: true,
        watch: false,
        max_memory_restart: "1G",
        env: {
          NODE_ENV: "production",
          NODE_ID: "api_002"
        }
      },
      {
        name: "game-micro-api-003",
        script: "services/api.service.js",
        exec_mode: "cluster",
        autorestart: true,
        watch: false,
        max_memory_restart: "1G",
        env: {
          NODE_ENV: "production",
          NODE_ID: "api_003"
        }
      }
    ]
  };