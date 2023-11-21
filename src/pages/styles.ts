import styled from "styled-components";

export const PageWrapper = styled.article`
  width: 100%;
  min-height: 100vh;
  min-width: 230px;
  background: ${({ theme }) => theme.colors.background};
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing.large};
  box-sizing: border-box;
`;
