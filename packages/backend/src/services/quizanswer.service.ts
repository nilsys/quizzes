import { QuizAnswer, QuizItemAnswer } from "@quizzes/common/models"
import { IQuizAnswerQuery } from "@quizzes/common/types"
import { Service } from "typedi"
import { EntityManager, SelectQueryBuilder } from "typeorm"
import { InjectManager } from "typeorm-typedi-extensions"

@Service()
export class QuizAnswerService {
  @InjectManager()
  private entityManager: EntityManager

  public async createQuizAnswer(
    quiz: QuizAnswer,
  ): Promise<QuizAnswer | undefined> {
    let answer: QuizAnswer | undefined

    await this.entityManager.transaction(async entityManager => {
      answer = await entityManager.save(quiz)
    })

    return answer
  }

  /*public async getAnswers(query: IQuizAnswerQuery): Promise<QuizAnswer[]> {
    const { id, quiz_id, user_id } = query

    const queryBuilder: SelectQueryBuilder<
      QuizAnswer
    > = QuizAnswer.createQueryBuilder("quiz_answer")

    if (!id && !quiz_id && !user_id) {
      return []
    }

    if (id) {
      queryBuilder.where("quiz_answer.id = :id", { id })
    }

    if (quiz_id) {
      queryBuilder.where("quiz_answer.quiz_id = :quiz_id", { quiz_id })
    }

    if (user_id) {
      queryBuilder.where("quiz_answer.user_id = :user_id", { user_id })
    }

    queryBuilder.leftJoinAndSelect(
      "quiz_answer.itemanswers",
      "quiz_item_answer",
      "quiz_item_answer.quiz_answer_id = quiz_answer.id",
    )

    queryBuilder.leftJoinAndSelect(
      "quiz_item_answer.options",
      "quiz_option_answer",
      "quiz_option_answer.quiz_item_answer_id = quiz_item_answer.id",
    )

    return await queryBuilder.getMany()
  }*/
}

export default { QuizAnswerService }
