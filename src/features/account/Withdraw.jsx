import {useState} from 'react'
import {FaPlus} from "react-icons/fa"
import { useWithdrawMutation } from './accountApiSlice'
import {useNavigate, useParams} from "react-router-dom"

const Withdraw = () => {

    const navigate = useNavigate();

    const { id } = useParams();

    const [text, setText] = useState("");

    const [errMsg, setErrMsg] = useState("");

    const [withdraw] = useWithdrawMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!text) return
        try {
            await withdraw({ id, amount: text }).unwrap();
            navigate("/account");
        } catch (err) {
            if (!err?.originalStatus) {
                setErrMsg('No Server Response'); // server is off
            } else if (err.originalStatus === 400) {
                setErrMsg(err.message);
            } else if (err.originalStatus === 403) {
                setErrMsg("Sorry, No over-draft allowed");
            } else {
                setErrMsg('Action Failed');
            }
        }
    }

  return (
      <section className="section">
          <div className="container">
              <div className="row">
                  <div className="col-12 intro text-center">
                      <h5 className="mt-3">Withdraw</h5>
                      <p className="lead">How much would you like to withdraw ?</p>
                  </div>
              </div>

              <div className="row d-flex justify-content-center align-items-center">
                  <div className="col-md-7 mb-2">
                      <p aria-live="assertive" className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
                      <form action="" className="row" onSubmit={handleSubmit}>
                          <div className="form-group col-12">
                              <label htmlFor="deposit" className="">Withdraw</label>
                              <div className="d-flex">
                                  <input
                                      value={text}
                                      onChange={(e) => setText(e.target.value)}
                                      type="text"
                                      autoComplete="off"
                                      id="deposit"
                                      className="form-control me-2"
                                  />
                                  <button className="btn btn-primary"><FaPlus /></button>
                              </div>
                          </div>
                      </form>
                  </div>
              </div>

          </div>
      </section>
  )
}

export default Withdraw