import { HashtagIcon } from "@heroicons/react/solid";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectChannelName, setChannelInfo } from "../features/channelSlice";

function Channel({ id, channelName }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const setChannel = () => {
    dispatch(
      setChannelInfo({
        channelId: id,
        channelName: channelName,
      })
    );
    navigate(`/channels/${id}`);
  };

  return (
    <div
      className="flex font-medium items-center cursor-pointer hover:bg-[#3a3c43] p-1 rounded-md hover:text-white "
      onClick={setChannel}
    >
      <HashtagIcon className="h-5 mr-1" />
      {channelName}
    </div>
  );
}
export default Channel;
