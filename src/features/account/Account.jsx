import React from 'react'
import { FaHistory, FaRegCreditCard, FaUsps } from "react-icons/fa"
import {Link} from "react-router-dom"

const Account = ({info}) => {


    console.log(info._id)

    const returnBalance = (balance) => {
        return `\u20A6 ${Number(balance).toLocaleString("en-US")}`;
    }

    return (
      
    <div className="allAccounts p-4 mb-4">
        <h3 className="accountNumber fw-bold">{info.accountNumber}</h3>

        <h5 className="text-primary">Balance</h5>
        <p className="fw-bold price">{returnBalance(info.balance)}</p>
        
          
        <div className="d-sm-flex justify-content-center align-items-center">
            <Link to={`/history/${info._id}`}>
                <button className="btn btn-primary me-2 mb-2 mb-sm-0 form-button">
                    <FaHistory /> History
                </button>
            </Link>
            <Link to={`/deposit/${info._id}`}>
                <button className="btn btn-primary me-2 mb-2 mb-sm-0 form-button">
                    <FaRegCreditCard /> Deposit
                </button>
            </Link>
            <Link to={`/withdraw/${info._id}`}>
                <button className="btn btn-primary me-2 mb-2 mb-sm-0 form-button">
                    <FaUsps /> Withdraw
                </button>
            </Link>
        </div>
    </div>
  )
}

export default Account