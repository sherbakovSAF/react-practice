import { Provider } from "react-redux";
import HomePage from "./pages/HomePage";
import styled from "styled-components";
import { setupStore } from "./store/store";

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  > * {
    flex: 1;
  }
`;

const store = setupStore();

const App = () => {
  return (
    <Provider store={store}>
      <Wrapper>
        <HomePage />
      </Wrapper>
    </Provider>
  );
};

export default App;
