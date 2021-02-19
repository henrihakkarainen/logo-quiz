import { useEffect, useState } from 'react';

import '../styles/ProgressBar.css';

const ProgressBar = (props) => {
  const { percent } = props;

  const [ value, setValue ] = useState(0);

  useEffect(() => {
    setValue(percent * 100);
  }, [percent])

  return (
    <div className="progress-div">
      <div
        className="progress"
        style={{
          width: `${value}%`,
          transition: `${value === 100 ? '' : '0.4s ease'}`
        }}
      />
    </div>
  );
}

export default ProgressBar;