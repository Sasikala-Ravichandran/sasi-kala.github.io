---
layout: post
title:  ActiveRecord - Rails Internals Series - II
description: Part Two - Series of Rails Internals - ActiveRecord
author: Sasikala Ravichandran
tags: [Rails, ActiveRecord]
comments: true
disqus_identifier: b1cb8284-0990-4c5a-9011-5d274399d52d 
---

&ensp;&ensp;&ensp;&ensp;This is my second post of my Rails Internals series mainly focusing on ActiveRecord library and its modules.
 
&ensp;&ensp;&ensp;&ensp;The *‘Model’* component of Rails deals with business rules and business data that the users of an application work with. A web applications converts the business data into database value. In Rails, this conversion happens by using ActiveRecord library that implements ORM (Object Relational Mapping). Below diagram shows the translation of information from a user to database.

![Transformation of Data]( /assets/10_Flow of Data.jpg){:class="sizing_partial"}

&ensp;&ensp;&ensp;&ensp;In general, ActiveRecord as a whole gives us various facilities like

  * Persisting the data that can be retrieved from the database and rendered in view templates.
  * Querying the database.
  * Ensuring data integrity in database by applying validations on data coming from the
  outside world before it is being persisted.
  * Defining relationship between two models and much more.

&ensp;&ensp;&ensp;&ensp;In context to Rails, Ruby class which inherits from the **ActiveRecord::Base** class is called __Model__.  Base class sets up mapping between the model and table in the database.  Also series of modules are included in Model class from ActiveRecord library.

## Major Features of ActiveRecord

  * Automatic mapping between given model class to certain database table and attributes of the class to columns of the table using migration.
  * Storing each model object's properties (data) as a row in the corresponding table.
  * Model class doesn’t specify its attributes directly but infers from database schema to which it is linked. This technique is called *reflection*. 
  * Adding, removing, and changing attributes and their type is done directly in the database using migration file which will reflected in corresponding Model class.
  * Active Record provides methods to perform CRUD operations (allows an app to read and manipulate data from database)
  * Using accessors/attribute methods (getter and setter methods of the Model), column values of the database table can be set or retrieved 
  * Attribute query methods like @user.name? (where ‘@user’ is object of User Model and ‘name’ is one of attributes of User model) are created for a given model.
  * Dynamic finder methods based on attributes of the model are provided. For example, *'User'* model with attributes like *'id', 'name', 'email', and 'admin'* will have following dynamic finder methods. **User.find_by_name(“John Doe”)** , **User.find_by_name_and_email(“John Doe”, “johnd@example.com”)** , **User.find_by_name_and_id_and_admin(“John Doe”, 1, true)**.
  * Validation, Association, Callback, Migration methods are available to Model.

&ensp;&ensp;&ensp;&ensp;Let's visualize that when model objects are created in ActiveRecord context, they are born with their innate nature of how to work with database, validate their properties and so forth. These innate behaviours are added from series of modules like Core module, Persistence module, Relation module, Enum module, Association Module etc.. from Active Record library.

![Model Objects]( /assets/11_objects_in_AR_context.jpg){:class="sizing_partial"}

&ensp;&ensp;&ensp;&ensp;Once Model can be created and migrated to database, we can play with all methods added to our model using rails console.  For example, in an application, let's assume *‘User’* Model and *‘users’* table exist. To view all methods available for 'User' model, execute `User.methods.sort` in rails console, to view only instance methods of the model, execute `User.instance_methods.sort`, to view only class methods execute `(User.methods - User.instance_methods).sort`.

## Modules and their methods

![Modules and their methods]( /assets/12_modules_table.jpg){:class="sizing_partial"}

&ensp;&ensp;&ensp;&ensp;Here I just listed few modules to get hang of them. We can’t remember or memorize every method from every module. So I attempted to blog tiny bit about ActiveRecord at least to have little awareness towards ‘under the hood’ of Rails. Hope you find this post useful.

## Reference
&ensp;&ensp;&ensp;&ensp;[Rails API](http://api.rubyonrails.org/)<br />
&ensp;&ensp;&ensp;&ensp;[Rails Guides](http://guides.rubyonrails.org/)
<br />