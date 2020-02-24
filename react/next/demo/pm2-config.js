// pm2配置文件, pm2 start ./pm2-config.js
module.exports = {
  apps: [
    {
      name: 'next-project',
      script: './server.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
};
