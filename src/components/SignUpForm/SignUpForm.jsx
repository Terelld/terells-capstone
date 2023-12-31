import { Component } from "react";
import { signUp } from '../../utilities/users-service';




import CitiesAutoComplete from '../CitiesAutoComplete/CitiesAutoComplete';

const userInput = {
  name: '',
  email: '',
  dob: '',
  genre: '',
  primary_instrument: '',
  secondary_instrument: '',
  bio: '',
  city: '',
};

// Create a user object based on user input
const user = {
  name: userInput.name,
  email: userInput.email,
  dob: userInput.dob,
  genre: userInput.genre,
  primary_instrument: userInput.primary_instrument,
  secondary_instrument: userInput.secondary_instrument,
  bio: userInput.bio,
  city: userInput.city,
};





export default class SignUpForm extends Component {



    state = {
        name: '',
        dob: '',
        genre: '',
        email: '',
        password: '',
        confirm: '',
        primary_instrument: '',
        secondary_instrument: '',
        bio: '',
        city: '',
       
        error: ''
    }


    handleSubmit = async (evt) => {
      // prevent form from being submitted to th server  
      evt.preventDefault();
        try{
          const formData = {...this.state};
          //we will now delete the key values we don't want (confirm and error)
          delete formData.error;
          delete formData.confirm;

          console.log(formData);

          const user = await signUp(formData);
          this.props.setUser(user);

          this.props.history.push("/bandmate/user-profile", {
            city: this.state.city,
            primary_instrument: this.state.primary_instrument,
          });

        } catch {
          //An error occured
          this.setState({ error: 'Sign Up Failed - Try again'})
        }
        // alert(JSON.stringify(this.state));
    }

    handleChange = (evt) => {
      console.log('handleChange() called');
        this.setState({
            [evt.target.name]: evt.target.value,
            error: ''
        })
    }

    handleGenreChange = (evt) => {
      this.setState({
        genre: evt.target.value,
      });
    };

    handlePrimaryInstrumentChange = (evt) => {
      this.setState({
        primary_instrument: evt.target.value,
      });
    };

    handleSecondaryInstrumentChange = (evt) => {
      this.setState({
        primary_instrument: evt.target.value,
      });
    };



    render() {
        const disable = this.state.password !== this.state.confirm;
        console.log(this.state.cities)
        return (
          <div>
            <div className="form">
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
                <input
                  type="text"
                  name="city"
                  value={this.state.city}
                  onChange={this.handleChange}
                  required
                />

              <label>Genre:</label>
                <select className="dropdown-content"
                  id="genre"
                  name="genre"
                  value={this.state.genre}
                  onChange={this.handleGenreChange}
                  disabled={false}
                  required
                >
                  <option value="">Select your genre!</option>
                  <option value="Acoustic">Acoustic</option>
                  <option value="Alternative">Alternative</option>
                  <option value="Ambient">Ambient</option>
                  <option value="Blues">Blues</option>
                  <option value="Classical">Classical</option>
                  <option value="Country">Country</option>
                  <option value="Disco">Disco</option>
                  <option value="Electronic">Electronic</option>
                  <option value="Folk">Folk</option>
                  <option value="Funk">Funk</option>
                  <option value="Gospel">Gospel</option>
                  <option value="Hip-Hop">Hip-Hop</option>
                  <option value="Indie">Indie</option>
                  <option value="Jazz">Jazz</option>
                  <option value="Latin">Latin</option>
                  <option value="Metal">Metal</option>
                  <option value="New Age">New Age</option>
                  <option value="Opera">Opera</option>
                  <option value="Pop">Pop</option>
                  <option value="Punk">Punk</option>
                  <option value="R&B">R&B (Rhythm and Blues)</option>
                  <option value="Rap">Rap</option>
                  <option value="Reggae">Reggae</option>
                  <option value="Rock">Rock</option>
                  <option value="Soul">Soul</option>
                  <option value="Techno">Techno</option>
                  <option value="World">World</option>
                </select>

                

                <label>Instrument:</label>
                <select className="dropdown-content"
                  id="primary_instrument"
                  name="primary_instrument"
                  value={this.state.instrument}
                  onChange={this.handlePrimaryInstrumentChange}
                  disabled={false}
                  required
                >
                  <option value="">Select your primary instrument!</option>
                  <option value="Guitar">Guitar</option>
                  <option value="Keys">Keys</option>
                  <option value="Violin">Violin</option>
                  <option value="Cello">Cello</option>
                  <option value="Viola">Viola</option>
                  <option value="Upright Bass">Upright Bass</option>
                  <option value="Singer">Singer</option>
                  <option value="BG_Vocals">Background Vocals</option>
                  <option value="Drums">Drums</option>
                </select>

                {/* <label>Second Instrument (optional):</label>
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
                  <option value="Upright Bass">Upright Bass</option>
                  <option value="Singer">Singer</option>
                  <option value="BG_Vocals">Background Vocals</option>
                  <option value="Drums">Drums</option>
                </select> */}

                <label>Bio:</label>
                <textarea 
                  type="bio" 
                  name="bio" 
                  value={this.state.bio} 
                  onChange={this.handleChange} 
                  placeholder= "share your story" 
                  required />

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
                <button className="button" type="submit" disabled={disable}>SIGN UP</button>
              </form>
            </div>
            <p className="error-message">&nbsp;{this.state.error}</p>
          </div>
        );
      }
}