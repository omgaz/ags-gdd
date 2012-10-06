
/*
 *  Generic require login routing middleware
 */

exports.requiresLogin = function (req, res, next) {
  if (!req.session.currentUser) {
    console.log('notice', 'You are not authorised. Please login.');
    res.redirect('/');
  }
  next();
};