/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        discord_blue: "#295DE7",
        discord_blurple: "#7289da",
        discord_purple: "#5865f2",
        discord_green: "#3ba55c",
        discord_serverBg: "#36393f",
        discord_serverContainerBg: "#202225",
        discord_channelsBg: "#2f3136",
        discord_serverNameBg: "#34373c",
        discord_Channel: "#8e9297",
        discord_iconHoverBg: "#3a3c43",
        discord_chatBg: "#36393f",
        discord_chatHeaderInputBg: "#202225",
        discord_chatInputBg: "#40444b",
        discord_chatInputText: "#dcddde",
        discord_messageBG: "#32353b",
        discord_deleteIconBg: "#ed4245",
      },
    },
  },
  plugins: [],
};
