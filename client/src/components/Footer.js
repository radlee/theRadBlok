import React from 'react'

function Footer() {
  return (
    <footer className="p-4 bg-secondary rounded-lg shadow">
    <div className="sm:flex sm:items-center sm:justify-between">
        <a href="https://radblok.onrender.com/" class="flex items-center mb-4 sm:mb-0">
            <img src="https://mir-s3-cdn-cf.behance.net/project_modules/max_632/6fa667164144457.63f722cd450d7.png" className="h-28 mr-3" alt="radBlok Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">< span className="rad">rad</span><span className="">blok</span></span>
        </a>
        <ul className="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
                <a href="https://www.radlee.github.io/origin2020" class="mr-4 hover:underline md:mr-6 ">About</a>
            </li>
            <li>
                <a href="https://www.radlee.github.io/origin2020" class="hover:underline">Contact</a>
            </li>
        </ul>
    </div>
    <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
    <span className="block text-sm text-black sm:text-center dark:text-gray-400">© <a href="https://radblok.onrender.com/" class="hover:underline"><span className="rad">rad</span>Blok by origin<span className="rad">2020</span></a>. All Rights Reserved.
    </span>
</footer>
  )
}

export default Footer