---
layout: article
title:  "R"
excerpt: "Build your algorithm in R"
categories: languages
tags: [algo-guide-lang]
show_related: true
author: steph_kim
image:
    teaser: /language_logos/r.svg
---

Before you get started learning about R algorithm development, make sure you go through our <a href="{{ site.baseurl }}/algorithm-development/algorithm-basics/your-first-algo/">Getting Started Guide</a> to learn how to create your first algorithm, understand permissions available, versioning, using the CLI, and more.

Table of Contents

* [Available Libraries](#available-libraries)
* [Write your First Algorithm](#write-your-first-algorithm)
* [Managing Dependencies](#managing-dependencies)
* [I/O for your Algorithms](#io-for-your-algorithms)
* [Error Handling](#error-handling)
* [Algorithm Checklist](#algorithm-checklist)
* [Publish Algorithm](#publish-algorithm)
* [Conclusion and Resources](#conclusion-and-resources)

## Available Libraries

Algorithmia makes a number of libraries available to make algorithm development easier.

The full <a href="https://www.r-project.org/about.html">R language and standard library version 3.3.1</a>
is available for you to use in your algorithms.

Furthermore, algorithms can call other algorithms and manage data on the Algorithmia platform
via the <a href="{{ site.baseurl }}/clients/r/">Algorithmia R language Client</a>.

## Write your First Algorithm

If you've followed the <a href="{{ site.baseurl }}/algorithm-development/algorithm-basics/your-first-algo/">Getting Started Guide</a>, you'll notice in your algorithm editor, there is boilerplate code that returns "Hello" and whatever you input to the console. Go ahead and remove that code because we'll be writing a different algorithm in this tutorial:

<img src="{{ site.baseurl }}/images/post_images/algo_dev_lang/algorithm_console_r.png" alt="Algorithm console R" class="screenshot">

The main thing to note about the algorithm is that it's wrapped in the apply() function.

The apply() function defines the input point of the algorithm. We use the apply() function in order to make different algorithms standardized. This makes them easily chained and helps authors think about designing their algorithms in a way that makes them easy to leverage and predictable for end users.
{: .notice-info}

## Managing Dependencies

Now that you have created your algorithm, you can add dependencies.

Algorithmia supports adding 3rd party dependencies via the <a href="https://cran.r-project.org">CRAN (Comprehensive R Archive Network)</a> dependency file.

On the algorithm editor page there is a button on the top right that says "Dependencies". Click that button and you'll see a modal window:

<img src="{{ site.baseurl }}/images/post_images/algo_dev_lang/dependencies_r.png" alt="Set your dependencies" class="screenshot img-md">

You can add dependencies by adding the library name to the file.

Please read the details regarding loading dependencies in the comments of the dependency file. There are three different ways to include your dependencies so read through each one to decide which one is right for your project.
{: .notice-info}

The Algorithmia dependency is already installed for your convenience and relies on R version 3.3.1. For more information about Algorithmia's R package visit:
<a href="https://cran.r-project.org/web/packages/algorithmia/index.html">Algorithmia's CRAN package</a> documentation.

This guide won't depend on any external dependencies so you can close the dependencies window.

If you do add dependencies, you will still need to import those packages via library() to your algorithm file as you would do for any R script.
{: .notice-info}

For example, to make use of lubridate, you would include the line:

`lubridate`

in the dependencies file and the line

`library(lubridate)`

in the main file.

## I/O for your Algorithms

Now let's get started on the hands-on portion of the guide:

The first algorithm that we'll create will take a JSON formatted object passed as input by the user which is deserialized into a R list before the algorithm is called.

It will output a JSON formatted object which the user will consume with an API call to the algorithm path which is found at the bottom of the algorithm description page.

This path is based on your Algorithmia user name and the name of your algorithm, so if you are “demo” and your algorithm is “TokenizeText”, then the path for version 0.1.1 of your algorithm will be demo/TokenizeText/0.1.1

### Working with Basic Data Structures

This example shows how to find the minimum and maximum of a list of numbers that the user passes in when calling the algorithm:

{% highlight r %}
library(algorithmia)

# Note that you don't pass in your API key when creating an algorithm
client <- getAlgorithmiaClient()

# Create a generic error function
AlgorithmError <- function(error){
  stop(error, call. = FALSE)
}

algorithm <- function(input){
  # Finds the minimum and maximum numbers.
  tryCatch({
    if(typeof(input) == "list" & length(input$numbers) > 1){

      user_max <- max(input$numbers)
      user_min <- min(input$numbers)
      return(list(min_num = user_min, max_num = user_max))
    } else {
      print("Please pass in a valid input")
    }

  }, error = function(e) {
    AlgorithmError(paste("Please pass in a valid input", "\n", e))
  }
  )
}

{% endhighlight %}

Go ahead and type or paste the code sample above in the Algorithmia code editor after removing the "Hello World" code.

Now compile the new code sample and when that's done test the code in the console by passing in the input and hitting enter on your keyboard:

{% highlight bash %}
{"numbers": [1, 4, 2, 6, 3]}
{% endhighlight %}

You should see the minimum and maximum of the numbers in the list returned in the console:
{% highlight bash %}
{"max_num":6, "min_num":1}
{% endhighlight %}

### Working with Data Stored on Algorithmia

This next code snippet shows how to create an algorithm working with a data file that a user has stored using Algorithmia's [Hosted Data Source]({{ site.baseurl }}/data/hosted).

While users who consume an algorithm have access to both Dropbox and Amazon S3 connectors, algorithm developers can only use the Algorithmia [Hosted Data Source]({{ site.baseurl }}/data/hosted) to host data for algorithm development.
{: .notice-warning}

#### Prerequisites
If you wish to follow along working through the example yourself, create a text file that contains any unstructured text such as a chapter from a public domain book or article. We used a chapter from [Burning Daylight, by Jack London](https://en.wikisource.org/wiki/Burning_Daylight) which you can copy and paste into a text file. Or copy and paste it from here: <a href="{{ site.baseurl }}/data_assets/burning_daylight.txt">Chapter One Burning Daylight, by Jack London</a>. Then you will can upload it into one of your [Data Collections](https://algorithmia.com/data/hosted).

This example shows how to create an algorithm that takes a user's file which is stored in a data collection on the Algorithmia platform. It then splits up the text into sentences and then splits those sentences up into words:

{% highlight r %}
library(algorithmia)


client <- getAlgorithmiaClient()

# Create a generic error function
AlgorithmError <- function(error){
  stop(error, call. = FALSE)
}

algorithm <- function(input){
  tryCatch({
    # Download contents of file as a string
    if (client$file(input$user_file)$exists()) {
      # Get the contents of the file as a string.
      text <- client$file(input$user_file)$getString()
      sentences <- strsplit(text, "[.]")
      # Split up each sentence into words.
      words <- strsplit(unlist(sentences), "[ ]")
      print(words)
    }
    }, error = function(e) {
     AlgorithmError(paste("Please pass in a valid input", "\n", e))
   })
}
{% endhighlight %}

After you paste the above code into the Algorithmia code editor you can compile and then test the example by passing in a file that you've hosted in [Data Collections](https://algorithmia.com/data/hosted).

Following the example below replace the path to your data collection with your user name (it will appear already if you are logged in), data collection name, and data file name which you can find under "My Collections" in [Data Collections](https://algorithmia.com/data/hosted):

{% highlight bash %}
{"user_file": "data://YOUR_USERNAME/data_collection_dir/data_file.txt"}
{% endhighlight %}

The code above with return both the original text and the sentence split up into words.

This guide uses a chapter from the public domain book [Burning Daylight, by Jack London](https://en.wikisource.org/wiki/Burning_Daylight), but for brevity we'll only show the first sentence in "text" and "words":

{% highlight bash %}
{"text": "It was a quiet night in the Shovel.", "words": [['It', 'was', 'a', 'quiet', 'night', 'in', 'the', 'Shovel']]}
{% endhighlight %}

When you are creating an algorithm be mindful of the data types you require from the user and the output you return to them. Our advice is to create algorithms that allow for a few different input types such as a file, a sequence or a URL.
{: .notice-info}

#### Working with JSON Data

Note that we use the rjson package to parse JSON within your algorithm.

### Writing files for the user to consume

Sometimes it is more appropriate to write your output to a file than to return it directly to the caller.  In these cases, you may need to create a temporary file, then copy it to a [Data URI](http://docs.algorithmia.com/#data-api-specification) (usually one which the caller specified in their request, or a [Temporary Algorithm Collection](https://algorithmia.com/developers/data/hosted#temporary-algorithm-collections)):

{% highlight r %}
# {"target_file":"data://username/collection/filename.txt"}
file_uri <- input$target_file
tmpfile <- sprintf("/tmp/%s.tmp",UUIDgenerate())
save_some_output_to(tempfile)
client$file(file_uri)$putFile(tempfile)
{% endhighlight %}

### Calling Other Algorithms and Managing Data

To call other algorithms or manage data from your algorithm, use the <a href="{{ site.baseurl }}/clients/r/">Algorithmia R Client</a> which is automatically available to any algorithm you create on the Algorithmia platform. For more detailed information on how to work with data see the [Data API docs](http://docs.algorithmia.com/).

You may call up to 24 other algorithms, either in parallel or recursively.

Here is an example of creating an algorithm that relies on data from another algorithm:

{% highlight r %}
library(algorithmia)

client <- getAlgorithmiaClient()

# Create a generic error function
AlgorithmError <- function(error){
  stop(error, call. = FALSE)
}

scrape_web <- function(input){
  # Call algorithm that returns main text content from a URL.
  tryCatch({
    algo <- client$algo("util/Url2Text/0.1.4")
    if ("URL" %in% names(input) & startsWith(input$URL, "http") || startsWith(input$URL, "https")) {
      response <- algo$pipe(list(input$URL))$result
      return(response)
    }
  }, error = function(e) {
    AlgorithmError(paste("Please pass in a valid input", "\n", e))
  })
}

algorithm <- function(input){
  tryCatch({
    # Take user input of URL and return text as words.
    text = scrape_web(input)
    # Split text into lists of sentences
    sentences = strsplit(text, "[.]")
    # Split up each sentence into words
    words <- strsplit(unlist(sentences), "[ ]")
    print(words)
  }, error = function(e) {
    AlgorithmError(paste("Please pass in a valid input", "\n", e))
  })
}
{% endhighlight %}

This should return a split up list of strings:

<img src="{{ site.baseurl }}/images/post_images/algo_dev_lang/tokenize_url.png" alt="Run basic algorithm in console" class="screenshot">

As you can see from these examples, fields that are passed into your algorithm by the user such as scalar values and sequences such as lists, dictionaries, tuples and bytearrays (binary byte sequence such as an image file) can be handled as you would any Python data structure within your algorithm.

For an example that takes and processes image data check out the [Places 365 Classifier's source code](https://algorithmia.com/algorithms/deeplearning/Places365Classifier).

## Error Handling

In the above code examples we showed how to create an AlgorithmError function which you should use for handling errors within your algorithm. This way the user can tell the difference between a standard R library error and an error thrown by your algorithm:

{% highlight r %}
AlgorithmError <- function(error){
  stop(error, call. = FALSE)
}
{% endhighlight %}

And then raise the error with a helpful error message:

{% highlight r %}
tryCatch({
    # Run your code
  }, error = function(e) {
    AlgorithmError(paste("Please pass in a valid input", "\n", e))
})
{% endhighlight %}

If you are creating an algorithm that relies on calling another algorithm you may use Algorithmia error messages for catching errors thrown by that algorithm:

{% highlight r %}
algo <- client$algo("util/Url2Text/0.1.4")
# Try calling without valid input
algo$pipe(list())$error$message
{% endhighlight %}

For more information on error handling see the [Algorithmia API Docs](http://docs.algorithmia.com/?r#error-handling).

## Algorithm Checklist

Before you are ready to publish your algorithm it's important to go through this [Algorithm Checklist]({{ site.baseurl }}/algorithm-development/algorithm-checklist/) and check out this blog post for <a href="https://blog.algorithmia.com/advanced-algorithm-design/">Advanced Algorithm Development <i class="fa fa-external-link"></i></a>.

Both links will go over important best practices such as how to create a good algorithm description, add links to external documentation and other important information.

## Publish Algorithm

Once you've developed your algorithm, you can publish it and make it available for others to use.

On the upper right hand side of the algorithm page you'll see a purple button "Publish" which will bring up a modal:

<img src="{{ site.baseurl }}/images/post_images/algo_dev_lang/publish_algorithm.png" alt="Publish an algorithm" class="screenshot img-sm">

In this modal, you'll see a Changes tab, a Sample I/O tab, and one called Versioning.

Changes shows you your commit history and release notes.

Sample I/O is where you'll create your sample input and output for the user to try under Try the API in the Run tab. When you add a sample input, make sure to test it out with all the inputs that you accept since users will be able to test your algorithm with their own inputs.

Under the Versioning tab, you can select whether your algorithm will be for public use or private use as well as set the royalty. The algorithm can either be royalty-free or charge per-call. If you opt to have the algorithm charge a royalty, as the author, you will earn 70% of the royalty cost.

Check out [Algorithm Pricing]({{ site.baseurl }}/pricing/) for more information on how much algorithms will cost to run.

Under Semantic Versioning you can choose which kind of release your change should fall under: Major, Minor, or Revision. 

If you are satisfied with your algorithm and settings, go ahead and hit publish. Congratulations, you’re an algorithm developer!

## Conclusion and Resources

In this guide we covered how to create an algorithm, work with different types of data and learned how to publish an algorithm.


## Additional Resources

* [Algorithmia CRAN package documentation](https://cran.r-project.org/web/packages/algorithmia/vignettes/introduction-to-algorithmia.html)
* [Algorithmia R client documentation]({{ site.baseurl }}/clients/r/)
* [Hosted Data Source]({{ site.baseurl }}/data/)
* [Algorithmia API Docs](http://docs.algorithmia.com/?r)
