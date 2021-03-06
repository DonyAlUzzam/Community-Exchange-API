'use strict'

const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', table => {
      table.increments()
      table.string('username', 80).notNullable().unique()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.timestamps()
    })
    this.alter("tokens", table=>{
      table.foreign("user_id").references('id').inTable('users')
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
