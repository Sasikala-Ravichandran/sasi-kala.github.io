---
layout: post
title:  Rails Internals Series
description: Part one - Series of Rails Internals
author: Sasikala Ravichandran
tags: [Web, HTTP, MVC, REST]
comments: true
disqus_identifier: 05bfaa6c-ae4a-4b12-9c02-1d1befe2cfb2  

---

&ensp;&ensp;&ensp;&ensp;I have been learning and practising Rails for nearly an year. At one point in my learning journey, I realized that knowing Rails and its components and how they tied together to function as a web application, I was able to get a good grip of the building process of web application. Also learning the building blocks of Rails helped me to know what Ruby on Rails as a web framework offers to web developers and how it makes the development process easy. Hence the result is series of posts with what I learnt about Rails Internals (especially from the beginner's prespective).

&ensp;&ensp;&ensp;&ensp;This post is the first part of the Rails Internal Series. Although there are tons and tons of resources about web technologies available in web, I start with my tiny bit explanation about them as this post keeps the flow of series going. Here are the very basic and minimal description of web technologies. I hope this series will be helpful and informative to anyone who is starting  to learn Rails.

## Client-Server Model

![client-server model]( /assets/7_client_server.png){:class="sizing_partial"}

&ensp;&ensp;&ensp;&ensp;Web technologies like HTML, CSS, jQuery, Ajax, HTTP, web frameworks and so forth are built around client-server model. In this architecture, Client(web browser) and  Server(host of web application) are connected to the Internet. Always client initiates the communication by making a request to access a web page(HTML document) which is hosted in the web server. To every request, web server responds with a web page (i.e) copy of the requested web page and its assets like images, music, video, Word documents,PDFs etc are downloaded from the server to client machine which is to be displayed in web browser. Usually web page is written in one of markup languages (HTML/XML). Other than browser and web server, there are many other components work together to make the communication possible like Internet connection, TCP/IP, DNS, HTTP etc.

## HTTP Protocol

![HTTP Model]( /assets/8_HTTP_Model.png){:class="sizing_partial"}

&ensp;&ensp;&ensp;&ensp;HTTP is the back bone for Internet. It is based on the request-response model. It is a communication protocol through which browser and web server communicate using TCP/IP. *TCP/IP is the protocol that define how data should travel across the Web.* HTTP helps to construct the request and response message in a such way that client and server understand each other on the web. Resources which are transferred between them are  a chunk of the information identified by an URL. Usually resource could be a file or dynamically generated query result or a script or a document. 

&ensp;&ensp;&ensp;&ensp;Important and Basic feature to know about HTTP is that it is a stateless protocol (i.e) the server and browser know each other only during a current request and response cycle. Afterwards, both of them forget about each other. Due to this nature, either the browser or server can’t retain information between different request of the communication cycle.

## HTTP Request-Response Messages 

![HTTP message format]( /assets/9_HTTP_Message_Format.jpg){:class="sizing_partial"}

&ensp;&ensp;&ensp;&ensp;When we enter the URL in the browser, it translates the URL into a request message using URI and HTTP method according to the HTTP protocol standards and sends the request across the internet using TCP/IP. Web server receives the request and responds with the requested web page. So irrespective of how complex the application logic is, web application always responds with HTML as the browser intercepts HTML and displays web pages along with its assets like CSS, JavaScript and so forth. Hence Web server or Web application's primary job is to receive a request, process the request and create the HTML output.

For example, the browser translates the following URL `http://www.xxxxx.com/guide/index.html` into a request message:

{% highlight sh %}

GET /guide/index.html HTTP/1.1
Host: www.xxxx.com
Accept: image/gif, image/jpeg, */*
Accept-Language: en-us
Accept-Encoding: gzip, deflate
User-Agent: Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1)
(blank line)
{% endhighlight %}

When the server receives this request message, one of the following action takes place:
*<br>
&ensp;&ensp;&ensp;&ensp;1) It maps the request to a file under its document directory and returns the file to the browser.
<br>
&ensp;&ensp;&ensp;&ensp;2) It maps the request to a program which is kept within it, then executes the program, and returns the output of the program to the client.
<br>
&ensp;&ensp;&ensp;&ensp;3) when the request cannot be satisfied, it returns an error message.*

An example of the HTTP response message is as shown:

{% highlight sh %}

HTTP/1.1 200 OK
Date: Sun, 18 Oct 2015 08:56:53 GMT
Server: Apache/2.2.14 (Win32)
Last-Modified: Sat, 20 Nov 2015 07:16:26 GMT
ETag: "10000000565a5-2c-3e94b66c2e680"
Accept-Ranges: bytes
Content-Length: 44
Connection: close
Content-Type: text/html
X-Pad: avoid browser bug
  
<html><body><h1>Guide</h1><p>This is guide on HTTP protocol</p></body></html>

{% endhighlight %}

The browser receives the response message, interprets it and displays the contents of the message on the browser's window according to the media type of the response (as in the Content-Type response header). Common media type include "text/plain", "text/html", "image/gif", "image/jpeg", "audio/mpeg", "video/mpeg", "application/msword", and "application/pdf".

## HTTP Terminologies
**1) URL & URI**

&ensp;&ensp;&ensp;&ensp;A URL (Uniform Resource Locator) is used to uniquely identify a resource (HTML document and its assets) over the web. A URI (Uniform Resource Identifier) is the part of the URL after the hostname and port. 
<br>URL has the following syntax: `protocol://hostname:port/path-and-file-name`

**a) Protocol:** The application-level protocol used by the client and server, e.g., HTTP, FTP, and telnet.<br>
**b) Hostname:** The DNS domain name (e.g., www.xxxx.com) or IP address (e.g., 192.158.15.20) of the server.<br>
**c) Port:** The TCP port number that the server is listening for incoming requests from the clients.<br>
**d) Path-and-file-name(URI):** The name and location of the requested resource, under the server document base directory.
<br>
For example, in the URL `http://www.xxxx.com/guide/index.html`, the communication protocol is `HTTP`, the hostname is `www.xxxx.com`, the port number was not specified in the URL, and takes on the default number, which is TCP port `80` for HTTP and the URI is `/guide/index.html`, the location of the `index.html` in the web server.
<br>Some more examples of URL are: `ftp://www.ftp.org/docs/test.txt`, `mailto:user@xxxx.com` 

**2) HTTP methods** 

&ensp;&ensp;&ensp;&ensp;Every request message has a method (HTTP verbs) which tells the server what the request is intended for (e.g `GET` method is intended to get the data from the web app and `POST` method is intended to send the data to web application)

**GET:** Verb used to get a web resource from the server. During `GET` request, the state of web application does not get changed (for example, it does not create a new user account based on a GET request). Hence, `GET` requests are usually considered "safe".<br>
**POST:** Verb used to post/send data up to the web server.  It results in changing the state of the application. For example, signing up for a web site by entering user info on a form and sending the   data contained in the form to server. `POST` request does not always result in a new HTML page being sent to the client. Instead, the client uses the response's response code to determine if the operation on the application was successful.<br>
**PUT:** Verb used to ask the server to store the data.<br>
**DELETE:** Verb used to ask the server to delete the data.

**3) HTTP Response Code**

&ensp;&ensp;&ensp;&ensp;As we know that the Web application sends the response to every request. The Server uses response code to tell the client what has happened to the request being received.The status code is a 3-digit number.

{% highlight sh %}

1xx (Informational): Request received, server is continuing the process.
2xx (Success): The request was successfully received, understood, accepted and serviced.
3xx (Redirection): Further action must be taken in order to complete the request.
4xx (Client Error): The request contains bad syntax or cannot be understood.
If the request is successfully received,200 is sent by server ususally

{% endhighlight %}

## Web Application

&ensp;&ensp;&ensp;&ensp;First and foremost, an application is a software designed to provide the solution to a specific problem or it  allows the users to accomplish a specific tasks. So Web Application is an application which uses web technologies to allow users to perform specific tasks over the network(Internet). User just needs Internet connection and web browser to access the application from anywhere. 
  
## Web framework
   
&ensp;&ensp;&ensp;&ensp;Almost all the web applications perform certain common tasks like handling HTTP request, dispatching the code that generates HTML, creating HTTP response with the dynamic content and so forth. It becomes totally mundane and tedious process for a developer to write the code every time for common tasks. Hence web framework emerged to take care of the nitty-gritty details of building web application leaving developers to focus on the solving the business issues. 

**Core Common functionalities of the web framework**

*1) Inspecting the requested URL and returning the appropriate page<br>
2) Routing aspects of an web application which is to map a requested URL to the code that is meant to handle it<br>
3) Dealing with different request methods like GET, POST, PUT and DELETE<br>
4) Handling sessions and cookies<br>
5) Creating the requested HTML page from template dynamically, injecting calculated values or information retrieved from a database<br>
6) Mapping resources to database tables and abstracting away the differences between various database engines<br>
7) Scaling the application to handle thousands of concurrent connections*
 
## REST and MVC

&ensp;&ensp;&ensp;&ensp;I finish off this post with little intro to REST and MVC as Rails complies with them.

**REST*(REpresentational State Transfer)*** is an architectural style for designing an application from communication perspective ie. *how our application communicates with outside world* based on use of HTTP request methods. It is optimized for modern web architecture.

**MVC** is a design pattern for developing the web application which mains at isolating functionalities of an application logically. 

**Model** layer defines the business data and rules (business logic) and it takes care of mapping the business objects of the application to tables of the RDMS. **Controller** layer handles the incoming HTTP requests, saves/updates  the data to the model or queries the model for specific data and makes the data available to the view template and renders the HTML page to the browser. **View** gets the database dynamic driven data from the controller and generates the html output and makes it available to the controller which in return sends the web page to the browser.

&ensp;&ensp;&ensp;&ensp;Enough said about web technologies, I will delve into Rails internals for the rest of the series.
