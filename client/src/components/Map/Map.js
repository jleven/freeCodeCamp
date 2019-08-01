import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import uniq from 'lodash/uniq';
import { createSelector } from 'reselect';
import cookies from 'browser-cookies';

import SuperBlock from './components/SuperBlock';
import Spacer from '../helpers/Spacer';

import './map.css';
import { ChallengeNode } from '../../redux/propTypes';
import { toggleSuperBlock, toggleBlock, isInitializedSelector } from './redux';
import {
  currentChallengeUrlSelector,
  currentChallengeIdSelector
} from '../../redux';
import { getBlocksFromChallengeUrl } from '../../utils';
import { blockNameify } from '../../../utils/blockNameify';

const propTypes = {
  currentChallengeId: PropTypes.string,
  currentChallengeUrl: PropTypes.string,
  introNodes: PropTypes.arrayOf(
    PropTypes.shape({
      fields: PropTypes.shape({ slug: PropTypes.string.isRequired }),
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        block: PropTypes.string.isRequired
      })
    })
  ),
  isInitialized: PropTypes.bool,
  nodes: PropTypes.arrayOf(ChallengeNode),
  toggleBlock: PropTypes.func.isRequired,
  toggleSuperBlock: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return createSelector(
    currentChallengeIdSelector,
    currentChallengeUrlSelector,
    isInitializedSelector,
    (currentChallengeId, currentChallengeUrl, isInitialized) => ({
      currentChallengeId,
      currentChallengeUrl,
      isInitialized
    })
  )(state);
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      toggleSuperBlock,
      toggleBlock
    },
    dispatch
  );
}

export class Map extends Component {
  constructor(props) {
    super(props);
    console.log('CONSTRUCTOR');
    console.log('id', props.currentChallengeId);
    console.log('url', props.currentChallengeUrl);

    const currentChallengeId = cookies.get('currentChallengeId');
    console.log('cookie id', currentChallengeId);
  }

  componentDidMount() {
    console.log('componentDidMount');
    console.log('id', this.props.currentChallengeId);
    console.log('url', this.props.currentChallengeUrl);
    if (this.props.currentChallengeUrl && !this.props.isInitialized)
      this.initializeExpandedState();
  }

  componentDidUpdate(prevProps) {
    console.log('componentDidUpdate');
    console.log('id', this.props.currentChallengeId);
    console.log('url', this.props.currentChallengeUrl);
    if (prevProps.currentChallengeUrl !== this.props.currentChallengeUrl)
      this.initializeExpandedState();
  }

  initializeExpandedState() {
    const { block, superBlock } = getBlocksFromChallengeUrl(
      this.props.currentChallengeUrl
    );
    this.props.toggleBlock(block);
    this.props.toggleSuperBlock(blockNameify(superBlock));
  }

  renderSuperBlocks(superBlocks) {
    const { nodes, introNodes } = this.props;
    return superBlocks.map(superBlock => (
      <SuperBlock
        introNodes={introNodes}
        key={superBlock}
        nodes={nodes}
        superBlock={superBlock}
      />
    ));
  }

  render() {
    console.log('render');
    const { nodes } = this.props;
    const superBlocks = uniq(nodes.map(({ superBlock }) => superBlock));
    return (
      <div className='map-ui'>
        <ul>
          {this.renderSuperBlocks(superBlocks)}
          <Spacer />
        </ul>
      </div>
    );
  }
}

Map.displayName = 'Map';
Map.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
