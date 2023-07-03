import { Contract, providers, utils } from "ethers";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import Web3Modal from "web3modal"

import Form from '@/pages/components/Form'
import Messages from '@/pages/components/Messages'

const NETWORK_NAME = "Polygon"
const NETWORK_ID = 137
const STREAM_ID = process.env.NEXT_PUBLIC_STREAM_ID

export default function Home() {
  // walletConnected keep track of whether the user's wallet is connected or not
  const [walletConnected, setWalletConnected] = useState(false);
  // loading is set to true when we are waiting for a transaction to get mined
  const [loading, setLoading] = useState(false);
  // Create a reference to the Web3 Modal (used for connecting to Metamask) which persists as long as the page is open
  const web3ModalRef = useRef();
  // for messages
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const [currentAddress, setCurrentAddress] = useState('')

  /*
    connectWallet: Connects the MetaMask wallet
  */
  const connectWallet = async () => {
    try {
      // Get the provider from web3Modal, which in our case is MetaMask
      // When used for the first time, it prompts the user to connect their wallet
      await getProviderOrSigner()
      setWalletConnected(true)
      setCurrentAddress(`${window.ethereum.selectedAddress.slice(0,3)}...${window.ethereum.selectedAddress.slice(-5)}`)
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * Returns a Provider or Signer object representing the Ethereum RPC with or without the
   * signing capabilities of metamask attached
   * @param {*} needSigner - True if you need the signer, default false otherwise
   */
  const getProviderOrSigner = async (needSigner = false) => {
    // Connect to Metamask
    // Since we store `web3Modal` as a reference, we need to access the `current` value to get access to the underlying object
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);

    // If user is not connected to the network, let them know and throw an error
    const { chainId } = await web3Provider.getNetwork();
    if (parseInt(chainId) !== parseInt(NETWORK_ID)) {
      setErrorMessage(`Change the network to ${NETWORK_NAME}`);
      throw new Error(`Change the network to ${NETWORK_NAME}`);
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };

  // useEffects are used to react to changes in state of the website
  // The array at the end of function call represents what state changes will trigger this effect
  // In this case, whenever the value of `walletConnected` changes - this effect will be called
  useEffect(() => {
    // if wallet is not connected, create a new instance of Web3Modal and connect the MetaMask wallet
    if (!walletConnected) {
      // Assign the Web3Modal class to the reference object by setting it's `current` value
      // The `current` value is persisted throughout as long as this page is open
      web3ModalRef.current = new Web3Modal({
        network: NETWORK_NAME,
        providerOptions: {},
        disableInjectedProvider: false,
      });

      connectWallet()
    }
  }, [walletConnected]);


  const renderMessages = () => {
    if(successMessage) {
      return (
        <p className="text-center text-green-400 mt-8">
          {successMessage}
        </p>
      )
    }
    if(errorMessage) {
      return (
        <p className="text-center text-red-400 mt-8">
          {errorMessage}
        </p>
      )
    }
  }

  return (
    <div>
      <Head>
        <title>Streamr chat</title>
        <meta name="description" content="Streamr chat" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <div className="w-full max-w-xs m-auto">
          { walletConnected ? (
            <div>
              <p className="text-right mb-8 mt-4">Welcome {currentAddress}</p>
              <Messages />
              <Form setErrorMessage={setErrorMessage} setSuccessMessage={setSuccessMessage} setLoading={setLoading} />
            </div>
          ) : (
            <p className="text-center mt-8 text-red-500">Connect your wallet</p>
          )}
        </div>
        { loading ? (
          <div className="fixed top-0 left-0 w-full h-full z-10 bg-gray-400 opacity-90">
            <p className="text-center pt-32 text-white text-lg">Loading...</p>
          </div>
        ) : ''}
        {renderMessages()}
      </div>

      <footer className="w-full max-w-xs m-auto text-center mt-16">Created by <a className="underline" href="https://linktr.ee/falconandrea" title="" target="_blank">Andrea Falcon</a></footer>
    </div>
  )
}
