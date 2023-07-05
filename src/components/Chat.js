import {
  BellIcon,
  HashtagIcon,
  InboxIcon,
  QuestionMarkCircleIcon,
  SearchIcon,
  UserIcon,
  ChatIcon,
  PlusCircleIcon,
  GiftIcon,
  EmojiHappyIcon,
} from "@heroicons/react/solid";
import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { selectChannelId, selectChannelName } from "../features/channelSlice";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  addDoc,
  collection,
  serverTimestamp,
  doc,
  query,
  getDoc,
  orderBy,
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "./Message";

function Chat() {
  const channelId = useSelector(selectChannelId);
  //   alternative way to achieve the same result
  // const channelId = useSelector((state) => state.channel.channelId);
  const channelName = useSelector(selectChannelName);
  const [user] = useAuthState(auth);
  const inputRef = useRef("");
  const chatRef = useRef(null);

  const [messages] = useCollection(
    channelId &&
      query(
        collection(db, "channels", channelId, "messages"),
        orderBy("timestamp", "asc")
      )
  );

  const scrollToBottom = () => {
    chatRef.current.scrollIntoView({
      behavior: "instant",
      block: "start",
    });
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (inputRef.current.value !== "") {
      const docRef = await addDoc(
        collection(db, "channels", channelId, "messages"),
        {
          timestamp: serverTimestamp(),
          message: inputRef.current.value,
          name: user?.displayName,
          photoURL: user?.photoURL,
          email: user?.email,
        }
      );
    }
    inputRef.current.value = "";
    scrollToBottom();
  };

  return (
    <div className="flex flex-col h-screen">
      <header
        className="flex  items-center justify-between space-x-5 
      border-b-2 border-gray-800 p-[0.14rem] "
      >
        <div className="flex items-center justify-between space-x-1 p-3 ">
          <HashtagIcon className="h-6 text-gray-400" />
          <h4 className="text-white font-semibold">{channelName}</h4>
        </div>

        <div className="flex space-x-3 pr-5 ">
          <BellIcon className="icon" />
          <ChatIcon className="icon" />
          <UserIcon className="icon" />
          <div className="flex bg-discord_chatHeaderInputBg rounded-md text-xs p-1 ">
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent focus:outline-none text-white pl-1
              placeholder-discord_Channel"
            />
            <SearchIcon className="h-4 text-gray-400 mr-1" />
          </div>
          <InboxIcon className="icon" />
          <QuestionMarkCircleIcon className="icon " />
        </div>
      </header>
      <main className="overflow-y-scroll  flex-grow no-scrollbar ">
        {messages?.docs.map((doc) => {
          const { message, timestamp, name, photoURL, email } = doc.data();
          return (
            <Message
              key={doc.id}
              id={doc.id}
              message={message}
              email={email}
              name={name}
              photoURL={photoURL}
              timestamp={timestamp}
            />
          );
        })}
        <div ref={chatRef} className="p-3" />
      </main>
      <div
        className="flex items-center p-2.5 bg-discord_chatInputBg mx-5
      mb-7 rounded-lg "
      >
        <PlusCircleIcon className="icon mr-4 " />
        <form className="flex-grow  ">
          <input
            type="text"
            disabled={!channelId}
            placeholder={
              channelId ? `Message #${channelName}` : "Select a channel"
            }
            className="bg-transparent focus:outline-none 
             text-discord_chatInputText text:sm w-full "
            ref={inputRef}
          />
          <button hidden type="submit" onClick={sendMessage}>
            Send
          </button>
        </form>
        <GiftIcon className="icon mr-2" />
        <EmojiHappyIcon className="icon" />
      </div>
    </div>
  );
}

export default Chat;
