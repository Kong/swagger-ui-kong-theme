import React from "react";
import styles from "./styles.module.css";

const TryItOutButton = (props) => {
  const { onTryoutClick, onCancelClick, enabled, specSelectors } = props;

  const servers = specSelectors?.servers();
  const hasServers = !!(servers && servers.length);

  return hasServers ? (
    <div className={styles.tryOutWrapper}>
      {enabled ? (
        <button
          aria-label="Cancel sending an example request"
          className={`${styles.btnCancel} btn`}
          onClick={onCancelClick}
        >
          Cancel
        </button>
      ) : (
        <button
          aria-label="Try sending an example request"
          className={`${styles.btnTryOut} btn`}
          onClick={onTryoutClick}
        >
          Try it out
        </button>
      )}
    </div>
  ) : null;
};

export const TryItOutWrapper = (Original, system) => (props) => {
  return (
    <div>
      <Original {...props} system={system} />
    </div>
  );
};

export default TryItOutButton;
