import styled, { css } from "styled-components";
import { transparentize, darken, lighten } from "polished";
import Theme from "../theme";

export const Button = styled.div`
  padding: 8px;
  border-radius: ${Theme.BaseRadius};
  color: #fff;
  text-align: center;
  min-width: 80px;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
  display: inline-block;
  cursor: pointer;
  margin: 5px;
  &:hover{
    background: ${darken(0.3, Theme.BaseColor)}
  }
  ${props =>
    props.icon &&
    css`
      width: 30px;
      height: 30px;
      padding: 8px 0;
      min-width: 30px;
    `}
  ${props =>
    props.color &&
    css`
    background-color: ${props => props.color};
    &:hover {
      background: ${props => darken(0.3, props.color)} 
    }
  `}
  ${props =>
    props.largeIcon &&
    css`
      padding: 10px;
      height: 200px;
      width: 200px;
      font-size: 100px;
      line-height: 140px;
    `}
  ${props =>
    props.fullWidth &&
    css`
      width: 100%;
    `}
`;
