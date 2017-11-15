---
layout: article
title:  "Python"
excerpt: "Build your algorithm in Python"
categories: languages
tags: [algo-guide-lang]
show_related: true
author: steph_kim
image:
    teaser: /language_logos/python.svg
---

Welcome to algorithm development in Python.

This guide will take you through the steps to getting started in algorithm development and cover the basics of managing dependencies, working with various types of inputs and outputs, calling other algorithms and managing data.

By the end of the guide you will see how to develop a couple of simple algorithms and you'll be ready to start contributing to the algorithm marketplace.

Table of Contents

* [Available Libraries](#available-libraries)
* [Create an Algorithm](#create-an-algorithm)
* [Managing Dependencies](#managing-dependencies)
* [Write your First Algorithm](#write-your-first-algorithm)
* [I/O for your Algorithms](#io-for-your-algorithms)
* [Error Handling](#error-handling)
* [Algorithm Checklist](#algorithm-checklist)
* [Publish Algorithm](#publish-algorithm)
* [Conclusion and Resources](#conclusion-and-resources)

## Available Libraries

Algorithmia makes a number of libraries available to make algorithm development easier.

The full <a href="https://docs.python.org/2/">Python 2 language and standard library</a> and <a href="https://docs.python.org/3/">Python 3 language and standard library</a>
is available for you to use in your algorithms.

Also, you can utilize common Python libraries such as Scikit-Learn, Tensorflow, Numpy and many others by adding them as a dependency in your algorithm.

Furthermore, algorithms can call other algorithms and manage data on the Algorithmia platform
via the <a href="{{ site.baseurl }}/clients/python/">Algorithmia Python Client</a>.

## Create an Algorithm

Let's start by creating an algorithm. First navigate to [Algorithmia](https://algorithmia.com) and by hovering over your profile avatar at the top right of the navbar, you'll see a dropdown with a button that says "Add Algorithm". Go ahead and click that button.

<img src="{{ site.baseurl }}/images/post_images/algo_dev_lang/add_algorithm_nav.png" alt="Add algorithm navigation">

When you click the "Add Algorithm" button, you'll see a form for creating your algorithm that we'll fill out step by step below:

<img src="{{ site.baseurl }}/images/post_images/algo_dev_lang/create_algorithm_python.png" alt="Create an algorithm in Python" class="screenshot img-sm">

**Algorithmia Name:** The first thing you'll notice in the form is the field "Algorithm Name" which will be the name of your algorithm. You'll want to name your algorithm something descriptive based on what the algorithm does.

For example this guide shows how to create an algorithm that splits text up into words, which is called tokenizing in natural language processing. So, this example algorithm is called "Tokenize Text", but go ahead and name your algorithm according to what your code does.

**Algorithm ID:** The unique AlgoURL path users will use to call your algorithm.

**Language:** Next you'll pick the language of your choice. This is the Python guide and this algorithm uses Python 3.

**Source Code:** Because we want to make this algorithm open source and available for everyone to view the source code, we'll choose "Open Source".

As an incentive to promote community contributions, open source algorithms on the Algorithmia Platform will earn 1% of the usage cost (0.01cr/sec of execution time).

**Special Permissions:** Next is the "Special Permissions" section that allows your algorithm to have access to the internet and allows it to call other algorithms. In this example we'll want access to the internet and since our final algorithm will call another algorithm we want to select "Can call other algorithms" as well.

Also under Special Permissions, you can select "Standard execution environment" or "Advanced GPU". Since our algorithm isn't processing large amounts of data needed to run on a GPU environment, we'll select "Standard execution environment".

You can find out more about algorithm permissions in the [Algorithm Permissions Section]({{ site.baseurl }}/basics/permissions/).  Also, consider whether your algorithm would benefit from using a Graphics Processing Unit to accelerate certain kinds of computation, such as image processing and deep learning. When "Advanced GPU" is selected, the algorithm will run on servers with GPU hardware, with specific drivers and frameworks to help algorithm developers take advantage of GPU computing. This includes nvidia drivers, CUDA support, and several of the most popular deep learning frameworks, including TensorFlow, Caffe, Theano, and Torch.
{: .notice-info}

Now hit the "Create" button on the bottom lower right of the form and you'll see this modal:

<img src="{{ site.baseurl }}/images/post_images/algo_dev_lang/create-algo-cli.png" alt="cli info modal" class="screenshot">

You can now clone your Algorithm (via Git) and install the CLI to edit/test locally, **or** you can close the modal and continue to create your algorithm in the Web IDE.

#### Editing your algorithm locally via GIT & CLI

The preferred way to edit and test your Algorithm's code is to install the CLI on your local machine, clone your algorithm's repo via Git, and use your favorite editing tools to modify the code. This gives you the benefits of using a familiar development environment, plus an easy way to test your changes locally before committing changes back to the repo and publishing a new algorithm version.

To learn more about this process, Algorithmia's [CLI]({{ site.baseurl }}/clients/cli/) and [Git]({{ site.baseurl }}/algorithm-development/git/) guides. If you're already familiar with the CLI and Git, the basic steps you need to take are:

1. Install the CLI: `curl -sSLf https://algorithmia.com/install.sh | sh` (Windows instructions [here](https://algorithmia.com/developers/clients/cli/#installing-the-algorithmia-cli) ) 
2. Clone your algorithm: `algo clone username/algoname`
3. Use your preferred editor to modify the code
4. Test your algorithm: `cd algoname; algo runlocal -D [JSON FILE]`
5. Commit your changes: `git commit -m [commit message]; git push origin master`
6. Publish your changes: for now, you must do this via the web IDE:
    1. visit [https://algorithmia.com/user](https://algorithmia.com/user)
    2. click on your algorithm
    3. click "Edit Source"
    4. click "Compile", then "[Publish](#publish-algorithm)"

#### Editing your algorithm via the web IDE

If you prefer to continue creating your algorithm in the Web IDE, simply close the modal and you should see the algorithm descrption page for your newly created algorithm:

<img src="{{ site.baseurl }}/images/post_images/algo_dev_lang/generic_algorithm_description.png" alt="Algorithm console Python" class="screenshot">

Notice the tabs: Run, Docs, Cost, Discussion, Manage, and Source.

The tab currently showing "Run" is where users can run the algorithm with the default input that you will provide during the publishing step of the algorithm or they can run their own input to test out your algorithm. Also, on this tab, you can add a short summary stating what your algorithm is and why people might be interested in it (for example how it solves a particular problem in a use case). 

"Docs" consists of the section that you will want to show how to use your algorithm including complete information about the input types allowed and what the expected outputs will be.

"Cost" will be filled out automatically once you publish your algorithm and will show if you've chosen to charge royalites or if you've decided to open source your algorithm. It will also give the estimated cost so the user consuming your algorithm can see how much it will cost.

The "Discussion" tab shows the comments and questions from users so you can keep up to date regarding user feedback. 

Under the "Manage" tab you can see how to clone your algorithm, see what items are checked off in the Algorithm Checklist and see permissions for your algorithm which were set when you created your algorithm.

Finally click on the "Source" tab which will display the UI for creating your algorithm if you prefer it over the CLI:

<img src="{{ site.baseurl }}/images/post_images/algo_dev_lang/algorithm_console_python.png" alt="Algorithm console Python" class="screenshot">

## Write your First Algorithm

As you can see in your algorithm editor, there is a basic algorithm already written that takes a string as input and returns the string "Hello" followed by the user input.

The main thing to note about the algorithm is that it's wrapped in the apply() function.

The apply() function defines the input point of the algorithm. We use the apply() function in order to make different algorithms standardized. This makes them easily chained and helps authors think about designing their algorithms in a way that makes them easy to leverage and predictable for end users.

To run this algorithm first hit the "Compile" button on the top right hand corner of the algorithm editor and then at the bottom of the page in the console you'll see a confirmation that it has compiled and the version number of that commit.  Until you have Published your algorithm, the version number will be a hash such as `4be0e18fba270e4aaa7cff20555268903f69a11b` - only you will be able to call this version.  After you've Published an algorithm, it will be given a `major.minor.revision` number as described in the [Versioning Documentation]({{ site.baseurl }}/basics/versioning/).

Compiling your algorithm will also save your work, but note that the first time you compile your algorithm it might take some time while subsequent compiles will be quicker.
{: .notice-info}

To test the algorithm type your name or another string in the console and hit enter on your keyboard:

<img src="{{ site.baseurl }}/images/post_images/algo_dev_lang/run_default_algo.png" alt="Run basic algorithm in console Python" class="screenshot">

## Managing Dependencies

Algorithmia supports adding 3rd party dependencies via the <a href="https://pypi.python.org/pypi">Python Package Index (PyPI)</a> using a requirements.txt file.

On the algorithm editor page there is a button on the top right that says "Dependencies". Click that button and you'll see a modal window:

<img src="{{ site.baseurl }}/images/post_images/algo_dev_lang/dependencies_python.png" alt="Python Dependency File" class="screenshot img-md">

If you have any dependencies you can add them by typing in the package name to the `requirements.txt` file.

This guide won't depend on any external dependencies so you can close the dependencies window.

**Note:** If you do add dependencies, you will still need to import those packages via the import statement to your algorithm file as you would do for any Python script.

For example, to make use of numpy, you would include the line:

`numpy`

in the dependencies file and the line

`import numpy as np`

in the main file.

## I/O for your Algorithms

Now that you've compiled and ran a basic algorithm in the console, we'll briefly go through some of the inputs and outputs you would expect to work with when creating an algorithm.

The first algorithm that we'll create will take a JSON formatted object passed as input by the user which is deserialized into a Python dictionary before the algorithm is called.

It will output a JSON formatted object which the user will consume with an API call to the algorithm path. 

This path is based on your Algorithmia user name and the name of your algorithm, so if you are “AdaDeveloper” and your algorithm is “TokenizeText”, then the path for version 0.1.1 of your algorithm will be AdaDeveloper/TokenizeText/0.1.1

### Working with Basic Data Structures

This example shows how to find the minimum and maximum of a list of numbers that the user passes in when calling the algorithm:

{% highlight python %}
import Algorithmia

# Note that you don't pass in your API key when creating an algorithm
client = Algorithmia.client()


class AlgorithmError(Exception):
    """Define error handling class."""

    def __init__(self, value):
        self.value = value

    def __str__(self):
        return repr(self.value).replace("\\n", "\n")


def apply(input):
    """Finds the minimum and maximum numbers in a list."""

    # Check for numbers field and make sure it contains a list.
    if "numbers" in input and isinstance(input["numbers"], list):
        # Get the value of the field "numbers"
        user_list = input.get("numbers")
        try:
            user_max = max(user_list)
            user_min = min(user_list)
            return {"min_num": user_min, "max_num": user_max}
        except TypeError as e:
            print("Please use numeric data types in your list: ", e)
    else:
        # Raise helpful error message
        raise AlgorithmError(
            "Please provide a valid input that includes an array of numbers in the field 'numbers'")

{% endhighlight %}

Go ahead and type or paste the code sample above in the Algorithmia code editor after removing the "Hello World" code.

Now compile the new code sample and when that's done test the code in the console by passing in the input and hitting enter on your keyboard:

{% highlight python %}
{"numbers": [1, 4, 2, 6, 3]}
{% endhighlight %}

You should see the minimum and maximum of the numbers in the list returned in the console:
{% highlight python %}
{"max_num":6, "min_num":1}
{% endhighlight %}

### Working with Data Stored on Algorithmia

This next code snippet shows how to create an algorithm working with a data file that a user has stored using Algorithmia's [Hosted Data Source]({{ site.baseurl }}/data/hosted).

While users who consume an algorithm have access to both Dropbox and Amazon S3 connectors, algorithm developers can only use the Algorithmia [Hosted Data Source]({{ site.baseurl }}/data/hosted) to host data for algorithm development.
{: .notice-warning}

#### Prerequisites
If you wish to follow along working through the example yourself, create a text file that contains any unstructured text such as a chapter from a public domain book or article. We used a chapter from [Burning Daylight, by Jack London](https://en.wikisource.org/wiki/Burning_Daylight) which you can copy and paste into a text file. Or copy and paste it from here: <a href="{{ site.baseurl }}/data_assets/burning_daylight.txt">Chapter One Burning Daylight, by Jack London</a>. Then you will can upload it into one of your [Data Collections](https://algorithmia.com/data/hosted).

This example shows how to create an algorithm that takes a user's file which is stored in a data collection on the Algorithmia platform. It then splits up the text into sentences and then splits those sentences up into words:

{% highlight python %}
import Algorithmia

# Note that you don't pass in your API key when creating an algorithm
client = Algorithmia.client()

class AlgorithmError(Exception):
  """Define error handling class."""

    def __init__(self, value):
        self.value = value

    def __str__(self):
        return repr(self.value).replace("\\n", "\n")

def apply(input):
    """Take a user file holding text content and returns text split into words."""

    # Check if the file exists in the user specified data collection.
    if "user_file" in input and client.file(input["user_file"]).exists():
        user_file = input["user_file"]
        # Get the contents of the file as a string.
        text = client.file(user_file).getString()
        # Split text into lists of sentences
        sentences = text.split(".")
        # Split up each sentence into words.
        words = [item.split(" ") for item in sentences if len(item) > 0]
        # Return dictionary of original text and the sentences broken up into their separate words.
        return {"text": text, "words": words}
    else:
      # Raise helpful error message
      raise AlgorithmError("Please provide a valid input")
{% endhighlight %}

After you paste the above code into the Algorithmia code editor you can compile and then test the example by passing in a file that you've hosted in [Data Collections](https://algorithmia.com/data/hosted).

Following the example below replace the path to your data collection with your user name (it will appear already if you are logged in), data collection name, and data file name which you can find under "My Collections" in [Data Collections](https://algorithmia.com/data/hosted):

{% highlight python %}
{"user_file": "data://YOUR_USERNAME/data_collection_dir/data_file.txt"}
{% endhighlight %}

The code above with return both the original text and the list of each sentence split up into words.

This guide uses a chapter from the public domain book [Burning Daylight, by Jack London](https://en.wikisource.org/wiki/Burning_Daylight), but for brevity we'll only show the first sentence in "text" and "words":

{% highlight python %}
{"text": "It was a quiet night in the Shovel.", "words": [['It', 'was', 'a', 'quiet', 'night', 'in', 'the', 'Shovel']]}
{% endhighlight %}

When you are creating an algorithm be mindful of the data types you require from the user and the output you return to them. Our advice is to create algorithms that allow for a few different input types such as a file, a sequence or a URL.
{: .notice-info}

### Writing files for the user to consume

Sometimes it is more appropriate to write your output to a file than to return it directly to the caller.  In these cases, you may need to create a temporary file, then copy it to a [Data URI](http://docs.algorithmia.com/#data-api-specification) (usually one which the caller specified in their request, or a [Temporary Algorithm Collection](https://algorithmia.com/developers/data/hosted#temporary-algorithm-collections)):

{% highlight python %}
# {"target_file":"data://username/collection/filename.txt"}
file_uri = input["target_file"]
tempfile = "/tmp/"+uuid.uuid4()+".tmp"
save_some_output_to(tempfile)
client.file(file_uri).putFile(tempfile)
{% endhighlight %}

### Calling Other Algorithms and Managing Data

To call other algorithms or manage data from your algorithm, use the <a href="{{ site.baseurl }}/clients/python/">Algorithmia Python Client</a> which is automatically available to any algorithm you create on the Algorithmia platform. For more detailed information on how to work with data see the [Data API docs](http://docs.algorithmia.com/).

You may call up to 24 other algorithms, either in parallel or recursively.

Here is an example of creating an algorithm that relies on data from another algorithm:

{% highlight python %}
import Algorithmia

# Note that you don't pass in your API key when creating an algorithm
client = Algorithmia.client()


class AlgorithmError(Exception):
    """Define error handling class."""

    def __init__(self, value):
        self.value = value

    def __str__(self):
        return repr(self.value).replace("\\n", "\n")


def scrape_web(input):
    """Call algorithm that returns main text content from a URL."""

    algo = client.algo("util/Url2Text/0.1.4")
    if "URL" in input and input["URL"].startswith("http://") or input["URL"].startswith("https://"):
        response = algo.pipe(input["URL"]).result
        return response
    else:
        # Raise helpful error message
        raise AlgorithmError("Please provide a valid URL")

def apply(input):
    """Take user input of URL and return text split up as words."""

    text = scrape_web(input)
    # Split text into lists of sentences
    sentences = text.split(".")
    # Split up each sentence into words.
    words = [item.split(" ") for item in sentences if len(item) > 0]
    return words
{% endhighlight %}

Go ahead and try the above code sample in the Algorithmia code editor and then type the input into the console:
{% highlight python %}
{"URL": "http://github.com"}
{% endhighlight %}

This returns a list of words:

<img src="{{ site.baseurl }}/images/post_images/algo_dev_lang/tokenize_url.png" alt="Run basic algorithm in console" class="screenshot">

As you can see from these examples, fields that are passed into your algorithm by the user such as scalar values and sequences such as lists, dictionaries, tuples and bytearrays (binary byte sequence such as an image file) can be handled as you would any Python data structure within your algorithm.

For an example that takes and processes image data check out the [Places 365 Classifier's source code](https://algorithmia.com/algorithms/deeplearning/Places365Classifier).

## Error Handling

In the above code examples we showed how to create an AlgorithmError class which you should use for handling errors within your algorithm. This way the user can tell the difference between a standard Python library error and an error thrown by your algorithm:

{% highlight python %}
class AlgorithmError(Exception):
  """Define error handling class."""

    def __init__(self, value):
        self.value = value

    def __str__(self):
        return repr(self.value).replace("\\n", "\n")
{% endhighlight %}

And then raise the error with a helpful error message:

{% highlight python %}
raise AlgorithmError("Please provide a valid URL")
{% endhighlight %}

If you are creating an algorithm that relies on calling another algorithm you may use Algorithmia error messages for catching errors thrown by that algorithm:

{% highlight python %}
import Algorithmia

client = Algorithmia.client()
# An algorithm that takes a URL
algo = client.algo("util/Url2Text/0.1.4")

try:
  	print(algo.pipe(input).result)
except Exception as error:
    print(error)
{% endhighlight %}

For more information on error handling see the [Algorithmia API Docs](http://docs.algorithmia.com/?python#error-handling).

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

For more resources:

* <a href="{{ site.baseurl }}/clients/python/">Algorithmia Client Python Docs</a>
* [Hosted Data Source]({{ site.baseurl }}/data/)
* [Algorithmia API Docs](http://docs.algorithmia.com/?python)
* <a href="https://docs.python.org/2.7/">Python 2.7 Docs <i class="fa fa-external-link"></i></a>
* <a href="https://docs.python.org/3/">Python 3 Docs <i class="fa fa-external-link"></i></a>
