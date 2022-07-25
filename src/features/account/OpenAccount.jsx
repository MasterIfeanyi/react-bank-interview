import {useState, useRef, useEffect} from 'react'
import { useCreateAccountMutation } from './accountApiSlice';
import { useNavigate } from 'react-router-dom';

const OpenAccount = () => {

    const [create] = useCreateAccountMutation();

    const navigate = useNavigate();

    // used to set focus
    const userRef = useRef();

    // when component mounts set focus on username input field
    useEffect(() => {
        userRef.current.focus();
    }, []);

    // component state
    const [fullName, setFullName] = useState("");
    const [occupation, setOccupation] = useState("");
    const [phone, setPhone] = useState("");
    const [age, setAge] = useState("");
    const [amount, setAmount] = useState("");


    // handle user input
    const handleFullNameInput = (e) => setFullName(e.target.value);
    const handleOccupationInput = (e) => setOccupation(e.target.value);
    const handlePhoneInput = (e) => setPhone(e.target.value);
    const handleAgeInput = (e) => setAge(e.target.value);
    const handleAmountInput = (e) => setAmount(e.target.value)

    // clear the form 
    const clear = () => {
        setFullName("");
        setOccupation("");
        setPhone("");
        setAge("");
        setAmount("");
    }

    // submit function
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!fullName || !occupation | !phone || !age || !amount) return 

        try {
            await create({ name: fullName, occupation, phone, age, amount }).unwrap();
            // clear
            clear();
            navigate("/account");
        } catch (e) {
            console.log(e.message)
        }
    }

  return (
    <>
        <div className="row">       
            <div className="col-12 intro text-center">
                <h6 className="">Open An Account</h6>
            </div>
        </div>
    
    
        <div className="row d-flex justify-content-center align-items-center">
            <div className="col-lg-7">
                <form  className="row" onSubmit={handleSubmit}>
                    <div className="form-group col-12">
                        <label htmlFor="full-name">Full Name</label>
                        <input
                            type="text"
                            id="full-name"
                            className="form-control"
                            value={fullName}
                            onChange={handleFullNameInput}
                            autoComplete="off"
                            required
                            placeholder="Enter your full name"
                            ref={userRef}
                        />
                    </div>
                    <div className="form-group col-12">
                        <label htmlFor="dob">Date of Birth</label>
                        <input
                            type="date"
                            id="dob"
                            className="form-control"
                            value={age}
                            onChange={handleAgeInput}
                            autoComplete="off"
                            required
                            placeholder="Enter your date of birth"
                        />
                    </div>
                    <div className="form-group col-12">
                        <label htmlFor="occupation">Occupation</label>
                        <input
                            type="text"
                            id="occupation"
                            className="form-control"
                            value={occupation}
                            onChange={handleOccupationInput}
                            autoComplete="off"
                            required
                            placeholder="Enter your occupation"
                        />
                    </div>
                    <div className="form-group col-12">
                        <label htmlFor="phone">Phone</label>
                        <input
                            type="text"
                            id="phone"
                            className="form-control"
                            value={phone}
                            onChange={handlePhoneInput}
                            autoComplete="off"
                            required
                            placeholder="Enter your phone number"
                        />
                    </div>
                    <div className="form-group col-12">
                        <label htmlFor="phone">Amount</label>
                        <input
                            type="text"
                            id="amount"
                            className="form-control"
                            value={amount}
                            onChange={handleAmountInput}
                            autoComplete="off"
                            required
                            placeholder="Please make an initial deposit"
                        />
                    </div>
                    <div className="mb-5 intro text-center">
                        <button className="btn btn-primary form-button">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </>
  )
}

export default OpenAccount