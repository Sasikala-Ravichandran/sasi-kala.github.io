---
layout: post
title:  Key terms and concepts
description: Key terms and concepts - Operating System, Shell, Environment Variables, Commands, Tools, Executables, Compilers, bytecodes, Ruby, Gem, Bundler, rbenv
author: Sasikala Ravichandran
tags: [OS, ruby]
comments: true
disqus_identifier: 71c56024-04bd-4963-830d-aa5946bf6a70  
---

&ensp;&ensp;&ensp;&ensp;When I want to start blogging about programming, I was thinking where should start. After couple of thoughts, I intuited to write about fundamentals of the computer system as it is de facto programming concepts to grasp for a coder.
As of this writing, I am using Ubuntu 15.04 which is Debian-based Linux operating system.

## Operating System
 
![Block Diagram]( /assets/1_OS.png){:class="sizing"}

&ensp;&ensp;&ensp;&ensp;Operating system is a low level software which provides communication bridge between hardware and software on a computer. It also manages memory, process, files etc..

## Shell

&ensp;&ensp;&ensp;&ensp;Shell is a program through which user interacts with underlying operating system by executing thecommands or utilities the user has typed in the terminal window. We can also called it as Command line interpreter. Default shell in Ubuntu is bash shell. We can find the current shell using the command echo $0 or echo $SHELL.

## Command line interface(CLI)

![Command Line Interface]( /assets/2_CLI.png){:class="sizing"}

&ensp;&ensp;&ensp;&ensp;In ubuntu, a terminal provides command line interface or user interface for the user to interact with underlying OS via shell to complete some tasks. CLI is more efficient way to accomplish a task than GUI in Linux distribution.

## Command prompt

&ensp;&ensp;&ensp;&ensp;When we open a terminal in Ubuntu, command prompt will appear at the left side and has blinking mouse pointer indicating that the shell is ready to execute commands to accomplish some tasks. It is also called as just 'prompt' or 'shell prompt'. <br>From this example `sasikala@sasikala-ubuntu:~/doc$`, the command prompt has information about the username(sasikala), system name(sasikala-ubuntu) and current working directory name(doc). 

## Command line

&ensp;&ensp;&ensp;&ensp;It's the space where user enters the command which is to the right of the command prompt.

## Commands

&ensp;&ensp;&ensp;&ensp;They are the programs or sequence of instruction for the computer to achieve some tasks. Commands are passed to the shell which reads it and executes them to do a task.Commands are interchangeably called as **executable files/ executables/ binaries**. Binaries are stored in following directories of Linux: `/bin ,/usr/bin, /usr/local/bin, sbin, /usr/sbin, /usr/local/sbin`

&ensp;&ensp;&ensp;&ensp;When a user types `ls` command which lists the files and folders in a given directory and press ENTER key, shell looks for `ls` in the directories mentioned in PATH Environment variables and executes the first encountered executable file and prints the output in the terminal.

## Types of Commands
<br>
![Commands Types]( /assets/3_commands_types.png){:class="sizing"}

**1) Built-in shell commands:** These binaries are the part of the shell itself. Examples are: `cd, eval, exec, exit, pwd, echo etc..`

**2) Base Executables:** These binaries are essential commands which are needed for minimal system working. Examples are `cp, ls, mv, cat, touch etc..` and some tools for zipping like `bzip, gzip` All base executables are stored in /bin folder.

**3) Extended Executables:**
These binaries are non essential commands (not much needed to run the machine) such `awk, cal, find, gcc, javac, ruby,  python etc..`.They are stored in `/usr/bin`. They are extended set of commands to `/bin` folder binaries. Also some commands are written in a programming language *(C, C++, Java, Ruby, Python etc..)* and compiled into binaries.

**4) Shell scripting:** A program written using a shell programming language. User writes a shell program using any combination of commands to perform as a single task. It is well suited for automating a simple task.

I remember I wrote 'upload.sh', a small scripting program for compiling C++ source file, connecting to a server using ftp, passing the username and password of the server, putting my binaries in the server and I stored it in the home directory. When I type `./upload.sh` in the command prompt, my shell accomplishes all task listed in the script.


{% highlight sh %}
upload.sh 

