'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
  
  Route.post('questions', 'QuestionController.store').middleware(['auth'])
  Route.get('questions', 'QuestionController.index')
  Route.get('questions/:id', 'QuestionController.show')
  Route.patch('questions', 'QuestionController').middleware(['auth'])
  Route.resource('answers', 'AnswerController').middleware(['auth'])
 
  Route.post("users/register", "AuthController.register");
  Route.post("users/login", "AuthController.login");
  Route.get('users/data', 'AuthController.getData').middleware(['auth'])
  Route.post("users/refresh", "AuthController.generateRefreshToken");

}).prefix('api/v1')

