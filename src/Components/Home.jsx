import React from 'react'
import {Link} from "react-router-dom"

const Home = () => {


  return (
    <section className="section">
        <div className="container">
            <div className="row d-flex justify-content-center">
                <div className="col-lg-7 text-center intro">
                    <h2 className="font-weight mt-4">Bank of America</h2>
                    <p className="lead max-w-50">
                        All our customers will enjoy a simple and seamless online banking experience, no matter what device you are using.
                    </p>
                    <Link to="/account">
                        <button className="form-button btn btn-primary">Get Started</button>
                    </Link>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Home