import React, { useState, useEffect } from 'react'

type Props = {
  status: number | null;
  detail: string | null;
};

const Snackbar: React.FC<Props> = ({ status, detail }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (detail) {
      const timer = setTimeout(() => {
        setVisible(false); // Hide the message after 5 seconds
      }, 2000); // 5000ms = 5 seconds

      return () => clearTimeout(timer); // Cleanup the timeout if the component unmounts
    }
  }, [detail]);

  if (!visible || !detail) return null;

  const isSuccess = status === 200;

  return (
    <div className={`alert ${isSuccess ? 'alert-success' : 'alert-danger'}`}>
      {detail}
    </div>
  );
};

export default Snackbar;