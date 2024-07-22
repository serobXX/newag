import { getBuildEnvVar } from '~utils/env';

import { Wrapper } from './styles';
import { useNavigate } from 'react-router-dom';
import { useTour } from '@reactour/tour';
import { useEffect } from 'react';
import { PATHS } from '~constants/paths';

export const MyProfile = () => {
  const navigate = useNavigate();
  const { setCurrentStep, currentStep, setIsOpen } = useTour()


  useEffect(() => {
    if (currentStep == 3) {
      setCurrentStep(3)
      setIsOpen(false)
      navigate(`/${PATHS.MAIN}`)
    }
  }, [currentStep])
  return (
    <Wrapper src={`${getBuildEnvVar('API_BASE_PATH')}/dashboard/user/?iframe=true`}></Wrapper>
  );
}
