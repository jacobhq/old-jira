import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Flag, { FlagGroup } from '@atlaskit/flag';
import Modal from '@atlaskit/modal-dialog';
import Page from '@atlaskit/page';
import '@atlaskit/css-reset';
import SuccessIcon from '@atlaskit/icon/glyph/check-circle';
import { G400 } from '@atlaskit/theme/colors';

import StarterNavigation from '../components/StarterNavigation';

export default class App extends Component {
  state = {
    flags: [],
    isModalOpen: false,
  };

  static contextTypes = {
    navOpenState: PropTypes.object,
    router: PropTypes.object,
  };

  static propTypes = {
    navOpenState: PropTypes.object,
    onNavResize: PropTypes.func,
  };

  static childContextTypes = {
    showModal: PropTypes.func,
    addFlag: PropTypes.func,
  }

  getChildContext() {
    return {
      showModal: this.showModal,
      addFlag: this.addFlag,
    };
  }

  showModal = () => {
    this.setState({ isModalOpen: true });
  }

  hideModal = () => {
    this.setState({ isModalOpen: false });
  }

  addFlag = () => {
    this.setState({ flags: [{ id: Date.now() }].concat(this.state.flags) });
  }

  onFlagDismissed = (dismissedFlagId) => {
    this.setState({
      flags: this.state.flags.filter(flag => flag.id !== dismissedFlagId),
    })
  }

  render() {
    return (
      <div>
        <Page
          navigationWidth={this.context.navOpenState.width}
          navigation={<StarterNavigation />}
        >
          {this.props.children}
        </Page>
        <div>
          <FlagGroup onDismissed={this.onFlagDismissed}>
            {
              this.state.flags.map(flag => (
                <Flag
      appearance="success"
      icon={<SuccessIcon label="Success" secondaryColor={G400} />}
      id={flag.id}
      key={flag.id}
      title="Welcome to the room"
      description="You’re now part of “Coffee Club”."
      onBlur={setTimeout(function(){this.onFlagDismissed(flag.id)}.bind(this), 5000)}
      actions={[{ content: 'Join the conversation', onClick: () => {this.onFlagDismissed(flag.id)} }]}
    />
              ))
            }
          </FlagGroup>
          {
            this.state.isModalOpen && (
              <Modal
                heading="Candy bar"
                actions={[{ text: 'Exit candy bar', onClick: this.hideModal }]}
                onClose={this.hideModal}
              >
                <p style={{ textAlign: 'center' }}>
                  <img src="http://i.giphy.com/yidUztgRB2w2gtDwL6.gif" alt="Moar cupcakes" />
                </p>
              </Modal>
            )
          }
        </div>
      </div>
    );
  }
}
