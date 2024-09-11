'use client';
import InputField from 'components/fields/InputField';
import Default from 'components/auth/variants/DefaultAuthLayout';
import { useState } from 'react';
import Link from 'next/link';
import OtpVerification from '../otp-verification/OtpVerification';

interface ForgetPasswordProps {}

type LoginType = 'email' | 'mobile';
const ForgetPassword: React.FC<ForgetPasswordProps> = () => {
    const [email, setEmail] = useState<string>('');
    const [businessPan, setBusinessPan] = useState<string>(''); // PAN will be uppercase
    const [personalPan, setPersonalPan] = useState<string>(''); // PAN will be uppercase
    const [emailError, setEmailError] = useState<string>('');
    const [businessPanError, setBusinessPanError] = useState<string>('');
    const [personalPanError, setPersonalPanError] = useState<string>('');
    const [showOTP, setShowOTP] = useState<boolean>(false); // State to manage OTP screen
    const [otp, setOtp] = useState<string>(''); 
    const [otpError, setOtpError] = useState<string>(''); 
    const [otpVerified, setOtpVerified] = useState<boolean>(false); // To manage email verification screen

    const validateEmailOrMobile = (input: string, type: LoginType) => {
        const emailRegex = /^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        const panRegex = /^[A-Za-z]{5}[0-9]{4}[A-Za-z]$/;

        if (type === 'email') {
            if (!emailRegex.test(input)) {
                return 'Invalid email format';
            }
        } else if (type === 'mobile') {
            if (!panRegex.test(input)) {
                return 'Invalid PAN number format';
            }
        }
        return '';
    };

    const handleSignIn = () => {
        let isValid = true;

        const emailError = validateEmailOrMobile(email, 'email');
        const businessPanError = validateEmailOrMobile(businessPan, 'mobile');
        const personalPanError = validateEmailOrMobile(personalPan, 'mobile');

        if (emailError) {
            setEmailError(emailError);
            isValid = false;
        } else {
            setEmailError('');
        }

        if (businessPanError) {
            setBusinessPanError(businessPanError);
            isValid = false;
        } else {
            setBusinessPanError('');
        }

        if (personalPanError) {
            setPersonalPanError(personalPanError);
            isValid = false;
        } else {
            setPersonalPanError('');
        }

        if (isValid) {
            setShowOTP(true); // Show OTP component after successful form submission
        }
    };

    const handleOtpVerification = () => {
        if (otp === '123456') { // Mock OTP verification
            setOtpVerified(true); // Show email verification screen
        } else {
            setOtpError('Invalid OTP');
        }
    };

    return (
        <Default
            maincard={
                <div className="mb-10 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-2 lg:items-center lg:justify-start">
                    <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
                        {otpVerified ? (
                            // Email verification component
                            <div>
                                <h3 className="mb-2 text-4xl font-bold text-navy-700 dark:text-white">
                                    Check Your Email
                                </h3>
                                <p className="mb-9 ml-1 text-base text-gray-600">
                                    We sent a Password reset link to jak@gmail.com
                                </p>
                                <button className="linear w-full rounded-xl bg-brand-500 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
                                    Open email
                                </button>
                                <Link
                                    className=" mt-4 flex justify-center text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
                                    href="sign-in"
                                >
                                    Back to Sign In
                                </Link>
                            </div>
                        ) : showOTP ? (
                            // OTP verification component
                            <>
                            <OtpVerification maskedEmail="jak*******@gmail.com" maskedMobile="***865788" />
                            </>
                        ) : (
                            // Initial form component
                            <div>
                                <h3 className="mb-2 text-4xl font-bold text-navy-700 dark:text-white">
                                    Forget Password
                                </h3>
                                <p className="mb-9 ml-1 text-base text-gray-600">
                                    Provide all required Details
                                </p>
                                <div className="mb-6">
                                    <InputField
                                        variant="auth"
                                        extra="mb-3"
                                        label="Enter Your Registered Email ID*"
                                        placeholder="Enter Your Registered email ID"
                                        id="emailOrMobile"
                                        type="text"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        onBlur={() => setEmailError(validateEmailOrMobile(email, 'email'))}
                                    />
                                    {emailError && <p className="text-red-500 text-xs italic">{emailError}</p>}
                                </div>
                                <div className="mb-6">
                                    <InputField
                                        variant="auth"
                                        extra="mb-3"
                                        label="Business Pan Number*"
                                        placeholder="Enter Your Business Pan Number"
                                        id="businessPan"
                                        type="text"
                                        value={businessPan}
                                        maxLength={10} // Restrict to 10 characters
                                        onChange={(e) => setBusinessPan(e.target.value.toUpperCase().slice(0, 10))} // Uppercase and restrict length
                                        onBlur={() => setBusinessPanError(validateEmailOrMobile(businessPan, 'mobile'))}
                                    />
                                    {businessPanError && <p className="text-red-500 text-xs italic">{businessPanError}</p>}
                                </div>
                                <div className="mb-6">
                                    <InputField
                                        variant="auth"
                                        extra="mb-3"
                                        label="Personal Pan Number*"
                                        placeholder="Enter Your Personal Pan Number"
                                        id="personalPan"
                                        type="text"
                                        value={personalPan}
                                        maxLength={10} // Restrict to 10 characters
                                        onChange={(e) => setPersonalPan(e.target.value.toUpperCase().slice(0, 10))} // Uppercase and restrict length
                                        onBlur={() => setPersonalPanError(validateEmailOrMobile(personalPan, 'mobile'))}
                                    />
                                    {personalPanError && <p className="text-red-500 text-xs italic">{personalPanError}</p>}
                                </div>
                                <button
                                    className="linear w-full rounded-xl bg-brand-500 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
                                    onClick={handleSignIn}
                                >
                                    Reset Password
                                </button>
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
                </div>
            }
        />
    );
};

export default ForgetPassword;
