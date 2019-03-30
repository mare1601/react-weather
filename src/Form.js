import React, { Component } from 'react';
import './App.scss';

class Search extends Component {
    constructor() {
        super();
        this.state = {
            zip: "10036",
            description: ["Scattered Thundershowers"],
            name: "New York",
            temp: "16",
            high: "22",
            low: "6",
            icon: "10d",
            error: null,
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
              if(data.cod === "404"){
                    this.setState({
                        error: true,
                    });
            } else {
            this.setState({
                name: data.name,
                description: data.weather[0].description,
                temp: Math.round(data.main.temp),
                high: Math.round(data.main.temp_max),
                low: Math.round(data.main.temp_min),
                icon: data.weather[0].icon,
                error: null,
            });
          }
    })
    }    
    }

  render() {
    const responseDetails = () =>  {
        const { error } = this.state;
        if(error === true) {
            return(
                <div className="error">Invalid zip, please try again</div>
            )
        }
    }
    return(
        <div>
            <div className="response">
                <p className="city-name">{this.state.name}
                    <span className="icon">
                        <img src={"http://openweathermap.org/img/w/" + this.state.icon + ".png"} alt={this.state.description + " icon"} />
                    </span>
                </p>
                <p className="description">{this.state.description}</p>
                <p className="current-temp">{this.state.temp}</p>
                <p className="high-low">
                    <span className="low">{this.state.low}</span>
                    <span className="high">{this.state.high}</span>
                </p>
            </div>
            <div className="form">
                <form onSubmit={this.handleInputChange} noValidate> 
                <label>Zip Code:</label>
                    <input
                        id="zip" 
                        name="zip" 
                        type="text" 
                        placeholder="10036"
                        ref={input => this.search = input}
                        onChange={(e) => this.setState({ str: e.target.value })}
                        required
                    />
                    <button type='submit'>Update</button>
                    {responseDetails()}
                </form>
            </div>
        </div>
        )
    }
}

export default Search;