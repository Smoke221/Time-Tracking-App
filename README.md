# Tme Tracking


## workflow
Signup, login along with github and google auth

as soon as someone logs in we redirect them to homepage/dashboard


in the dashboard we shall display a stopwatch on the right side and a small input box to fill the taskname

on the left of dashboard we shall have a menu with timetrack, projects, users and settings(nothing in this as of now)


a small team chat window in which same team members can chat with themselves 


## Admin Works
Admin/employeer can remove/blacklist users/employees and track their data


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
