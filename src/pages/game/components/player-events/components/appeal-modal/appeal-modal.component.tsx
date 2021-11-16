import React, { FC } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { AppButton } from '@core/components/button';
import { Dialog } from '@core/components/dialog';
import { createModalHook } from '@core/helpers/create-modal-hook.helper';
import * as Styled from './appeal-modal.styles';
import { AppealModalProps } from './appeal-modal.types';

const AppealModal: FC<AppealModalProps> = ({ close, onSelect, name, answer, rightAnswers }) => {
  const [t] = useTranslation();

  const handleYes = () => {
    onSelect(true);
    close();
  };

  const handleNo = () => {
    onSelect(false);
    close();
  };

  return (
    <Dialog onClose={close} title={t('game.answerCheck')}>
      <Styled.Container>
        <Styled.Title>
          <Trans
            i18nKey="game.isRightPlayer"
            values={{ name }}
            components={{
              bold: <Styled.BoldText />,
            }}
          />
        </Styled.Title>
        <Styled.AnswersContainer>
          <Styled.AnswerText>{answer}</Styled.AnswerText>
          <Styled.AnswerTitle>{t('game.rightAnswers')}</Styled.AnswerTitle>
          {rightAnswers.map((rightAnswer) => (
            <Styled.AnswerText key={rightAnswer}>{rightAnswer}</Styled.AnswerText>
          ))}
        </Styled.AnswersContainer>
      </Styled.Container>
      <AppButton text={t('yes')} onPress={handleYes} />
      <AppButton text={t('no')} onPress={handleNo} />
    </Dialog>
  );
};

const useAppealModal = createModalHook<AppealModalProps>((props) => () => <AppealModal {...props} />);

export default useAppealModal;
