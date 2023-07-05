import React from "react";
import logo from "../img/discord-logo-white.png";
// import MenuIcon from "../img/menu.svg";
import { MenuIcon } from "@heroicons/react/solid";
import { auth, provider } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";

function Header() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const signIn = (e) => {
    e.preventDefault();

    signInWithPopup(auth, provider)
      .then(() => navigate("/channels"))
      .catch((error) => alert(error.mesage));
  };

  return (
    <header className="flex items-center justify-between py-4 px-6 bg-discord_blue">
      <a href="/">
        <img src={logo} alt="" className="w-32 h-12 object-contain" />
      </a>

      <div className="hidden text-white lg:flex space-x-6">
        <a className="link">Download</a>
        <a className="link">Why Discord?</a>
        <a className="link">Nitro</a>
        <a className="link">Safety</a>
        <a className="link">Support</a>
      </div>

      <div className="flex space-x-4 ">
        <div className="hover:shadow-xl ">
          <button
            className="bg-white p-2 rounded-full text-xs md:text-sm
         px-4 text-black focus:outline-none  hover:text-discord_blurple
         transition ease-in-out duration-200 whitespace-nowrap font-medium"
            onClick={!user ? signIn : () => navigate("/channels")}
          >
            {!user ? "Login" : "Open Discord"}
          </button>
        </div>
        <MenuIcon className="h-9 text-white cursor-pointer " />
      </div>
    </header>
  );
}

export default Header;
