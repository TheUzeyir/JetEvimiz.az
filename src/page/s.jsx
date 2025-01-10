import React from 'react';

const CallButton = () => {
  const handleClick = () => {
    window.location.href = 'tel:+994708632220'; // Telefon nömrəsini buraya daxil edin
  };

  return (
    <button onClick={handleClick}>Zəng Et</button>
  );
};

export default CallButton;
