import { QuestionType } from '@core/constants/question-type.constants';
import { AppSound } from '@core/constants/sound.constants';

export const PREVIEW_TEXT = {
  [QuestionType.Auction]: 'game.questionAuction',
  [QuestionType.BagCat]: 'game.questionSecret',
  [QuestionType.Cat]: 'game.questionSecret',
  [QuestionType.Sponsored]: 'game.questionNoRisk',
};

export const PREVIEW_SOUND = {
  [QuestionType.Auction]: AppSound.QuestionStake,
  [QuestionType.BagCat]: AppSound.QuestionSecret,
  [QuestionType.Cat]: AppSound.QuestionSecret,
  [QuestionType.Sponsored]: AppSound.QuestionNoRisk,
};
