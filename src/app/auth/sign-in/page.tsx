'use client';
import InputField from 'components/fields/InputField';
import Default from 'components/auth/variants/DefaultAuthLayout';
import { FcGoogle } from 'react-icons/fc';
import Checkbox from 'components/checkbox';
import { useState } from 'react'; 
// import { useRouter } from 'next/navigation';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
// import { useNavigate } from 'react-router-dom';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
interface SignInDefaultProps {}

type LoginType = 'email' | 'mobile';
const SignInDefault: React.FC<SignInDefaultProps> = () => {
  
  const [emailOrMobile, setEmailOrMobile] = useState<string>(''); 
  const [password, setPassword] = useState<string>(''); 
  const [emailError, setEmailError] = useState<string>('');   
  const [passwordError, setPasswordError] = useState<string>('');
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false); 
  const [loginType, setLoginType] = useState<string>('');
  const router = useRouter();
  const validateEmailOrMobile = (input: string): LoginType | false => {
    const emailRegex = /^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const mobileRegex = /^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/;

    if (!input) {
      setEmailError('Email or Mobile number is required');
      return false;
    } else if (emailRegex.test(input)) {
      setEmailError('');
      return 'email'; // It's an email
    } else if (mobileRegex.test(input)) {
      setEmailError('');
      return 'mobile'; 
    } else {
      setEmailError('Please enter a valid email or mobile number');
      return false;
    }
  };

  const validatePassword = (password: string) => {
    if (!password) {
      setPasswordError('Password is required');
      return false;
    } else if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      return false;
    } else {
      setPasswordError('');
      return true;
    }
  };

  const maskEmailOrMobile = (input: string, type: LoginType) => {
    if (type === 'email') {
      const [name, domain] = input.split('@');
      return `${name.slice(0, 3)}*****@${domain}`;
    } else if (type === 'mobile') {
      return `${input.slice(0, 3)}*****${input.slice(-2)}`;
    }
  };
  const handleSignIn = () => {
    const inputType = validateEmailOrMobile(emailOrMobile);
    const isPasswordValid = validatePassword(password);
  
    if (inputType && isPasswordValid) {
      const maskedLogin = maskEmailOrMobile(emailOrMobile, inputType);
      setLoginType(maskedLogin); 
      router.push('otp-verification');
    }
  };

  return (
    <Default
      maincard={
        <div className="mb-10  flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-2 lg:items-center lg:justify-start">
          {/* Sign in section */}
          <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
            <h3 className="mb-2 text-4xl font-bold text-navy-700 dark:text-white">
              Login
            </h3>
            <p className="mb-9 ml-1 text-base text-gray-600">
            Hi, welcome back 🙌
            </p>
            
            {/* Email */}
            <InputField
              variant="auth"
              extra="mb-3"
              label="Email / Mobile or Customer ID*"
              placeholder="Enter Your Email / Mobile No Or Customer ID"
              id="emailOrMobile"
              type="text"
              value={emailOrMobile}
              onChange={(e) => setEmailOrMobile(e.target.value)}
              onBlur={() => validateEmailOrMobile(emailOrMobile)}
            />
            {emailError && <p className="text-red-500 text-xs italic">{emailError}</p>}
            {/* Password */}
            <div className="relative mb-3">
              <InputField
                variant="auth"
                label="Password*"
                placeholder="Enter your password"
                id="password"
                type={passwordVisible ? 'text' : 'password'}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => validatePassword(password)}
              />
              <div
                className="absolute inset-y-0 right-0 top-8 flex items-center justify-center pr-3 cursor-pointer text-2xl dark:text-white"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </div>
            </div>
            {passwordError && <p className="text-red-500 text-xs italic">{passwordError}</p>}
            {/* Checkbox */}
            <div className="mb-4 flex items-center justify-between px-2">
              <div className="mt-2 flex items-center">
                <Checkbox />
                <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">
                  Keep me logged In
                </p>
              </div>
              <Link
                className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
                href="forget-password"
              >
                Forgot Password?
              </Link>
            </div>
            <button className="linear w-full rounded-xl bg-brand-500 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200" onClick={handleSignIn}>
              Sign In
            </button>
            {/* {maskedLogin && <OtpVerification maskedLogin={maskedLogin} loginType={loginType} />} */}
            <div className="mt-4 flex items-center  gap-3">
              <div className="h-px w-full bg-gray-200 dark:!bg-navy-700" />
              <p className="text-base text-gray-600"> or </p>
              <div className="h-px w-full bg-gray-200 dark:!bg-navy-700" />
            </div>
            <div className="mb-2 mt-4 flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-lightPrimary hover:cursor-pointer dark:bg-navy-800 dark:text-white">
              <div className="rounded-full text-xl">
                <FcGoogle />
              </div>
              <p className="text-sm font-medium text-navy-700 dark:text-white">
                Sign In with Google
              </p>
            </div>
            <div className="mb-6 flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-lightPrimary hover:cursor-pointer dark:bg-navy-800 dark:text-white">
              <div className="rounded-full text-xl">
              <img src='/qr.svg'  width={20} height={20} alt="QR" />
              </div>
              <p className="text-sm font-medium text-navy-700 dark:text-white">
                Sign In with QR
              </p>
            </div>
           
            <div className="mt-4 text-center">
              <span className="text-sm  font-medium text-navy-700 dark:text-gray-500">
                Not registered yet?
              </span>
              <a
                href="/auth/sign-up"
                className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
              >
                Create an account
              </a>
            </div>
          </div>
        </div>
      }
    />
  );
}

export default SignInDefault;
