import styled from "styled-components";

export const Row = styled.div`
  margin-bottom: 10px;
  height: 100px;
  display: flex;
`;
export const CardContainer = styled.div`
  display: inline-block;
  width: 100px;
  color: #fff;
  font-size: 90px;
  padding-left: 50px;
  height: 100px;
  background: #30d5c8;
  margin-right: 10px;
  transform: ${props => (props.active ? "scale(1.05)" : "scale(1)")};
  transition: transform 0.2s ease-in;
`;

export const InfoContainer = styled.div`
    display: grid;
    padding-bottom: 8px;
`
