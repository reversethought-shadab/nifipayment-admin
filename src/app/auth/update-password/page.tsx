'use client';
import InputField from 'components/fields/InputField';
import Default from 'components/auth/variants/DefaultAuthLayout';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const UpdatePassword: React.FC = () => {
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false); 
    const [passwordValid, setPasswordValid] = useState<boolean>(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');
    const [showCriteria, setShowCriteria] = useState<boolean>(true);

    // Password validation criteria state
    const [criteria, setCriteria] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        match: false,
    });

    // Validation function
    const validatePassword = (password: string) => {
        const passwordCriteria = {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /[0-9]/.test(password),
        };
        setCriteria({
            ...passwordCriteria,
            match: password === confirmPassword
        });
        // Check if all criteria are met
        setPasswordValid(
            passwordCriteria.length &&
            passwordCriteria.uppercase &&
            passwordCriteria.lowercase &&
            passwordCriteria.number &&
            password === confirmPassword
        );
    };

    // Handle new password input
    useEffect(() => {
        validatePassword(newPassword);
    }, [newPassword, confirmPassword]);

    const handleUpdatePassword = () => {
        if (passwordValid) {
            console.log('Password update successful');
            setShowCriteria(false); 
        }
    };

    return (
        <Default
            maincard={
                <div className="mb-10 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-2 lg:items-center lg:justify-start">
                    <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
                        <h3 className="mb-2 text-4xl font-bold text-navy-700 dark:text-white">
                            Change Password
                        </h3>

                        {/* New Password Input */}
                        <div className="relative mb-3">
                            <InputField
                                variant="auth"
                                label="New Password*"
                                placeholder="Enter your new password"
                                id="newPassword"
                                type={passwordVisible ? 'text' : 'password'}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <div
                                className="absolute inset-y-0 right-0 top-8 flex items-center justify-center pr-3 cursor-pointer text-2xl dark:text-white"
                                onClick={() => setPasswordVisible(!passwordVisible)}
                            >
                                {passwordVisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                            </div>
                        </div>

                        {/* Password Validation Criteria */}
                        <CSSTransition
                            in={showCriteria}
                            timeout={300}
                            classNames="fade"
                            unmountOnExit
                        >
                              <>
                                    {!criteria.length && <li className="text-red-500">At least 8 characters</li>}
                                    {!criteria.uppercase && <li className="text-red-500">At least 1 uppercase letter</li>}
                                    {!criteria.lowercase && <li className="text-red-500">At least 1 lowercase letter</li>}
                                    {!criteria.number && <li className="text-red-500">At least 1 number</li>}
                                    {!criteria.match && <li className="text-red-500">Passwords must match</li>}
                          
                                    </>
                        </CSSTransition>

                        {/* Confirm Password Input */}
                        <div className="relative mb-6">
                            <InputField
                                variant="auth"
                                extra="mb-3"
                                label="Confirm Password *"
                                placeholder="Confirm your new password"
                                id="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            {confirmPasswordError && <p className="text-red-500 text-xs italic">{confirmPasswordError}</p>}
                        </div>

                        {/* Password Restriction Info */}
                        <div className="mt-4 p-4 bg-[#EEF0F6] border border-brand-800 rounded-md">
                            <h4 className="font-semibold">Password Restrictions</h4>
                            <ul className="list-disc ml-6 text-sm text-brand-600">
                                <li>You cannot use the last 5 passwords</li>
                                <li>Avoid common numbers (e.g., 1234, 5678, etc.)</li>
                                <li>Password cannot be the same as your email</li>
                                <li>Minimum password length is 8 characters</li>
                            </ul>
                        </div>

                        {/* Reset Password Button */}
                        <button
                            className={`linear w-full rounded-xl py-3 text-base font-medium text-white mt-5 transition duration-200 ${
                                passwordValid
                                    ? 'bg-brand-500 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:bg-brand-200'
                                    : 'bg-gray-500 cursor-not-allowed'
                            }`}
                            disabled={!passwordValid}
                            onClick={handleUpdatePassword}
                        >
                           Update Password
                        </button>

                        <Link className="mt-4 flex justify-center text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white" href="/sign-in">
                            Back to login
                        </Link>
                    </div>
                </div>
            }
        />
    );
};

export default UpdatePassword;
