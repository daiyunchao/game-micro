#!/bin/bash
cd api/
pm2 start ecosystem.config.js

cd ../gateway/
pm2 start ecosystem.config.js

cd ../player/
pm2 start ecosystem.config.js

cd ../leaderboardCache/
pm2 start ecosystem.config.js

cd ../leaderboard/
pm2 start ecosystem.config.js

cd ../adminApi/
pm2 start ecosystem.config.js

cd ../adminGateway/
pm2 start ecosystem.config.js

pm2 list