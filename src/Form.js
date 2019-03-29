import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

class Search extends Component {
    constructor() {
        super();
        this.state = {
        zip: "10036",
        weather: [],
        name: "New York",
        high: "",
        low: "",
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
            //let main = data.main.map((main) => {
            //    return(
            //      <div key={main.response}>{main.temp_max}</div>
            //    )
            //})
            this.setState({
              name: data.name,
              weather: weather,
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
          Form to input new name and weather:
          <form onSubmit={this.handleInputChange}> 
            <input
              placeholder="Search for..."
              ref={input => this.search = input}
              onChange={(e) => this.setState({ str: e.target.value })}
              />
            <button type='submit'>Update</button>
            <p>{this.state.name}</p>
            <p>{this.state.weather}</p>
            <p>{this.state.high}</p>
            <p>{this.state.low}</p>

          </form>
        </div>
    )
  }
}

export default Search;