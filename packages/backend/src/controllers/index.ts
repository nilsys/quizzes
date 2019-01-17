import { Organization, Quiz, QuizItem } from "@quizzes/common/models"
import TMCApi from "@quizzes/common/services/TMCApi"
import { ITMCProfile, ITMCProfileDetails } from "@quizzes/common/types"
import express, { Request, Response } from "express"
import asyncHandler from "express-async-handler"
import { getRepository } from "typeorm"

/* import quizAnswerRoute from "./quizanswers"
import quizRoute from "./quizzes"
 */
import { CourseController } from "./courses"
import { QuizAnswerController } from "./quizanswers"
import { QuizController } from "./quizzes"

export default [CourseController, QuizAnswerController, QuizController]
