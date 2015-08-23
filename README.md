# Blogger Related Posts Widget

Blogger Related Posts Widget is a script that displays a list of related posts below the current post. It does so by finding posts with matching labels. Here is an [overview of the script](http://salman-w.blogspot.com/2012/09/blogger-related-posts.html).

## Features

* Light weight vanilla JavaScript code — no JavaScript framework required
* Customizable widget layout — just about everything can be styled using CSS
* Post thumbnails support — because a thumbnail image is worth a thousand words
* Google Analytics integration — clicks are logged in Google Analytics
* Lazy-loadable — the script can be loaded asynchronously
* Easy installation — does not require editing Blogger template
* Faster than most other related post scripts — uses one request to fetch related posts

## Prerequisites

In order for the script to work make sure that:

* Blog post feeds are enabled
* Blog posts are labeled properly

## Installation

The easiest way to install the script on your blog is to use the "Add a Gadget" option in Blogger dashboard to insert a "HTML/JavaScript" gadget. The gadget can go anywhere but below the footer would be best. Use the following HTML5 content:

    <script src="//cdn.rawgit.com/salmanarshad2000/blogger-related-posts-widget/v1.0.0/related-posts.min.js" defer></script>

## CSS Styles

You must add some CSS rules to your Blogger style-sheet in order to customize the appearance of the related posts. You can use the following CSS rules to get started:

    #blogger-related-posts ul {
        padding: 0;
        list-style-type: none;
        text-align: center;
    }
    #blogger-related-posts li {
        float: left;
        margin: 0 1%;
        width: 18%;
    }
    #blogger-related-posts a {
        display: block;
    }
    #blogger-related-posts span {
        display: block;
        margin: 0 auto .5em;
        width: 72px;
        height: 72px;
    }
    #blogger-related-posts ul:after {
        content: "";
        display: block;
        clear: both;
    }
