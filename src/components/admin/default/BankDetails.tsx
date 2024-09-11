"use client"
import { useState } from "react";
import Card from "components/card";
import { MdOutlineCloudUpload, MdVisibility, MdVisibilityOff } from "react-icons/md"; 

const BankDetails = ({ onNext }: { onNext: () => void }) => {
    const [chequeFile, setChequeFile] = useState(null); 
    const [showAccountNumber, setShowAccountNumber] = useState(false);
    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleFileDrop = (e, setFile) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files.length > 0 && (files[0].type === "image/jpeg" || files[0].type === "image/png" || files[0].type === "application/pdf")) {
            setFile(files[0]);
        } else {
            alert("Only JPEG, PNG, or PDF files are allowed.");
        }
    };

    const handleFileChange = (e, setFile) => {
        e.preventDefault();
        const file = e.target.files[0];
        if (file) {
            if (file.type === "image/jpeg" || file.type === "image/png" || file.type === "application/pdf") {
                if (file.size <= 25000000) { // 25MB in bytes
                    setFile(file);
                } else {
                    alert("File size should not exceed 25MB.");
                }
            } else {
                alert("Only JPEG, PNG, or PDF files are allowed.");
            }
        }
    };

    return (
        <div className="bg-white p-8 rounded-md dark:bg-blue-50">
            <h2 className="text-2xl font-bold mb-2 text-black dark:text-brand-800">Add business Bank Details</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-6 mb-6">
                {/* Account Holder Name */}
                <div>
                    <label className="block text-gray-600 dark:text-brand-800">A/c Name*</label>
                    <input
                        type="text"
                        className="mt-1 block w-full px-3 py-3 bg-white dark:bg-blue-50 border border-brand-300 rounded-md text-sm shadow-sm placeholder-slate-400
                        focus:outline-none focus:border-brand-800 focus:ring-1 focus:ring-brand-800 transition-all ease-in duration-300"
                        placeholder="Enter account holder name"
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

                {/* Bank Name */}
                <div>
                    <label className="block text-gray-600 dark:text-brand-800">Bank Name*</label>
                    <input
                        type="text"
                        className="mt-1 block w-full px-3 py-3 bg-white dark:bg-blue-50 border border-brand-300 rounded-md text-sm shadow-sm placeholder-slate-400
                        focus:outline-none focus:border-brand-800 focus:ring-1 focus:ring-brand-800 transition-all ease-in duration-300"
                        placeholder="Enter bank name"
                        required
                    />
                </div>

                {/* IFSC Code */}
                <div>
                    <label className="block text-gray-600 dark:text-brand-800">IFSC Code*</label>
                    <input
                        type="text"
                        className="mt-1 block w-full px-3 py-3 bg-white dark:bg-blue-50 border border-brand-300 rounded-md text-sm shadow-sm placeholder-slate-400
                        focus:outline-none focus:border-brand-800 focus:ring-1 focus:ring-brand-800 transition-all ease-in duration-300"
                        placeholder="Enter IFSC code"
                        required
                    />
                </div>
            </div>

            {/* Cheque Upload */}
            <Card className="border-2 border-dashed border-gray-300 rounded-md p-4 mb-6">
                <label className="block text-gray-600 dark:text-brand-800 mb-2 text-center">Click to upload Cheque / Bank statement (JPEG/PNG/PDF)</label>
                <div className="w-full rounded-xl bg-lightPrimary dark:!bg-blue-50"
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleFileDrop(e, setChequeFile)}>
                    <button className="flex h-full w-full flex-col items-center justify-center rounded-xl py-8 dark:!border-brand-800 lg:pb-7"
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

            {/* Submit Button */}
            <button className="px-20 mt-10 py-3 text-lg rounded-md bg-brand-800 text-white shadow-md hover:bg-indigo-700 transition-all" onClick={onNext}>
                Next
            </button>
        </div>
    );
};

export default BankDetails;