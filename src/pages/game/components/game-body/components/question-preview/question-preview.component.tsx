import React, { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useGameController } from '@core/hooks/use-game-controller.hook';
import { useService } from '@core/hooks/use-service.hook';
import useSubscription from '@core/hooks/use-subscription.hook';
import { SoundsService } from '@core/services/sounds/sounds.service';
import { PREVIEW_SOUND, PREVIEW_TEXT } from './question-preview.data';
import * as Styled from './question-preview.styles';

const QuestionPreview: FC = () => {
  const [t] = useTranslation();
  const [{ questionType$ }] = useGameController();
  const { getSound } = useService(SoundsService);
  const type = useSubscription(questionType$);

  useEffect(() => {
    const sound = PREVIEW_SOUND[type] ? getSound(PREVIEW_SOUND[type]).play() : null;
    return () => {
      sound?.stop();
    };
  }, [getSound, type]);

  return (
    <Styled.Container>
      {PREVIEW_TEXT[type] && (
        <Styled.Rotate>
          <Styled.PreviewText>{t(PREVIEW_TEXT[type])}</Styled.PreviewText>
        </Styled.Rotate>
      )}
    </Styled.Container>
  );
};

export default QuestionPreview;
