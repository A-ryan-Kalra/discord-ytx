import React from "react";
import { DownloadIcon } from "@heroicons/react/outline";
import discord1 from "../img/discord1.svg";
import discord2 from "../img/discord2.svg";
function Hero() {
  return (
    <div className="bg-discord_blue  pb-8  md:pb-0 ">
      <div className="h-screen md:h-[83vh] p-7 py-9 md:flex relative">
        <div className="flex flex-col gap-7 md:max-w-md lg:max-w-none lg:justify-center">
          <h1 className="text-5xl text-white font-bold">Your place to talk</h1>
          <h2
            className="text-white text-lg font-light tracking-wide 
          lg:max-w-3xl w-full "
          >
            Whether you're a part of a school club, gaming group, worldwide art
            community, or just a handful of friends who went to spend time
            togerther, Discord makes it easy to talk every day and hang out more
            often.
          </h2>
          <div
            className="flex flex-col sm:flex-row md:flex-col lg:flex-row
          md:items-start sm:items-center gap-6  "
          >
            <button
              className="flex items-center bg-white w-60 font-medium justify-center
            rounded-full p-4 text-lg hover:shadow-2xl hover:text-discord_blurple focus:outline-none
            transition duration-300 ease-in-out"
            >
              <DownloadIcon className="w-6 mr-2" />
              Download for Mac
            </button>
            <button
              className="bg-gray-900 text-white w-72 font-medium flex
            items-center justify-center rounded-full p-4 text-lg hover:shadow-2xl hover:bg-gray-800
            transition duration-300 ease-in-out focus:outline-none"
            >
              Open Discord in your browser
            </button>
          </div>
        </div>
        <div className="flex-grow">
          <img
            src={discord2}
            alt=""
            className="absolute -left-36 mt-16 sm:-left-44 md:hidden "
          />
          <img src={discord1} alt="" className="hidden md:inline absolute" />
        </div>
      </div>
    </div>
  );
}

export default Hero;
