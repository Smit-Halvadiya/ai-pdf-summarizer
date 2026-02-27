import React from 'react'

const SummaryNotAvailable = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full">

            <div className="flex flex-col items-center justify-center 
                  text-center 
                  py-12 sm:py-16 
                  px-4 sm:px-6">

                {/* Empty Box Illustration */}
                <div className="w-24 h-24 
                    sm:w-32 sm:h-32 
                    md:w-48 md:h-48 
                    border-dashed border-2 border-gray-400 
                    rounded-lg 
                    flex items-center justify-center 
                    bg-gray-50">

                    <img
                        className="w-full h-full object-contain"
                        src="/PDFImage/3.png"
                        alt="No summaries illustration"
                    />
                </div>

                {/* Title */}
                <h2 className="mt-6 text-lg sm:text-xl md:text-2xl 
                   font-semibold text-gray-700">
                    No summaries found
                </h2>

                {/* Subtitle */}
                <p className="mt-2 text-gray-500 
                  text-xs sm:text-sm md:text-base 
                  max-w-xs sm:max-w-md">
                    Click the button below to add your first summary
                </p>

            </div>
        </div>

    )
}

export default SummaryNotAvailable