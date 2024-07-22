import { useMediaQuery } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components';

import { Typography } from '~components/index';
import { Modal, TProps } from '~components/Modal';
import { useAppList } from '~hooks/api/dashboard';
import { useCreateApp } from '~hooks/create-app';

import { ButtonsWrapper, Header } from './styles';
import { RadioGroup, RadioGroupOption } from '../../components/RadioGroup';
import { TQuizList } from './types';
import Button from '~components/buttons/Button/Button';
import { Snackbar } from '~components/Snackbar';

export const QuizModal = ({
  width = 608,
  height,
  actionsSlotContent,
  open,
  onClose,
  list,
  ...rest
}: TProps) => {
  const { t } = useTranslation();
  const [isShowSnack, setShowSnack] = useState(false);
  const appListQuery = useAppList();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints['--mobile']);
  const { quizValues, setQuizValues } = useCreateApp();
  const blockWrapperRef = useRef<HTMLDivElement>(null);
  const isLoading = appListQuery.isLoading;
  const [loading, setLoading] = useState(false)

  const handleQuizValueChange = (question: string, value: string, index: number, type?: string, answer?: string) => {
    const newQuizValues = [...quizValues];
    newQuizValues[index] = { question, value, type, answer: answer };
    setQuizValues(newQuizValues);
  };
  const validateQuizValues = () => {
    if (list) {
      const isAnswersExist = quizValues.find((elm) => elm?.type == "other" && !elm.answer)

      if (quizValues?.length === list.length && !isAnswersExist) {
        return true
      }
      return false
    }

  };

  const handleDone = async () => {
    if (validateQuizValues()) {
      setLoading(true)
      const response = await fetch('https://script.google.com/macros/s/AKfycbw9xvd_xA091D3yJ5SMuLAQ9yVUAHh1xhiQb5rYc_QpK2K2476m7m-GCfXTKtCL1SKTRg/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quizValues)
      })
      if (response) {
        onClose?.({}, 'backdropClick');
        setLoading(false)
      }

    } else {
      setShowSnack(true)
    }
  }

  return (
    <>
      {
        isShowSnack &&
        <Snackbar
          container={blockWrapperRef}
          open={true}
          message={t('create-app-error')}
          offsetY={isMobile ? 16 : 30}
          horizontalMargin={isMobile ? 16 : 0}
        />
      }
      <Modal
        height={height}
        loading={loading}
        padding={isMobile ? '0 8px 16px' : undefined}
        margin={isMobile ? '0' : undefined}
        actionsSlotContent={actionsSlotContent}
        open={open}
        // onClose={() => { validateQuizValues() ? onClose : setShowSnack(true) }}
        onClose={onClose}

        {...rest}      >
        <Header $isMobile={isMobile}>{t('tell-about')}</Header>
        {list && list.map((elm: TQuizList, index: number) => (
          <div key={index}>
            <Typography color='black'>{elm.question}</Typography>
            <RadioGroup
              name={`quiz-${index}`}
              options={elm.options as RadioGroupOption[]}
              value={quizValues[index]?.value || ''}
              onChange={(_: any, value: string, type?: string, answer?: string) =>

                handleQuizValueChange(elm.question, value, index, type, answer)
              }
            />
          </div>
        ))}
        <ButtonsWrapper>
          <Button onClick={handleDone} width={isMobile ? '100%' : 235} >Done!</Button>
        </ButtonsWrapper>
      </Modal>
    </>
  );
}
