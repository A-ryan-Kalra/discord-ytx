import React from "react";
import moment from "moment";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { TrashIcon } from "@heroicons/react/solid";
import { useSelector } from "react-redux";
import { selectChannelId } from "../features/channelSlice";
import { collection, deleteDoc, doc } from "firebase/firestore";

function Message({ id, message, timestamp, email, photoURL, name }) {
  const [user] = useAuthState(auth);
  const channelId = useSelector(selectChannelId);
  return (
    <div className="flex items-center p-1 pl-5 my-5 mr-2 hover:bg-discord_messageBG group">
      <img
        src={photoURL}
        alt="image"
        className="h-10 rounded-full cursor-pointer mr-3 hover:shadow-2xl "
      />
      <div className="flex flex-col">
        <h4 className="flex items-center space-x-2 font-medium">
          <span className="hover:underline text-white text-sm cursor-pointer">
            {name}
          </span>
          <span className="text-[#72767d] text-xs  ">
            {moment(timestamp?.toDate().getTime()).format("lll")}
          </span>
        </h4>
        <p className="text-sm text-[#dcddde]">{message}</p>
      </div>
      {user?.email === email && (
        <div
          onClick={async () =>
            await deleteDoc(doc(db, "channels", channelId, "messages", id))
          }
          className="hover:bg-discord_deleteIconBg p-1 ml-auto rounded-lg text-discord_deleteIconBg hover:text-white cursor-pointer"
        >
          <TrashIcon className="h-6 opacity-0 group-hover:opacity-100 " />
        </div>
      )}
    </div>
  );
}
export default Message;
