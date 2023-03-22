import React from "react";
import { useSelector } from "react-redux";

function Profile() {
    const { currentUser } = useSelector((state) => state.usersReducer);
 
  return (
    <div>
      <div className=" bg-gray-200 dark:bg-gray-900 flex flex-wrap items-center justify-center">
  <div className="container max-w-lg bg-white rounded dark:bg-gray-800 shadow-lg transform duration-200 easy-in-out m-12">
    <div className="h-2/4 sm:h-64 overflow-hidden">
      <img className="w-full rounded-t"
        src="https://images.unsplash.com/photo-1638803040283-7a5ffd48dad5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
        alt="Photo by aldi sigun on Unsplash" />
    </div>
    <div className="flex justify-start px-5 -mt-12 mb-5">
      <span className="block relative h-32 w-32">
        <img alt="Photo by aldi sigun on Unsplash"
          src={currentUser.profile}
          className="mx-auto object-cover rounded-full h-24 w-24 bg-white p-1" />
      </span>
    </div>
    <div className="">
      <div className="px-7 mb-8">
        <h2 className="text-3xl font-bold text-green-800 dark:text-gray-300">{currentUser.name}</h2>
        <p className="text-gray-400 mt-2 dark:text-gray-400">{currentUser.createdAt}</p>
        <div
          className="justify-center px-4 py-2 cursor-pointer bg-green-900 max-w-min mx-auto mt-8 rounded-lg text-gray-300 hover:bg-green-800 hover:text-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-gray-200">
          {currentUser.email}
        </div>
      </div>
    </div>
  </div>
</div>


    </div>
  );
}

export default Profile;
