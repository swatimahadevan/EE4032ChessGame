import React, { useState, useEffect } from "react";
import { Button, Input, Stack, Flex } from '@chakra-ui/react'
import "./adminportal.css"; // Import your CSS file

const ADMINS = ["0xd5342e25cb392b5ff20e0bdade80335bd771cfae"]

const AdminPortal = ({user, deposit, withdraw, getBalance}) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [balance, setBalance] = useState(0);
    const [withdrawAmount, setWithdrawAmount] = useState(0);
    const [depositAmount, setDepositAmount] = useState(0);

    useEffect(() => {
        setIsAdmin(ADMINS.includes(user))
    }, [user])

    useEffect(() => {
        const getInfo = async() => {
            if (isAdmin) {
                const bal = await getBalance()
                setBalance(Number(bal))
            }
        }

        getInfo();
    }, [isAdmin])

    const withdrawEther = async() => {
        await withdraw(withdrawAmount);
    }

    const depositEther = async() => {
        await deposit(depositAmount);
    }

    return (
        !isAdmin ?
        <>You do not have access to this page</>
        :
        <div className="admin-container">
            <p>Welcome Admin {user}</p>
            <p>The Contract Balance: {balance}</p>
            <Stack direction="row" spacing={8} width={700}>
                <Input
                    value={withdrawAmount}
                    onChange={event => setWithdrawAmount(event.target.value)}
                    placeholder='Withdraw Amount'
                    size='sm'
                />
                <Button isDisabled={withdrawAmount > balance} onClick={withdrawEther}>Withdraw</Button>
            </Stack>
            <Stack direction="row" spacing={8} width={700}>
                <Input
                    value={depositAmount}
                    onChange={event => setDepositAmount(event.target.value)}
                    placeholder='Deposit Amount'
                    size='sm'
                />
                <Button onClick={depositEther}>Deposit</Button>
            </Stack>
        </div>
    )
}

export default AdminPortal;