//Login
export function login_get(req, res) {
  res.render('login');
};

export function login_post(req, res) {
  res.send('user login');
};

//Signup
export function signup_get(req, res) {
  res.render('signup');
};

export function signup_post(req, res) {
  res.send('new signup');
};

//Authentication middleware
export function isAuthed(req, res, next) {
  if (true /*req.isAuthenticated()*/) {
    return next();
  }
  /* res.redirect('/login'); */
}