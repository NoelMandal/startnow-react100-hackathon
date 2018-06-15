import React, { Component } from "react";
import axios from "axios";
import Gifs from "./components/Gifs";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      secondName: "",
      percentage: "",
      result: "",
      gifs: [],
      fact: ""
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.eachGif = this.eachGif.bind(this);
    this.getGif = this.getGif.bind(this);
    this.getFact = this.getFact.bind(this);
  }

  handleOnChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    axios
      .get(
        "https://love-calculator.p.mashape.com/getPercentage?fname=" +
          this.state.firstName +
          "&sname=" +
          this.state.secondName,
        {
          headers: {
            "X-Mashape-Key":
              "CHuXFb948ImshW56QcrBX1x8egktp1dgco7jsnbHPXhs7mClVJ",
            Accept: "application/json"
          }
        }
      )
      .then(response => {
        this.setState({
          percentage: response.data.percentage,
          result: response.data.result
        });
        this.getFact();
      })
      .then(this.getGif)
      .catch(function(err) {
        console.log(err);
      });
  }

  getFact(event) {
    axios
      .get(
        "https://numbersapi.p.mashape.com/" +
          this.state.percentage +
          "/trivia?fragment=true&json=true&notfound=floor",
        {
          headers: {
            "X-Mashape-Key":
              "CHuXFb948ImshW56QcrBX1x8egktp1dgco7jsnbHPXhs7mClVJ",
            Accept: "text/plain"
          }
        }
      )
      .then(response => {
        this.setState({
          fact: response.data.text
        });
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  getGif(event) {
    this.state.percentage >= 50
      ? axios
          .get(
            "https://api.tenor.com/v1/search?limit=20&media_filter=minimal&ar_range=all&q=excited-meme",
            {
              params: {
                key: "OPW4IU4VC3KK"
              }
            }
          )
          .then(response => {
            this.setState({
              gifs: response.data.results
            });
          })
          .catch(function(err) {
            console.log(err);
          })
      : axios
          .get(
            "https://api.tenor.com/v1/search?limit=20&media_filter=minimal&ar_range=all&q=hello-darkness",
            {
              params: {
                key: "OPW4IU4VC3KK"
              }
            }
          )
          .then(response => {
            this.setState({
              gifs: response.data.results
            });
          })
          .catch(function(err) {
            console.log(err);
          });
  }

  eachGif(details, i) {
    return <Gifs key={details.id + i} index={i} details={details} />;
  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron">
          <h1 className="text-center">Calculate so many luv!</h1>
          <p className="text-center">
            See How Compatible You Are With Your Crush(es)!
          </p>
          {/* jumbotron */}
        </div>

        <div className="row">
          <div className="col-md-6 d-flex">
            <div className="inputCard card flex-fill">
              <h5 className="card-header font-weight-bold">
                How Many Compatibles R U?!{" "}
              </h5>
              <div className="card-body">
                <h5 className="text font-weight-bold">Name of First Person</h5>
                <input
                  name="firstName"
                  className="form-control"
                  value={this.state.firstName}
                  onChange={this.handleOnChange}
                  placeholder="Enter A Name"
                />
                <br />
                <h5 className="text font-weight-bold">Name of Second Person</h5>
                <input
                  name="secondName"
                  className="form-control"
                  value={this.state.secondName}
                  onChange={this.handleOnChange}
                  placeholder="Enter Another Name"
                />

                {/* card body */}
              </div>

              <div className="card-footer text-center">
                <button
                  type="button"
                  onClick={this.handleSubmit}
                  className="btn btn-danger btn-block"
                >
                  COMPATIBLIZE!
                </button>
              </div>

              {/* within card 1 */}
            </div>
            {/* within col-6 */}
          </div>

          <div className="col-md-6 d-flex">
            <div className="outputCard card flex-fill">
              <h5 className="card-header font-weight-bold">Results!</h5>
              <div className="card-body">
                <h5 className="text font-weight-bold">
                  Your compatibility percentage is....
                </h5>
                <h1 className="text-center display-2 font-weight-bold">
                  {this.state.percentage}%
                </h1>
                <h5 className="text-center font-weight-bold">
                  {this.state.result}
                </h5>
                <div className="card-footer">
                  <h4 className="text-center font-weight-bold">
                    Did you know the number {this.state.percentage}...
                  </h4>
                  <h5 className="text-center font-weight-bold">
                    is {this.state.fact}?
                  </h5>
                </div>
                {/* card body */}
              </div>
              {/* within card 1 */}
            </div>
            {/* within col-6 */}
          </div>

          {/* row */}
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="dropDown card mt-4">
              <h5 className="card-header font-weight-bold">
                How You're Probably Feeling RN
              </h5>

              <div className="d-flex justify-content-center flex-wrap">
                {this.state.gifs.length
                  ? this.state.gifs.map(this.eachGif)
                  : null}
              </div>

              {/* within card 2 */}
            </div>
            {/* within col-12 */}
          </div>
        </div>

        {/* container */}
      </div>
    );
  }
}

export default App;
