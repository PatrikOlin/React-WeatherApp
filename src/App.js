import React from "react";

import Titles from "./components/Titles";
import Form from "./components/Form";
import Weather from "./components/Weather"

const API_KEY = "77df9daeb77dc1e50b3cf02b15474482";

class App extends React.Component {

  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined,
    loading: false,
  }

  getWeather = async (e) => {
    e.preventDefault();
    this.setState({
          loading: true
        })
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
    const data = await api_call.json();

    if(data.cod == 404){
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Please make sure your inputs are valid.",
        min_temperature: undefined,
        max_temperature: undefined,
        icon: null,
        wind: undefined,
        loading: false,
        });

    } else if (city && country) {
      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: "",
        loading: false,
      });

    } else {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Please enter city and country",
        loading: false,
      });
    }
  }

  handleClick = (event) => {
    this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "",
      });
  }

  render() {
    return (
    <div>
    <div className="wrapper">
      <div className="main">
        <div className="container-fluid">
          <div className="row">
            <div className="col-5 title-container">
              <Titles />
            </div>
            <div className="col-7 form-container">
                <Form
                  getWeather={this.getWeather}
                  loading={this.state.loading}
                  handleClick={this.handleClick}
                  />
                <Weather
                  temperature={this.state.temperature}
                  city={this.state.city}
                  country={this.state.country}
                  humidity={this.state.humidity}
                  description={this.state.description}
                  error={this.state.error}
                  loading={this.state.loading}
                />
            </div>
          </div>
        </div>
      </div>
    </div>

    </div>
    );
  }
};

export default App;