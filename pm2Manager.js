const pm2 = require('pm2');

module.exports = {
  startBot: (name, path) => {
    pm2.connect(err => {
      if (err) return console.error('PM2 connect error:', err);

      pm2.start({
        script: path,
        name: name,
        autorestart: true,
        max_memory_restart: "300M"
      }, (err) => {
        if (err) console.error('PM2 start error:', err);
        pm2.disconnect();
      });
    });
  },

  stopBot: (name) => {
    pm2.connect(err => {
      if (err) return console.error('PM2 connect error:', err);

      pm2.stop(name, (err) => {
        if (err) console.error('PM2 stop error:', err);
        pm2.disconnect();
      });
    });
  }
};