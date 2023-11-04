#!/bin/bash
cd api/
npm i -d
pm2 restart ecosystem.config.js

cd ../gateway/
npm i -d
pm2 restart ecosystem.config.js

cd ../player/
npm i -d
pm2 restart ecosystem.config.js

cd ../leaderboardCache/
npm i -d
pm2 restart ecosystem.config.js

cd ../leaderboard/
npm i -d
pm2 restart ecosystem.config.js

cd ../adminApi/
npm i -d
pm2 restart ecosystem.config.js

cd ../adminGateway/
npm i -d
pm2 restart ecosystem.config.js

pm2 list