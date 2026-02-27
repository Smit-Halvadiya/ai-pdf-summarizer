import React, { useEffect, useState } from "react";
import SummaryNotAvailable from "../components/Summary/SummaryNotAvailable"
import SummariesFetch from "../components/Summary/SummariesFetch";
// import axios from "axios"
import api from "../utils/api";


const Dashboard = () => {
  const [summaries, setSummaries] = useState([]);
  const [summaryId, setSummaryId] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get(
        "/summary/",
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res);

      setSummaries(res.data.data)
    }
    fetchData()






  }, [])











  return (
    <>
      <div className="min-h-screen flex flex-col mx-auto 
    bg-gradient-to-br from-purple-200 via-indigo-50 to-white">

        <div className="pt-24 sm:pt-28 md:pt-36 
                  px-4 sm:px-6 lg:px-8 
                  flex flex-col 
                  w-full max-w-7xl 
                  mx-auto">

          {/* Title Section */}
          <div className="flex flex-col sm:flex-row 
                    sm:items-center sm:justify-between 
                    gap-4 sm:gap-6">

            <div className="mb-4 sm:mb-6">
              <h1 className="text-xl sm:text-3xl font-bold mb-1">
                Your Summaries
              </h1>

              <p className="text-gray-700 text-sm sm:text-base max-w-md">
                Transform your PDFs into concise, actionable insights
              </p>
            </div>

            {
              <a
                href="/upload-pdf"
                className="inline-block text-center 
                     w-full sm:w-auto 
                     rounded-md bg-blue-600 
                     px-4 py-2 text-sm font-medium text-white 
                     hover:bg-blue-700 transition-colors 
                     sm:px-5 sm:py-2 sm:text-base 
                     md:px-5 md:py-2.5 md:text-md"
              >
                Add Summary
              </a>
            }

          </div>

          {/* Summaries Grid */}
          <div className="mt-6 w-full">
            {(summaries.length == 0)
              ? <SummaryNotAvailable />
              : <SummariesFetch
                summaries={summaries}
                setSummaries={setSummaries}
                summaryId={summaryId}
                setSummaryId={setSummaryId}
              />
            }
          </div>

        </div>
      </div>





    </>
  );
};

export default Dashboard;
