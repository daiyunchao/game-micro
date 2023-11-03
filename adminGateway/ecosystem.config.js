module.exports = {
    apps: [
      {
        name: "game-micro-adminGateway-001",
        script: "services/adminGateway.service.js",
        exec_mode: "cluster",
        autorestart: true,
        watch: true,
        max_memory_restart: "1G",
        env: {
          NODE_ENV: "production",
          NODE_ID:"adminGateway_001"
        }
      },
      {
        name: "game-micro-adminGateway-002",
        script: "services/adminGateway.service.js",
        exec_mode: "cluster",
        autorestart: true,
        watch: true,
        max_memory_restart: "1G",
        env: {
          NODE_ENV: "production",
          NODE_ID:"adminGateway_002"
        }
      }
    ]
  };