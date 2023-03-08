import React from 'react'

function Footer() {
  return (

    <footer class="p-4 bg-white rounded-lg shadow md:px-6 md:py-8 dark:bg-gray-900">
    <div class="sm:flex sm:items-center sm:justify-between">
        <a href="https://flowbite.com/" class="flex items-center mb-4 sm:mb-0">
            <img src="https://mir-s3-cdn-cf.behance.net/project_modules/max_632/6fa667164144457.63f722cd450d7.png" class="h-8 mr-3" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">< span className="rad">rad</span><span className="blak">Blok</span></span>
        </a>
        <div className="p-4 text-center text-neutral-700 dark:text-neutral-200">
    
  </div>
  <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
  <a
      className="text-neutral-800 dark:text-neutral-400"
      href="https://radblok.onrender.com/"
      > Blogger's Republic</a
    >
    
    </div>
    <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
    <span className="block text-sm text-black sm:text-center dark:text-gray-400">© <a href="https://radblok.onrender.com/" className="hover:underline"><span className="rad">rad</span>Blok by origin<span className="rad">2020</span></a>. All Rights Reserved.
    </span>
</footer>




  )
}

export default Footer