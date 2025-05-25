import { Provider } from "react-redux";
import HomePage from "./pages/HomePage";
import styled from "styled-components";
import { setupStore } from "./store/store";
import { useEffect } from "react";

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
  useEffect(() =>
    alert(`
  Данный сайт не несёт реальной информации.
  Всё выдумано и сгенерировано радомом с помощью сервиса MockApi
  Анкеты, который ты указаны, не являются реальными
      `)
  );
  return (
    <Provider store={store}>
      <Wrapper>
        <HomePage />
      </Wrapper>
    </Provider>
  );
};

export default App;
