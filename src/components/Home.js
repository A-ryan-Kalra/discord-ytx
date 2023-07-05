import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import Channel from "./Channel";
import { collection, addDoc } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
//Icons
import ServerIcon from "./ServerIcon";
import discord from "../img/discordnew.png";
import guy from "../img/guy.png";
import ztm from "../img/ztm.png";
import {
  ChevronDownIcon,
  CogIcon,
  PhoneIcon,
  PlusIcon,
} from "@heroicons/react/solid";
import { MicrophoneIcon } from "@heroicons/react/outline";
import Chat from "./Chat";

function Home() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [channels] = useCollection(collection(db, "channels"));

  // console.log(user);
  // rounded-full w-fit p-5 bg-gray-800

  const handleAddChannel = async () => {
    const channelName = prompt("Enter a new channel name");

    if (channelName) {
      try {
        const docRef = await addDoc(collection(db, "channels"), {
          channelName: channelName,
        });
      } catch (e) {
        console.error("Error adding document:", e);
      }
    }
  };

  return (
    <>
      {!user && navigate("/")}
      <div className="flex flex-row h-screen ">
        <div className="flex flex-col space-y-3 min-w-max bg-discord_serverContainerBg p-3">
          <div
            className="server-default
            hover:bg-discord_purple"
          >
            <img src={discord} alt="" className="h-5   " />
          </div>
          <hr className="border-gray-700   border w-8 mx-auto " />
          <ServerIcon image={guy} />
          <ServerIcon image={ztm} />
          <ServerIcon image={guy} />
          <ServerIcon image={ztm} />
          <div className="server-default hover:bg-discord_green group">
            <PlusIcon className="text-discord_green h-7 group-hover:text-white" />
          </div>
        </div>

        <div className="bg-discord_channelsBg flex flex-col w-[15rem] ">
          <h2
            className="text-white font-bold flex text-sm items-center
          justify-between border-b-2 border-gray-800 p-4 hover:bg-discord_serverNameBg 
          cursor-pointer"
          >
            Official Papa Server...
            <ChevronDownIcon className="h-5 ml-2" />
          </h2>

          <div className="text-discord_Channel flex-grow overflow-y-scroll no-scrollbar">
            <div className="flex items-center p-2 mb-2">
              <ChevronDownIcon className="h-4 mr-2" />

              <h4 className="font-semibold">Channels</h4>

              <PlusIcon
                onClick={handleAddChannel}
                className="h-6 ml-auto cursor-pointer hover:text-white"
              />
            </div>

            <div className="flex flex-col space-y-4 mb-4 px-2">
              {channels?.docs.map((doc) => (
                <Channel
                  key={doc.id}
                  id={doc.id}
                  channelName={doc.data().channelName}
                />
              ))}
            </div>
          </div>
          <div className="bg-discord_serverContainerBg flex">
            <div
              className="flex  items-center cursor-pointer
              hover:bg-gray-700 rounded-lg p-1 pr-3 space-x-1"
            >
              <img
                src={user?.photoURL}
                alt="image"
                className="h-10 rounded-full  "
                onClick={() => console.log(auth.signOut())}
              />
              <h4 className="text-white py-1 text-[0.81rem] font-medium">
                {user?.displayName}
                <span className="text-gray-400 block">
                  #{user?.uid.substring(0, 4)}
                </span>
              </h4>
            </div>
            <div className="flex  items-center text-gray-400">
              <div className="hover:bg-discord_iconHoverBg p-2 rounded-md">
                <MicrophoneIcon className="h-5" icon />
              </div>
              <div className="hover:bg-discord_iconHoverBg p-2 rounded-md">
                <PhoneIcon className="h-5" icon />
              </div>
              <div className="hover:bg-discord_iconHoverBg p-2 rounded-md">
                <CogIcon className="h-5" icon />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-discord_chatBg flex-grow">
          <Chat />
        </div>
      </div>
    </>
  );
}
export default Home;
