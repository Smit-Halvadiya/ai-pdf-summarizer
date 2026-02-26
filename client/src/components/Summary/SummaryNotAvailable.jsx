import React from 'react'

const SummaryNotAvailable = () => {
    return (
        <div
          
                className="flex flex-col items-center justify-center "
              >
        <div className="flex flex-col items-center justify-center text-center py-16 px-4">
            {/* Empty Box Illustration */}
            <div className="w-32 h-32 md:w-100 md:h-100  border-dashed border-gray-400 rounded-lg flex items-center justify-center bg-gray-50">
                <img className="w-full h-full" src="/PDFImage/3.png" alt="" />
            </div>

            {/* Title */}
            <h2 className="mt-6 text-xl md:text-2xl font-semibold text-gray-700">
                No summaries found
            </h2>

            {/* Subtitle */}
            <p className="mt-2 text-gray-500 text-sm md:text-base">
                Click the button below to add your first summary
            </p>

      
            
        </div>
        </div>

    )
}

export default SummaryNotAvailable