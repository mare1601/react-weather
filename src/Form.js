import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.scss';

class Search extends Component {
    constructor() {
        super();
        this.state = {
            zip: "10036",
            weather: ["Scattered Thundershowers"],
            name: "New York",
            temp: "16",
            high: "22",
            low: "6",
            isLoading: false,
        }
    }
    handleInputChange = (e) => {
        e.preventDefault();
        this.setState({
            zip: this.search.value
        })
    }
    componentDidUpdate(prevProps,prevState) {
        if(prevState.zip !== this.state.zip){
          fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${this.state.zip},us&units=imperial&appid=709847967f5e54b97308c1b2cae4dee5`)
          .then(response => response.json())
          .then(data => {
            console.log(data)
            let weather = data.weather.map((weather) => {
              return(
                <span key={weather.response}>{weather.description}</span>
              )
            })
            this.setState({
              name: data.name,
              weather: weather,
              temp: data.main.temp,
              high: data.main.temp_max,
              low: data.main.temp_min,
            })
          })
        }
        else {
      
        }
      }

  render() {
    return (
        <div>
            <div className="response">
                <p className="city-name">{this.state.name}</p>
                <p className="description">{this.state.weather}</p>
                <p className="current-temp">{this.state.temp}</p>
                <p className="low">{this.state.low}</p>
                <p className="high">{this.state.high}</p>
            </div>
            <div className="form">
                Form to input new name and weather:
                <form onSubmit={this.handleInputChange}> 
                    <input
                    placeholder="10036"
                    ref={input => this.search = input}
                    onChange={(e) => this.setState({ str: e.target.value })}
                    />
                    <button type='submit'>Update</button>


                </form>
            </div>
        </div>
    )
  }
}

export default Search;