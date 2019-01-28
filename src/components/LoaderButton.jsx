import React from 'react';
import PropTypes from 'prop-types';

import Loader from './Loader';
import { Consumer as Web3Consumer } from '../contextProviders/Web3Provider';
import config from '../configuration';

// Need to disable the button type because the rule does not allow prop values
/* eslint react/button-has-type: 0 */
/**
 * Renders a button with an optional loader
 *
 *  @param className      ClassNames
 *  @param formNoValidate Wether to validate formsy
 *  @param disable        Disables button
 *  @param isLoading      State of button. If true, disables and renders spinner
 *  @param loadingText    Text to show when state is loading
 *  @param children       Elements / text showing when state is not loading
 */
const LoaderButton = ({
  className,
  formNoValidate,
  type,
  disabled,
  isLoading,
  loadingText,
  children,
}) => (
  <Web3Consumer>
    {({ state: { isCorrectNetwork } }) => (
      <span>
        <button
          className={className}
          formNoValidate={formNoValidate}
          type={type}
          disabled={disabled || !isCorrectNetwork}
        >
          {isLoading && (
            <span>
              <Loader className="small btn-loader" />
              {loadingText}
            </span>
          )}

          {!isLoading && <span>{children}</span>}
        </button>
        {!isCorrectNetwork && (
          <small className="form-text loader-button-network-help">
            Please choose the <strong>{config.networkName}</strong> network with your Web3 Provider.
          </small>
        )}
      </span>
    )}
  </Web3Consumer>
);

LoaderButton.propTypes = {
  className: PropTypes.string,
  formNoValidate: PropTypes.bool,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  loadingText: PropTypes.string,
  children: PropTypes.node,
  type: PropTypes.string,
};

LoaderButton.defaultProps = {
  className: '',
  formNoValidate: false,
  disabled: false,
  isLoading: true,
  loadingText: '',
  children: null,
  type: 'button',
};

export default LoaderButton;
