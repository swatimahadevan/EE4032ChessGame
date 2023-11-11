export const CONTRACT_ADDRESS = "0x2b42dB37ada2fe667Fd8426c33859cFc2d48D2a5";
export const CONTRACT_ABI = [
	{
		"inputs": [],
		"name": "getHistoryMoves",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "oldCoord",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "newCoord",
						"type": "string"
					}
				],
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "oldCoord",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "newCoord",
				"type": "string"
			}
		],
		"name": "move",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "start",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "playerAddressString",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "playerWin",
				"type": "bool"
			}
		],
		"name": "ends",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
]




// export const CONTRACT_ABI = [
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "x",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "set",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "get",
// 		"outputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	}
// ];


// export const CONTRACT_ADDRESS = "0x2a20734277babe8d1caa5900de495301c3111c78";
// export const CONTRACT_ABI = [
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "x",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "set",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "get",
// 		"outputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	}
// ];

