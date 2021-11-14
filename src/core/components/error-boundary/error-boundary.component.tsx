import React from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import * as Styled from './error-boundary.styles';
import { Dialog } from '../dialog';
import { LinkText } from '../link-text';
import { BackgroundContainer } from '../background-container';
import { logsService } from '../../../inversify.config';

const FEEDBACK_LINK = 'https://vk.com/valerabitkovsky';

class ErrorBoundary extends React.Component<WithTranslation, { hasError: boolean; errorId: String }> {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorId: '' };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    logsService
      .sendError(error, 'boundary', {
        errorInfo,
      })
      .subscribe((errorId) => {
        this.setState({
          errorId,
        });
      }, console.log);
  }

  render() {
    if (this.state.hasError) {
      return (
        <BackgroundContainer>
          <Dialog title={this.props.t('errors.unknownError')}>
            <Styled.Content>
              <Styled.ErrorText>
                {this.props.t('errors.errorId')}: {this.state.errorId}
              </Styled.ErrorText>
              <Styled.ErrorText>{this.props.t('errors.boundaryText')}</Styled.ErrorText>
              <LinkText link={FEEDBACK_LINK}>{FEEDBACK_LINK}</LinkText>
            </Styled.Content>
          </Dialog>
        </BackgroundContainer>
      );
    }

    return this.props.children;
  }
}

export default withTranslation()(ErrorBoundary);
