"use client"
import { useState } from "react";
import Card from "components/card";
import { MdOutlineCloudUpload } from "react-icons/md"; 

const BusinessKYC = ({ onNext }: { onNext: () => void }) => {
    const [panFile, setPanFile] = useState(null);
    const [gstFile, setGstFile] = useState(null);
    const [aadhaarFile, setAadhaarFile] = useState(null);

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

    return (
        <div className="bg-white p-8 rounded-md dark:bg-blue-50">
            <h2 className="text-2xl font-bold mb-2 text-black dark:text-brand-800">Entity Type</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-6  mb-6">
                {/* Entity Type Dropdown */}
                <div >
                    <label className="block  text-gray-600 dark:text-brand-800">Entity Type*</label>
                    <select className="mt-1 block w-full px-3 py-3 bg-white dark:bg-blue-50 border border-brand-300 rounded-md text-sm shadow-sm placeholder-slate-400
                    focus:outline-none focus:border-brand-800 focus:ring-1 focus:ring-brand-800 transition-all ease-in duration-300">
                        <option>Proprietorship</option>
                        <option>Partnership</option>
                        <option>Private Limited Company</option>
                        <option>other</option>
                        
                    </select>
                </div>

                {/* Business Name */}
                <div>
                    <label className="block text-gray-600 dark:text-brand-800">Business Name*</label>
                    <input
                        type="text"
                        className="mt-1 block w-full px-3 py-3 bg-white dark:bg-blue-50 border border-brand-300 rounded-md text-sm shadow-sm placeholder-slate-400
                        focus:outline-none focus:border-brand-800 focus:ring-1 focus:ring-brand-800 transition-all ease-in duration-300 "
                        placeholder="Enter business name"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-600 dark:text-brand-800">GST Number*</label>
                    <input
                        type="text"
                        className="mt-1 block w-full px-3 py-3 bg-white dark:bg-blue-50 border border-brand-300 rounded-md text-sm shadow-sm placeholder-slate-400
                        focus:outline-none focus:border-brand-800 focus:ring-1 focus:ring-brand-800 transition-all ease-in duration-300 "
                        placeholder="Enter GST Number"
                        required
                    />
                </div>
                <div>
                    <label className="block text-gray-600 dark:text-brand-800"> Msme / udyog Aadhar number  *</label>
                    <input
                        type="text"
                        className="mt-1 block w-full px-3 py-3 bg-white dark:bg-blue-50 border border-brand-300 rounded-md text-sm shadow-sm placeholder-slate-400
                        focus:outline-none focus:border-brand-800 focus:ring-1 focus:ring-brand-800 transition-all ease-in duration-300 "
                        placeholder="Enter MSME / Udyog Aadhaar Number"
                        required
                    />
                </div>

                {/* PAN Card Upload */}
                <Card className="grid h-full w-full grid-cols-1 gap-3 rounded-[20px] bg-blue-50  bg-clip-border p-3 font-dm shadow-3xl shadow-shadow-500 dark:!bg-white dark:shadow-none">
                    <div className="h-full w-full rounded-xl bg-lightPrimary dark:!bg-blue-50"
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleFileDrop(e, setPanFile)}>
                        <button className="flex h-full w-full flex-col items-center justify-center rounded-xl border-[2px] border-dashed border-brand-800 py-7 dark:!border-brand-800 lg:pb-7"
                            onClick={() => document.getElementById('panFileInput').click()}>
                            <MdOutlineCloudUpload className="text-[30px] text-brand-500 dark:text-brand-800" />
                            <h4 className="text-xl font-bold text-brand-500 dark:text-brand-800">
                                Upload Business Pan Card (PDF)
                            </h4>
                            <input type="file" id="panFileInput" className="hidden" accept="application/pdf"
                                onChange={(e) => handleFileChange(e, setPanFile)} />
                            {panFile && <p className="mt-2 text-sm font-medium text-gray-600">Uploaded: {panFile.name}</p>}
                        </button>
                    </div>
                </Card>

                {/* GST Number Upload */}
                <Card className="grid h-full w-full grid-cols-1 gap-3 rounded-[20px] bg-blue-50  bg-clip-border p-3 font-dm shadow-3xl shadow-shadow-500 dark:!bg-white dark:shadow-none">
                    <div className="h-full w-full rounded-xl bg-lightPrimary dark:!bg-blue-50"
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleFileDrop(e, setGstFile)}>
                        <button className="flex h-full w-full flex-col items-center justify-center rounded-xl border-[2px] border-dashed border-brand-800 py-7 dark:!border-brand-800 lg:pb-7"
                            onClick={() => document.getElementById('gstFileInput').click()}>
                            <MdOutlineCloudUpload className="text-[30px] text-brand-500 dark:text-brand-800" />
                            <h4 className="text-xl font-bold text-brand-500 dark:text-brand-800">
                                Upload GST Number (PDF)
                            </h4>
                            <input type="file" id="gstFileInput" className="hidden" accept="application/pdf"
                                onChange={(e) => handleFileChange(e, setGstFile)} />
                            {gstFile && <p className="mt-2 text-sm font-medium text-gray-600">Uploaded: {gstFile.name}</p>}
                        </button>
                    </div>
                </Card>
      
                {/* Aadhaar Number Upload */}
            </div>
                <Card className="grid h-full w-full grid-cols-1 gap-3 rounded-[20px] bg-blue-50  bg-clip-border p-3 font-dm shadow-3xl shadow-shadow-500 dark:!bg-white dark:shadow-none">
                    <div className="h-full w-full rounded-xl bg-lightPrimary dark:!bg-blue-50"
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleFileDrop(e, setAadhaarFile)}>
                        <button className="flex h-full w-full flex-col items-center justify-center rounded-xl border-[2px] border-dashed border-brand-800 py-7 dark:!border-brand-800 lg:pb-7"
                            onClick={() => document.getElementById('aadhaarFileInput').click()}>
                            <MdOutlineCloudUpload className="text-[30px] text-brand-500 dark:text-brand-800" />
                            <h4 className="text-xl font-bold text-brand-500 dark:text-brand-800">
                                Upload MSME / Udyog Aadhaar Card (PNG/JPEG/PDF)
                            </h4>
                            <input type="file" id="aadhaarFileInput" className="hidden" accept="image/jpeg, image/png, application/pdf"
                                onChange={(e) => handleFileChange(e, setAadhaarFile)} />
                            {aadhaarFile && <p className="mt-2 text-sm font-medium text-gray-600">Uploaded: {aadhaarFile.name}</p>}
                        </button>
                    </div>
                </Card>

            {/* Submit Button */}
            <button className="px-20 mt-10 py-3 text-lg rounded-md bg-brand-800 text-white shadow-md hover:bg-indigo-700 transition-all" onClick={onNext}>
                Next
            </button>
        </div>
    );
};

export default BusinessKYC;