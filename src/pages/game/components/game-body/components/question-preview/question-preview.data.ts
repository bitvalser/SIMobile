import { QuestionType } from '@core/constants/question-type.constants';

export const PREVIEW_TEXT = {
  [QuestionType.Auction]: 'game.questionAuction',
  [QuestionType.BagCat]: 'game.questionSecret',
  [QuestionType.Cat]: 'game.questionSecret',
  [QuestionType.Sponsored]: 'game.questionNoRisk',
};
