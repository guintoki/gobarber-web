import styled from 'styled-components';

export const Container = styled.div`
  background: #232129 !important;
  border-radius: 10px;
  border: 2px solid #232129 !important;
  color: #666360 !important;
  padding: 16px;
  width: 100%;
  & + div {
    margin-top: 8px;
  }

  input {
    background: transparent;
    flex: 1;
    border: 0;

    &::placeholder {
      color: #666360 !important;
    }
  }

  svg {
    margin-right: 16px;
  }
`;
