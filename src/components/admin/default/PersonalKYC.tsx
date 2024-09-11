"use client"
import { useState } from "react";
import Card from "components/card";
import { MdOutlineCloudUpload, MdVisibility, MdVisibilityOff } from "react-icons/md"; 

const PersonalKYC = ({ onNext }: { onNext: () => void }) => {
    const [aadhaarFile, setAadhaarFile] = useState(null);
    const [panFile, setPanFile] = useState(null);
    const [chequeFile, setChequeFile] = useState(null); 
    const [showAccountNumber, setShowAccountNumber] = useState(false);
    const [showConfirmAccountNumber, setShowConfirmAccountNumber] = useState(false);

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleFileDrop = (e, setFile) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files.length > 0 && files[0].type === "application/pdf") {
            setFile(files[0]);
        } else {
            alert("Only PDF files are allowed.");
        }
    };

    const handleFileChange = (e, setFile) => {
        e.preventDefault();
        const file = e.target.files[0];
        if (file) {
            if (file.type === "application/pdf") {
                if (file.size <= 25000000) { // 25MB in bytes
                    setFile(file);
                } else {
                    alert("File size should not exceed 25MB.");
                }
            } else {
                alert("Only PDF files are allowed.");
            }
        }
    };
   
      
    const fileInputStyle = "w-full border-2 border-dashed rounded-md p-4";
    return (
        <div className="bg-white p-8 rounded-md dark:bg-blue-50">
            <h2 className="text-2xl font-bold mb-2 text-black dark:text-brand-800">User Personal details ( KYC )</h2>
            <p className="text-sm mb-6 text-gray-600 dark:text-brand-800">Update your personal details here</p>

            <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-6 mb-6">
                {/* Name */}
                <div>
                    <label className="block text-gray-600 dark:text-brand-800">Name*</label>
                    <input
                        type="text"
                        
                        className="mt-1 block w-full px-3 py-3 bg-white dark:bg-blue-50 border border-brand-300 rounded-md text-sm shadow-sm placeholder-slate-400
                        focus:outline-none focus:border-brand-800 focus:ring-1 focus:ring-brand-800 transition-all ease-in duration-300  "
                        placeholder="Enter Your Name"
                        required
                    />
                </div>

                {/* Father Name */}
                <div>
                    <label className="block text-gray-600 dark:text-brand-800">Father Name*</label>
                    <input
                        type="text"
                        className="mt-1 block w-full px-3 py-3 bg-white dark:bg-blue-50 border border-brand-300 rounded-md text-sm shadow-sm placeholder-slate-400
                        focus:outline-none focus:border-brand-800 focus:ring-1 focus:ring-brand-800 transition-all ease-in duration-300 "
                        placeholder="Enter Your Father Name"
                    />
                </div>

                {/* Date of Birth */}
                <div>
                    <label className="block text-gray-600 dark:text-brand-800">Date of Birth*</label>
                    <input
                        type="date"
                        className="mt-1 block w-full px-3 py-3 bg-white dark:bg-blue-50 border border-brand-300 rounded-md text-sm shadow-sm placeholder-slate-400
                        focus:outline-none focus:border-brand-800 focus:ring-1 focus:ring-brand-800 transition-all ease-in duration-300 "
                        placeholder="DD/MM/YYY"
                    />
                </div>

                {/* Zip/Postal Code */}
                <div>
                    <label className="block text-gray-600 dark:text-brand-800">Zip/Postal Code*</label>
                    <input
                        type="text"
                        className="mt-1 block w-full px-3 py-3 bg-white dark:bg-blue-50 border border-brand-300 rounded-md text-sm shadow-sm placeholder-slate-400
                        focus:outline-none focus:border-brand-800 focus:ring-1 focus:ring-brand-800 transition-all ease-in duration-300 "
                        placeholder="Enter Postal Code"
                        maxLength={6}
                        minLength={6}
                        pattern="[0-9]{6}"
                    />
                </div>
                <div>
                    <label className="block text-gray-600 dark:text-brand-800">Aadhaar Number*</label>
                    <input
                        type="text"
                        className="mt-1 block w-full px-3 py-3 bg-white dark:bg-blue-50 border border-brand-300 rounded-md text-sm shadow-sm placeholder-slate-400
                        focus:outline-none focus:border-brand-800 focus:ring-1 focus:ring-brand-800 transition-all ease-in duration-300 "
                        placeholder="Enter Aadhaar Number"
                        maxLength={12}
                        minLength={12}
                        pattern="[0-9]{12}"
                    />
                </div>

                {/* PAN Number */}
                <div>
                    <label className="block text-gray-600 dark:text-brand-800">PAN Number*</label>
                    <input
                        type="text"
                        className="mt-1 block w-full px-3 py-3 bg-white dark:bg-blue-50 border border-brand-300 rounded-md text-sm shadow-sm placeholder-slate-400
                        focus:outline-none focus:border-brand-800 focus:ring-1 focus:ring-brand-800 transition-all ease-in duration-300 "
                        placeholder="Enter PAN Number"
                        pattern="[A-Z]{5}[0-9]{4}[A-Z]"
                        maxLength={10}
                        minLength={10}
                    />
                </div>
                {/* Aadhaar Number */}
                <Card className="grid h-full w-full grid-cols-1 gap-3 rounded-[20px] bg-blue-50  bg-clip-border p-3 font-dm shadow-3xl shadow-shadow-500 dark:!bg-white dark:shadow-none">
                    <div className="h-full w-full rounded-xl bg-lightPrimary dark:!bg-blue-50"
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleFileDrop(e, setAadhaarFile)}>
                        <button className="flex h-full w-full flex-col items-center justify-center rounded-xl border-[2px] border-dashed border-brand-800 py-7 dark:!border-brand-800 lg:pb-7"
                            onClick={() => document.getElementById('aadhaarFileInput').click()}>
                            <MdOutlineCloudUpload className="text-[30px] text-brand-500 dark:text-brand-800" />
                            <h4 className="text-xl font-bold text-brand-500 dark:text-brand-800">
                                Upload E-Aadhaar (PDF)
                            </h4>
                            <input type="file" id="aadhaarFileInput" className="hidden" accept="application/pdf"
                                onChange={(e) => handleFileChange(e, setAadhaarFile)} />
                            {aadhaarFile && <p className="mt-2 text-sm font-medium text-gray-600">Uploaded: {aadhaarFile.name}</p>}
                        </button>
                    </div>
                </Card>

                {/* PAN Card Upload */}
                <Card className="grid h-full w-full grid-cols-1 gap-3 rounded-[20px] bg-blue-50  bg-clip-border p-3 font-dm shadow-3xl shadow-shadow-500 dark:!bg-white dark:shadow-none">
                    <div className="h-full w-full rounded-xl bg-lightPrimary dark:!bg-blue-50"
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleFileDrop(e, setPanFile)}>
                         <button className="flex h-full w-full flex-col items-center justify-center rounded-xl border-[2px] border-dashed border-brand-800 py-7 dark:!border-brand-800 lg:pb-7"
                            onClick={() => document.getElementById('panFileInput').click()}>
                            <MdOutlineCloudUpload className="text-[30px] text-brand-500 dark:text-brand-800" />
                            <h4 className="text-xl font-bold text-brand-500 dark:text-brand-800">
                                Upload PAN Card (PDF)
                            </h4>
                            <input type="file" id="panFileInput" className="hidden" accept="application/pdf"
                                onChange={(e) => handleFileChange(e, setPanFile)} />
                            {panFile && <p className="mt-2 text-sm font-medium text-gray-600">Uploaded: {panFile.name}</p>}
                        </button>
                    </div>
                </Card>
            </div>

         

            <h3 className="text-xl font-semibold mb-4 text-black dark:text-brand-800">Add Personal Bank Details</h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-6 mb-6">
                {/* Bank Name */}
                <div>
                    <label className="block text-gray-600 dark:text-brand-800">Bank Name*</label>
                    <input
                        type="text"
                        className="mt-1 block w-full px-3 py-3 bg-white dark:bg-blue-50 border border-brand-300 rounded-md text-sm shadow-sm placeholder-slate-400
                        focus:outline-none focus:border-brand-800 focus:ring-1 focus:ring-brand-800 transition-all ease-in duration-300 "
                        placeholder="Enter Bank Account Name"
                        required
                    />
                </div>

                {/* Account Number */}
                <div>
                    <label className="block text-gray-600 dark:text-brand-800">Account Number*</label>
                    <div className="relative">
                        <input
                            type={showAccountNumber ? "text" : "password"}
                            className="mt-1 block w-full px-3 py-3 bg-white dark:bg-blue-50 border border-brand-300 rounded-md text-sm shadow-sm placeholder-slate-400
                        focus:outline-none focus:border-brand-800 focus:ring-1 focus:ring-brand-800 transition-all ease-in duration-300 "
                            defaultValue="8767898767895"
                            required
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={() => setShowAccountNumber(!showAccountNumber)}
                        >
                            {showAccountNumber ? <MdVisibilityOff /> : <MdVisibility />}
                        </button>
                    </div>
                </div>

                {/* IFSC Code */}
                <div>
                    <label className="block text-gray-600 dark:text-brand-800">IFSC Code*</label>
                    <input
                        type="text"
                        className="mt-1 block w-full px-3 py-3 bg-white dark:bg-blue-50 border border-brand-300 rounded-md text-sm shadow-sm placeholder-slate-400
                        focus:outline-none focus:border-brand-800 focus:ring-1 focus:ring-brand-800 transition-all ease-in duration-300 "
                        placeholder="Enter Bank IFSC Code"
                        required
                    />
                </div>

                {/* Confirm Account Number */}
                <div>
                    <label className="block text-gray-600 dark:text-brand-800">Confirm Account Number*</label>
                    <div className="relative">
                        <input
                            type={showConfirmAccountNumber ? "text" : "password"}
                            className="mt-1 block w-full px-3 py-3 bg-white dark:bg-blue-50 border border-brand-300 rounded-md text-sm shadow-sm placeholder-slate-400
                        focus:outline-none focus:border-brand-800 focus:ring-1 focus:ring-brand-800 transition-all ease-in duration-300 "
                            defaultValue="8767898767895"
                            required
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={() => setShowConfirmAccountNumber(!showConfirmAccountNumber)}
                        >
                            {showConfirmAccountNumber ? <MdVisibilityOff /> : <MdVisibility />}
                        </button>
                    </div>
                </div>
            
            </div>

            {/* Cheque Upload */}
            <Card className="border-2 border-dashed border-gray-300 rounded-md p-4 mb-6">
                <label className="block text-gray-600 dark:text-brand-800 mb-2 text-center">Click to upload Cheque / Bank statement (JPEG/PNG/PDF)</label>
                <div className="w-full rounded-xl bg-lightPrimary dark:!bg-blue-50"
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleFileDrop(e, setChequeFile)}>
                    <button className="flex h-full w-full flex-col items-center justify-center rounded-xl   py-8 dark:!border-brand-800 lg:pb-7"
                        onClick={() => document.getElementById('chequeFileInput').click()}>
                        <MdOutlineCloudUpload className="text-[30px] text-brand-500 dark:text-brand-800" />
                        <h4 className="text-xl font-bold text-brand-500 dark:text-brand-800">
                            Upload Cheque/Bank Statement (JPEG/PNG/PDF)
                        </h4>
                        <input type="file" id="chequeFileInput" className="hidden" accept="image/jpeg, image/png, application/pdf"
                            onChange={(e) => handleFileChange(e, setChequeFile)} />
                        {chequeFile && <p className="mt-2 text-sm font-medium text-gray-600">Uploaded: {chequeFile.name}</p>}
                    </button>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">( max 25mb )</p>
            </Card>

            {/* Signatory Checkbox */}
            <div className="flex items-center mb-6">
                <input type="checkbox" id="signatory" className="mr-2" />
                <label htmlFor="signatory" className="text-gray-600 dark:text-brand-800">I am signatory</label>
            </div>

            {/* Submit Button */}
            <button className="px-20 py-3 text-lg rounded-md bg-brand-800 text-white  shadow-md hover:bg-indigo-700 transition-all" onClick={onNext}>
           Next
            </button>
        </div>
    );
};

export default PersonalKYC;
