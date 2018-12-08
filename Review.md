# Review Questions

## What is Node.js?

 its a program that runs other programs that runs JavaScript applications outside the browser.

## What is Express?

Express is a framework that, on top of Node,  add additional functionality.

## Mention two parts of Express that you learned about this week.
 Middleware, Routes.

## What is Middleware?
array of functions that provides services to software applications beyond those orignally available.

## What is a Resource?

IN a RESTful API everything is a resource. the list in a databse, etc.

## What can the API return to help clients know if a request was successful?

the API can return a status code.  200 = OK 

## How can we partition our application into sub-applications?

using Express, we can build a separate file with routes etc and use require() to add it to or main file

## What is express.json() and why do we need it?

it parses incoming requests with JSON payloads and it allows us to read data from the request body.
