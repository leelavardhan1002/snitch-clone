import React from "react";
import Layout from "../../Components/Layout/Layout";
import "../Contact/contact.css";
const Contact = () => {
  return (
    <Layout title={"contact us"}>
      <div className="form-area mb-5">
        <div className="container">
          <div className="row single-form g-0">
            <div className="col-sm-12 col-lg-6">
              <div className="left">
                <h2>
                  <span>Contact Us for</span> <br />
                  Business Enquiry
                </h2>
              </div>
            </div>
            <div className="col-sm-12 col-lg-6">
              <div className="right">
                <i className="fa fa-caret-left" />
                <form>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Your Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleInputPassword1"
                      className="form-label"
                    >
                      Message
                    </label>
                    <textarea
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
                      defaultValue={""}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
