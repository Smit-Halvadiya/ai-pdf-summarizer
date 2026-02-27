import React, { useEffect, useState } from 'react'
import axios from "axios"
import api from "../../utils/api.js";

import { useAuth } from "../../context/AuthContext.jsx";
// import { LuLoaderCircle } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const UploadPdfForm = () => {
    const { user } = useAuth()
    const [file, setFile] = useState(null);
    const [fieError, setFileError] = useState(null);
    // const [summaryData, setSummaryData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();


    const handleSubmit = async (e) => {


        if (!user) {
            navigate("/login")
        }
        e.preventDefault()


        setIsLoading(true)

        if (!file) {
            setFileError("Please select a file!")
            setIsLoading(false)
            return;

        } else {
            setFileError("")
        }




        if (!(file.type == "application/pdf")) {
            setFileError("Only pdf are supported")
            setIsLoading(false)
            return;
        } else {
            setFileError("")

        }
        console.log("file: ", file);
        try {

            const formData = new FormData();
            formData.append("file", file); // backend me "pdf" name ka field hona chahiye
            // console.log("FormDaata: ",formData);

            await api.post(
                "/pdf/addPDFtoServer",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            setIsLoading(false)






        } catch (err) {
            setIsLoading(false)
            console.error(err);
            alert("Error uploading PDF ❌");
        }




    }


    return (
        <>
            <form onSubmit={handleSubmit} className="w-full">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">

                    <div className="w-full sm:w-auto">
                        <input
                            className="border border-gray-300 cursor-pointer 
                   px-3 py-2 text-sm text-gray-700 
                   rounded-sm 
                   w-full sm:w-auto sm:min-w-[260px] 
                   mb-0"
                            type="file"
                            onChange={(e) => setFile(e.target.files[0])}
                            accept="application/pdf"
                        />
                    </div>

                    <div className="w-full sm:w-auto">
                        <button
                            className="px-9 cursor-pointer bg-purple-500 text-white 
                   py-2 font-semibold rounded-sm 
                   w-full sm:w-auto min-w-[150px] 
                   hover:bg-purple-600 transition"
                            type="submit"
                            disabled={isLoading || !file}
                        >
                            {isLoading ? "uploading..." : "Submit PDF"}
                        </button>
                    </div>

                    <div className="w-full text-center sm:text-left">
                        <span className="text-red-500 text-sm">
                            {fieError}
                        </span>
                    </div>

                </div>
            </form>

        </>
    )
}

export default UploadPdfForm