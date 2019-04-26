'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class QuestionSchema extends Schema {
  up () {
    this.create('questions', (table) => {
      table.increments()
      table.integer('user_id')
      .unsigned()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
      table.string('title').notNullable()
      table.string('content').notNullable()
      table.timestamps()
    })

    this.alter("answers", table=>{
      table.foreign("question_id").references('id').inTable('questions')
    })
  }

  down () {
    this.drop('questions')
  }
}

module.exports = QuestionSchema
