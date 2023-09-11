import { Component, useState } from "react";
import { updateUserData } from "../../utilities/users-service";



export default class EditProfileForm extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        formData: {
          name: "",
          dob: "",
          city: "",
          primary_instrument: "",
          bio: "",
        },
        error: null,
      };
    }

      handleChange = (evt) => {
        console.log('handleChange() called');
          this.setState({
              [evt.target.name]: evt.target.value,
              error: ''
          })
      }

      handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const formData = {...this.state};
            const updatedUser = await updateUserData(formData);
            this.props.setUser(updatedUser);
          // Handle success, e.g., display a success message
          
        } catch (error) {
          // Handle error, e.g., display an error message
          this.setState({ error: 'Failed to update user data' });
        }
      };


        render() {
            const disable = this.state.password !== this.state.confirm;
            
            return (
              <div>
                <div className="user-card">
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
                    
    
                    <label>Instrument:</label>
                    <select
                      id="primary_instrument"
                      name="primary_instrument"
                      value={this.state.instrument}
                      onChange={this.handlePrimartyInstrumentChange}
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
    
                    <label>Bio:</label>
                    <textarea 
                      type="bio" 
                      name="bio" 
                      value={this.state.bio} 
                      onChange={this.handleChange} 
                      placeholder= "share your story" 
                      required />
    

                    <button type="submit" disabled={disable}>Update my profile.</button>
                  </form>
                </div>
                <p className="error-message">&nbsp;{this.state.error}</p>
              </div>
        )};
}