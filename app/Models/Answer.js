'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Answer extends Model {
    user() {
        return this.belongsTo("App/Models/User");
      }

    question(){
        return this.belongsTo('App/Models/Qusetion')
    }
}

module.exports = Answer
