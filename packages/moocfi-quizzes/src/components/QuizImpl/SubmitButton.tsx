import * as React from "react"
import styled from "styled-components"
import { Button } from "@material-ui/core"
import { useDispatch } from "react-redux"

import { useTypedSelector } from "../../state/store"
import * as quizAnswerActions from "../../state/quizAnswer/actions"

const StyledSubmitButton = styled(Button)`
  padding: 10px 20px;
  border-radius: 15px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
`

const SubmitButton: React.FunctionComponent<any> = ({ children }) => {
  const dispatch = useDispatch()
  const submitLocked = useTypedSelector(state => state.quizAnswer.submitLocked)
  const languageInfo = useTypedSelector(state => state.language.languageLabels)
  const submitTextDisplayed = useTypedSelector(
    state => state.quizAnswer.noChangesSinceSuccessfulSubmit,
  )

  if (!languageInfo) {
    return <div>language not set</div>
  }
  const generalLabels = languageInfo.general

  const handleSubmit = () => {
    dispatch(quizAnswerActions.submit())
  }

  return (
    <StyledSubmitButton
      variant="contained"
      color="primary"
      disabled={submitLocked}
      onClick={handleSubmit}
    >
      {submitTextDisplayed
        ? generalLabels.submitGeneralFeedbackLabel
        : generalLabels.submitButtonLabel}
    </StyledSubmitButton>
  )
}

export default SubmitButton