#!/bin/bash 

host="ftp.myhost.com"
user="username"
password="password"

gcc -o <filename> <filename.c>
ftp -un $host <<EOF
quote USER $username
quote PASS $password
cd binaries
binary
put <filename>
bye
{% endhighlight %}

## Environment Variables

&ensp;&ensp;&ensp;&ensp;As their name indicates,they provide values to the shell when executing a command. While the command is being executed, it may need a value from an environment variable to accomplish a task. These variables are used for storing data, storing software configuration details, locating the terminal setting etc.. For example, A running program may need a home directory location information for storing a file in home directory. Hence it refers HOME environment variable for the location. 

## Source code, Compiler and Virtual Machine

![Compilation]( /assets/4_Compilation.png){:class="sizing"}

&ensp;&ensp;&ensp;&ensp;When a programmer does coding (writing instructions or logic) in any programming language, the code is called source code. Source code is typed in a source file using an editor like sublime text and name the source file with appropriate extension like .c, .java, .rb. Extension tells the compiler that code must obey the rules of corresponding programming language. Source code can not be executed as a program by the computer as it understands only ones and zeros. So code has to be converted into **machine language or bytecode or object code or executables or binaries** which are in the form of ones and zeros for the processor to understand and perform a task. Machine code is not easy for developers to read or modify. Thus we need a special program called a __compiler__ which does the job of converting source code into byte code which is meant for processor to execute. Then executable is passed to a virtual machine to execute it. Compilers are usually stored in folder **/usr/bin**. For example, `/usr/bin/gcc, /usr/bin/javac`

## Ruby Specifics

&ensp;&ensp;&ensp;&ensp;With above mentioned terms and concepts of computer science in general, I will dive into Ruby specific concepts. 

## Ruby
&ensp;&ensp;&ensp;&ensp;Its a developer's friendly language. We can install many ruby versions in a machine using ruby version manager. 

## RubyGems
&ensp;&ensp;&ensp;&ensp;RubyGems is a built-in package manager comes with every Ruby implementation. It is used to install and manage various gems using `gem` command for a given ruby implementation.

## Ruby Compilers 
<br>
![Ruby Versions]( /assets/5_diff_ruby_version.png){:class="sizing"}

&ensp;&ensp;&ensp;&ensp;There are multiple implementations of Ruby compilers like `MRI, REE, Rubinius, Jruby` etc. Depending upon scenarios and environments, developers use different implementations of Ruby.

## Ruby Directory structure 

&ensp;&ensp;&ensp;&ensp;Ruby has a directory structure which contains following directories.

**lib:** It contains the ruby language specific library files(*.rb) and gems

**include:** It contains header files

**share:** It contains documentations, man pages

**bin:** It contains binaries like erb, gem, irb, rake, rdoc, ri, ruby, testrb and also contains binaries from a gem installation.

## Ruby binaries

&ensp;&ensp;&ensp;&ensp;These are binaries that come with ruby installation. Examples are `erb, gem, irb, rake, rdoc, ri, ruby, testrb`.Gems  will have binaries too. So when we install a gem, gem binaries are added to bin directory of ruby implementation like `rails, bundle` etc... 
   
## Gem

&ensp;&ensp;&ensp;&ensp;A gem is a library or plug-in installed to have specific functionality for an application. Every Gem installed comes with its binaries like `rails` command from rails gem, `bundle` command from bundler gem. Gems will be installed to the default system location for each ruby version in a machine and each ruby implementation can have multiple versions of same gem. Storage path for Jruby and MRI Ruby implementations are 

{% highlight sh %}
/.rbenv/versions/2.2.2/lib/ruby/gems/2.2.0/gems
/.rbenv/versions/jruby-1.7.9/lib/ruby/gems
{% endhighlight %}


## Bundler

&ensp;&ensp;&ensp;&ensp;Bundler is a gem which provides a consistent environment for ruby projects and applications by tracking and installing the exact versions of gems that are needed for the application. It manages project dependencies.

&ensp;&ensp;&ensp;&ensp;Bundler works by reading a Gemfile in an application’s root directory, downloading and unpacking specified versions of each required gem, resolving any dependencies among gems, and creating a Gemfile.lock file to force use of the specified gem versions.

