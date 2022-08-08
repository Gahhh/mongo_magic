# COMP9323 Mongo Magic Project

------

The goal of our project is to develop a cloud-based sustainability assessment platform for industry organisations. The platform will help the decision maker of organisations to track
the sustainability progress of their organisations. The platform will collect various consumption and preservation metrics and then provide a sustainability score with suggestions on how to improve the business operations further to the users. 


**This document describes the following points.**

```sh
> * System Articture
> * Front-End setup on localhost
> * Back-End setup on localhost
> * Database
> * Cloud Access
```
## System Articture

> Frontend  ------  React   
> Backend   ------  Flask   
> Database  ------  MongoDB   
```sh
|---Project File (Root Path)

 |---backend	(Backend file path)
  |---cloud
  |---controller
  |---db
  |---services
  |---docs
  |---models
  |---__init_.py
  |---config.py
  |---requirements.txt
  |---app.py 
 
 |---frontend (Frontend file path)
  |---public 
  |---src 
  |---package-lock.json 
  |---package.json 
  |---yarn.lock
  |---README.md 

```

## Front-end

Step 1:    
Install npm and yarn package manager.
Details of the installation can be found in the [installation guide](https://yarnpkg.com/en/docs/install).
After installation, you can run the following command to install the dependencies in /root/frontend folder.
```sh
> yarn -v
> npm -v
```
Step 2:   
After installation, you can run the following command to install the dependencies.
```sh
$ cd /frontend
$ yarn install
```
Step 3:   
After all the dependencies are installed, you can run the following command to run the application.
```sh
$ yarn start
```
Finally, if everything is working, you may see below information in the terminal.
```sh
------------------------------------------------
Compiled successfully!

You can now view frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.50.3:3000

Note that the development build is not optimized.
To create a production build, use yarn build.

webpack compiled successfully
------------------------------------------------
```



## Back-end
We use python 3.8 as the backend language. So before you start to use the backend, you need to ensure the python version of your computer is 3.8. You can check the version of your computer by running the following command.
```sh
> python3 --version
```
Step 1: Install the dependencies.   
In the backend folder, you can run the following command to install the dependencies. Depending on the pip version, you may try with pip3 or pip for the below commands.
```sh
$ cd /backend
$ pip3 install -r requirements.txt
```
Step 2: Run the application.
Run the command below to start the app in backend folder:
```sh
$ python3 app.py
```
4) The server shoud be able to run on local server when you see the following information in the terminal.
```sh
------------------------------------------------
 * Debug mode: on
 * Running on http://127.0.0.1:5000 (Press CTRL+C to quit)
 * Restarting with stat
 * Debugger is active!
 * Debugger PIN: 246-364-033
------------------------------------------------
```
## Database
This project's database is an online database on MongoDB Atlas, you don't need implement database on localhost for testing. 

## Cloud Access
This project's backend is hosted on AWS server, the access url is: https://d1c543cslxqz58.cloudfront.net.   

The frontend is also have a cloud access on AWS server, the address is:   
https://main.d2tkai59xc2o9w.amplifyapp.com/
