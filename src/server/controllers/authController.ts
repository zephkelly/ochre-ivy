import * as bcrypt from 'bcrypt';
const express = require('express');
const mongoose = require('mongoose').mongoose;
const fetch = require("node-fetch-commonjs");
const ejs = require('ejs').ejs;

const saltRounds = 12;

// Models ------------------------------------------------
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    default: '',
    match: [/.+\@.+\..+/, 'Please fill a valid email address']
  },
  password: String,
  joined: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date,
    default: Date.now
  },
  roles: {
    type: String,
    default: 'user'
  },
});

const User = mongoose.model('User', userSchema);

// API Routes ---------------------------------------------
export async function login_post(req, res) {
  //Check session
  if (req.session.userid) {
    console.log("Already logged in");
    res.status(200).redirect("/");
    return;
  }

  //Validate inputs
  if (req.body.email == null || req.body.password == null) {
    res.status(400).send("Missing email or password");
    return;
  }
  
  //Check if user exists
  User.find({ email: req.body.email }, async (err, user) => {
    if (user.length == 0) {
      res.status(404).send("Incorrect email or password");
      return;
    }
    else {
      const match = await bcrypt.compare(req.body.password, user[0].password);

      if (match) {
        req.session.userid = user[0]._id;
        req.session.email = user[0].email;
        req.session.roles = user[0].roles;
        req.session.save();

        console.log("Logging in user");
        res.status(200).redirect("/");
        return;
      }
      else {
        res.status(401).send("Incorrect email or password");
        return;
      }
    }
  });
};

export async function signup_post(req, res) {
  const email = JSON.stringify(req.body.email);
  const password = JSON.stringify(req.body.password);

  User.find({ email: req.body.email }, async (err, user) => {
    if (err) {
      res.status(500).send(err);
      return
    }

    if (user.length > 0) {
      const message = { text: "Account already registered with that email!" };
      res.status(409).render('signup', { message }, (err, html) => {
        if (err) { return console.log(err); }

        res.status(409).send(html);
        return;
      });
    }
    else {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      
      User.create({ email: req.body.email, password: hashedPassword }, (err, user) => {
        if (err) {
          res.status(500).send(err);
          return;
        }

        res.status(200).send("Sucessfully signed up user");
      });
    }
  });
};

export async function makeAdmin_get(req, res) {
  User.findOneAndUpdate({ email: req.params.email }, { roles: 'admin' }, { new: true }, (err, user) => {
    if (err) {
      res.send(err);
    } else {
      console.log(user.roles);
      res.send("Sucessfully made user admin");
    }
  });
};

// Routes -------------------------------------------------
export function signup_page(req, res) {
  const message = { text: "" };
  res.status(200).render('signup', { message });
};

export async function login_page(req, res) {
  if (req.session.userid != null) {
    console.log("Already logged in");
    res.redirect("/");
    return;
  }

  res.render('login');
}

export function logout_get(req, res) {
  req.session.destroy();
  res.redirect("/");
};

//Authentication middleware
export function isAuthorised(req, res, next) {
  if (req.session.userid == null) {
    console.log("Not logged in");
    res.status(401).redirect("/login");
    return;
  }

  if (req.session.roles != 'admin') {
    console.log(req.session.roles);
    console.log("Not an admin");
    res.status(403).redirect("/blog");
    return;
  }

  console.log("Authenticated");
  return next();
}