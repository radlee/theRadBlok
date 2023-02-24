import React from 'react'

function Footer() {
  return (


<footer
  class="p-5 bg-secondary footer">
     <a href="https://radblok.onrender.com/" class="flex items-center mb-4 sm:mb-0">
            <img src="https://mir-s3-cdn-cf.behance.net/project_modules/max_632/6fa667164144457.63f722cd450d7.png" className="h-28 mr-3" alt="radBlok Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">< span className="rad">rad</span><span className="blak">blok</span></span>
        </a>

  <div class="p-4 text-center text-neutral-700 dark:text-neutral-200">
    <a
      class="text-neutral-800 dark:text-neutral-400"
      href="https://radblok.onrender.com/"
      > Blogger's Republic</a
    >
  </div>
  <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
    <span className="block text-sm text-black sm:text-center dark:text-gray-400">© <a href="https://radblok.onrender.com/" class="hover:underline"><span className="rad">rad</span>Blok by origin<span className="rad">2020</span></a>. All Rights Reserved.
    </span>
</footer>

  )
}

export default Footer