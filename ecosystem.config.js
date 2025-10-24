module.exports = {
  apps: [
    {
      port: process.env.PORT || 3001,
      name: "app",
      script: "./www/app.js",
      instances: 3,
      exec_mode: "cluster",
      max_memory_restart: "200M",
      error_file: "./logs/err.log",
      out_file: "./logs/out.log",
      log_file: "./logs/combined.log",
      time: true,
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      max_size: "10M",
      retain: 5,
      compress: true,
      watch: false,
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
