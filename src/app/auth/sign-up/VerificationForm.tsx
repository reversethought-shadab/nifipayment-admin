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
    const [errorMessage, setErrorMessage] = useState('');
   

    const handleVerifyEmail = () => {
        if (!email) {
            setErrorMessage('Please enter your email.');
            return;
        }
        setIsEmailOtpSent(true);
        setIsEmailVerified(true);
        setErrorMessage('');
    };

    const handleVerifyMobile = () => {
        if (!mobile) {
            setErrorMessage('Please enter your mobile.');
            return;
        }
        setIsMobileOtpSent(true);
        setIsMobileVerified(true);
        setErrorMessage('');
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
                type === 'email' ? setIsEmailOtpVerified(true) : setIsMobileOtpVerified(true);
                setErrorMessage('');
            } else if (otpArray.every(val => val !== '')) {
                setErrorMessage('Incorrect OTP.');
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
                    state={errorMessage ? 'error' : ''}
                    errorMessage={errorMessage}
                    disabled={isEmailOtpVerified}
                    className="pr-10" // Adjust padding-right for the edit icon
                />
                <div className="absolute inset-y-0 right-0 top-[2.9rem]  pr-3 cursor-pointer text-xl dark:text-white">
                    {isEmailVerified && !isEmailOtpVerified && (
                        <AiOutlineEdit className='text-xl' onClick={() => setIsEmailVerified(false)} />
                    )}
                    {isEmailOtpVerified && (
                        <div className="bg-green-500 text-white rounded-full p-1">
                            <AiOutlineCheck />
                        </div>
                    )}
                </div>
                {!isEmailOtpVerified && (
                    <div className="flex justify-end">
                        <button
                            onClick={handleVerifyEmail}
                            className="text-brand-800 dark:text-white text-sm outline-none mt-2 text-end"
                        >
                            Verify 
                        </button>
                    </div>
                )}

                {/* Email OTP Input with smooth transition */}
                <CSSTransition
                    in={isEmailOtpSent && !isEmailOtpVerified}
                    timeout={300}
                    classNames="otp-transition"
                    unmountOnExit
                >
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
                            />
                        ))}
                    </div>
                </CSSTransition>
            
            </div>

            {/* Mobile Section */}
            <div className="relative mb-3">
                <InputField
                    variant="auth"
                    label="Mobile*"
                    placeholder="Enter your mobile"
                    id="mobile"
                    value={mobile}
                    onChange={(e) => {
                        setMobile(e.target.value);
                        setIsMobileVerified(false);
                        setIsMobileOtpSent(false);
                        setMobileOtp(Array(6).fill(''));
                    }}
                    state={errorMessage ? 'error' : ''}
                    errorMessage={errorMessage}
                    disabled={isMobileOtpVerified}
                    className="pr-10" // Adjust padding-right for the edit icon
                />
                <div className="absolute inset-y-0 right-0 top-[2.9rem]  pr-3 cursor-pointer text-xl dark:text-white">
                    {isMobileVerified && !isMobileOtpVerified && (
                        <AiOutlineEdit onClick={() => setIsMobileVerified(false)} />
                    )}
                    {isMobileOtpVerified && (
                        <div className="bg-green-500 text-white rounded-full p-1">
                            <AiOutlineCheck />
                        </div>
                    )}
                </div>
                {!isMobileOtpVerified && (
                    <div className="flex justify-end">
                        <button
                            onClick={handleVerifyMobile}
                            className="text-brand-800 dark:text-white text-sm outline-none mt-2 text-end"
                        >
                            Verify 
                        </button>
                    </div>
                )}

                {/* Mobile OTP Input with smooth transition */}
                <CSSTransition
                    in={isMobileOtpSent && !isMobileOtpVerified}
                    timeout={300}
                    classNames="otp-transition"
                    unmountOnExit
                >
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
                            />
                        ))}
                    </div>
                </CSSTransition>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            </div>

            <button
                className={`linear w-full mt-4 rounded-xl bg-brand-500 py-3 text-base font-medium text-white transition duration-200 ${
                    isEmailOtpVerified && isMobileOtpVerified
                        ? 'hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200'
                        : 'opacity-50 cursor-not-allowed'
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
