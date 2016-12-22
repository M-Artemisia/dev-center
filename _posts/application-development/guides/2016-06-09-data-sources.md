---
layout: article_page
title:  "Data Portal Guides"
excerpt: "Here you'll find guides to hosting your data on Algorithmia or you can create a connection to your hosted files on Dropbox or S3."
date:   2016-06-09 09:43:45
categories: application-development
tags: [data-connectors-overview]
show_related: false
author: steph_kim
image:
    teaser: /post_images/data_connectors/connectors.png
---

<a href="https://algorithmia.com/data">Algorithmia's Data Portal</a> makes it easy to connect your application to data sources with connections to <a href="https://aws.amazon.com/s3/">Amazon's S3 service</a>, <a href="https://www.dropbox.com/">Dropbox</a> or you can host your files for free on the <a href="https://algorithmia.com/data/hosted">Algorithmia platform</a>. With these options it's easy to integrate your data into the app you're building.

How easy is it? By creating an Algorithmia account you automatically have access to <a href="https://algorithmia.com/data/hosted">Algorithmia's Hosted Data Source</a> where you can store your data or algorithm output and if you have a <a href="https://www.dropbox.com/">Dropbox</a> or an <a href="https://aws.amazon.com/s3/">Amazon S3</a> account you can configure a new data source to permit Algorithmia to read and write files on your behalf. Once you've set up your data connections all three file hosting options are accessable via <a href="http://docs.algorithmia.com/#data-api-specification">Algorithmia's Data API</a>.

If you have any questions about Algorithmia please <a href="mailto:support@algorithmia.com">get in touch</a>!

## Data Portal Guides:
{% assign data_connector_tags = "app-data-connectors" | split:"|" %}
<div class="data-connectors">
  {% for post in site.posts %}
  	{% if data_connector_tags == post.tags %}
  		<div class="tile-guides">
	      	<a  href="{{ post.url }}">{{ post.title }}
	      	{% if post.image.teaser %}
	  			<img  src="{{ site.url }}/images/{{ post.image.teaser }}" alt="" itemprop="image">
			{% endif %}
			</a>
		</div>
	{% endif %}
  {% endfor %}
</div>
