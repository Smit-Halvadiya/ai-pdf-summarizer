import axios from "axios"
import { FileText, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";

const SummariesFetch = ({ summaries, setSummaries, summaryId, setSummaryId }) => {
    const [refresh, setRefresh] = useState(false);
    // const [summary, setSummary] = useState([])
    const navigate = useNavigate();


    useEffect(() => {
        setRefresh(false)
        const fetchData = async () => {
            const res = await api.get("/summary/");
            setSummaries(res.data.data);
        };
        fetchData();
    }, [refresh]);


    const handleDelete = (id) => {

        setSummaryId(id)
        console.log("summaryId: ", id);


    };

    const deleteSummary = async (summaryId) => {
        try {

            await api.delete(
                "/summary/deleteSummary",
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    data: { summaryId }, // body me bhej rahe hain
                }
            );
            setRefresh(true)
            setSummaryId(null)


        } catch (error) {
            console.error("Error deleting summary:", error);
        }
    }


    const handleSummary = (summaryId) => {
        navigate(`/summary/${summaryId}`);
    }







    return (
        <>
            <div className="grid mt-3 
                  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 
                  gap-4 sm:gap-6">

                {summaries.map((item) => (
                    <div
                        key={item._id}
                        className="bg-white shadow-sm rounded-lg 
                   p-4 sm:p-6 
                   hover:shadow-md transition 
                   flex flex-col justify-between
                   border border-gray-200 
                   min-h-[180px]"
                    >
                        {/* Header row */}
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex items-start gap-3 min-w-0">
                                <FileText className="text-indigo-600 w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0" />

                                <div className="min-w-0">
                                    <h2 className="text-sm sm:text-lg font-semibold truncate">
                                        {item.title}
                                    </h2>

                                    <p className="text-xs text-gray-400 break-words">
                                        {item.createdAt}
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={() => handleDelete(item._id)}
                                className="text-gray-500 hover:text-gray-700 cursor-pointer flex-shrink-0"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Summary text */}
                        <p className="text-gray-600 mt-3 sm:mt-4 text-sm line-clamp-2 break-words">
                            {item.summary_text}
                        </p>

                        {/* Badge Section */}
                        <div className="mt-3 sm:mt-4 
                        flex flex-wrap gap-2 items-center">

                            <span className="inline-block px-3 py-1 text-xs font-medium 
                           rounded-full bg-purple-100 text-purple-700">
                                {item.status}
                            </span>

                            <span
                                onClick={() => handleSummary(item._id)}
                                className="inline-block cursor-pointer 
                       px-3 py-1 text-xs font-medium 
                       rounded-full bg-purple-100 text-purple-700 
                       hover:bg-purple-200 transition"
                            >
                                view Summary
                            </span>

                        </div>
                    </div>
                ))}
            </div>

            {/* ================= MODAL ================= */}
            {summaryId && (
                <div className="fixed inset-0 flex items-center justify-center 
                    bg-black bg-opacity-40 
                    z-50 p-4">

                    <div className="bg-white p-5 sm:p-6 
                      rounded-lg shadow-lg 
                      w-full max-w-xs sm:max-w-sm 
                      text-center">

                        <h2 className="text-base sm:text-lg font-semibold mb-3">
                            Confirm Delete
                        </h2>

                        <p className="text-xs sm:text-sm text-gray-600 mb-4">
                            Are you sure you want to delete this summary?
                        </p>

                        <div className="flex flex-col sm:flex-row 
                        justify-center gap-3">

                            <button
                                onClick={() => deleteSummary(summaryId)}
                                className="cursor-pointer px-4 py-2 
                       text-white bg-red-600 
                       rounded hover:bg-red-700 
                       text-sm w-full sm:w-auto"
                            >
                                Delete
                            </button>

                            <button
                                onClick={() => setSummaryId(null)}
                                className="cursor-pointer px-4 py-2 
                       border rounded text-sm 
                       w-full sm:w-auto"
                            >
                                Cancel
                            </button>

                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default SummariesFetch