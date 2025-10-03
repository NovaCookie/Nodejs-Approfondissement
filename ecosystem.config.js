module.exports = {
  apps: [
    {
      name: "app",
      script: "./www/app.js",
      instances: 3,
      exec_mode: "cluster",
      max_memory_restart: "200M",
      error_file: "./logs/err.log",
      out_file: "./logs/out.log",
      log_file: "./logs/combined.log",
      time: true,
      // Configuration de rotation des logs
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      max_size: "10M",
      retain: 5,
      compress: true,
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
