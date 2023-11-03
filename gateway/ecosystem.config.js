module.exports = {
    apps: [
      {
        name: "game-micro-gateway-001",
        script: "services/gateway.service.js",
        exec_mode: "cluster",
        autorestart: true,
        watch: true,
        max_memory_restart: "1G",
        env: {
          NODE_ENV: "production",
          NODE_ID:"gateway_001"
        }
      },
      {
        name: "game-micro-gateway-002",
        script: "services/gateway.service.js",
        exec_mode: "cluster",
        autorestart: true,
        watch: true,
        max_memory_restart: "1G",
        env: {
          NODE_ENV: "production",
          NODE_ID:"gateway_002"
        }
      }
    ]
  };