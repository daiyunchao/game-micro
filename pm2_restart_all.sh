#!/bin/bash
cd api/
pm2 restart ecosystem.config.js

cd ../gateway/
pm2 restart ecosystem.config.js

cd ../player/
pm2 restart ecosystem.config.js

cd ../leaderboardCache/
pm2 restart ecosystem.config.js

cd ../leaderboard/
pm2 restart ecosystem.config.js

cd ../adminApi/
pm2 restart ecosystem.config.js

cd ../adminGateway/
pm2 restart ecosystem.config.js

pm2 list