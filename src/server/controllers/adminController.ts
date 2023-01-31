const mongoose = require('mongoose').mongoose;
const fetch = require("node-fetch-commonjs");

export function dashboard_get(req, res) {
  res.render('admin/dashboard', { title: 'Dashboard' });
}

export async function dashboard_blog_get(req, res)
{
  const response = await fetch('http://localhost:62264/api/blog/');

  if (response.status == 200) {
    const blogsData = await response.json();

    res.render('admin/blog', { blogsData }, (err, html) => {
      if (err) { return console.log(err); }

      res.status(200).send(html);
      return
    });
  } else {
    res.status(response.status).send();
    return;
  }
}

export function dashboard_blog_new_get(req, res)
{
  const blogData = { uri: null, data: null };

  res.render('admin/blog-editor', { blogData }, (err, html) => {
    if (err) { return console.log(err); }

    res.status(200).send(html);
    return
  });
}

export async function dashboard_blog_new_post(req, res)
{
  const response = await fetch('http://localhost:62264/api/blog/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(req.body)
  });

  if (response.status == 200) {
    res.status(200).send();
    return;
  } else {
    res.status(response.status).send();
    return;
  }
}

export async function dashboard_blog_editURI(req, res)
{
  const response = await fetch('http://localhost:62264/api/blog/' + req.params.blogURI);

  if (response.status == 200) {
    const blogData = { uri: req.params.blogURI, data: await response.json() };

    res.render('admin/blog-editor', { blogData }, (err, html) => {
      if (err) { return console.log(err); }

      res.status(200).send(html);
      return
    });
  }
}

export async function dashboard_blog_editURI_post(req, res)
{
  const response = await fetch('http://localhost:62264/api/blog/' + req.params.blogURI, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(req.body)
  });

  if (response.status == 200) {
    res.status(200).send();
    return;
  } else {
    res.status(response.status).send();
    return;
  }
}