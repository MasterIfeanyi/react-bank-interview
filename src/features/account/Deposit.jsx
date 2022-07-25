import {useState} from 'react'
import {FaPlus} from "react-icons/fa"
import { useDepositMutation } from './accountApiSlice'
import { useNavigate, useParams } from "react-router-dom"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const Deposit = () => {

    const navigate = useNavigate();

    const { id } = useParams();

    const [text, setText] = useState("");

    const [errMsg, setErrMsg] = useState("")

    const [deposit] = useDepositMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!text) return
        try {
            await deposit({ id, amount: text }).unwrap();
            navigate("/account");
            // inbuilt-notification
            toast.success('Deposited money');
        } catch (err) {
            if (!err?.originalStatus) {
                setErrMsg('No Server Response'); // server is off
            } else if (err.originalStatus === 400) {
                setErrMsg(err.message);
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
                    <h5 className="mt-3">Deposit</h5>
                    <p className="lead">How much would you like to deposit ?</p>
                </div>
            </div>

            <div className="row d-flex justify-content-center align-items-center">
                  <div className="col-md-7 mb-2">
                    <p aria-live="assertive" className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
                    <form action="" className="row" onSubmit={handleSubmit}>
                        <div className="form-group col-12">
                            <label htmlFor="deposit" className="">Deposit</label>
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

export default Deposit