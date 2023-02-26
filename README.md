# Ochre-Ivy
![ochre-ivy landing](https://imgur.com/oqwDmLD.jpg)

A fullstack blog created for sharing recipes, with a focus on health and wellness. 

<br>

## Technologies
This wesbite was created without a framework, my goal being to gain a better understanding of how websites function without the abstractions frameworks provide.

- Typescript
- Express/Node
- HTML/CSS
- EJS Templating
- MongoDB
- Vite

<br>

## Features
### Signup/Login and Authentication
![Imgur](https://imgur.com/biYFDIf.gif)

Authentication system with server-side and client-side validation. During signup, passwords are converted into a hash using the `bcrypt` library and stored in a database. On login, passwords are hashed and 
compared. On incorrect login, a delay is added to the response to prevent email/password targeting.

<br>

On correct login, a session is created for each user and stored in the database with a predefined expiry. A cookie is given to the client to allow persisting sessions, and middlewares are placed on sensitive 
routes to allow admin areas such as a dashboard and admin toolbars on blog posts.

<br>

### Admin Dashboard
![Imgur](https://imgur.com/7TVY6Cc.gif)

The website was built to be easy to use; for a non technical client. To make this process as smooth as possible, the admin dashboard and CMS are fully integrated 
into the website. Content management was implemented using the plugin `EditorJS`. All blog data is sanitised and validated on post, images are compressed into webp format 
with separate thumbnail and full resolution sizes, and any unused data (removed/unused images) are indexed and reclaimed on the server.

<br>

### Search Feature
![Imgur](https://imgur.com/PYXZXzB.gif)

All blogs are given meta-data such as: tags, subtitles, dates, alt text for images, etc. The frontend makes requests to the server using query parameters, with filters for limits on page size and count, 
sorting types and tags. The backend `/api/blog` route contains logic to filter and sort blog data based on provided parameters. Different versions of data can be requested to reduce payload size, such as 
a `display=true` query param,  which only sends information that is necessary for display cards.