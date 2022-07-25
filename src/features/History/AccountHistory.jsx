import React from 'react'

const AccountHistory = ({info}) => {


  return (

      
    <div className="allAccounts p-4 mb-4">
        <p className="pt-1">{info.statement}</p>
    </div>
  )
}

export default AccountHistory