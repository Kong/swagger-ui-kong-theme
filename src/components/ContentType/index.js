import React, {useEffect} from "react";
import InfoAlert from "components/InfoAlert";

/**
 * stripped down version of https://github.com/swagger-api/swagger-ui/blob/master/src/core/components/content-type.jsx
 * we needed to get the changes from https://github.com/swagger-api/swagger-ui/pull/7133
 * as well a default aria label
 */
const ContentType = (props) => {

    const {onChange, contentTypes, ariaControls, ariaLabel = 'Content type', className, controlId, value} = props;
    useEffect(() => {
        return () => {
            if (contentTypes) {
                onChange(contentTypes[0]);
            }
        };
    }, []);

    useEffect(() => {
        return () => {
            if (!contentTypes?.length) {
                return;
            }
            if (!contentTypes.includes(value)) {
                onChange(contentTypes[0]);
            }
        }
    }, [contentTypes?.length])

    const onChangeHandler = ({target: {value}}) => onChange(value)

  const onChangeWrapper = ({target: {value}}) => onChange(value)

  return (
      <div className={"content-type-wrapper " + (className || "")}>
        <select aria-controls={ariaControls} aria-label={ariaLabel} className="content-type" id={controlId} onChange={onChangeWrapper} value={value || ""} >
          {contentTypes.map((val) => {
            return <option key={val} value={val}>{val}</option>
          })}
        </select>
      </div>
  )
}

export default ContentType;
