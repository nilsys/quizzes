import ContentLoader from "react-content-loader"
import * as React from "react"
import { Grid, Typography } from "@material-ui/core"
import styled from "styled-components"
import { useTypedSelector } from "../../state/store"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons"

const StyledGrid = styled(Grid)`
  padding: 1rem;
  color: white;
  background-color: #213094;
`

const PointsText = styled(Typography)`
  font-size: 1.5rem !important;
  text-align: end;
  color: white;
`

const XXS12Grid = styled(Grid)`
  @media (max-width: 550px) {
    max-width: 100%;
    flex-basis: 100%;
  }
`

const PointsLabelText = styled(Typography)`
  font-size: 1rem !important;
  color: white;
`

const IconWrapper = styled.div`
  font-size: 3.5rem;
  margin: 0 1.5rem 0 0.5rem;
  @media (max-width: 550px) {
    text-align: center;
  }
`

const RightMarginedGrid = styled(Grid)`
  margin-right: 1.5rem;
  text-align: end;

  @media (max-width: 550px) {
    max-width: 100%;
    flex-basis: 100%;
    text-align: left;
  }
`

const SpaceFillerDiv = styled.div`
  height: 31.2px;
`

const TopInfoBar: React.FunctionComponent = () => {
  const userQuizState = useTypedSelector(state => state.user.userQuizState)
  const quiz = useTypedSelector(state => state.quiz)
  const languageInfo = useTypedSelector(state => state.language.languageLabels)
  const displayBars = useTypedSelector(state => state.loadingBars)

  let title
  let quizLabel
  let pointsLabel
  let receivedPoints
  let formattedReceivedPoints
  let availablePoints

  if (languageInfo) {
    quizLabel = languageInfo.general.quizLabel
    pointsLabel = languageInfo.general.pointsLabel
  }

  let titleReplacement
  let pointsReplacement

  if (!quiz) {
    title = ""
    formattedReceivedPoints = ""
    availablePoints = ""

    titleReplacement = displayBars ? (
      <QuizTitleLoadingBar />
    ) : (
      <SpaceFillerDiv />
    )

    pointsReplacement = displayBars ? (
      <QuizPointsLoadingBar />
    ) : (
      <SpaceFillerDiv />
    )
  } else {
    title = quiz.texts[0].title

    receivedPoints =
      userQuizState && userQuizState.pointsAwarded
        ? userQuizState.pointsAwarded
        : 0

    formattedReceivedPoints = Number.isInteger(receivedPoints)
      ? receivedPoints
      : receivedPoints.toFixed(2)

    availablePoints = quiz.points
  }

  return (
    <StyledGrid
      container={true}
      justify="space-between"
      alignItems="flex-start"
    >
      <XXS12Grid item={true} xs={9}>
        <Grid container={true} alignItems="stretch">
          <XXS12Grid item={true} xs={3} md={2}>
            <IconWrapper>
              <FontAwesomeIcon icon={faQuestionCircle} />
            </IconWrapper>
          </XXS12Grid>

          <XXS12Grid item={true} xs={9} md={10}>
            <Typography variant="subtitle1">{quizLabel}:</Typography>
            {quiz ? (
              <Typography variant="h5">{title}</Typography>
            ) : (
              titleReplacement
            )}
          </XXS12Grid>
        </Grid>
      </XXS12Grid>

      <RightMarginedGrid item={true} xs={2}>
        <PointsLabelText>{pointsLabel}:</PointsLabelText>

        {quiz ? (
          <PointsText>
            {`${formattedReceivedPoints}/${availablePoints}`}
          </PointsText>
        ) : (
          pointsReplacement
        )}
      </RightMarginedGrid>
    </StyledGrid>
  )
}

const QuizTitleLoadingBar = () => {
  return (
    <StyledQuizTitleContentLoader
      height={40}
      width={100}
      speed={2}
      primaryColor="#ffffff"
      primaryOpacity={0.6}
      secondaryColor="#dddddd"
      secondaryOpacity={0.6}
    >
      <rect x="0" y="10" rx="4" ry="20" width="100" height="30" />
    </StyledQuizTitleContentLoader>
  )
}

const StyledQuizTitleContentLoader = styled(ContentLoader)`
  width: 100%;
  max-width: 300px;
  height: 31.2px;
`

const QuizPointsLoadingBar = () => {
  return (
    <StyledQuizPointsContentLoader
      height={40}
      width={100}
      speed={2}
      primaryColor="#ffffff"
      primaryOpacity={0.6}
      secondaryColor="#dddddd"
      secondaryOpacity={0.6}
    >
      <rect x="0" y="10" rx="25" ry="25" width="100" height="30" />
    </StyledQuizPointsContentLoader>
  )
}

const StyledQuizPointsContentLoader = styled(ContentLoader)`
  width: 100%;
  max-width: 45px;
  height: 31.2px;
`

export default TopInfoBar
