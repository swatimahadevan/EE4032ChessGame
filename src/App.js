import {Routes, Route} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {useState, useEffect} from 'react';
import {ethers} from 'ethers';
import Web3 from "web3";
import { extendTheme } from "@chakra-ui/react"
import './App.css';
import Login from "./components/login/login";
import Profile from "./components/profile/profile";
import ChessBoard from "./components/chessboard/chessboard";
import History from './components/history/history';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "./contracts/config";
import { ChakraProvider } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Bidding from './components/bidding/bidding';

export default function App() {
    const [haveMetamask, setHaveMetamask] = useState(true);     // check if the browser has MetaMask installed. 
    const [address, setAddress] = useState(null);               // address of connected MetaMask account. 
    const [network, setNetwork] = useState(null);               // network the account is using. 
    const [balance, setBalance] = useState(0);                  // balance of connected MetaMask account. 
    const [isConnected, setIsConnected] = useState(false);      // check if is connected to MetaMask account. 

    const [finalBidAmount, setFinalBidAmount] = useState(0);
    useEffect(() => {
        if(finalBidAmount != 0) {
            startGame(finalBidAmount)
        }
    }, [finalBidAmount])

    const [storedPending, setStoredPending] = useState(false);        // check if a value is pending. 
    
    const [startedGame, setStartedGame] = useState(false);        // check if game has started
    const [storedDone, setStoredDone] = useState(false);        // check if a value is stored. 
    const [storedVal, setStoredVal] = useState(0);              // value that is stored right now. 
    const [showVal, setShowVal] = useState(0);                  // value that is showed on screen. 

    const [historyRecord, setHistoryRecord] = useState(null);   // record of history operations. 
    const [recordLen, setRecordLen] = useState(0);              // length of record. 
    const maxRecordLen = 50;                                    // maximum length of record list. 

    const navigate = useNavigate();
    const {ethereum} = window;
    const provider = new ethers.BrowserProvider(window.ethereum);
    console.log(Web3.givenProvider)
    console.log("abcd")
    // const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
    const web3 = new Web3(ethereum);
    const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

    const SERVER_ADDRESS = "0x121bdE1406383681Aeba79bF1d04559d9400Bad0"


////// connect to MetaMask. 
    const connectWallet = async () => {         // function that connect to METAMASK account, activated when clicking on 'connect'. 
        try {
            if (!ethereum){
                setHaveMetamask(false);
            }
            const accounts = await ethereum.request({
                method: 'eth_requestAccounts',
            });
            const chainId = await ethereum.request({
                method: 'eth_chainId',
            });

            let balanceVal = await provider.getBalance(accounts[0]);
            let bal = ethers.formatEther(balanceVal);

            console.log(chainId);
            if (chainId === '0x3'){
                setNetwork('Ropsten Test Network');
            }
            else if (chainId === '0x5'){
                setNetwork('Goerli Test Network');
            }
            else if (chainId === '0xaa36a7'){
                setNetwork('Sepolia Test Network');
            }
            else {
                setNetwork('Other Test Network');
            }
            setAddress(accounts[0]);
            setBalance(bal);
            setIsConnected(true);

            navigate('/EE4032ChessGame/profile');
        }
        catch (error){
            setIsConnected(false);
        }
    }


    ////// set start of game 
    const setStartOfGame = async () => {

        try{
            const detail = await startGame();   // contract deployed. 
            setStartedGame(true);
        }
        catch(error){
            console.log(error);
        }
    }

////// Contract Deployment. 
    // IMPORTANT: async / await is essential to get values instead of Promise. 
    const startGame = async (biddingAmount) => {
        // console.log(ethereum.selectedAddress)
        try {
            const result = await contract.methods.start().send({
                // from: "0x652A7aA3FE781a31B9809D280715d55BAC2300f6",
                from: ethereum.selectedAddress,
                value: biddingAmount,
                // value: web3.utils.toWei('1', 'ether'), // Replace with your desired bet amount
            });

            // console.log(result);
            return result;
        } catch (error) {
            console.error(error);
        }
    }

    const move = async (from, to) => {
        try {
            const result = await contract.methods.move(from, to).send({
                from:ethereum.selectedAddress,
            });

            // console.log(result);
        } catch (error) {
            console.error(error);
        }
    }

    const getHistoryMoves = async() => {
        try {
            const result = await contract.methods.getHistoryMoves().call({
                from: ethereum.selectedAddress
            });

            // console.log(result);
            return result;
        } catch (error) {
            console.error(error);
        }
    }

    const getAmountBet = async() => {
        try {
            const result = await contract.methods.getAmountBet().call({
                from: ethereum.selectedAddress
            });

            // console.log(result);
            return result;
        } catch (error) {
            console.error(error);
        }
    }

    const endGame = async () => {
        try {
            const result = await contract.methods.ends(ethereum.selectedAddress, false).send({
                from: SERVER_ADDRESS,
                value: web3.utils.toWei('1', 'ether'), // Replace with your desired bet amount
            })

            console.log(result);
            return result;
        } catch (error) {
            console.error(error);
        }
    }

    // const getMove = async () => {
    //     try {
    //         const result = await contract.methods.move('oldCoordValue', 'newCoordValue').send({
    //             from: accounts[0],
    //         });

    //         console.log(result);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    // const endGame = async () => {
    //     try {
    //         const result = await contract.methods.ends(true).send({
    //             from: accounts[0],
    //         });

    //         console.log(result);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }


////// display functions. 
    const ProfileDisplay = () => {
        return (
            <Profile 
                isConnected = {isConnected}
                address = {address} 
                networkType = {network} 
                balance = {balance}
            />
        )
    }

    const ChessBoardDisplay = () => {
        return (
            <ChessBoard
                isConnected = {isConnected}
                setStartOfGame = {setStartOfGame} 
                // startedGame = {}
                balance = {balance}
            />
        )
    }

    // const HistoryDisplay = () => {
    //     return (
    //         <History />
    //     )
    // }

    const Test = () => {
        return (
        <>
            <button onClick = {startGame}>start</button>
            <button onClick = {endGame}>end</button>
            <button onClick = {move}>move</button>
            <button onClick = {getHistoryMoves}>history</button>
        </>
        )
    }

    return (
        <ChakraProvider>
      <Navbar />
            <div className="App">
                <Routes>
                    <Route path="/EE4032ChessGame/" element={<Login isHaveMetamask = {haveMetamask} connectTo = {connectWallet} />} />
                    <Route path = "/EE4032ChessGame/profile" element = {<ProfileDisplay/>}></Route>
                    <Route path = "/EE4032ChessGame/bidding" element = {<Bidding setFinalBidAmount={setFinalBidAmount}/>}></Route>
                    <Route path = "/EE4032ChessGame/chessboard" element = {<ChessBoardDisplay/>}></Route>
                    <Route path = "/EE4032ChessGame/history" element = {<History getHistory={getHistoryMoves} getAmountBet={getAmountBet}/>}></Route>
                </Routes>
            </div>
            </ChakraProvider>
    );
}