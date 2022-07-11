import App from "components/App";

import renderComponent from "../../utils/renderComponent";

describe("<App />", () => {
  it("was rendered", () => {
    const view = renderComponent(App);
    expect(view).toBeInTheDocument();
  });
});
