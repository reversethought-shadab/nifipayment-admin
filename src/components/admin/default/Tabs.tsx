'use client';
import { useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import PersonalKYC from './PersonalKYC';
import BusinessKYC from './BusinessKYC';
import BankDetails from './BankDetails';

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isPersonalKYCCompleted, setIsPersonalKYCCompleted] = useState(false);
  const [isBusinessKYCCompleted, setIsBusinessKYCCompleted] = useState(false);
  const [isBankDetailsCompleted, setIsBankDetailsCompleted] = useState(false);
  const handleTabClick = (index) => {
    if (
      (index === 1 && !isPersonalKYCCompleted) ||
      (index === 2 && !isBusinessKYCCompleted)
    ) {
      return; // Prevent switching if previous sections are not completed
    }
    setActiveTab(index);
  };

  const handleNextPersonalKYC = () => {
    // Assume validatePersonalKYC() is a function that validates Personal KYC fields
    if (validatePersonalKYC()) {
      setIsPersonalKYCCompleted(true);
      setActiveTab(1); // Switch to Business KYC
    }
  };

  const handleNextBusinessKYC = () => {
    // Assume validateBusinessKYC() is a function that validates Business KYC fields
    if (validateBusinessKYC()) {
      setIsBusinessKYCCompleted(true);
      setActiveTab(2); // Switch to Bank Details
    }
  };
  const isTabAccessible = (index) => {
    if (index === 1 && !isPersonalKYCCompleted) return false;
    if (index === 2 && !isBusinessKYCCompleted) return false;
    return true;
  };
const handleNextBankDetails = () => {
 if(validateBusinessKYC()){
  setIsBankDetailsCompleted(true);
  setActiveTab(3); // Switch to Signatory Details
 }

};
const getTabClassName = (index) => {
  if (index < activeTab) {
    return '';
  } else if (index === activeTab) {
    return 'text-brand-800 font-medium border-b-[3px] border-brand-800 text-center';
  } else if (index === activeTab + 1) {
    return 'text-black hover:text-brand-600 hover:scale-105 blur-sm pointer-events-none';
  } else {
    return 'text-black hover:text-brand-600 hover:scale-105 blur-sm pointer-events-none';
  }
};

  return (
    <div>
      {/* Tab Navigation */}
      <div className="grid grid-flow-col justify-stretch text-lg border-b border-gray-300">
        {['Personal KYC', 'Business KYC', 'Bank Details', 'Signatory Details', 'Agreements'].map((label, index) => (
          <button
            key={index}
            className={`flex items-center justify-center space-x-2 pb-2 transition-all duration-300 ease-in-out transform ${getTabClassName(index)}`}
            onClick={() => handleTabClick(index)}
            disabled={activeTab !== index && !isTabAccessible(index)}
          >
            {label}
            {(index === 0 && isPersonalKYCCompleted) ||
            (index === 1 && isBusinessKYCCompleted) ||
            (index === 2 && isBankDetailsCompleted) ? (
              <FaCheckCircle className="text-green-500 ml-2" />
            ) : null}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="relative mt-6">
        <div
          className={`transition-all transform duration-700 ease-in-out ${
            activeTab === 0
              ? "opacity-100 translate-x-0 scale-100"
              : "opacity-0 -translate-x-10 scale-95 absolute"
          }`}
        >
          {activeTab === 0 && <PersonalKYC onNext={handleNextPersonalKYC} />}
        </div>
        <div
          className={`transition-all transform duration-700 ease-in-out ${
            activeTab === 1
              ? "opacity-100 translate-x-0 scale-100"
              : "opacity-0 -translate-x-10 scale-95 absolute"
          }`}
        >
          {activeTab === 1 && <BusinessKYC onNext={handleNextBusinessKYC} />}
        </div>
        <div
          className={`transition-all transform duration-700 ease-in-out ${
            activeTab === 2
              ? "opacity-100 translate-x-0 scale-100"
              : "opacity-0 -translate-x-10 scale-95 absolute"
          }`}
        >
          {activeTab === 2 && <BankDetails onNext={handleNextBankDetails} />}
        </div>
        {/* Add components for Signatory Details and Agreements as needed */}
      </div>
    </div>
  );
};

// Placeholder functions for validating KYC sections
const validatePersonalKYC = () => {
  // Implement your validation logic here
  return true;
};

const validateBusinessKYC = () => {
  // Implement your validation logic here
  return true;
};

export default Tabs;
