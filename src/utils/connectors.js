import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { FortmaticConnector } from "@web3-react/fortmatic-connector";
// import type {AbstractConnector} from '@web3-react/abstract-connector'
import { UAuthConnector } from "@uauth/web3-react";
import UAuth from "@uauth/js";

import LOGO from "../assets/images/logo192.png";

const INFURA_KEY = process.env.REACT_APP_INFURA_KEY;

const NETWORK_URLS = {
  1: `https://mainnet.infura.io/v3/${INFURA_KEY}`,
  3: `https://ropsten.infura.io/v3/${INFURA_KEY}`,
};

const POLLING_INTERVAL = process.env.REACT_APP_POLLING_INTERVAL;

const RPC_URLS = {
  1: process.env.REACT_APP_RPC_URL_1,
  3: process.env.REACT_APP_RPC_URL_3,
};

// Add different connectors
export const injected = new InjectedConnector({
  supportedChainIds: 3, // Change according to supported Network Ids
});

export const walletconnect = new WalletConnectConnector({
  rpc: { 1: RPC_URLS[1] },
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
  pollingInterval: POLLING_INTERVAL,
});

export const walletLink = new WalletLinkConnector({
  url: NETWORK_URLS[3], // Change according to supported Network Id
  appName: "NFT Boilerplate",
  appLogoUrl: LOGO,
});

export const fortmatic = new FortmaticConnector({
  apiKey: process.env.REACT_APP_FORTMATIC_API_KEY,
  chainId: 3,
});

export const uauth = new UAuthConnector({
  clientID: process.env.REACT_APP_UNSTOPPABLE_CLIENT_ID,
  redirectUri: process.env.REACT_APP_UNSTOPPABLE_REDIRECT_URI,
  postLogoutRedirectUri:
    process.env.REACT_APP_UNSTOPPABLE_POST_LOGOUT_REDIRECT_URI,
  // Scope must include openid and wallet
  scope: "openid wallet",
  shouldLoginWithRedirect: true,
});
