import * as React from "react";
import styled from "src/shared/styled-components";
import * as Autosuggest from "react-autosuggest";
import inputStyles from "src/shared/inputStyles";

const StringAutosuggester = Autosuggest as { new (): Autosuggest<string> };

const AutosuggestWrapper = styled.div`
  .react-autosuggest__container {
    position: relative;
  }

  .react-autosuggest__input {
    ${inputStyles};
  }

  .react-autosuggest__input:hover {
    border: 2px solid
      ${props => props.theme.colors.greyDark};
  }

  .react-autosuggest__input--focused {
    outline: none;
  }

  .react-autosuggest__suggestions-container {
    display: none;
  }

  .react-autosuggest__suggestions-container--open {
    display: block;
    padding-top: 5px;
    padding-bottom: 5px;
    position: absolute;
    width: 100%;
    align-self: center;
    background: ${props => props.theme.colors.white};
    overflow-y: auto;
    max-height: 200px;
    border: 1px solid
      ${props => props.theme.colors.greyLight};
    border-radius: 2px;
    z-index: 10;
  }

  .react-autosuggest__suggestions-list {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  .react-autosuggest__suggestion {
    font-weight: normal;
    cursor: pointer;
    padding: 10px 20px;
  }

  .react-autosuggest__suggestion--highlighted {
    font-weight: normal;
    background-color: ${props => props.theme.colors.primaryLight};
  }

  .react-autosuggest__suggestion--selected {
    font-weight: normal;
    background-color: ${props => props.theme.colors.primary};
  }
`;

export const StyledAutosuggest = (props: any) => (
  <AutosuggestWrapper>
    <StringAutosuggester {...props} />
  </AutosuggestWrapper>
);

export const AutosuggestItem = styled.div``;
