import React from 'react'
import { useGetAccountsQuery } from './accountApiSlice'
import { selectCurrentUser } from '../auth/authSlice'
import { useSelector } from 'react-redux/es/exports'
import OpenAccount from './OpenAccount'
import Account from './Account'

const Bank = () => {

    const {
        data: accounts,
        isLoading,
        isError,
        isSuccess,
        error
    } = useGetAccountsQuery()


    const username = useSelector(selectCurrentUser)

    let content;

    if (isSuccess) {
        content = (
            accounts.length ? (
                <>
                    <h5>Your Account(s)</h5>
                    {accounts.map((info, i) => <Account key={i} info={info} />)}
                </>
            ) : (
                <OpenAccount />
            )
        )
    }


  return (
    <section className="section">
        <div className="container">
            <div className="row">
                <div className="col-12 intro text-center">
                    <h3 className="mt-4">Welcome, {username} </h3>
                    <p className="lead max-w-50">With your Bank of America banking account you can enjoy tools, benefits and rewards to help you manage your money.</p>
                </div>
            </div>

            <div className="row">
                <div className="col-12 text-center">
                    { isLoading && <div className="mexican-wave my-5"></div> }

                    {content}

                    {isError && (<p className="text-danger">An error occured: {error.error}</p>)}
                </div>
            </div>

              
        </div>
    </section>
  )
}

export default Bank