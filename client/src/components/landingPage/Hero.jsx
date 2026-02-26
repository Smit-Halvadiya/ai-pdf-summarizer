import React from 'react'

const Hero = () => {
    return (
        <div className="w-full h-screen  flex flex-col  items-center px-6 text-center pt-50 bg-gradient-to-b from-white to-gray-50">
  {/* Badge Button */}
  <button className="px-6 py-2 mb-6 text-sm font-medium text-indigo-600 bg-indigo-100 rounded-full hover:bg-indigo-200 transition">
    🚀 Powered By AI
  </button>

  {/* Heading */}
  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-snug mb-4">
    Transform PDFs into <span className="text-indigo-600">concise</span> <br className="hidden sm:block" /> summaries
  </h2>

  {/* Subtitle */}
  <p className="text-base font-semibold sm:text-lg text-gray-600 max-w-xl mb-8">
    Get a beautiful summary reel of the document in seconds.
  </p>

  {/* CTA Button */}
  <a
  href="/upload-pdf"
  className="px-8 py-3 text-white font-semibold rounded-full shadow-lg 
             bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-400
             hover:from-blue-600 hover:via-cyan-600 hover:to-teal-500
             transition-all duration-300"
>
  Try Sommaire
</a>

</div>

    )
}

export default Hero