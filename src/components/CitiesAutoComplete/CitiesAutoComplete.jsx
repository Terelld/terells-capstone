import { Component } from 'react';
import uscities from '../database/uscities.csv';

function parseCsv(csvData) {
    const lines = csvData.split('\n');
    const cities = [];
  
    for (let i = 1; i < lines.length; i++) {
        const columns = lines[i].split(',');
      
        if (columns.length >= 2) {
            const city = columns[0].trim();
            const state = columns[1].trim();
            cities.push({ city, state });
        }
    }
      
      return cities;
}

export default class CitiesAutoComplete extends Component {
    constructor(props) {
      super(props);
  
      // Initialize the component's state with an empty list of cities
      this.state = {
        inputValue: '',
        cities: [],
        filteredCities: [], 
        loading: true,
      };
    }
  
    async componentDidMount() {
        try {
          // Fetch CSV data from the imported file (uscitiesCsv)
          const data = uscities; // Assuming your CSV data is a string in the imported variable
        
          const cities = parseCsv(data);
        
          this.setState({ cities, loading: false });
        } catch (error) {
          console.error(error);
          this.setState({ loading: false });
        }
      }

  
    handleInputChange = (e) => {
      const inputValue = e.target.value.toLowerCase(); 
      const filteredCities = this.state.cities.filter((city) =>
        city.city.toLowerCase().includes(inputValue)
      );
      this.setState({ inputValue, filteredCities });
    };
  
    handleCitySelection = (city) => {
        this.props.onChange(city);  
        this.setState({ inputValue: city, filteredCities: [] }); // Clear the filtered cities when a selection is made
    };

    handleCityChange = (e) => {
        const inputValue = e.target.value;
        this.setState({ inputValue });
        this.props.onChange(inputValue); // Notify the parent component of the selected city
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
                  key={city.city} 
                  autocomplete= "on"
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