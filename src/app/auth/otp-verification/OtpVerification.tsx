import React, { useState, useEffect } from 'react';
import InputField from 'components/fields/InputField';
import Link from 'next/link';

interface OtpVerificationProps {
  maskedEmail: string;
  maskedMobile: string;
}

const OtpVerification: React.FC<OtpVerificationProps> = ({ maskedEmail, maskedMobile }) => {
  const [emailOtp, setEmailOtp] = useState(Array(6).fill(""));
  const [mobileOtp, setMobileOtp] = useState(Array(6).fill(""));
  const [emailOtpVerified, setEmailOtpVerified] = useState(false);
  const [mobileOtpVerified, setMobileOtpVerified] = useState(false);
  const [emailTimeLeft, setEmailTimeLeft] = useState(45);
  const [mobileTimeLeft, setMobileTimeLeft] = useState(45);
  const [errorMessage, setErrorMessage] = useState('');
  const [showCheckEmail, setShowCheckEmail] = useState(false);

  useEffect(() => {
    const emailTimer = setInterval(() => {
      setEmailTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(emailTimer);
  }, []);

  useEffect(() => {
    const mobileTimer = setInterval(() => {
      setMobileTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(mobileTimer);
  }, []);

  // Handle OTP input change, allowing only numbers
  const handleOtpChange = (value: string, index: number, otpType: 'email' | 'mobile') => {
    if (/^\d$/.test(value) || value === '') {
      const otpState = otpType === 'email' ? [...emailOtp] : [...mobileOtp];
      otpState[index] = value;
      otpType === 'email' ? setEmailOtp(otpState) : setMobileOtp(otpState);

      if (value !== '' && index < 5) {
        document.getElementById(`${otpType}-otp-${index + 1}`)?.focus();
      } else if (value === '' && index > 0) {
        document.getElementById(`${otpType}-otp-${index - 1}`)?.focus();
      }

      // Simulated OTP verification for demonstration
      if (otpState.join('') === '123456') {
        otpType === 'email' ? setEmailOtpVerified(true) : setMobileOtpVerified(true);
        setErrorMessage('');
      } else if (otpState.every(val => val !== '')) {
        setErrorMessage('Incorrect OTP.');
      }
    }
  };

  const handleResendClick = (otpType: 'email' | 'mobile') => {
    if (otpType === 'email') {
      setEmailTimeLeft(45);
      setEmailOtp(Array(6).fill(""));
      setEmailOtpVerified(false);
    } else {
      setMobileTimeLeft(45);
      setMobileOtp(Array(6).fill(""));
      setMobileOtpVerified(false);
    }
    setErrorMessage('');
  };

  const handleVerifyClick = () => {
    if (emailOtpVerified && mobileOtpVerified) {
      setShowCheckEmail(true); // Show "Check Your Email" screen after verification
    } else {
      setErrorMessage('Please enter the correct OTP.');
    }
  };

  return (
    <div>
      {!showCheckEmail ? (
        <div>
          <h2 className='text-2xl font-bold text-navy-700 dark:text-white'>
            Verify Mobile number and Email Address
          </h2>

          {/* OTP Section for Email */}
          <p className='text-sm text-green-500 font-medium mt-8 dark:text-white'>
            OTP has been sent to {maskedEmail}
          </p>
          <div className="flex space-x-2 mt-3">
            {emailOtp.map((value, index) => (
              <InputField
                key={index}
                id={`email-otp-${index}`}
                type="text"
                value={value}
                onChange={(e) => handleOtpChange(e.target.value, index, 'email')}
                maxLength={1}
                className="border p-2 w-10 text-center"
              
                placeholder="0"
              />
            ))}
          </div>
          <div className='flex justify-between'>
            <p className='mt-3 text-sm text-gray-600 dark:text-white'>
              {emailTimeLeft < 10 ? `00:0${emailTimeLeft}` : `00:${emailTimeLeft}`}
            </p>
            <button
              className='text-sm text-gray-600 dark:text-white'
              onClick={() => handleResendClick('email')}
              disabled={emailTimeLeft !== 0}
            >
              Resend OTP
            </button>
          </div>

          {/* OTP Section for Mobile */}
          <p className='text-sm text-green-500 font-medium mt-8 dark:text-white'>
            OTP has been sent to {maskedMobile}
          </p>
          <div className="flex space-x-2 mt-3">
            {mobileOtp.map((value, index) => (
              <InputField
                key={index}
                id={`mobile-otp-${index}`}
                type="text"
                value={value}
                onChange={(e) => handleOtpChange(e.target.value, index, 'mobile')}
                maxLength={1}
                className="border p-2 w-10 text-center"
                
                placeholder="0"
              />
            ))}
          </div>
          <div className='flex justify-between'>
            <p className='mt-3 text-sm text-gray-600 dark:text-white'>
              {mobileTimeLeft < 10 ? `00:0${mobileTimeLeft}` : `00:${mobileTimeLeft}`}
            </p>
            <button
              className='text-sm text-gray-600 dark:text-white'
              onClick={() => handleResendClick('mobile')}
              disabled={mobileTimeLeft !== 0}
            >
              Resend OTP
            </button>
          </div>

          {errorMessage && <p className="text-red-500">{errorMessage}</p>}

          {/* Button for Verifying OTP for both Mobile & Email */}
          <button
            className={`linear w-full mt-4 rounded-xl bg-brand-500 py-3 text-base font-medium text-white transition duration-200 ${emailOtpVerified && mobileOtpVerified
                ? 'hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200'
                : 'opacity-50 cursor-not-allowed'
              }`}
            onClick={handleVerifyClick}
          >
            Verify OTP
          </button>
        </div>
      ) : (
        <div className="mt-32  ">
          <div className="flex justify-start  items-start gap-4 flex-col ">
            <img src="/email.svg" alt="" />
            <h3 className="text-2xl font-bold text-navy-700 dark:text-white">Check Your Email</h3>
          </div>
          <p className="mt-4 text-base text-gray-600 dark:text-white">
            We sent a password reset link to {maskedEmail}
          </p>
          <button
            className="mt-6 linear w-full rounded-xl bg-brand-500 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
            onClick={() => {
              // Logic for email confirmation or further action
            }}
          >
            Open Email
          </button>
          <p className="mt-4 text-sm text-gray-600 dark:text-white">
            Didn't receive the email? <Link href="#" className='text-brand-800 dark:text-white'> Click to resend. </Link>
          </p>
          <div className="mt-4 flex items-center  gap-3">
            <div className="h-px w-full bg-gray-200 dark:!bg-navy-700" />
            <p className="text-base text-gray-600"> or </p>
            <div className="h-px w-full bg-gray-200 dark:!bg-navy-700" />
          </div>
          <Link
            className=" mt-4 flex justify-center text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
            href="sign-in"
          >
            Back to Sign In
          </Link>
        </div>
      )}
    </div>
  );
};

export default OtpVerification;
