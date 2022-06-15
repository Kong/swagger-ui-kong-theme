import React from "react"
import styles from './styles.module.css';

const TryItOutButton = (props) => {
  const {onTryoutClick, onCancelClick, enabled} = props;

  return (
      <div className={styles.tryOutWrapper}>
        {
          enabled ? <button
                    aria-label="Cancel sending an example request"
                    className={styles.btnCancel}
                    onClick={onCancelClick}>Cancel</button>
              : <button aria-label="Try sending an example request" className={styles.btnTryOut}
                        onClick={onTryoutClick}>Try it out </button>
        }
      </div>
  )
};

export default TryItOutButton;
