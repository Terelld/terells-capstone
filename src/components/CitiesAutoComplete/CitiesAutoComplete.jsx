import { Component } from 'react';

export default class Autocomplete extends Component {
    constructor(props) {
      super(props);
  
      // Initialize the component's state with an empty list of cities
      this.state = {
        inputValue: '',
        cities: [],
        filteredCities: [], // This is where you store the list of filtered cities
        loading: true,
      };
    }
  
    async componentDidMount() {
      // Fetch CSV data from your server or another source
      try {
        const response = await fetch('/config/uscities');
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.text();
        const cities = data.split(',');
  
        this.setState({ cities, loading: false });
      } catch (error) {
        console.error(error);
        this.setState({ loading: false });
      }
    }
  
    handleInputChange = (e) => {
      const inputValue = e.target.value.toLowerCase(); 
      const filteredCities = this.state.cities.filter((city) =>
        city.toLowerCase().includes(inputValue)
      );
      this.setState({ inputValue, filteredCities });
    };
  
    handleCitySelection = (city) => {
      this.setState({ inputValue: city, filteredCities: [] }); // Clear the filtered cities when a selection is made
    };

    handleCityChange = (selectedCity) => {
        this.setState({ city: selectedCity });
      };

    render() {
      const { inputValue, filteredCities, loading } = this.state;
  
      return (
        <div>
          <input
            type="text"
            placeholder="Search for a city..."
            onChange={this.handleInputChange}
            value={inputValue}
          />
          {loading ? (
            <p>Loading...</p> // Show a loading message or spinner while data is being fetched
          ) : (
            <ul>
              {filteredCities.map((city, index) => (
                <li
                  key={index}
                  onClick={() => this.handleCitySelection(city)}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  {city}
                </li>
              ))}
            </ul>
          )}
        </div>
      );
    }
  }