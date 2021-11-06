import { useGameController } from '@core/hooks/use-game-controller.hook';
import useSubscription from '@core/hooks/use-subscription.hook';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { PREVIEW_TEXT } from './question-preview.data';
import * as Styled from './question-preview.styles';

const QuestionPreview: FC = () => {
  const [t] = useTranslation();
  const [{ questionType$ }] = useGameController();
  const type = useSubscription(questionType$);

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
