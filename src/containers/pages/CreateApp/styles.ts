import styled from 'styled-components';

import { Alert } from '~components/Alert';

export const BlockWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  max-width: 878px;
`;

export const ProgressWrapper = styled.div`
  margin: 0 0 12px 0;
  width: 100%;
`;

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spaces.s} ${({ theme }) => theme.spaces.m};
`;

export const SubmitButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin: ${({ theme }) => theme.spaces.l} 0 0 0;
`;

export const IconWrapper = styled.div`
  padding: ${({ theme }) => theme.spaces.l} ${({ theme }) => theme.spaces.m};
`;

export const AlertWrapper = styled(Alert)`
  margin: 0 0 ${({ theme }) => theme.spaces.m};
`;
