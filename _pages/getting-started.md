---
layout: article
title:  "Getting Started"
excerpt: "Make your first API call with this quick start guide."
tags: [app-dev-getting-started]
show_related: true
author: steph_kim
image:
  teaser: /icons/hexicon_desktop_purple.svg
---

Welcome to Getting Started with the Algorithmia API. This guide will show you how to call an algorithm via our API in a few lines of code using our supported language clients.

We'll show an example in cURL, Python, Java, Rust, R, Node, Ruby, JavaScript, Scala, Go, and Swift in order to get you up and running so you can quickly develop intelligent applications in the language of your choice.

If you want more detailed tutorials on how to work with the language clients including Android, CLi and how to work with AWS Lambda, check out our [Client Guides]({{ site.baseurl }}/clients/).

## Finding an Algorithm

To get started, find an algorithm you'd like to call. You can do this by using the search bar or browsing the marketplace by tags & categories. Each algorithm has an owner and an algorithm name; you'll need both to format your request. This information is listed under the algorithm name on the description page as well as in the format of the algorithm's URL.

For a given user and algorithm name, API calls are made to the following URL:

{% highlight bash %}
POST https://api.algorithmia.com/v1/algo/:owner/:algoname
{% endhighlight %}

We recommend that you also append the algorithm version in your API call to ensure that the correct algorithm is called.

If you want a complete guide on how to navigate an algorithm's description page including how to determine how the price of calling an algorithm, check out our [Algorithm Profiles]({{ site.baseurl }}/basics/algorithm-profiles/) guide.
{: .notice-info}

## Making your first API call

We'll make our first call with the demo algorithm ["Hello"](https://algorithmia.com/algorithms/demo/Hello). This algorithm takes an input of a string (preferably your name!) and returns a greeting addressed to the input.

Calling the algorithm is as simple as making a curl request. For example, to call the demo/Hello algorithm, simply run a cURL request in your terminal:

{% highlight bash lineanchors %}
curl -X POST -d '"YOUR_USERNAME"' -H 'Content-Type: application/json' -H 'Authorization: Simple YOUR_API_KEY' https://api.algorithmia.com/v1/algo/demo/Hello/0.1.1
{% endhighlight %}

If you aren't logged in, make sure to replace <code>YOUR&lowbar;USERNAME</code> with your name & <code>YOUR&lowbar;API&lowbar;KEY</code> with your API key.
{: .notice-warning}

You can also use one of the clients to make your call. See below for examples or visit one of the [Client Guides]({{ site.baseurl }}/clients/) for details on how to call algorithms and work with data in your language of choice.

{% raw %}
<br/>
<div class="code__nav demo-code-nav-small" ng-init="lang='python'">
  <span class="code__lang active" ng-click="lang='python'" ng-class="{active: lang==='python'}">Python</span>
  <span class="code__lang" ng-click="lang='java'" ng-class="{active: lang==='java'}">Java</span>
  <span class="code__lang" ng-click="lang='rlang'" ng-class="{active: lang==='rlang'}">R</span>
  <span class="code__lang" ng-click="lang='javascript'" ng-class="{active: lang==='javascript'}">JavaScript</span>
  <span class="code__lang" ng-click="lang='node'" ng-class="{active: lang==='node'}">Node</span>
  <span class="code__lang" ng-click="lang='ruby'" ng-class="{active: lang==='ruby'}">Ruby</span>
  <span class="code__lang" ng-click="lang='rust'" ng-class="{active: lang==='rust'}">Rust</span>
  <span class="code__lang" ng-click="lang='scala'" ng-class="{active: lang==='scala'}">Scala</span>
  <span class="code__lang" ng-click="lang='swift'" ng-class="{active: lang==='swift'}">Swift</span>
  <span class="code__lang" ng-click="lang='go'" ng-class="{active: lang==='go'}">Go</span>
</div>

<!-- PYTHON -->
<div class="tab-pane code__pane" id="python" ng-show="lang==='python'" ng-cloak>
<pre class="code__pre"><code hlcode="python" class="demo-code-sample">import Algorithmia

input = "YOUR_USERNAME"
client = Algorithmia.client('API_KEY')
algo = client.algo('demo/Hello/0.1.1')
print algo.pipe(input)
</code></pre>
</div>

<!-- JAVA -->
<div class="tab-pane code__pane" id="java" ng-show="lang==='java'" ng-cloak>
<pre class="code__pre"><code hlcode="java" class="demo-code-sample">import com.algorithmia.*;
import com.algorithmia.algo.*;

String input = "YOUR_USERNAME"
AlgorithmiaClient client = Algorithmia.client("YOUR_API_KEY");
Algorithm algo = client.algo("demo/Hello/0.1.1");
AlgoResponse result = algo.pipeJson(input);
System.out.println(result.asJsonString());
</code></pre>
</div>

