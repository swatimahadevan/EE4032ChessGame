export const CONTRACT_ADDRESS = "0xfB1d0e4F2958dCE7a857Cf6A9B70E2a278b8Ea1B";
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
		"inputs": [],
		"name": "getBetAmount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
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
		"name": "restart",
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
	{
		"inputs": [],
		"name": "getBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "deposit",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
]