import axios from "axios"

export const getQuizzes = async (course, user) => {
  const response = await axios.get(
    `${
      process.env.REACT_APP_BACKEND_URL
    }/api/v1/quizzes/?courseId=${course}&course=true&items=true&options=true&peerreviews=true&stripped=false`,
    { headers: { authorization: `Bearer ${user.accessToken}` } },
  )
  return response.data
}

export const post = async (quiz, user) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/api/v1/quizzes`,
    quiz,
    {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${user.accessToken}`,
      },
    },
  )
  return response.data
}
