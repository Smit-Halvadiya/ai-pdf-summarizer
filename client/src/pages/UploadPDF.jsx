
import UploadPdfForm from '../components/upload/UploadPdfForm';

const UploadPDF = () => {
  return (
    <div className="w-full h-screen  flex flex-col  items-center px-6 text-center pt-50 bg-gradient-to-b from-white to-gray-50">
      
      <button className="px-6 py-3 mb-6 text-sm font-medium text-indigo-600 bg-indigo-100 rounded-full hover:bg-indigo-200 transition">
        💫 AI-Powered Content Creation
      </button>

      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-snug mb-4">
        Start Uploading Your <span className="text-white bg-gradient-to-r from-indigo-500 to-purple-500 px-2 rounded-lg -rotate-2">
          PDF's
        </span>
      </h2>

      <p className="text-base font-semibold sm:text-lg text-gray-600 max-w-xl mb-8">
        upload your pdf and let our AI do the magic🪄
      </p>
    

<div className="relative flex items-center justify-center w-full my-8">
  
  <div className="w-[30%] border-t border-gray-300"></div>

  <p className="absolute bg-white px-4 text-sm sm:text-base font-medium text-gray-600">
    Upload PDF
  </p>
</div>

<div className=' mt-3'>
 
  <UploadPdfForm/>
</div>

      </div>
  )
}

export default UploadPDF