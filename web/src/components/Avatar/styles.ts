import styled, { css } from 'styled-components';

interface NullStateProps {
  color: string;
  backgroundColor: string;
}

export const NullState = styled.span<NullStateProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: ${(props) => props.backgroundColor};
  color: ${(props) => props.color};

  ${({ theme }) => css`
    width: ${theme.sizes.md};
    height: ${theme.sizes.md};
  `}
`;

export const Avatar = styled.img`
  border-radius: 50%;
  ${({ theme }) => css`
    width: ${theme.sizes.md};
    height: ${theme.sizes.md};
  `}
`;
