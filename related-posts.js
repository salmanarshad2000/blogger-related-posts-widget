/*!
 * Blogger Related Posts Widget v1.0.0
 * https://github.com/salmanarshad2000/blogger-related-posts-widget
 * Copyright (c) 2012-2015 Salman Arshad
 * Released under the MIT license
 */
(function() {
	if (document.querySelector === undefined) {
		return;
	}
	var config = {}, postLink, postCategories = [], clickHandler, i, links, script;
	config.maxPostsToFetch = (typeof bloggerRelatedPosts_config === "object" && bloggerRelatedPosts_config.maxPostsToFetch) || 100;
	config.maxPostsToDisplay = (typeof bloggerRelatedPosts_config === "object" && bloggerRelatedPosts_config.maxPostsToDisplay) || 5;
	postLink = document.querySelector("link[rel=canonical]").href;
	if (/\x2F\d{4}\x2F\d{2}\x2F/.test(postLink) === false) {
		return;
	}
	for (i = 0, links = document.querySelectorAll("a[rel=tag]"); i < links.length; i++) {
		postCategories.push(links[i].textContent || links[i].innerText);
	}
	clickHandler = function() {
		if (typeof ga === "function") {
			var link = this;
			ga("send", {
				hitType: "event",
				eventCategory: "Blogger Related Posts",
				eventAction: "Related Post Clicked",
				eventLabel: link.href,
				hitCallback: function() {
					location.href = link.href;
				}
			});
			return false;
		}
	};
	bloggerRelatedPosts_callback = function(data) {
		var relatedPosts = [], i, j, k, item, entries, links, categories, div, ul, li, a, span, small;
		for (i = 0, entries = data.feed.entry; i < entries.length; i++) {
			item = {
				title: entries[i].title.$t,
				updated: new Date(entries[i].updated.$t),
				categories: [],
				count: 0
			};
			for (j = 0, links = entries[i].link; j < links.length; j++) {
				if (links[j].rel === "alternate") {
					item.link = links[j].href;
					break;
				}
			}
			if (item.link === postLink) {
				continue;
			}
			for (j = 0, categories = entries[i].category; j < categories.length; j++) {
				item.categories.push(categories[j].term);
				for (k = 0; k < postCategories.length; k++) {
					if (postCategories[k] === categories[j].term) {
						item.count++;
						break;
					}
				}
			}
			if (entries[i].media$thumbnail) {
				item.icon = {
					src: entries[i].media$thumbnail.url,
					width: entries[i].media$thumbnail.width,
					height: entries[i].media$thumbnail.height
				};
			}
			relatedPosts.push(item);
		}
		relatedPosts.sort(function(item1, item2) {
			return (item2.count - item1.count) || (item2.updated - item1.updated);
		});
		relatedPosts = relatedPosts.slice(0, config.maxPostsToDisplay);
		div = document.createElement("div");
		div.id = "blogger-related-posts";
		div.innerHTML = "<h4>Related Posts</h4>";
		ul = document.createElement("ul");
		for (i = 0; i < relatedPosts.length; i++) {
			li = document.createElement("li");
			a = document.createElement("a");
			a.href = relatedPosts[i].link;
			a.title = relatedPosts[i].count + " common " + (relatedPosts[i].count === 1 ? "category" : "categories");
			a.onclick = clickHandler;
			span = document.createElement("span");
			if (relatedPosts[i].icon) {
				span.setAttribute("style", "background: url(" + relatedPosts[i].icon.src + ") no-repeat center center;");
			}
			a.appendChild(span);
			a.appendChild(document.createTextNode(relatedPosts[i].title));
			small = document.createElement("small");
			small.appendChild(document.createTextNode(relatedPosts[i].categories.join(", ")));
			li.appendChild(a);
			li.appendChild(small);
			ul.appendChild(li);
		}
		div.appendChild(ul);
		document.querySelector(".post").appendChild(div);
	};
	script = document.createElement("script");
	script.src = "/feeds/posts/summary?alt=json&callback=bloggerRelatedPosts_callback&max-results=" + config.maxPostsToFetch + "&q=" + encodeURIComponent('label:"' + postCategories.join('" | label:"') + '"');
	document.querySelector("head").appendChild(script);
})();
