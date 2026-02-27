import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  Rocket,
  Calendar,
  Clock,
  ArrowLeft,
  FileCode,
  Download,
} from "lucide-react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { HiOutlineExternalLink } from "react-icons/hi";
import jsPDF from "jspdf";
import api from "../utils/api";



const Summary = () => {
  const { summaryId } = useParams();


  const [summaryData, setSummaryData] = useState({});
  const [summaryText, setSummaryText] = useState([]);
  const [pageNo, setPageNo] = useState(0);

  const navigate = useNavigate();

  // ================= FETCH DATA =================
  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await api.get(
          `/summary/${summaryId}`
        );

        const data = res.data.data;
        setSummaryData(data);

        const sections = data.summary_text
          ?.split(/(?=#)/)
          .filter((item) => item.trim() !== "");

        setSummaryText(sections || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSummary();
  }, [summaryId]);



  //download summary




  const handleDownloadSummary = () => {
    if (!summaryData?.summary_text) return;

    const doc = new jsPDF({
      unit: "pt",
      format: "a4",
    });

    const marginX = 40;
    let y = 60;
    const pageWidth = doc.internal.pageSize.width - marginX * 2;

    // ===== Remove emojis =====
    const cleanText = summaryData.summary_text.replace(
      /[\u{1F600}-\u{1F6FF}|\u{2600}-\u{26FF}]/gu,
      ""
    );

    // ===== Title =====
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text(summaryData.title || "Summary", marginX, y);
    y += 25;

    const sections = cleanText
      .split(/(?=#)/)
      .filter((item) => item.trim() !== "");

    sections.forEach((section) => {
      const lines = section.split("\n").filter((l) => l.trim() !== "");

      lines.forEach((line) => {
        if (line.startsWith("#")) {
          y += 10;

          doc.setFont("helvetica", "bold");
          doc.setFontSize(14);

          const heading = line.replace(/^#\s*/, "");
          const splitHeading = doc.splitTextToSize(heading, pageWidth);

          doc.text(splitHeading, marginX, y);
          y += splitHeading.length * 16;

          doc.setFont("helvetica", "normal");
          doc.setFontSize(11);
        } else {
          const text = line.replace(/^•\s*/, "• ");

          const splitText = doc.splitTextToSize(text, pageWidth);
          doc.text(splitText, marginX, y);

          y += splitText.length * 14;
        }

        // Page break
        if (y > 750) {
          doc.addPage();
          y = 60;
        }
      });

      y += 10;
    });

    doc.save(`${summaryData.title || "summary"}.pdf`);
  };

  // ================= SLIDER FUNCTIONS =================
  const nextPage = () => {
    setPageNo((prev) =>
      prev < summaryText.length - 1 ? prev + 1 : prev
    );
  };

  const prevPage = () => {
    setPageNo((prev) => (prev > 0 ? prev - 1 : prev));
  };

  // ================= LOADING =================
  if (!summaryData?.title || summaryText.length === 0) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  // ================= PAGE CONTENT =================
  const FinalSummaryText =
    summaryText[pageNo]
      ?.split("\n")
      .filter((item) => item.trim() !== "") || [];

  const heading = FinalSummaryText[0] || "";
  const content = FinalSummaryText.slice(1);

  return (
    <div className="min-h-screen flex flex-col mx-auto 
bg-gradient-to-br from-indigo-200 via-purple-50 to-white 
pb-16 md:pb-24">

      <div className="pt-20 sm:pt-24 md:pt-32 
                  px-4 sm:px-6 md:px-10 
                  max-w-7xl w-full mx-auto">

        {/* ================= TOP INFO ================= */}
        <div className="flex flex-col md:flex-row 
                    md:justify-between 
                    gap-4 md:gap-0 
                    mb-8 border-b pb-5">

          {/* Left Section */}
          <div className="flex flex-col sm:flex-row 
                      sm:flex-wrap 
                      sm:items-center 
                      gap-3 sm:gap-5">

            <button className="px-4 sm:px-5 py-2 text-xs sm:text-sm 
                           font-semibold text-indigo-600 
                           bg-white rounded-full 
                           flex items-center gap-2 w-fit">
              <Rocket className="w-4 h-4" /> Powered By AI
            </button>

            <h3 className="text-gray-600 flex items-center gap-2 text-sm sm:text-base">
              <Calendar className="w-4 h-4 text-indigo-500" />
              {new Date(summaryData.createdAt).toLocaleDateString()}
            </h3>

            <h3 className="text-gray-500 flex items-center gap-2 text-sm sm:text-base">
              <Clock className="w-4 h-4 text-indigo-500" /> 1 min read
            </h3>
          </div>

          {/* Back Button */}
          <button
            onClick={() => navigate("/dashboard")}
            className="px-4 sm:px-5 py-2 text-xs sm:text-sm 
                   bg-indigo-100 rounded-full 
                   flex items-center gap-2 cursor-pointer 
                   w-fit self-start md:self-auto"
          >
            <ArrowLeft className="w-4 h-4 text-indigo-500" /> Back
          </button>
        </div>

        {/* ================= TITLE ================= */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl 
                   font-extrabold 
                   text-center sm:text-left mb-8 break-words">
          {summaryData.title}
        </h1>

        {/* ================= PDF INFO ================= */}
        <div className="flex flex-col items-center gap-4 mb-10 text-center">

          <div className="flex items-center gap-2 text-sm sm:text-base">
            <FileCode className="w-4 h-4 text-purple-700" />
            source: file.pdf
          </div>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">

            <div
              onClick={() => window.open(summaryData.original_file_url, "_blank")}
              className="flex items-center justify-center gap-2 
                     text-purple-700 cursor-pointer text-sm sm:text-base"
            >
              <HiOutlineExternalLink /> View Original
            </div>

            <div
              onClick={handleDownloadSummary}
              className="flex items-center justify-center gap-2 
                     bg-purple-300 px-4 py-2 rounded-md 
                     cursor-pointer text-sm sm:text-base"
            >
              <Download /> Download Summary
            </div>

          </div>
        </div>

        {/* ================= SLIDER ================= */}
        <div className="max-w-3xl w-full mx-auto 
                    bg-white/80 backdrop-blur-xl 
                    shadow-2xl rounded-3xl 
                    overflow-hidden border border-gray-200">

          {/* Progress Bars */}
          <div className="flex gap-2 p-4">
            {summaryText.map((_, i) => (
              <div key={i} className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${i <= pageNo ? "bg-indigo-500 w-full" : "w-0"
                    }`}
                />
              </div>
            ))}
          </div>

          {/* Content */}
          <div className="relative p-5 sm:p-8 
                      min-h-[300px] sm:min-h-[380px] 
                      flex flex-col justify-center">

            <div key={pageNo} className="flex flex-col gap-4 animate-fadeIn">

              <div className="text-xl sm:text-2xl md:text-3xl 
                          font-bold text-gray-800 break-words">
                {heading.replace(/^#\s*/, "")}
              </div>

              {content.map((subContent, index) => (
                <div
                  key={index}
                  className="border border-gray-200 
                         rounded-xl p-4 sm:p-5 
                         text-left shadow-sm 
                         hover:shadow-md 
                         transition-all duration-300 
                         bg-white text-sm sm:text-base"
                >
                  {subContent}
                </div>
              ))}

            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-between items-center 
                      bg-gradient-to-r from-indigo-50 via-purple-50 to-blue-50 
                      px-4 sm:px-6 py-4 sm:py-5">

            <button
              onClick={prevPage}
              disabled={pageNo === 0}
              className="group p-2 sm:p-3 bg-indigo-500 
                     text-white rounded-full shadow-md 
                     hover:bg-indigo-600 
                     disabled:opacity-30 
                     disabled:cursor-not-allowed transition-all"
            >
              <FaChevronLeft className="group-hover:-translate-x-0.5 transition" />
            </button>

            <div className="text-xs sm:text-sm font-medium text-gray-600">
              {pageNo + 1} / {summaryText.length}
            </div>

            <button
              onClick={nextPage}
              disabled={pageNo === summaryText.length - 1}
              className="group p-2 sm:p-3 bg-indigo-500 
                     text-white rounded-full shadow-md 
                     hover:bg-indigo-600 
                     disabled:opacity-30 
                     disabled:cursor-not-allowed transition-all"
            >
              <FaChevronRight className="group-hover:translate-x-0.5 transition" />
            </button>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Summary;