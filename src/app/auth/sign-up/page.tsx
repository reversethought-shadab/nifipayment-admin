'use client';
import Default from 'components/auth/variants/DefaultAuthLayout';
import { FcGoogle } from 'react-icons/fc';
import VerificationForm from './VerificationForm';

function SignUpDefault() {
  
    return (
        <Default
            maincard={
                <div className="mb-10  flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-2 lg:items-center lg:justify-start">
                    {/* Sign in section */}
                    <div className="mt-[9vh]  shadow-md  rounded-xl md:mt-[15vh] justify-center p-10   w-full max-w-full flex-col items-center  xl:max-w-[520px]">
                        <h3 className="mb-2 text-3xl font-bold text-navy-700 dark:text-white">
                            Sign Up
                        </h3>
                        <p className="mb-4 ml-1 text-base text-gray-600">
                        We need these details to identify you and create your account
                        </p>
                       <VerificationForm/>

                       
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
                                Sign Up with Google
                            </p>
                        </div>
                       
                        <div className="mt-4 text-center">
                            <span className="text-sm  font-medium text-navy-700 dark:text-gray-500">
                                Already have an account?
                            </span>
                            <a
                                href="/auth/sign-in"
                                className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
                            >
                                Sign In
                            </a>
                        </div>
                    </div>
                </div>
            }
        />  
    );
}

export default SignUpDefault;
