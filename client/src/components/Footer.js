import React from 'react'



function Footer() {

  
  return (

    
    <div className="max-w-2xl mx-auto text-center">

	<footer className="bg-white rounded-lg shadow items-center p-6">

  <div className="flex flex-wrap justify-center">
  <img
    src={process.env.PUBLIC_URL + 'spin.png'}
    className=" spin h-5 max-w-sm p-1"
    alt="logo" />
    
</div>
<h1 className="text-2xl font-bold text-center text-primary">
            <span className="rad">rad</span>Blok
          </h1>
          <br />

		<span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 < span className="rad">rad</span><span className="blak">Blok by origin< span className="rad">2020</span> | All Rights Reserved</span>
    </span>
	</footer>
</div>


  )
}

export default Footer