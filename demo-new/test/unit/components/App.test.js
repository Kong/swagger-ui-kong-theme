import App from "components/App";

import renderComponent from "../../utils/renderComponet";

describe("<App />", () => {
  it("was rendered", () => {
    const container = renderComponent(App);
    expect(container).toBeInTheDocument();
  });
});
