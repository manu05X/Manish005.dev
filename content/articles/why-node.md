---
title: 'Why Node?'
description: 'I am now convinced that Node is the future in Web development.'
date: '2023-11-25'
author: 'Manish Kumar'
---

You may have heard, in the past few years, about [NodeJS](https://nodejs.org/), a relatively new server-side language.

![Node.js Logo](/images/articles/nodejs.png)

> Node.js is a platform built on Chrome's JavaScript runtime for easily building fast, scalable network applications. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient, perfect for data-intensive real-time applications that run across distributed devices.
> — NodeJS documentation

I have been trying it for several months now. Before that, I nearly exclusively used PHP for my web projects, and I was happy with it. But when I heard about Node, my curiosity made me move outside my comfort zone and try the thing.

And I am now convinced that Node is the future in Web development.

## About NodeJS

Here are the most important things one need to know about Node :

- **Node is plain Javascript**: You read it well. With Node, no need to switch between languages when you are working on both the front-end and the back-end of your website. Your Node code will look (pretty much) like your usual javascript, or jQuery. And this is incredibly good for developpers.
- **Node is fast. Like really fast**: Here, You'll have to take the word of people more experienced than me. Take the devs at LinkedIn Mobile, for instance. They moved their infrastructure from Ruby on Rails to Node. They went from running 15 servers with 15 instances (virtual servers) on each physical machine, to just four instances that can handle double the traffic. And [the app is now 2 to 10 times faster](https://venturebeat.com/2011/08/16/linkedin-node/). Walmart has had [amazing results](http://venturebeat.com/2012/01/24/why-walmart-is-using-node-js/) too.
- **Packet and dependencies management is easier than ever**: Node is relying on `npm`, a packet manager, to ease development and aggregate all open source modules and frameworks from the community. And it works just as expected : seamlessly.

## Quick example : a simple web server

The following code is using [Express](https://expressjs.com/), a npm module that offers high-level resources for building webservers.

```javascript
var express = require("express");
var app = express();

app.get("/hello.txt", function(req, res) {
  res.send("Hello World");
});

var server = app.listen(3000);
```

5 lines, and the server is up and running.

## Wanna know more ?

Head [here](https://nodejs.org) for the official website, where you can download and install Node.

Here are some nice resources for beginners :

- [The Node Beginner Book](http://www.nodebeginner.org/), a nice, free tutorial for beginners
- [Felix's Node.js Beginners Guide](http://nodeguide.com/beginner.html), another tutorial for beginners
- [Building Node Applications with MongoDB and Backbone](http://shop.oreilly.com/product/0636920026587.do), in which you build a social network prototype from scratch.

_Originally published on [Svbtle](https://shawt.svbtle.com/why-node)._ 