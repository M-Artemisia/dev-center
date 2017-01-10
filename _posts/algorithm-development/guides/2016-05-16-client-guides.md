---
layout: article_page
title:  Supported languages
excerpt: "Guides to building an algorithm in your favorite language including: Python, R, Scala, Rust, Java, Ruby and JavaScript."
date:   2016-05-16 14:28:42
permalink: /algorithm-development/languages/
categories: algorithm-development
nav_children: languages
tags: [algo-dev]
show_related: false
author: steph_kim
---

As an Algorithmia user, in addition to having access to hundreds of algorithms, you also have the ability to add your own algorithms. You can write a private algorithm for your own use, contribute an open source algorithm, or monetize an algorithm you authored. Our algorithms and platform are designed with composability in mind, so think of algorithms in the marketplace as building blocks.

If you have algorithm code you'd like to host on the Algorithmia platform in a different language, please <a href="mailto:support@algorithmia.com">get in touch</a>! We are able to host executables in some special cases.

### Currently Supported Languages

{% assign lang_tags = "algo-guide-lang" | split:"|" %}
<div class="lang-tile-container">
  {% for post in site.posts %}
  	{% if lang_tags == post.tags %}
		<div class="col-xs-4 col-sm-3 lang-tile">
	      	<a  href="{{ post.url }}">
		      	{% if post.image.teaser %}
		  			<img  src="{{ site.url }}{{ site.baseurl }}/images/{{ post.image.teaser }}" alt="" itemprop="image" class="lang-icon">
				{% endif %}
			</a>
			<p class="lg"><a  href="{{ post.url }}">{{ post.title }}</a></p>
		</div>
	{% endif %}
  {% endfor %}
</div>