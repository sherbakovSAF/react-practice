import { Provider } from "react-redux";
import { setupStore, type RootState } from "../store/store";
import { render } from "@testing-library/react";

export const renderWithStore = (
  component: React.ReactElement,
  initialStore: Partial<RootState>
) => {
  const store = setupStore(initialStore);

  return render(<Provider store={store}>{component}</Provider>);
};
