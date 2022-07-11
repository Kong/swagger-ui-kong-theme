import React from 'react';
import { render } from "@testing-library/react";

const renderComponent = (Component, props) => {
  const { container } = render(<Component {...props} />);
  return container;
};

export default renderComponent;
