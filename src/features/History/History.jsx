import React from 'react'
import {useParams} from "react-router-dom"
import { useGetHistoryQuery } from './HistoryApiSlice';
import AccountHistory from './AccountHistory';

const History = () => {

    const { id }  = useParams();

    const {
        data: history,
        isLoading,
        isError,
        isSuccess,
        error
    } = useGetHistoryQuery({ id });

    console.log(history);

    let content;

    if (isSuccess) {
        content = (
            history.length ? (
                <>
                    <h6>Your Account History</h6>
                    {history.map((info, i) => <AccountHistory key={i} info={info} />)}
                </>
            ) : (
                <>
                    <h6>Sorry, No History</h6>
                    <p className="lead">Oops, You have not performed an action on your account</p>
                </>
            )
        )
    }



  return (
    <section className="section">
        <div className="container">
            <div className="row">
                <div className="col-12 intro text-center">
                    <h3 className="mt-4">Transaction History </h3>
                    <p className="lead">You can view all your transactions on an account</p>
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

export default History