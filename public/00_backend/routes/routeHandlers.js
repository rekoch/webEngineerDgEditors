const indexRouter = require('./index');
const likesRouter = require('./likes');
const authorFollowRouter = require('./authorFollow');
const topicFollowRouter = require('./topicFollow');

/**
 * Zentraler Route-Handler - registriert alle Routes bei der Express-App
 * @param {express.Application} app - Express-App-Instanz
 */
function routeHandler(app) {
  console.log('🚀 Registering API routes...');
  
  try {
    // Route-Handler registrieren
    app.use('/', indexRouter);
    app.use('/likes', likesRouter);
    app.use('/author-follow', authorFollowRouter);
    app.use('/topic-follow', topicFollowRouter);
    
    console.log('✅ All routes registered successfully');
    
  } catch (error) {
    console.error('❌ Error registering routes:', error);
    throw error;
  }
}

module.exports = { 
  routeHandler
};