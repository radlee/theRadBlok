import React from 'react'

function Footer() {
  return (
    <footer class="p-4 bg-white rounded-lg shadow md:px-6 md:py-8 dark:bg-gray-900">
    <div class="sm:flex sm:items-center sm:justify-between">
        <a href="https://radblok.onrender.com/" class="flex items-center mb-4 sm:mb-0">
            <img src="https://mir-s3-cdn-cf.behance.net/project_modules/max_632/6fa667164144457.63f722cd450d7.png" class="h-24 mr-3" alt="radBlok Logo" />
            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">< span className="rad">rad</span>blok</span>
        </a>
        <ul class="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
                <a href="https://www.radlee.github.io/origin2020" class="mr-4 hover:underline md:mr-6 ">About</a>
            </li>
            <li>
                <a href="https://www.radlee.github.io/origin2020" class="hover:underline">Contact</a>
            </li>
        </ul>
    </div>
    <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
    <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© <a href="https://radblok.onrender.com/" class="hover:underline">radBlok</a>. All Rights Reserved.
    </span>
</footer>
  )
}

export default Footer