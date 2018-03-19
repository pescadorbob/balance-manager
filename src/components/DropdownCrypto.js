import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CryptoIcon from '../components/CryptoIcon';
import selector from '../assets/selector-grey.svg';
import { fonts, colors, shadows, responsive } from '../styles';

const StyledWrapper = styled.div`
  width: 100%;
  z-index: 2;
  border-radius: ${({ show }) => (show ? '6px 6px 0 0' : '6px')};
  position: relative;
  -webkit-box-shadow: ${shadows.medium};
  box-shadow: ${shadows.medium};
`;

const StyledAsset = styled.div`
  display: flex;
  align-items: center;
  text-align: right;
  & p {
    color: rgb(${colors.dark});
    font-size: ${fonts.size.medium};
    font-weight: ${fonts.size.semibold};
    margin-left: 10px;
  }
  @media screen and (${responsive.xs.max}) {
    & p {
      font-size: ${fonts.size.small} !important;
    }
  }
`;

const StyledRow = styled.div`
  border-radius: 6px;
  color: rgb(${colors.grey});
  background: rgb(${colors.white});
  font-size: ${fonts.size.small};
  font-weight: ${fonts.weight.medium};
  text-align: center;
  outline: none;
  & > div {
    cursor: pointer;
    padding: ${({ noOptions }) => (noOptions ? `10px` : `10px 26px 10px 10px`)};
    background-size: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  @media screen and (${responsive.xs.max}) {
    & p {
      font-size: ${fonts.size.tiny};
    }
  }
`;

const StyledSelected = styled(StyledRow)`
  background: ${({ noOptions }) =>
    noOptions ? `rgb(${colors.white})` : `rgb(${colors.white}) url(${selector})`};
  background-size: 8px;
  background-position: 98% 50%;
  background-repeat: no-repeat;
  outline: none;
`;

const StyledDropdown = styled(StyledRow)`
  position: absolute;
  border-radius: 0 0 6px 6px;
  width: 100%;
  top: 100%;
  opacity: ${({ show }) => (show ? 1 : 0)};
  visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
  pointer-events: ${({ show }) => (show ? 'auto' : 'none')};
  -webkit-box-shadow: ${shadows.medium};
  box-shadow: ${shadows.medium};
  & > div {
    border-top: 1px solid rgba(${colors.lightGrey}, 0.7);
  }
`;

class DropdownCrypto extends Component {
  state = {
    showDropdown: false
  };
  onChangeSelected = selected => {
    this.setState({ showDropdown: false });
    this.props.onChange(selected);
  };
  toggleDropdown = () => this.setState({ showDropdown: !this.state.showDropdown });
  render() {
    const { selected, crypto, ...props } = this.props;
    const options = {};
    crypto.forEach(option => {
      options[option.symbol] = option;
    });
    return (
      <StyledWrapper show={this.state.showDropdown} {...props}>
        <StyledSelected noOptions={Object.keys(options).length < 2} onClick={this.toggleDropdown}>
          <div>
            <StyledAsset>
              <CryptoIcon size={18} currency={options[this.props.selected].symbol} />
              <p>{options[this.props.selected].name}</p>
            </StyledAsset>
            <p>{`${options[this.props.selected].balance} ${options[this.props.selected].symbol} ≈ ${
              options[this.props.selected].native
                ? options[this.props.selected].native.string
                : null
            }`}</p>
          </div>
        </StyledSelected>
        <StyledDropdown show={this.state.showDropdown}>
          {Object.keys(options)
            .filter(key => key !== this.props.selected)
            .map(key => (
              <div
                key={options[key].symbol}
                onClick={() => this.onChangeSelected(options[key].symbol)}
              >
                <StyledAsset>
                  <CryptoIcon size={18} currency={options[key].symbol} />
                  <p>{options[key].name}</p>
                </StyledAsset>
                <p>{`${options[key].balance} ${options[key].symbol} ≈ ${
                  options[key].native ? options[key].native.string : null
                }`}</p>
              </div>
            ))}
        </StyledDropdown>
      </StyledWrapper>
    );
  }
}

DropdownCrypto.propTypes = {
  selected: PropTypes.string.isRequired,
  crypto: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
};

export default DropdownCrypto;
