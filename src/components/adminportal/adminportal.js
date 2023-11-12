import React, { useState, useEffect } from "react";
import { Button, Input, Stack } from '@chakra-ui/react'
import "./adminportal.css"; // Import your CSS file
import Loader from "../loader/loader";
import { ADMINS } from "../../constants/admin"

const AdminPortal = ({user, deposit, withdraw, getBalance}) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [balance, setBalance] = useState(0);
    const [withdrawAmount, setWithdrawAmount] = useState(0);
    const [depositAmount, setDepositAmount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsAdmin(ADMINS.includes(user))
    }, [user])

    useEffect(() => {
        const getInfo = async() => {
            if (isAdmin && !isLoading) {
                const bal = await getBalance()
                setBalance(Number(bal))
            }
        }

        getInfo();
    }, [isAdmin, isLoading])

    const withdrawEther = async() => {
        setIsLoading(true)
        await withdraw(withdrawAmount);
        setIsLoading(false)
    }

    const depositEther = async() => {
        setIsLoading(true)
        await deposit(depositAmount);
        setIsLoading(false)
    }

    if (isLoading) {
        return (
            <div className="admin-container">
                <Loader/>
            </div>
        )
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
                <Button isDisabled={withdrawAmount > balance} onClick={async() => await withdrawEther()}>Withdraw</Button>
            </Stack>
            <Stack direction="row" spacing={8} width={700}>
                <Input
                    value={depositAmount}
                    onChange={event => setDepositAmount(event.target.value)}
                    placeholder='Deposit Amount'
                    size='sm'
                />
                <Button onClick={async() => await depositEther()}>Deposit</Button>
            </Stack>
        </div>
    )
}

export default AdminPortal;