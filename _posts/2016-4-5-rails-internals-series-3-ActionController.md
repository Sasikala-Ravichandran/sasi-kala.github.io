---
layout: post
title:  ActionController - Rails Internals Series - III
description: Part Three - Series of Rails Internals - ActionController
author: Sasikala Ravichandran
tags: [Rails, ActionController]
comments: true
disqus_identifier: f6463549-ead0-424c-bba4-aaf7f953009a
---

&ensp;&ensp;&ensp;&ensp;This is my third post of my Rails Internals series mainly focusing on ActionController library and its modules.

&ensp;&ensp;&ensp;&ensp;The *‘VC’* layer of the MVC paradigm is responsible for the handling incoming HTTP request and responding with any one of template formats HTML/XML/JSON/PDFs and much more. The *view* and *controller* layer of Rails are heavily interdependent on one another.

&ensp;&ensp;&ensp;&ensp;In Rails, ActionPack is the component/package in charge of *VC* layer of the application. ActionPack composes of several modules for different mechanisms. From [API documentation](http://api.rubyonrails.org/files/actionpack/README_rdoc.html){:class="tag_links"},

![ActionPack Modules]( /assets/posts_img/13_action_pack_modules.png){:class="sizing_partial"}

## Rails Controller

&ensp;&ensp;&ensp;&ensp;Let's dive deep into the *controller* layer.

&ensp;&ensp;&ensp;&ensp;Controllers in Rails are backed up by ActionController component. It receives request from the browser, fetch or save data in database and renders HTML output to the browser. All the controllers inherit from **ApplicationController** which in turn inherits from **ActionController::Base** class. Having *ApplicationController* gives us ability to configure things in one place and have the functionality available in all other controllers of the application. **For example**, adding features to *ApplicationController* like **request forgery protection** and **authorizing the user** before executing any controller actions are inherited by other controllers of the application. **ActionController::Base** provides us with number of helpful methods.

## Categories of ActionController Methods

&ensp;&ensp;&ensp;&ensp;I would like to categorize the methods added by the ActionController for understanding purpose.

![ActionPack Modules]( /assets/posts_img/14_methods_by_AC.png){:class="sizing_partial_alter"}

* ***Input category methods***   → request, params, session, cookie (if one available) 
* ***Storage category methods*** → session, cookie, flash
* ***Filter category methods***  → before_action, after_action, around_action
* ***Output category method***   → response method, render, redirect methods

&ensp;&ensp;&ensp;&ensp;**Note:** params, session, cookie, flash methods work like a hash.

## Action Controller methods in detail

![ActionPack Modules]( /assets/posts_img/15_flow_diagram.png){:class="sizing_partial"}

* **Request accessor method** of a controller points to **request object** which is instance of **ActionDispatch::Request**, associated with current request cycle. The request object has lots of properties/methods to get information about the request coming in from the client. Refer [API documentation](http://api.rubyonrails.org/classes/ActionDispatch/Request.html){:class="tag_links"} for all available Methods. For example, `request.url, request.method, request.request_method, request.path_parameters, request.query_parameters, request.request_parameters, request.body and so forth`

* All parameters from request (either *query string* from URL or POST data from *form*) are collected in **params** hash. 

* With each new request to server, the browser sends **session cookie** along with other cookies if it has any (session cookie and cookie was set in the previous request). We use **session, cookie, flash objects** provided by Rails to store small amount of data in browser cookie which is needed for further requests as HTTP is stateless protocol and does not persist the data between requests. **session** method is used to persist the data between the requests until the browser is closed. **cookie** method to persist until a specified expiration has been reached. **flash** method is used to persist the data until just the next request and cleared out in the next request(accessed in the view usually). All persisted data is accessed in our controller through session, cookie, flash hashes.

* Controller communicates with the database and performs CRUD actions where necessary and stores the data from db in an **instance variable** for making it available to the view. 

* **Storage mechanism**: Rails uses different storage mechanism to store data upto 4K to persist between requests. Refer [API documentations](http://api.rubyonrails.org/classes/ActionDispatch/Session.html)
  * *ActionDispatch::Session::CookieStore* - Stores everything on the client.
  * *ActionDispatch::Session::CacheStore* - Stores the data in the Rails cache. 
  * *ActionDispatch::Session::ActiveRecordStore* - Stores the data in a database using Active Record. (require activerecord-session_store gem).      
  * *ActionDispatch::Session::MemCacheStore* - Stores the data in a memcached cluster (this is a legacy implementation; consider using CacheStore instead).

* Filters are method to hook some behaviour on to the actions at very specific time (before_action, around_action, after_action). For example, A common "before" filter is one which authenticates the user for an action to be executed.

* **Response accessor method** returns a **response object** which is instance_of **ActionDispatch::Response**, represents what is going to be sent back to the client. The response object is not usually used directly, but is built up during the execution of the action (i.e) when calling render and redirect methods without developer intervention. Response object holds the headers and document data to be sent back to user.

* **Rendering mechanism:** Action Controller sends content to the user by calling rendering methods. Rendering happens automagically as the **ActionController** triggers **ActionView** which enables rendering the ERB templating. The controller uses instance variables to pass the objects to the view.
  
* **Redirecting mechanism:** After create, update and destroy action, we need to redirect to other action of the controller than just rendering a template. When **redirect_to** method is called, Rails uses HTTP status code **302**, a temporary redirect, to tell browser to make next request to the URL mentioned in location header field of the HTTP response.

## Play Time with ActionController methods

&ensp;&ensp;&ensp;&ensp;Below is the code I used to learn ActionController. I know its pretty big but still wanted to sample out here to get some idea.

{% highlight ruby %}
class WelcomeController < ApplicationController

  def new
    
    if defined?(request)
      puts "**************request method starts**************"
      puts request.class # => ActionDispatch::Request
      puts request.instance_of? ActionDispatch::Request # => true
      puts request.original_url # => http://localhost:3000?id=1
      puts request.path_parameters.class # => Hash
      puts request.path_parameters # => {:controller=>"welcome", :action=>"new"}
      puts request.query_parameters.class # => ActiveSupport::HashWithIndifferentAccess
      puts request.query_parameters # => {"id"=>"1"}
      puts request.request_parameters.class # => ActiveSupport::HashWithIndifferentAccess
      puts request.request_parameters # => {}
      puts request.request_method # => GET
      puts request.body # => #<StringIO:0x0055ff26808a60>
      puts request.headers # => #<ActionDispatch::Http::Headers:0x0055ff26760680>
      puts request.method # => GET
      puts request.flash.instance_of? ActionDispatch::Flash::FlashHash # => true
      if request.flash.empty?
        puts "testing flash for emptiness"
      else
        flash.each do |key,value|
          puts key # => prints keys
          puts value # => prints values
        end
      end
      puts "**************request method ends**************"
    end
    
    if defined?(params)
      puts "**************params method starts**************"
      puts params.class # => ActionController::Parameters
      puts params.instance_of? ActionController::Parameters # => true
      puts params.respond_to?('[]') # => true
      puts params[:controller] # => welcome
      puts params.is_a?(Hash) # => true
      params = ActionController::Parameters.new({ 
        person: {
          name: 'Francesco',
          age:  22,
          role: 'admin'
        }
      })
      permitted = params.require(:person).permit(:name, :age, :role)
      puts permitted
      # => {"name"=>"Francesco", "age"=>22, "role"=>"admin"}
      puts params[:person][:name] # => "Francesco"
      params = ActionController::Parameters.new(key: 'Testing')
      puts params[:key]  # => "Testing"
      puts params["key"] # => "Testing"
       puts "**************params method ends*************"
    end
    
    if defined?(session)
      puts "**************session method starts*************"
      puts session.class # => ActionDispatch::Request::Session
      puts session.instance_of? ActionDispatch::Request::Session # => true
      puts session.is_a?(Hash) # => false
      puts "**************session method end*************"
    end
    
    # Cookies, Sessions, Flash hashes, values was set in previous request
      puts cookies[:first] # => "First cookie"
      puts cookies[:second]  # => "Second cookie"
      puts session[:first] # => "First session"
      puts session[:second] # =>  "Second session"
      puts flash[:first] # => "First flash"
      puts flash[:second] # => "Second flash"
    
    if defined?(flash)
      puts "***************flash method starts*******************"
      puts flash.class # => ActionDispatch::Flash::FlashHash
      puts flash.instance_of? ActionDispatch::Flash::FlashHash  # => true
      puts flash.is_a?(Hash)  # => false
      puts "**************flash method ends*************"
    end
    
    # Setting new values in cookies, session, flash
    cookies[:first] = "First cookie again" # => Previously it was "First cookie"
    cookies[:second] = "Second cookie again" # => Previously it was "Second cookie"
    session[:first] = "First session again" # => Previously it was "First session"
    session[:second] = "Second session again" # => Previously it was "Second session"
    flash[:first] = "First flash again" # =>  Previously it was "First flash"
    flash[:second] = "Second flash again" # => Previously it was "Second flash"
    
    if defined?(response)
      puts "***************response method starts*****************"
      puts response.class # => ActionDispatch::Response
      puts response.instance_of? ActionDispatch::Response # => true
      puts response.is_a?(Hash) # => false
      puts response.status # => 200
      puts response.headers # => {"X-Frame-Options"=>"SAMEORIGIN", "X-XSS-Protection"=>"1; 
                                    # mode=block", "X-Content-Type-Options"=>"nosniff"}
      puts response.headers["Content-Type"] = "application/pdf" # =>
      puts response.content_type # => application/pdf
      puts "**************response method ends*************"
    end
  end
end
{% endhighlight %}

<hr>
#### **Other posts of the series:**
&ensp;&ensp;&ensp;&ensp;[<< 1 - Overview of web](/blog/rails-internals-series-1){:class="tag_links"}

&ensp;&ensp;&ensp;&ensp;[<< 2 - ActiveRecord ](/blog/rails-internals-series-2-ActiveRecord){:class="tag_links"}
<hr>

## References
&ensp;&ensp;&ensp;&ensp;[Rails API](http://api.rubyonrails.org/){:class="tag_links"}

&ensp;&ensp;&ensp;&ensp;[Rails Guides](http://guides.rubyonrails.org/){:class="tag_links"}
<br />