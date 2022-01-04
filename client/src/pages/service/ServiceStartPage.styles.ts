import styled from 'styled-components';

export const BackgroundContainer = styled.div`
  background-color: linear-gradient(
    rgba(244, 255, 252, 0),
    rgb(238, 253, 250),
    rgb(235, 252, 248)
  );
  width: 100vw;
  height: 100vh;
`;

export const ApprovalContainer = styled.form`
  margin: 10px auto;
`;

export const ApproveLabel = styled.label``;

export const ToServiceBtnContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const ToServiceBtn = styled.button`
  font: inherit;
  font-weight: bold;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  font-size: 1.05rem;
  border: none;
  border-radius: 7px;
  justify-content: space-between;
  width: fit-content;
  margin: 15px 5px;

  &:hover {
    transition: ease-in 200ms;
    background-color: white;
    box-shadow: 1px 1px 2px 1px grey;
  }
`;
