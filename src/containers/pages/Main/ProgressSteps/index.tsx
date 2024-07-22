import { useEffect } from 'react'
import { ProgressBar } from '../../../../components/ProgressBar/ProgressBar'
import { ProgressWrapper } from '../../../../containers/Layouts/BuildAppLayout/styles'
import { SubtitleWrapper, Subtitle, Container, ButtonText, ButtonWrapper, DownloadButton } from './styles'
import { AppIcon } from '~components/AppIcon/AppIcon'
import { useNavigate } from 'react-router-dom'
import { useGamification, usePostGamification } from '~hooks/api/dashboard'
import { useDashboard } from '~hooks/dashboard'

type TProps = {
  isMobile: boolean;
  subtitle?: string;
  currentLevel: any;
  xp: number;
  openModal?: any
};

export default function ProgressSteps({
  isMobile,
  subtitle,
  currentLevel,
  xp,
  openModal
}: TProps) {
  const navigate = useNavigate();
  const gameQuery = useGamification();
  const postGameQuery = usePostGamification();
  const {
    gameData,
    setGameData
  } = useDashboard();
  const onCompleteButtonClick = ({ task, completed }: any) => {
    if (task.link == 'premium') {
      openModal()
    } else {
      navigate(`${task?.link}`, {
        relative: 'path',
      });
    }

    setGameData({
      level: currentLevel?.level,
      xp: Number(xp) + Number(task?.xp),
      missions_completed: `[${completed}]`
    })
    postGameQuery.mutateAsync({
      level: currentLevel?.level,
      xp: Number(xp) + Number(task?.xp),
      missions_completed: `[${completed}]`
    })
  }
  const calculateTotalXp = (tasks: any) => {
    return tasks?.reduce((accumulator: any, currentValue: any) => accumulator + currentValue.xp,
      0,);
  };
  useEffect(() => {
    const totalXp = calculateTotalXp(currentLevel?.tasks)
    if (currentLevel && xp >= totalXp && currentLevel.level !== 4) {
      gameQuery.mutateAsync({ level: Number(currentLevel?.level) + 1, xp: 0 })
      setGameData({ level: Number(currentLevel?.level) + 1, xp: 0, missions_completed: `[]` })

    }
  }, [xp, currentLevel])
  return (
    <>
      <ProgressWrapper>
        <ProgressBar xp={xp} value={(xp / calculateTotalXp(currentLevel.tasks)) * 100} totalXp={calculateTotalXp(currentLevel.tasks)} />
      </ProgressWrapper>
      <SubtitleWrapper $isMobile={isMobile}>
        <Subtitle Component='h3' variant='m-400' color='middleGrey'>
          {subtitle}
        </Subtitle>
      </SubtitleWrapper>
      {
        currentLevel?.tasks?.map((task: any) =>
          <Container $isMobile={isMobile}>
            <AppIcon color={gameData?.missions_completed.includes(task.id) ? "#C0FFE9" : '#FFE500'} maxLength={isMobile ? 8.5 : 120} text={task.description} badge={gameData?.missions_completed.includes(task.id) ? "completed" : `+${task?.xp}xp`} />
            {
              gameData?.missions_completed.includes(task.id) ?
                <ButtonWrapper
                  disabled
                  $isMobile={isMobile}
                >
                  <ButtonText variant='m-600'>{gameData?.missions_completed.includes(task.id) ? "Done" : task?.buttonText}</ButtonText>
                </ButtonWrapper> :
                <DownloadButton
                  onClick={() => {
                    const completed = JSON.parse(gameData.missions_completed)
                    completed.push(task.id)
                    onCompleteButtonClick({ task, completed })
                  }}
                  $isMobile={isMobile}
                >
                  <ButtonText variant='m-600'>{gameData?.missions_completed.includes(task.id) ? "Done" : task?.buttonText}</ButtonText>
                </DownloadButton>
            }

          </Container>
        )
      }
    </>
  )
}
