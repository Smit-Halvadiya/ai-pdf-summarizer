import UploadPdfForm from '../components/upload/UploadPdfForm';

const UploadPDF = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center 
                    px-4 sm:px-6 
                    text-center 
                    pt-24 sm:pt-28 lg:pt-32 
                    bg-gradient-to-b from-white to-gray-50">

      <button className="px-5 sm:px-6 py-2.5 sm:py-3 mb-6 
                         text-xs sm:text-sm font-medium 
                         text-indigo-600 bg-indigo-100 
                         rounded-full hover:bg-indigo-200 transition">
        💫 AI-Powered Content Creation
      </button>

      <h2 className="text-2xl sm:text-4xl lg:text-5xl 
                     font-extrabold leading-snug sm:leading-tight mb-4">
        Start Uploading Your{" "}
        <span className="text-white bg-gradient-to-r 
                         from-indigo-500 to-purple-500 
                         px-2 rounded-lg -rotate-2 inline-block">
          PDF's
        </span>
      </h2>

      <p className="text-sm sm:text-lg font-semibold 
                    text-gray-600 max-w-md sm:max-w-xl mb-8">
        upload your pdf and let our AI do the magic 🪄
      </p>

      <div className="relative flex items-center justify-center w-full my-8">
        <div className="w-1/2 sm:w-[40%] md:w-[30%] border-t border-gray-300"></div>

        <p className="absolute bg-white px-4 text-xs sm:text-base 
                      font-medium text-gray-600">
          Upload PDF
        </p>
      </div>

      <div className="mt-3 w-full max-w-md sm:max-w-lg">
        <UploadPdfForm />
      </div>

    </div>
  )
}

export default UploadPDF