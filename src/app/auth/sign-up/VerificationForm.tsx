'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import InputField from 'components/fields/InputField';
import { AiOutlineEdit, AiOutlineCheck } from 'react-icons/ai';
import { CSSTransition } from 'react-transition-group';

const VerificationForm = () => {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [isMobileVerified, setIsMobileVerified] = useState(false);
    const [emailOtp, setEmailOtp] = useState(Array(6).fill(''));
    const [mobileOtp, setMobileOtp] = useState(Array(6).fill(''));
    const [isEmailOtpSent, setIsEmailOtpSent] = useState(false);
    const [isMobileOtpSent, setIsMobileOtpSent] = useState(false);
    const [isEmailOtpVerified, setIsEmailOtpVerified] = useState(false);
    const [isMobileOtpVerified, setIsMobileOtpVerified] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [mobileErrorMessage, setMobileErrorMessage] = useState('');
    const [otpSuccessMessage, setOtpSuccessMessage] = useState('');
    const [emailOtpTimer, setEmailOtpTimer] = useState(60);
    const [mobileOtpTimer, setMobileOtpTimer] = useState(60);
     // Timer for Email OTP
  useEffect(() => {
    let timer;
    if (isEmailOtpSent && emailOtpTimer > 0) {
      timer = setInterval(() => {
        setEmailOtpTimer((prev) => prev - 1);
      }, 1000);
    } else if (emailOtpTimer === 0) {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isEmailOtpSent, emailOtpTimer]);

  // Timer for Mobile OTP
  useEffect(() => {
    let timer;
    if (isMobileOtpSent && mobileOtpTimer > 0) {
      timer = setInterval(() => {
        setMobileOtpTimer((prev) => prev - 1);
      }, 1000);
    } else if (mobileOtpTimer === 0) {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isMobileOtpSent, mobileOtpTimer]);
  // Handle input change
  const handleVerifyEmail = () => {
    if (!email) {
      setEmailErrorMessage('Please enter your email.');
      return;
    }
    setIsEmailOtpSent(true);
    setIsEmailVerified(true);
    setEmailErrorMessage('');
    setOtpSuccessMessage('OTP sent successfully.');
    setEmailOtpTimer(60);
  };

  const handleVerifyMobile = () => {
    if (!mobile) {
      setMobileErrorMessage('Please enter your mobile.');
      return;
    }
    if (mobile.length < 10 || mobile.length > 10) {
      setMobileErrorMessage('Mobile number must be exactly 10 digits.');
      return;
    }
    setIsMobileOtpSent(true);
    setIsMobileVerified(true);
    setMobileErrorMessage('');
    setOtpSuccessMessage('OTP sent successfully.');
    setMobileOtpTimer(60);
  };

  const handleResendEmailOtp = () => {
    setIsEmailOtpSent(true);
    setEmailOtp(Array(6).fill(''));
    setEmailOtpTimer(60);
    setOtpSuccessMessage('OTP resent successfully.');
  };

  const handleResendMobileOtp = () => {
    setIsMobileOtpSent(true);
    setMobileOtp(Array(6).fill(''));
    setMobileOtpTimer(60);
    setOtpSuccessMessage('OTP resent successfully.');
  };

  const handleOtpChange = (value, index, type) => {
    const otpArray = type === 'email' ? [...emailOtp] : [...mobileOtp];
    if (/^\d$/.test(value) || value === '') {
      otpArray[index] = value;
      type === 'email' ? setEmailOtp(otpArray) : setMobileOtp(otpArray);

      if (value !== '' && index < 5) {
        document.getElementById(`${type}-otp-${index + 1}`)?.focus();
      } else if (value === '' && index > 0) {
        document.getElementById(`${type}-otp-${index - 1}`)?.focus();
      }

      if (otpArray.join('') === '123456') {
        if (type === 'email') {
          setIsEmailOtpVerified(true);
          setIsEmailOtpSent(false);
        } else {
          setIsMobileOtpVerified(true);
          setIsMobileOtpSent(false);
        }
        type === 'email' ? setEmailErrorMessage('') : setMobileErrorMessage('');
      } else if (otpArray.every((val) => val !== '')) {
        type === 'email'
          ? setEmailErrorMessage('Incorrect OTP.')
          : setMobileErrorMessage('Incorrect OTP.');
      }
    }
  };

  return (
    <div className="">
      <div className="relative mb-3">
        <InputField
          variant="auth"
          label="Name*"
          placeholder="Enter your name"
          id="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          className="pr-10"
        />
      </div>

      {/* Email Section */}
      <div className="relative mb-3">
        <InputField
          variant="auth"
          label="Email*"
          placeholder="Enter your email"
          id="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setIsEmailVerified(false);
            setIsEmailOtpSent(false);
            setEmailOtp(Array(6).fill(''));
          }}
          state={emailErrorMessage ? 'error' : ''}
          errorMessage={emailErrorMessage}
          disabled={isEmailOtpVerified}
          className="pr-10"
        />
        <div className="absolute inset-y-0 right-0 top-[2.9rem] cursor-pointer pr-3 text-xl dark:text-white">
          {isEmailVerified && !isEmailOtpVerified && (
            <AiOutlineEdit
              className="text-xl"
              onClick={() => setIsEmailVerified(false)}
            />
          )}
          {isEmailOtpVerified && (
            <div className="rounded-full bg-green-500 p-1 text-white">
              <AiOutlineCheck />
            </div>
          )}
        </div>
        {!isEmailOtpVerified && (
          <div className="flex justify-end">
            <button
              onClick={handleVerifyEmail}
              className="mt-2 text-end text-sm text-brand-800 outline-none dark:text-white"
            >
              Verify
            </button>
          </div>
        )}
        {isEmailOtpSent && otpSuccessMessage && (
          <p className="mt-2 text-green-500">{otpSuccessMessage}</p>
        )}
        {/* Email OTP Input with smooth transition */}
        <CSSTransition
          in={isEmailOtpSent && !isEmailOtpVerified}
          timeout={300}
          classNames="otp-transition"
          unmountOnExit
        >
          <div className="mt-3 flex space-x-2">
            {emailOtp.map((value, index) => (
              <InputField
                key={index}
                id={`email-otp-${index}`}
                type="text"
                placeholder=""
                value={value}
                label={null}
                onChange={(e) =>
                  handleOtpChange(e.target.value, index, 'email')
                }
                maxLength={1}
                className="w-10 border p-2 text-center mt-0"
              />
            ))}
          </div>
        </CSSTransition>
        {isEmailOtpSent && emailOtpTimer > 0 && (
          <p className="mt-2 text-sm text-gray-500">
            Resend OTP in {emailOtpTimer} seconds
          </p>
        )}
        {isEmailOtpSent && emailOtpTimer === 0 && (
          <button
            onClick={handleResendEmailOtp}
            className="mt-2 text-sm text-brand-800 outline-none dark:text-white"
          >
            Resend OTP
          </button>
        )}
      </div>

      {/* Mobile Section */}
      <div className="relative mb-3">
        <InputField
          variant="auth"
          label="Mobile*"
          placeholder="Enter your mobile"
          id="mobile"
          type='number'
          maxLength={10}
          value={mobile}
          onChange={(e) => {
            setMobile(e.target.value);
            setIsMobileVerified(false);
            setIsMobileOtpSent(false);
            setMobileOtp(Array(6).fill(''));
          }}
          state={mobileErrorMessage ? 'error' : ''}
          errorMessage={mobileErrorMessage}
          disabled={isMobileOtpVerified}
          className="pr-10"
        />
        <div className="absolute inset-y-0 right-0 top-[2.9rem] cursor-pointer pr-3 text-xl dark:text-white">
          {isMobileVerified && !isMobileOtpVerified && (
            <AiOutlineEdit onClick={() => setIsMobileVerified(false)} />
          )}
          {isMobileOtpVerified && (
            <div className="rounded-full bg-green-500 p-1 text-white">
              <AiOutlineCheck />
            </div>
          )}
        </div>
        {!isMobileOtpVerified && (
          <div className="flex justify-end">
            <button
              onClick={handleVerifyMobile}
              className="mt-2 text-end text-sm text-brand-800 outline-none dark:text-white"
            >
              Verify
            </button>
          </div>
        )}
        {isMobileOtpSent && otpSuccessMessage && (
          <p className="mt-2 text-green-500">{otpSuccessMessage}</p>
        )}
        {/* Mobile OTP Input with smooth transition */}
        <CSSTransition
          in={isMobileOtpSent && !isMobileOtpVerified}
          timeout={300}
          classNames="otp-transition"
          unmountOnExit
        >
          <div className="mt-3 flex space-x-2">
            {mobileOtp.map((value, index) => (
              <InputField
                placeholder=""
                key={index}
                id={`mobile-otp-${index}`}
                type="text"
                value={value}
                label={null}
                onChange={(e) =>
                  handleOtpChange(e.target.value, index, 'mobile')
                }
                maxLength={1}
                className="w-10 border p-2 text-center"
              />
            ))}
          </div>
        </CSSTransition>
        {isMobileOtpSent && mobileOtpTimer > 0 && (
          <p className="mt-2 text-sm text-gray-500">
            Resend OTP in {mobileOtpTimer} seconds
          </p>
        )}
        {isMobileOtpSent && mobileOtpTimer === 0 && (
          <button
            onClick={handleResendMobileOtp}
            className="mt-2 text-sm text-brand-800 outline-none dark:text-white"
          >
            Resend OTP
          </button>
        )}
        {mobileErrorMessage && (
          <p className="text-red-500">{mobileErrorMessage}</p>
        )}
      </div>

      <button
        className={`linear mt-4 w-full rounded-xl bg-brand-500 py-3 text-base font-medium text-white transition duration-200 ${
          isEmailOtpVerified && isMobileOtpVerified
            ? 'hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200'
            : 'cursor-not-allowed opacity-50'
        }`}
        disabled={!(isEmailOtpVerified && isMobileOtpVerified)}
        onClick={() => router.push('/')}
      >
        Sign Up
      </button>
    </div>
  );
};

export default VerificationForm;
