import React, { Component } from 'react';
import './App.scss';

class Search extends Component {
    constructor() {
        super();
        // setting initial state placeholders along with initial call value
        this.state = {
            formInput: "",
            zip: "10036",
            description: [],
            name: "",
            temp: "",
            high: "",
            low: "",
            icon: "",
            error: null,
        }
    }
    // prevent default as well as update zip on submit, and clear form
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            zip: this.state.formInput
        })
    }
    
    // handle update of zip field, limit to 5 characters
    handleInputChange = e => {
        const val = e.target.value;
        if (val.length <= 5) {
            this.setState({
                formInput: val
            });
        }
    };
    fetchWeatherData() {
        fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${this.state.zip},us&units=imperial&appid=709847967f5e54b97308c1b2cae4dee5`)
        .then(response => response.json())
        .then(data => {
            // handle any zip codes not available through the weather api
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
    // call api and setState for first values
    componentDidMount(){
        this.fetchWeatherData();
    }    

    // call api and setState for new values
    componentDidUpdate(prevProps,prevState) {
        if(prevState.zip !== this.state.zip){
            this.fetchWeatherData(); 
        }
    }    
    render() {
        // allow for custom error messaging
        const responseDetails = () =>  {
            const { error } = this.state;
            if(error === true) {
                return(
                    <div className="error">Invalid zip, please try again</div>
                )
            }
        }
        const { formInput, description, name, temp, high, low, icon } = this.state;
        return(
            <div>
                <div className="response">
                    <p className="city-name">{name}
                        <span className="icon">
                            <img src={"http://openweathermap.org/img/w/" + icon + ".png"} alt={description + " icon"} />
                        </span>
                    </p>
                    <p className="description">{description}</p>
                    <p className="current-temp">{temp}</p>
                    <p className="high-low">
                        <span className="low">{low}</span>
                        <span className="high">{high}</span>
                    </p>
                </div>
                <div className="form">
                    <form onSubmit={this.handleSubmit.bind(this)} noValidate> 
                    <label>Zip Code:</label>
                        <input
                            id="zip" 
                            name="zip" 
                            type="text" 
                            placeholder="10036"
                            onChange={this.handleInputChange.bind(this)}
                            value={formInput}
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