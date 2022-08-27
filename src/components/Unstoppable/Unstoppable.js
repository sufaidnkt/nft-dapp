import React from "react";
import WalletButton from "../WalletButton/WalletButton";
import unstoppableLogo from "../../assets/images/unstoppable.webp";

function Unstoppable({ title, onUnstoppableLogin }) {
  return (
    <div>
      <WalletButton
        title={title}
        logo={unstoppableLogo}
        onConnectClick={onUnstoppableLogin}
      />
    </div>
  );
}

export default Unstoppable;
