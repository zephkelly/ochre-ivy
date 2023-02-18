const mongoose = require('mongoose').mongoose;
const fetch = require("node-fetch-commonjs");

export async function dashboard_get(req, res) {
  const session = { name: null, admin: false };

  if (req.session.userid) {
    session.name = req.session.name;

    if (req.session.roles == 'admin') {
      session.admin = true;
    }
  }

  res.render('admin/admin-dashboard', { session, siteData: await getSiteData(), allBlogs: await getAllBlogs() });

  async function getSiteData() {
    const siteData = {
      blogCount: null,
      recipeCount: null,
      viewCount: null,
      blogViews: null,
      recipeViews: null,
      siteHits: null,
      mostViewedBlogs: [null]
    }

    const counts = await fetch('http://localhost:' + process.env.PORT + '/api/blog?count=true');
    const countsData = await counts.json();
    siteData.blogCount = countsData.blogCount;
    siteData.recipeCount = countsData.recipeCount;

    const views = await fetch('http://localhost:' + process.env.PORT + '/api/analytics');
    const viewsData = await views.json();
    siteData.viewCount = viewsData.blogViews + viewsData.recipeViews;
    siteData.blogViews = viewsData.blogViews;
    siteData.recipeViews = viewsData.recipeViews;
    siteData.siteHits = viewsData.siteHits;

    const mostViewedBlogs = await fetch('http://localhost:' + process.env.PORT + '/api/blog?filter=views&limit=3&display=true');
    const mostViewedBlogsData = await mostViewedBlogs.json();
    siteData.mostViewedBlogs = mostViewedBlogsData;

    return siteData;
  }

  async function getAllBlogs() {
    const allData = await fetch('http://localhost:' + process.env.PORT + '/api/blog?limit=20&display=true')
    const allBlogs = await allData.json();

    return allBlogs;
  }
}

export async function dashboard_blog_get(req, res)
{
  const session = { name: null, admin: false };

  if (req.session.userid) {
    session.name = req.session.name;

    if (req.session.roles == 'admin') {
      session.admin = true;
    }
  }

  const response = await fetch('http://localhost:' + process.env.PORT + '/api/blog/');

  if (response.status == 200) {
    const blogsData = await response.json();

    res.render('admin/admin-dashboard-blog', { session, blogsData }, (err, html) => {
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
  const response = await fetch('http://localhost:' + process.env.PORT + '/api/blog/', {
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
  const response = await fetch('http://localhost:' + process.env.PORT + '/api/blog/' + req.params.blogURI);
  const session = { name: null, admin: false };
  
  if (req.session.userid) {
    session.name = req.session.name;
    
    if (req.session.roles == 'admin') {
      session.admin = true;
    }
  }

  if (response.status == 200) {
    const blogData = { uri: req.params.blogURI, data: await response.json() };

    res.render('admin/blog-editor', { session, blogData }, (err, html) => {
      if (err) { return console.log(err); }

      res.status(200).send(html);
      return
    });
  }
}

export async function dashboard_blog_editURI_post(req, res)
{
  const response = await fetch('http://localhost:' + process.env.PORT + '/api/blog/' + req.params.blogURI, {
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