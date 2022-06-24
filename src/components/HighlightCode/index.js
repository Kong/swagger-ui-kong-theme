/**
 * Original file: https://github.com/Kong/swagger-ui/blob/main/src/core/components/highlight-code.jsx
 * @prettier
 */
import { highlight } from "../../helpers/helpers";
import saveAs from "js-file-download";
import React, { useEffect, useRef } from "react";

export default function HighlightCode({
  value,
  className,
  fileName,
  downloadable,
}) {
  const el = useRef();

  useEffect(() => {
    highlight(el.current);
  }, [el.current]);

  const downloadText = () => {
    saveAs(value, fileName || "response.txt");
  };

  const preventYScrollingBeyondElement = (e) => {
    const target = e.target;

    var deltaY = e.nativeEvent.deltaY;
    var contentHeight = target.scrollHeight;
    var visibleHeight = target.offsetHeight;
    var scrollTop = target.scrollTop;

    const scrollOffset = visibleHeight + scrollTop;

    const isElementScrollable = contentHeight > visibleHeight;
    const isScrollingPastTop = scrollTop === 0 && deltaY < 0;
    const isScrollingPastBottom = scrollOffset >= contentHeight && deltaY > 0;

    if (isElementScrollable && (isScrollingPastTop || isScrollingPastBottom)) {
      e.preventDefault();
    }
  };

  return (
    <div className="highlight-code" tabIndex={0}>
      {!downloadable ? null : (
        <div
          role="button"
          aria-label="download contents"
          className="download-contents"
          onClick={downloadText}
        >
          Download
        </div>
      )}
      <pre
        ref={el}
        onWheel={preventYScrollingBeyondElement}
        className={(className || "") + " microlight"}
        tabIndex="0"
      >
        {value}
      </pre>
    </div>
  );
}