<!-- R LANG -->
<div class="tab-pane code__pane" id="rlang" ng-show="lang==='rlang'" ng-cloak>
<pre class="code__pre"><code hlcode="R" class="demo-code-sample">library(algorithmia)

input <- "YOUR_USERNAME"
client <- getAlgorithmiaClient("YOUR_API_KEY")
algo <- client$algo("demo/Hello/0.1.1")
result <- algo$pipe(input)$result
print(result)
</code></pre>
</div>

<!-- JAVASCRIPT -->
<div class="tab-pane code__pane" id="javascript" ng-show="lang==='javascript'" ng-cloak>
<pre class="code__pre"><code hlcode="js" class="demo-code-sample">var input = "YOUR_USERNAME";
Algorithmia.client("YOUR_API_KEY")
           .algo("demo/Hello/0.1.1")
           .pipe(input)
           .then(function(output) {
             console.log(output);
           });
</code></pre>
</div>

<!-- NODE -->
<div class="tab-pane code__pane" id="node" ng-show="lang==='node'" ng-cloak>
<pre class="code__pre"><code hlcode="js" class="demo-code-sample">var input = "YOUR_USERNAME";
Algorithmia.client("YOUR_API_KEY")
           .algo("algo://demo/Hello/0.1.1")
           .pipe(input)
           .then(function(response) {
             console.log(response.get());
           });
</code></pre>
</div>

<!-- RUBY -->
<div class="tab-pane code__pane" id="ruby" ng-show="lang==='ruby'" ng-cloak>
<pre class="code__pre"><code hlcode="ruby" class="demo-code-sample">require 'algorithmia'

input = "YOUR_USERNAME"
client = Algorithmia.client("YOUR_API_KEY")
algo = client.algo("demo/Hello/0.1.1")
response = algo.pipe(input).result
puts response
</code></pre>
</div>

<!-- RUST -->
<div class="tab-pane code__pane" id="rust" ng-show="lang==='rust'" ng-cloak>
<pre class="code__pre"><code hlcode="rust" class="demo-code-sample">use algorithmia::*;

let input = "YOUR_USERNAME";
let client = Algorithmia::client("YOUR_API_KEY");
let algo = client.algo("demo/Hello/0.1.1");
let response = algo.pipe(input);
println!(response)
</code></pre>
</div>

<!-- SCALA -->
<div class="tab-pane code__pane" id="scala" ng-show="lang==='scala'" ng-cloak>
<pre class="code__pre"><code hlcode="scala" class="demo-code-sample">import com.algorithmia._
import com.algorithmia.algo._

val input = "YOUR_USERNAME"
val client = Algorithmia.client("YOUR_API_KEY")
val algo = client.algo("algo://demo/Hello/0.1.1")
val result = algo.pipeJson(input)
System.out.println(result.asJsonString)
</code></pre>
</div>

<!-- SWIFT -->
<div class="tab-pane code__pane" id="swift" ng-show="lang==='swift'" ng-cloak>
<pre class="code__pre"><code hlcode="swift" class="demo-code-sample">import Algorithmia

let input = "YOUR_USERNAME";
let client = Algorithmia.client(simpleKey: "YOUR_API_KEY")
let algo = client.algo(algoUri: "demo/Hello/0.1.1") { resp, error in
  print(resp)
}
</code></pre>
</div>

<!-- GO -->
<div class="tab-pane code__pane" id="go" ng-show="lang==='go'" ng-cloak>
<pre class="code__pre"><code hlcode="go" class="demo-code-sample">import (
  algorithmia "github.com/algorithmiaio/algorithmia-go"
)

input := "YOUR_USERNAME"

var client = algorithmia.NewClient("YOUR_API_KEY", "")
algo, _ := client.Algo("algo://demo/Hello/0.1.1")
resp, _ := algo.Pipe(input)
response := resp.(*algorithmia.AlgoResponse)
fmt.Println(response.Result)
</code></pre>
</div>
{% endraw %}

## Understanding the response

Each algorithm returns a response in JSON. It will include the `"result"` as well as metadata about the API call you made. The metadata will include the `content_type` as well as a duration.

{% highlight bash lineanchors %}
curl -X POST -d '"YOUR_USERNAME"' -H 'Content-Type: application/json' -H 'Authorization: Simple API_KEY' https://api.algorithmia.com/v1/algo/demo/Hello/0.1.1


{ "result": "Hello YOUR_USERNAME",
  "metadata": {
     "content_type": "text",
     "duration": 0.000187722
  }
}
{% endhighlight%}

The duration is the compute time of the API call into the algorithm. This is the time in seconds between the start of the execution of the algorithm and when it produces a response. Because you are charged on the compute time of the API call, this information will help you optimize your use of the API.

For more information about pricing, check out our [Pricing Guide]({{ site.baseurl }}/pricing/)
