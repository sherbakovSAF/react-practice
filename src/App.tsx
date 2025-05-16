import HomePage from "./pages/HomePage";
import styled from "styled-components";

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  > * {
    flex: 1;
  }
`;

const App = () => {
  return (
    <Wrapper>
      <HomePage />
    </Wrapper>
  );
};

export default App;
