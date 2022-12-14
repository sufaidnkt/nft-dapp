import React, { useEffect, useRef, useState } from "react";
import MetaMaskOnboarding from "@metamask/onboarding";
import { useWeb3React } from "@web3-react/core";
import { UAuthConnector } from "@uauth/web3-react";
import { uauth } from "../../utils/connectors";
import {
  injected,
  walletconnect,
  walletLink,
  fortmatic,
} from "../../utils/connectors";
import { useEagerConnect, useInactiveListener } from "../../hooks";

import MetamaskButton from "../../components/MetamaskButton/MetamaskButton";
import WalletConnect from "../../components/WalletConnect/WalletConnect";
import WalletLinkConnect from "../../components/WalletLinkConnect/WalletLinkConnect";
import Fortmatic from "../../components/Fortmatic/Fortmatic";
import Unstoppable from "../../components/Unstoppable/Unstoppable";

const ONBOARD_TEXT = "Click to install MetaMask!";
const CONNECT_TEXT = "Connect Metamask";
const UNSTOPPABLE_CONNECT_TEXT = "Login with Unstoppable";

const Login = () => {
  const [metamaskButtonText, setMetamaskButtonText] = useState(ONBOARD_TEXT);
  const [activatingConnector, setActivatingConnector] = useState();

  const { account, activate, connector } = useWeb3React();
  const onboarding = useRef();

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector);

  // For Metamask OnBoarding
  useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
    }
  }, []);

  useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      if (account && account.length > 0) {
        onboarding.current.stopOnboarding();
      } else {
        setMetamaskButtonText(CONNECT_TEXT);
      }
    }
  }, [account]);

  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  const onConnectWithMetamaskClick = () => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      setActivatingConnector(injected);
      activate(injected);
    } else {
      onboarding.current.startOnboarding();
    }
    localStorage.setItem("fortmaticConnect", "false");
  };

  const onConnectWithWalletConnectClick = () => {
    if (connector && connector.walletConnectProvider?.wc?.uri) {
      connector.walletConnectProvider = undefined;
    }
    setActivatingConnector(walletconnect);
    activate(walletconnect);
  };

  const onLinkConnectClick = () => {
    setActivatingConnector(walletLink);
    activate(walletLink);
  };

  const onConnectWithFortmaticClick = () => {
    setActivatingConnector(fortmatic);
    activate(fortmatic);
    localStorage.setItem("fortmaticConnect", "true");
  };

  // const handleUauth = () => {
  //   const uauthConnector = new UAuthConnector();
  //   uauthConnector.uauth
  //     .user()
  //     .then(() => console.log("BBBBBBBbbbbb"))
  //     .catch(() => console.log("CCCCCccccccccccc"));
  // };

  useEffect(() => {
    uauth
      .callbackAndActivate({ activate })
      .then((res) => {
        // Redirect to success page
        console.log("res", res);
      })
      .catch((error) => {
        // Redirect to failure page
        console.log("error", error);
      });
  }, []);

  const onConnectWithUnstoppableClick = async () => {
    await activate(uauth);
  };

  return (
    <div className="wallet-wrapper">
      <MetamaskButton
        title={metamaskButtonText}
        onMetamaskClick={onConnectWithMetamaskClick}
      />
      <WalletConnect onWalletConnectClick={onConnectWithWalletConnectClick} />
      <WalletLinkConnect onWalletLinkConnectClick={onLinkConnectClick} />
      <Fortmatic
        title="Fortmatic"
        onFortmaticClick={onConnectWithFortmaticClick}
      />
      <Unstoppable
        title={UNSTOPPABLE_CONNECT_TEXT}
        onUnstoppableLogin={onConnectWithUnstoppableClick}
      />
    </div>
  );
};

export default Login;
