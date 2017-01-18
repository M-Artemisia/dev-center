---
layout: article_page
title:  "Recipes"
date:   2016-12-27 15:38:38
categories: tutorials
show_related: false
excerpt: "All the recipes"
recipe_tags: ["text-analysis", "machine-learning", "computer-vision", "deep-learning"]
image:
    teaser: /icons/recipes.svg
---

{% assign recipes = site.pages | where: "categories", "recipes" | sort:"title" %}
{% for tag in page.recipe_tags %}
  {% include recipe-grid.html %}
  {% unless forloop.last %}
  <hr>
  {% endunless %}
{% endfor %}
