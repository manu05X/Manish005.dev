---
title: 'WebPageTest Scripting — Recipes for Single Page Applications'
description: 'Using WebPageTest scripts to analyze and monitor the performance of Single Page Applications.'
date: '2023-11-28'
author: 'Manish Kumar'
---

WebPageTest is an [online tool](https://www.webpagetest.org/) and an [Open Source project](https://github.com/WPO-Foundation/webpagetest) to help developers audit the performance of their websites.

As a Web Performance Evangelist at [Theodo](https://www.theodo.fr/), I use it every. single. day. I am constantly amazed at what it offers, for free, to the Web Development community at large and the Web Performance folks particularly.

I mean, look at how adamant [Brad Frost](http://bradfrost.com/) is about it:

https://twitter.com/brad_frost/status/1107714993703788544

WebPageTest is really straightforward to configure and run for "static", public-facing webpages: just enter the URL, pick your audit environment and you're good to go.

However, things can get hairy pretty quickly when dealing with Single Page Applications (usually written with React, Vue, Svelte or any other frontend framework). How can you get through a login page? How can you test the performance of your users' flow, when most of it happens client-side and does not have a specific URL to point to?

Throughout this article we are going to find out how to solve these problems, and many more, and you'll be ready to test the performance of your Single Page Application with WebPageTest!

_Note: This articles requires an intermediate understanding about some of WebPageTest advanced features._

_If you are curious about Web Performance and want a good introduction to WebPageTest, I would highly recommend the following resources:_

- [How To Use WebPageTest and its API](https://css-tricks.com/use-webpagetest-api/) on CSS Tricks, a nice overview of WebPageTest features by [Edouardo Bouças](https://twitter.com/eduardoboucas);
- [Who has the fastest website in F1?](https://jakearchibald.com/2019/f1-perf/) by [Jake Archibald](https://twitter.com/jaffathecake), which explains how analyzing WebPageTest results can lead you to performance improvements on a Formula 1-themed case study.

## Contents

- [Why is there a problem with testing Single Page Applications with WebPageTest?](#why-is-there-a-problem-with-testing-single-page-applications-with-webpagetest)
- [The many ways of selecting an element](#the-many-ways-of-selecting-an-element)
  - [Get an element by `id`, `className` or `tagName`](#get-an-element-by-id-classname-or-tagname)
  - [Use complex CSS selectors](#use-complex-css-selectors)
  - [Going nuclear: XPath selectors](#going-nuclear-xpath-selectors)
- [Recipes for common use-cases](#recipes-for-common-use-cases)
  - [Authentication and Forms](#authentication-and-forms)
  - [Navigating between pages](#navigating-between-pages)
- [What about IE 11 compatibility?](#what-about-ie-11-compatibility)
- [General tips and tricks for WebPageTest scripting](#general-tips-and-tricks-for-webpagetest-scripting)
  - [Security first!](#security-first)
  - [Browse the docs](#browse-the-docs)
  - [Long loading states](#long-loading-states)
  - [Keeping your script (and results) human-readable](#keeping-your-script-and-results-human-readable)
  - [Iterating on your scripts](#iterating-on-your-scripts)
  - [Tips and tricks from around the internet](#tips-and-tricks-from-around-the-internet)

## Why is there a problem with testing Single Page Applications with WebPageTest?

Single Page Applications radically changed the way websites work: instead of letting the backend (be it Django, Rails, Laravel…) do most of the grunt work and delivering "ready-to-use" HTML to the browser, SPAs rely heavily on JavaScript (and frontend frameworks) to have the browser compute the resulting HTML from JavaScript code.

The simplicity of WebPageTest is what makes part of its appeal to developers: head to [http://webpagetest.org/easy](http://webpagetest.org/easy), enter your URL, wait a little and _voilà_! Your performance audit is ready.

If you are building an SPA and want to measure its performance, you could rely on end-to-end testing tools like [Selenium](https://www.seleniumhq.org/), [Cypress](https://www.cypress.io/) or [Puppeteer](https://pptr.dev/). However, I have found that none of them offer the amount of performance-related information and easy-to-use tooling that WebPageTest offers.

But testing SPAs with WebPageTest can be tricky.

In many SPAs, most of the application is protected behind a login form. I use [Netlify](https://netlify.com) a lot for hosting my websites and blog, and most of the time I spend in the application is on authenticated pages, like the dashboard listing all my websites. As the information on my dashboard is specific to _me_, any other user trying to access [https://app.netlify.com/teams/phacks/sites](https://app.netlify.com/teams/phacks/sites) is not going to see my dashboard, but will instead be redirected to a login page (or a `404` one).

The same goes for WebPageTest: if I enter _my_ dashboard URL into [http://webpagetest.org/easy](http://webpagetest.org/easy), the audit will actually be performed against the login page.

![Auditing my dashboard page on Netlify fails](/images/articles/wpt-audit-netlify.png)

In addition, testing and monitoring the performance of _dynamic interactions_ in SPAs cannot be achieved with simple WebPageTest audits. [Nuage](https://nuageapp.com) is a domain name registrar with fancy animations and a beautiful, dynamic interface. When you search for domain names to buy, an asynchronous call fetches the results of the request and the results are displayed as they are retrieved.

<video controls width="400">
    <source src="/videos/nuage-search.mp4"
            type="video/mp4" />

    Sorry, your browser doesn't support embedded videos.
</video>

As you might have noticed in the video above, the URL of the page does not change when I typed my search terms. As a consequence, it is not possible to test the performance of the search _experience_ using a simple WebPageTest audit as we do not have a proper URL to point to the _action_ of searching something, only to an empty search _page_.

Some other problems can arise from that paradigm shift when using WebPageTest:

- Clicking around to navigate a webpage is usually harder than merely heading to a new URL, but it is sometimes the only option in SPAs;
- Authentication in SPAs is usually implemented using JWTs instead of the good ol' cookies, which rules out the option of setting authentication cookies (as described [here](https://calendar.perfplanet.com/2015/using-webpagetest-authentication/));
- Using React and Redux (or other application state management libraries) for your SPA can mean that forms are harder to fill out programmatically, as using `innerText` or `value` to set a field's value may not be forwarded to the application store;
- As API calls are often asynchronous and various loaders can be used to indicate a loading state, those can "trick" WebPageTest into believing the page is actually finished loading when it has, in fact, not. I have seen it happen with longer-than-usual API calls (5+ seconds).

As I have faced this problems on several projects, I have come up with a range of tips and techniques to counter them, which we will hopefully address in the rest of this post.

## The many ways of selecting an element

Selecting DOM elements is a key part of doing all sorts of automated testing, be it for end-to-end testing with [Selenium](https://www.seleniumhq.org/) or [Cypress](https://www.cypress.io/) or for performance testing with WebPageTest. Selecting DOM elements allows us to click on links and buttons, fill in forms and more generally interact with the application.

There are several ways of selecting a particular DOM elements using native browser APIs, that ranges from the really easy to use `document.getElementsByClassName` to the hairy but really powerful XPath selectors. In this section, we will see three different possibilities, ordered by growing complexity.

### Get an element by `id`, `className` or `tagName`

If the element you want to select (say, an "Empty Cart" button) has a specific and unique `id` (e.g. `#empty-cart`), or class name, or is the only `button` on the page, then clicking on it straightforward:

```javascript
const emptyCartButton = document.getElementsById("empty-cart")[0];
// or document.getElementsByClassName(".empty-cart-button")[0]
// of document.getElementsByTagName("button")[0]
emptyCartButton.click();
```

If you have several `buttons` on the same page, you can filter the resulting list before interacting with the element:

```javascript
const buttons = document.getElementsByTagName("button");
const emptyCartButton = buttons.filter(button =>
  button.innerText.includes("Empty Cart")
)[0];
emptyCartButton.click();
```

### Use complex CSS selectors

Sometimes, the particular element you want to interact with does not present an interesting unicity property in either its `id`, `class` or tag.

One way to circumvent this issue is to add this unicity manually, for testing purposes only. Adding `#perf-test-empty-cart-button` to the specific button is quite innocuous for your website markup and can dramatically simplify your testing setup.

However, this solution can be out of reach sometimes: you may not have access to the source code of the application, or not be able to deploy quickly. In those situations, it can be useful to know about `document.querySelector` (and its cousin `document.querySelectorAll`) and using complex CSS selectors.

Here are a few examples of what can be achieved with `document.querySelector`:

```javascript
// Select the first input with the `name="username"` property
document.querySelector("input[name='username']");
// Select all number inputs
document.querySelectorAll("input[type='number']");

// Select the first h1 inside the <section>
document.querySelector("section h1");

// Select the first direct descendent of a <nav> which is of type <img>
document.querySelector("nav > img");
```

What's interesting here is you have at hand the full power of CSS selectors. I encourage you to have a look at the always-useful MDN's [reference table of selectors](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors#Reference_table_of_selectors)!

### Going nuclear: XPath selectors

[XPath](https://developer.mozilla.org/fr/docs/Web/XPath) (_XML Path Language_), albeit really powerful, is harder to grasp and maintain than the CSS solution I presented above. In my experience, I rarely have to resort to it, but it is definitively useful to know that it exists.

One such instance is when you want to select a node by its text value, and can't resort to CSS selectors. Here's a handy snippet that use in those cases:

```javascript
// Returns the <span> that has the exact content 'Sep 16, 2015'
document.evaluate(
  "//span[text()='Sep 16, 2015']",
  document,
  null,
  XPathResult.FIRST_ORDERED_NODE_TYPE,
  null
).singleNodeValue;
```

I will not go into details on how to use it as it would have me wander far away from the goal of this article. To be fair, I don't even know what many of the parameters above even mean. However, I can definitely recommend the [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_using_XPath_in_JavaScript) should you want to read a bit on the topic.

## Recipes for common use-cases

In order to illustrate those recipes, I will use the [React Admin demo](https://marmelab.com/react-admin-demo/) website as an example. [React Admin](https://github.com/marmelab/react-admin) is an open source project aimed at building admin application.

I think it is a typical example of a Single Page Application because it uses React (as the name suggest), calls remote APIs, has a login interface, many forms and client-side routing. I encourage you to go [take a quick look at the website](<(https://marmelab.com/react-admin-demo/)>) (the demo account is `demo/demo` ) in order to have an idea of what we will be trying to achieve.

### Authentication and Forms

The authentication page of React Admin requires the user to input a username and a password:

![The authentication screen of React Admin](/images/articles/react-admin-demo.png)

Intuitively, one could take the following approach to filling in the form and submit:

```javascript
const [usernameInput, passwordInput] = document.getElementsByTagName("input");
usernameInput.value = "demo"; //innerText could also be used here
passwordInput.value = "demo";
document.getElementsByTagName("button")[0].click();
```

If you run this commands sequentially in a DevTools console on the login page, you will see that upon submitting by clicking the button, all fields are resetted and the login request will fail.

As mentioned in ["Why is there a problem with testing Single Page Applications with WebPageTest?"](#why-is-there-a-problem-with-testing-single-page-applications-with-webpagetest), the problem comes from the fact that the new values that we set with `.value` (or `.innerText`) are not kicked back to the Redux store, and thus not "processed" by the application.

What we need to do then it explicitely tell React that the value has changed so that it will update internal bookkeeping accordingly. This can be achieved using `Event`s.

```javascript
const updateInputValue = (input, newValue) => {
  let lastValue = input.value;
  input.value = newValue;
  let event = new Event("input", { bubbles: true });
  let tracker = input._valueTracker;
  if (tracker) {
    tracker.setValue(lastValue);
  }
  input.dispatchEvent(event);
};
``` 