import React, { useState, useImperativeHandle, forwardRef } from 'react';

const generateCaptcha = () => {
  const charsArray = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lengthOtp = 6;
  let captcha = [];
  for (let i = 0; i < lengthOtp; i++) {
    const index = Math.floor(Math.random() * charsArray.length);
    captcha.push(charsArray[index]);
  }
  return captcha.join('');
};

const Captcha = forwardRef(({ onChange }, ref) => {
  const [captcha, setCaptcha] = useState(generateCaptcha());

  // Expose regenerateCaptcha to parent component
  useImperativeHandle(ref, () => ({
    regenerateCaptcha() {
      const newCaptcha = generateCaptcha();
      setCaptcha(newCaptcha);
      onChange({ captcha: '', input: newCaptcha }); // Reset input and update parent with new captcha
    }
  }));

  const handleInputChange = (e) => {
    onChange({ captcha: e.target.value, input: captcha });
  };

  return (
    <div className="captcha-main d-flex align-items-center">
      <input
        type="text"
        className="form-control me-2"
        placeholder="Enter Captcha"
        onChange={handleInputChange}
      />
      <div id="image" className="captcha-image">
        {captcha.split('').map((char, idx) => (
          <span key={idx} className="captcha-char">
            {char}
          </span>
        ))}
      </div>
      <button
        type="button"
        className="btn btn-light ms-2"
        onClick={() => ref.current.regenerateCaptcha()}
      >
        <i className="fas fa-sync"></i>
      </button>
    </div>
  );
});

export default Captcha;
