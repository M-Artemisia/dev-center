---
layout: article_snippets
title:  "Algorithm development"
excerpt: "Basic Guides for Algorithm Developers"
date:  2016-06-09 17:01:37
permalink: /algorithm-development/basic-guides/
tags: [app-guide-overview]
show_related: false
author: steph_kim
image:
    teaser: /icons/Algorithmia_Guides.png
---

<!-- create array of 'basics' tags -->
{% assign basics_tags = "algo-dev" | split:"|" %}

<div id="basics-index">

  <section class="row">
    {% for tag in site.tags %}
      {% assign t = tag | first %}
      {% assign posts = tag | last %}
      <!-- Pulls from data/tags.yml to allow for data defined name attr -->
      {% assign new_tag = site.data.tags[t] %}

      {% if basics_tags contains t %}
        <div class="col-md-12">
          {% for post in site.categories["basics"] %}
            {% if post.tags contains t %}
              {% include post-list-with-excerpt.html %}
            {% endif %}
          {% endfor %}
        </div>

      {% else %}
      <!-- skip tag if not in basics-tags -->
      {% continue %}
      {% endif %}

    {% endfor %}
  </section>
</div>