&ensp;&ensp;&ensp;&ensp;Every ruby implementation in a machine needs its own bundler gem. 
For every ruby implementation in a machine, install bundler as a first gem and then use bundler to install all other gems using command `bundle install` rather than using `gem install` command.
In development setup, bundler will install the gems in the same place as RubyGems would install and it won't reinstall gems that are already there.

**Bundle exec:** For every Gem installed, there will be binaries that come with that gem. For example, `rails` command from rails gem, `rake` command from rake gem. When multiple versions of same gem installed for a given Ruby implementation, there will be a conflict while executing a binary. To avoid such conflicts, Gemfile is used to specify the version of the gems needed for an application. Also Bundler provides `bundle exec` command to execute the binaries of exact gem version specified in the current application's Gemfile. For example, `bundle exec rake` executes rake command from exact version mentioned in Gemfile and ensures that all dependencies are loaded from the correct versions specified in Gemfile.lock file.

## Basic ruby commands


{% highlight sh %}
$ruby -v
--Displays ruby version 

$ruby simple.rb
--Compiles and executes the ruby source file

$gem -v
--Displays the version of RubyGems

$gem env
--Displays information about the RubyGems environment

$gem install <gemname>
--Installs a gem into the local repository

$gem which <gemname>
--Displays the path where gem is installed

$gem list
--Displays local gems

$irb
--Opens Interactive ruby shell i.e Interactive programming environment for experimenting in real-time where user can execute Ruby commands and gets immediate response

$bundle show
--Display all gems used by the project

$bundle show <gemname>
--Display the directory in which gem is installed

{% endhighlight %}

## Ruby versioning tool

&ensp;&ensp;&ensp;&ensp;RVM and rbenv are the popular ruby versioning tools though other Ruby version managers available like CHRUBY . A version manager tool helps us with two main components which are installing different ruby versions on a machine and switching installed rubies reliably. In this section, I will go through rbenv to get hang of a version manager tool.

## rbenv tool

![rbenv tool]( /assets/6_rbenv_workflow.png){:class="sizing"}

&ensp;&ensp;&ensp;&ensp;It is a ruby version management tool which helps to install and manage different versions of ruby in a given machine. It comes handy when we need to have different ruby environments for different projects.

&ensp;&ensp;&ensp;&ensp;In my machine, I have installed rbenv and many ruby versions (1.9.3-p362 , 2.2.2, jruby-1.7.9.) using rbenv. I use 2.2.2 ruby version for building rails app and juby-1.7.9 for building a jekyll site. When I run a ruby command (say rails), rbenv  determines under which ruby version my command should be executed. Once it finds out, it passes the command along to the corresponding Ruby installation and my command (rails) gets executed. 

&ensp;&ensp;&ensp;&ensp;As we now know, When a command(like ruby, rails) is entered in the shell, operating system searches through directories mentioned in the PATH environment variable to find an executable file with that name and executes the first encountered executable.

rbenv works with shims which are lightweight executables that simply pass command along to rbenv.
rbenv inserts a directory of shims at the front of your PATH. rbenv maintains shims in ~/.rbenv/shims  directory to match every Ruby command across every installed version of Ruby.

 Fig: Steps of rbenv

## Basic commands of rbenv

{% highlight sh %}

$rbenv -v
--Display the version of the rbenv tool

$rbenv versions
--List the installed versions of ruby in a machine

$rbenv install –list
--List all available versions of ruby

$rbenv install <versions>
--Install a Ruby version

$rbenv which <binary>
--Shows the path of the binary

$rbenv global <version>
--Sets the global version of Ruby

$rbenv global
--Shows the global version of Ruby

$rbenv local <version>
--Sets a local application-specific Ruby version

$rbenv local
--Shows the local version of Ruby

{% endhighlight %}

Once particular ruby version is set as local or global, use `ruby -v` to check the correct ruby version is set to work on and use `gem` or `bundle install` commands to install the gems.

## References:

Here are the links which I have used while understanding these concepts 

[Linux](http://www.linfo.org/newbies.html)

[Github page of rbenv](https://github.com/rbenv/rbenv)

[Gist of rbenv](https://gist.github.com/MicahElliott/2407918)
