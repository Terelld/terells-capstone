import { Component, useState } from "react";
import { updateUserData, getUserData } from "../../utilities/users-service";

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
    
      async componentDidMount() {
        try {
          
          
          const user = this.props.user; // Fetch user data using getUserData
          if (user) {
            this.setState((prevState) => ({
              formData: {
                name: user.name,
                dob: user.dob,
                city: user.city,
                primary_instrument: user.primary_instrument,
                bio: user.bio,
              },
            }));
          }
        } catch (error) {
          // Handle error, e.g., display an error message
          console.log(error)
          this.setState({ error: "Failed to fetch user data" });
        }
      }
    
      handleChange = (evt) => {
        // Update the form field in the state
        const { name, value } = evt.target;
        this.setState((prevState) => ({
          formData: {
            ...prevState.formData,
            [name]: value,
          },
          error: "",
        }));
      };
    
      handleSubmit = async (e) => {
        e.preventDefault();
        console.log('handleSubmit function is called');
        try {
          const userId = this.props.user._id;
          console.log(userId);
          const updatedData = { ...this.state.formData };
    
          const updatedUser = await updateUserData(userId, updatedData);
          console.log("Updated User Data:", updatedUser);
        } catch (error) {
            console.log(error);
          this.setState({ error: "Failed to update user data" });
        }
      };


        render() {
            return (
              <div>
                <div className="form">
                  <form autoComplete="off" onSubmit={this.handleSubmit}>
                    <label>Name</label>
                    <input 
                      type="text" 
                      name="name" 
                      value={this.state.formData.name} 
                      onChange={this.handleChange} 
                      required 
                      />
    
                    <label>Date of Birth:</label>
                    <input
                      type="date" 
                      id="dob"
                      name="dob"
                      value={this.state.formData.dob}
                      onChange={this.handleChange}
                      required
                    />
    
                    <label>City:</label>
                    <input
                      type="text"
                      name="city"
                      value={this.state.formData.city}
                      onChange={this.handleChange}
                      required
                    />
                    
    
                    <label>Instrument:</label>
                    <select
                      id="primary_instrument"
                      name="primary_instrument"
                      value={this.state.formData.instrument}
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
                      value={this.state.formData.bio} 
                      onChange={this.handleChange} 
                      placeholder= "share your story" 
                      required />
    

                    <button type="submit" >Update my profile.</button>
                  </form>
                </div>
                <p className="error-message">&nbsp;{this.state.error}</p>
              </div>
        )};
}