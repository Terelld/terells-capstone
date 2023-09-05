import { Component } from "react";
import { signUp } from '../../utilities/users-service';

import CitiesAutoComplete, { handleCityChange } from '../CitiesAutoComplete/CitiesAutoComplete';





function parseCsv(csvData) {
  const lines = csvData.split('\n');
  const cities = [];

  for (let i = 1; i < lines.length; i++) {
    const columns = lines[i].split(',');
    
    const city = columns[0];
    const state = columns[3];
    const id = columns[16];
    cities.push({ city, state });
  }
    
    return cities;
  }

export default class SignUpForm extends Component {

    state = {
        name: '',
        dob: '',
        email: '',
        password: '',
        confirm: '',
        primary_instrument: [],
        secondary_instrument: [],
        bio: '',
        city: '',
        cities: [],
        error: ''
    }

    componentDidMount() {
      fetch('/config/uscities.csv')
        .then((response) => response.text())
        .then((csvData) => {
          console.log(csvData);
          const cities = parseCsv(csvData);
          
          this.setState({ cities });
        })
        .catch((error) => {
          console.error('Error fetching CSV data:', error);
        });
    }

    handleSubmit = async (evt) => {
      // prevent form from being submitted to th server  
      evt.preventDefault();
        try{
          const formData = {...this.state};
          //we will now delete the key values we don't want (confirm and error)
          delete formData.error;
          delete formData.confirm;

          const user = await signUp(formData);
          this.props.setUser(user);

        } catch {
          //An error occured
          this.setState({ error: 'Sign Up Failed - Try again'})
        }
        // alert(JSON.stringify(this.state));
    }

    handleChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value,
            error: ''
        })
    }



    render() {
        const disable = this.state.password !== this.state.confirm;
        console.log(this.state.cities)
        return (
          <div>
            <div className="form-container">
              <form autoComplete="off" onSubmit={this.handleSubmit}>
                <label>Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={this.state.name} 
                  onChange={this.handleChange} 
                  required 
                  />

                <label>Date of Birth:</label>
                <input
                  type="date" 
                  id="dob"
                  name="dob"
                  value={this.state.dob}
                  onChange={this.handleChange}
                  required
                />

                <label>City:</label>
                <CitiesAutoComplete
                  name="city"
                  value={this.state.city}
                  onChange={this.handleCityChange}
                  required
                />

                <label>Email</label>
                <input 
                  type="email" 
                  name="email" 
                  value={this.state.email} 
                  onChange={this.handleChange} 
                  required 
                  />

                <label>Password</label>
                <input 
                  type="password" 
                  name="password" 
                  value={this.state.password} 
                  onChange={this.handleChange} 
                  required 
                  />

                <label>Confirm</label>
                <input 
                  type="password" 
                  name="confirm" 
                  value={this.state.confirm} 
                  onChange={this.handleChange} 
                  required 
                  />

                <label>Primary Instrument (required):</label>
                <select
                  id="primary_instrument"
                  name="primary_instrument"
                  value={this.state.instrument}
                  onChange={this.handlePrimartyInstrumentChange}
                  required
                >
                  <option value="">Select your primary instrument!</option>
                  <option value="Guitar">Guitar</option>
                  <option value="Keys">Keys</option>
                  <option value="Violin">Violin</option>
                  <option value="Cello">Cello</option>
                  <option value="Viola">Viola</option>
                  <option value="Upright Bass">Violin</option>
                  <option value="Singer">Singer</option>
                  <option value="BG_Vocals">Background Vocals</option>
                  <option value="Drums">Drums</option>
                </select>

                <label>Second Instrument (optional):</label>
                <select
                  id="secondary_instrument"
                  name="secondary_instrument"
                  value={this.state.instrument}
                  onChange={this.handleSecondaryInstrumentChange}
                >
                  <option value="">Play a second instrument?</option>
                  <option value="Guitar">Guitar</option>
                  <option value="Keys">Keys</option>
                  <option value="Violin">Violin</option>
                  <option value="Cello">Cello</option>
                  <option value="Viola">Viola</option>
                  <option value="Upright Bass">Violin</option>
                  <option value="Singer">Singer</option>
                  <option value="BG_Vocals">Background Vocals</option>
                  <option value="Drums">Drums</option>
                </select>

                <label>Bio:</label>
                <textarea 
                  type="bio" 
                  name="bio" 
                  value={this.state.bio} 
                  onChange={this.handleChange} 
                  placeholder= "share your story" 
                  required />
                <button type="submit" disabled={disable}>SIGN UP</button>
              </form>
            </div>
            <p className="error-message">&nbsp;{this.state.error}</p>
          </div>
        );
      }
}