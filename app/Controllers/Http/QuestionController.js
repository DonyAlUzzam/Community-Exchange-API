"use strict";

const Question = use("App/Models/Question");
const Database = use("Database");

class QuestionController {
  async index({ response }) {
    // let products = await Product.all()
    const question = await Question.query()
      .with("answer")
      .with("user")
      .fetch();
    return response.json(question);
  }

  async show({ params, response }) {
    try {
      // const questions = await Database
      // .select('questions.title as title_question', 'questions.content as desc_question','answers.content', 'users.username as owner')
      // .from('questions')
      // .leftJoin('users', 'users.id', 'questions.user_id')
      // .leftJoin('answers', 'answers.question_id', 'questions.id')
      // .where('questions.id', params.id)

      const questions = await Question.query()
        .with("answer")
        .with("user")
        .where("questions.id", params.id)
        .fetch();

      // const question = await Database.select('*').table('questions')
      // .innerJoin('users', 'questions.user_id', 'users.id')
      // // .innerJoin('answers', 'questions.id', 'answers.question_id')
      // .where('questions.id', params.id)
      // .fetch();
      console.log("====================================");
      console.log(questions);
      console.log("====================================");
      return response.send(questions);
    } catch (error) {
      console.log("====================================");
      console.log(error);
      console.log("====================================");
    }
  }

  async store({ request, auth, response }) {
    const getUser = await auth.getUser();
    const data = request.only(["title", "content"]);

    const question = new Question();
    const user_id = getUser.id;

    question.title = data.title;
    question.content = data.content;
    question.user_id = user_id;

    await question.save();

    return response.status(201).json(question);
  }
}

module.exports = QuestionController;
