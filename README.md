# Time Frame
## Time Tracking Application

### When you know how you spend your time, you can analyze your work trends and make smarter business decisions. Whether you're working solo or in a small team, time tracking software can give you a complete overview of your daily, weekly, monthly, and yearly work. A time tracker with additional workforce management features that will help you develop a high-performing team that smashes goals every time.

### Deployed link
<!-- https://storied-paprenjak-8f2e60.netlify.app/ -->
https://comforting-bonbon-0a3e0a.netlify.app/

## Workflow

As soon as you open our website you see a beautiful index page with a nav bar that consists for dashboard, login and signup
![cw1](https://user-images.githubusercontent.com/114225283/229429431-8d5fa54b-a302-4ed8-bf3e-832cd0d751d2.png)



If you want to use the app you need to signup and login.
#### You need to verify your otp for the successful registration.
after  logging in you will be redirected to dashboard.

![cw2](https://user-images.githubusercontent.com/114225283/229429645-27e3a4e2-0221-43c5-8394-1dec4893ba70.png)



Here is the place where all the action happens.
You can start the timer and select the activity that you are working and the time updates in that particular section automatically when you stop the timer.
you have three activity types to select on 
  |--> Productive
  |--> Unproductive
  |--> Idle
On your right there is users section in the menu.
Go to the users section you can see all the users that are logged in along with their info i.e, name,mail,role
There are two roles one is manager and the other is employee
![cw](https://user-images.githubusercontent.com/114225283/229430871-5cf1c5a4-99c4-41f1-9815-82afb2763890.png)


### Tech Stack

For frontend
   |--> HTML
   |--> CSS
   |--> Javascript
For Backend
   |-->Node Js
   |--> Express Js
   |--> Mongo DB
For data storage we have used redis and local storage wherever applicable 


## Structure
### Frontend
#### HTML
      |-->Index
      |-->Signup,login
      |-->Dashboard
     
 
### Backend
      |-->app.js
      |-->Models
      |-->Routes
      |-->Middlewares
      |-->configs
         |--->db.js(mongo db connection)
      |-->.env
      |-->.gitignore
      |-->package-lock.json
      |-->package.json
