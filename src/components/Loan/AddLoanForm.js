import React, { Component } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import $ from "jquery";

import Loader from "./../Common/Loader";

import * as db from "../../firebase/db";

import "react-datepicker/dist/react-datepicker.css";
import "../../assets/css/form.css";

class AddLoanForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: moment(),
      day: moment().day(),
      amount: "",
      loanType: "Given",
      person: "",
      reason: "",
      status: "Pending",
      uid: this.props.user.uid,
      dataSaved: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handlePersonInput = this.handlePersonInput.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    db.doCreateLoan(
      this.state.uid,
      $(".date").val(),
      this.state.amount,
      this.state.loanType,
      this.state.reason,
      this.state.person,
      moment($(".date").val()).day(),
      this.state.status
    );
    // reset form once saved
    this.setState({
      date: moment(),
      day: moment().day(),
      amount: "",
      loanType: "Given",
      reason: "",
      status: "Pending",
      uid: this.props.user.uid,
      dataSaved: true,
    });
  }

  handleChange(e) {
    // If you are using babel, you can use ES 6 dictionary syntax { [e.target.name]: e.target.value }
    var change = {};
    change[e.target.name] = e.target.value;
    this.setState(change);
  }

  handleDateChange(date) {
    this.setState({
      date: date,
    });
  }

  handlePersonInput(e) {
    const value = e.target.value;
    const regex = /^[A-Za-z\s]*$/; // Regular expression to allow only alphabetic characters and spaces
    if (regex.test(value)) {
      this.setState({ person: value });
    }
  }

  render() {
    if (this.props.settings) {
      const inputNightMode = {
        background: "#2c2b2b",
        color: "#a9a0a0",
        border: "1px solid #9b8c8cc7",
      };
      const inputDayMode = { background: "#fff", color: "#495057" };

      return (
        <form onSubmit={this.handleSubmit}>
          <div className="form-group row">
            <label className="col-sm-2 col-xs-6 col-form-label">
              <span>Date</span>
            </label>
            <div className="col-sm-10 col-xs-6">
              <DatePicker
                className={
                  "form-control date " +
                  (this.props.settings.mode === "night"
                    ? "inputNightMode"
                    : "inputDayMode")
                }
                name="date"
                selected={this.state.date}
                onChange={this.handleDateChange.bind(this)}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-xs-6 col-form-label">
              <span>Amount</span>
            </label>
            <div className="col-sm-10 col-xs-6">
              <input
                className="form-control"
                required
                type="number"
                name="amount"
                onChange={this.handleChange.bind(this)}
                value={this.state.amount}
                style={
                  this.props.settings.mode === "night"
                    ? inputNightMode
                    : inputDayMode
                }
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-xs-6 col-form-label">
              <span>Loan Type</span>
            </label>
            <div className="col-sm-10 col-xs-6">
              <select
                className="form-control"
                name="loanType"
                value={this.state.loanType}
                onChange={this.handleChange.bind(this)}
                style={
                  this.props.settings.mode === "night"
                    ? inputNightMode
                    : inputDayMode
                }
              >
                <option value="Given">Given</option>
                <option value="Taken">Taken</option>
              </select>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-xs-6 col-form-label">
              <span>Person</span>
            </label>
            <div className="col-sm-10 col-xs-6">
              <input
                className="form-control"
                required
                type="text"
                name="person"
                onInput={this.handlePersonInput.bind(this)}
                value={this.state.person}
                style={
                  this.props.settings.mode === "night"
                    ? inputNightMode
                    : inputDayMode
                }
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-xs-6 col-form-label">
              <span>Status</span>
            </label>
            <div className="col-sm-10 col-xs-6">
              <select
                className="form-control"
                name="status"
                value={this.state.status}
                onChange={this.handleChange.bind(this)}
                style={
                  this.props.settings.mode === "night"
                    ? inputNightMode
                    : inputDayMode
                }
              >
                <option value="Pending">Pending</option>
                <option value="Settled">Settled</option>
              </select>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-xs-6 col-form-label">
              <span>Reason</span>
            </label>
            <div className="col-sm-10 col-xs-6">
              <textarea
                className="form-control"
                type="text"
                required
                name="reason"
                onChange={this.handleChange.bind(this)}
                value={this.state.reason}
                style={
                  this.props.settings.mode === "night"
                    ? inputNightMode
                    : inputDayMode
                }
              />
            </div>
          </div>

          {this.state.dataSaved ? (
            <span className="bg-success success-msg">
              {" "}
              Data saved successfully
            </span>
          ) : (
            <span />
          )}
          <button className="btn btn-primary float-right" type="submit">
            Save
          </button>
        </form>
      );
    } else {
      return (
        <div>
          <Loader />
        </div>
      );
    }
  }
}

export default AddLoanForm;
