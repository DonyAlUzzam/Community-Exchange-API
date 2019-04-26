'use strict'

const Answer = use('App/Models/Answer')

class AnswerController {

    async store({request, auth, response}){
        const getUser = await auth.getUser();
        const data = request.only(['question_id', 'content'])
        
        const answer = new Answer()
        const user_id = getUser.id;

        answer.question_id = data.question_id
        answer.content = data.content
        answer.user_id = user_id

        
        await answer.save()
        
        return response.status(201).json(answer)
    }

    async destroy ({params, response}){
      const answer = await Answer.find(params.id)
      if(!answer){
          return response.status(404).json({data: 'Resource not found'})
      }
      await answer.delete()
      return response.status(204).json(null)
  }

}

module.exports = AnswerController
