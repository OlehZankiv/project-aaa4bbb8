import styled, { css } from 'styled-components'
import { getBreakpointsStyles } from '../../../../styles/breakpoints'
import { LoginIcon } from '../../../../assets/icons'

export const LoginAndRegisterButton = ({ text }) => {
  return (
    <ButtonItem type='submit'>
      {text}
      <LoginIcon />
    </ButtonItem>
  )
}

export const ButtonItem = styled.button`
  ${({ theme: { colors, shadows } }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 11px;
    margin-top: 8px;
    max-width: 287px;
    height: 46px;
    box-shadow: ${shadows.buttonShadow};
    border-radius: 16px;
    background-color: ${colors.primary};
    border: 1px solid ${colors.primary};
    color: ${colors.background};
    transition: background-color 0.25s cubic-bezier(0.4, 0, 0.2, 1),
      border 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;

    font-weight: 600;
    font-size: 14px;
    line-height: 18px;

    &:hover {
      background-color: ${colors.hoverPrimary};
    }

    ${getBreakpointsStyles({
      desktop: css`
        margin-top: 30px;
        min-width: 400px;
        max-width: 400px;

        font-size: 18px;
        line-height: 24px;
      `,
      tablet: css`
        margin-top: 30px;
        min-width: 400px;
        max-width: 400px;

        font-size: 18px;
        line-height: 24px;
      `,
    })}
  `}
`