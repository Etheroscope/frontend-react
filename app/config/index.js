const config = {
  production: require('./config.prod'),
  staging: require('./config.stag'),
  testing: require('./config.test'),
  development: require('./config.dev')
}

// Use configuration for current environment, defaulting to production
export default config[process.env.NODE_ENV || 'production']