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
        "/summaries/",
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
      <div className="min-h-screen   flex flex-col  mx-auto 
    bg-gradient-to-br from-purple-200 via-indigo-50 to-white">

        <div className="pt-28 px-4 md:pt-40 sm:px-6 lg:px-8 flex flex-col max-w-7xl min-w-3xl mx-auto">
          {/* Title */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between ">
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold mb-1">Your Summaries</h1>
              <p className="text-gray-700 text-sm sm:text-base">
                Transform your PDFs into concise, actionable insights
              </p>
            </div>


            {
              (summaries.length < 5) &&
              <a
                href="/upload-pdf"
                className="inline-block text-center mb-3 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white 
             hover:bg-blue-700 transition-colors 
             sm:px-5 sm:py-2 sm:text-base 
             md:px-5 md:py-2.5 md:text-md"
              >
                Add Summary
              </a>
            }

          </div>
          {/* Alert */}
          {
            (summaries.length >= 5) &&
            <div className="alertLine mb-6 border border-red-300 rounded-md text-red-700 bg-red-100 py-3 px-4 text-sm">
              You reached the limit of <b>5 uploads</b> on the Basic plan.{" "}
              <a className="underline font-medium" href="#pricing">
                Click here to Upgrade to Pro ↗️
              </a>{" "}
              for unlimited uploads.
            </div>
          }

          {/* Summaries Grid */}
          {(summaries.length == 0) ? <SummaryNotAvailable /> : <SummariesFetch summaries={summaries} setSummaries={setSummaries} summaryId={summaryId} setSummaryId={setSummaryId} />}



        </div>
      </div>





    </>
  );
};

export default Dashboard;
