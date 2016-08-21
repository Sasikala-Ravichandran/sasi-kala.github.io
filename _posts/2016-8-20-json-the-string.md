---
layout: post
title:  JSON...
description: Details on JSON, the string 
author: Sasikala Ravichandran
tags: [JSON, Ruby, Javasscript]
comments: true
disqus_identifier: 4666a9f7-429b-493c-b19d-e7bf8c412b94
---

&ensp;&ensp;&ensp;&ensp;Initially things did not start clicking to me when I was learning about JSON until I understood how it is structured, what Javascript and Ruby does with it. My understanding is as follows:

&ensp;&ensp;&ensp;&ensp;Like XML and YAML, JSON is a data interchange format to pass structured information/data between systems/applications. JSON, first and foremost, is a *string* (ie) it is a sequence of zero or more Unicode characters, wrapped in double quotes, using   backslash escapes and nothing more than that. But it has its own syntax or its little own rule about its structure. With its format or structure, it is a string (enclosed in quotes) in which a **real object is hidden for exchanging the data between different languagues** like Ruby and Javascript. For example, wrapping Javascript 'object' or Ruby 'hash' with quotes becomes JSON string. Its as simple as that. Since every programming languages have their own way to define the data, JSON string will be converted into language specific data structure. In case of Ruby, JSON string is converted into a hash whereas in Javascript, JSON is converted into an object. 

## JSON RULES
 
 1) Its a collection of key value pair. Almost all the OOPS languague has datastructure which stores the data in the key value pair.
 2) Key should be a string enclosed in double quotes
 3) Value could be a string, a number, an array, an object, a boolean, null
 4) No methods are allowed

## Ruby Hash
&ensp;&ensp;&ensp;&ensp;Ruby hash is a data structure to organize data in the key value pair. A key could either be a symbol or a string and when JSON string is generated from Ruby hash, key always becomes string in JSON enclosed in " ".

{% highlight ruby %}


Real Data in Ruby Hash,

response = { valid: true, data: "Happy Learning" }
response[:valid]  # => true
response[:data] # => "Happy Learning"

To Convert Hash to JSON,

to_json = response.to_json # => "{\"valid\":true,\"data\":\"Happy Learning\"}"

To Get Back Ruby Hash from JSON String,

back_to_hash = JSON.parse(to_json) # => {"valid"=>true, "data"=>"Happy Learning"}
back_to_hash["valid"] # => true
back_to_hash["data"] # => "Happy Learning"

{% endhighlight %}

**Type and class**
{% highlight ruby %}

response.is_a?(Hash) # => true
response.class # => Hash

to_json.is_a?(String) # => true
to_json.class # => String

back_to_hash.is_a?(Hash) # => true
back_to_hash.class # => Hash

{% endhighlight %}

## Javascript Object
&ensp;&ensp;&ensp;&ensp;Javascript object is a collection of properties which are stored by a key value pair. When JSON string is generated from an object, property name becomes keys and enclosed in " ".

{% highlight ruby %}

Real Data in Javascript Object,

response = { valid: true, data: "Happy Learning" }
response.valid  # => true
response["valid"] # => true
response['valid'] # => true
response.data # => "Happy Learning"
response["data"] # => "Happy Learning"
response['data'] # => "Happy Learning"

To Convert Object to JSON String,
 
to_json = JSON.stringify(response) # => "{"valid":true,"data":"Happy Learning"}"

To Convert Back to JS Object,

back_to_object = JSON.parse(to_json)
back_to_object.valid  # => true
back_to_object["valid"] # => true
back_to_object['valid'] # => true
back_to_object.data # => "Happy Learning"
back_to_object["data"] # => "Happy Learning"
back_to_object['data'] # => "Happy Learning"

{% endhighlight %}

**Type**

{% highlight ruby %}

typeof(response) # => "object"
typeof(to_json) # => "string"
typeof(back_to_object) # => "object"

{% endhighlight %}

*Note:* In Ruby & in Javascript, a string can be written in both single quotes and double quotes (by escaping the double quotes). For example, '{"status": "SUCCESS"}' is same as writing like this "{\\"status\\": \\"SUCCESS\\"}".

## One Perfect Scenario: 
&ensp;&ensp;&ensp;&ensp;One of the use case in web development is to pass JSON string between Ruby and Javascript via AJAX. Descriptively, JSON is a string contains the data to be passed between frontend framework (AngualrJS) to backend framework (Rails).