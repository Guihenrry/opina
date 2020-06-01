import styled from 'styled-components';

export const Container = styled.ul`
  position: fixed;
  right: 0;
  top: 0;
  z-index: 100;
  max-height: 100vh;
  overflow: hidden;

  padding: ${(props) => props.theme.sizes.sm};
`;
