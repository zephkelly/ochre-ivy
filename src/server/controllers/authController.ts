export function login_get(req, res) {
  res.render('login');
};

export function login_post(req, res) {
  res.send('user login');
};

export function signup_get(req, res) {
  res.render('signup');
};

export function signup_post(req, res) {
  res.send('new signup');
};