import { useEffect, useState } from 'react';

import '../styles/ProgressBar.css';

const ProgressBar = ({ percent }) => {

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
          transition: `${value === 100 ? '' : '0.4s ease'}`,
          backgroundColor: `${percent > 0.34 ? 'rgb(62, 122, 235)' : 'rgb(255, 0, 0)'}`
        }}
      />
    </div>
  );
}

export default ProgressBar;