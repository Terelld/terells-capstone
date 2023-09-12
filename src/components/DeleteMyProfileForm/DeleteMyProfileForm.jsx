import { Component, useState } from "react";
import { deleteUserData, logOut } from "../../utilities/users-service";



export default class DeleteMyProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
          user: null, // Initialize user state here
        };
      }
    
      setUser = (user) => {
        this.setState({ user });
      };

    handleDeleteProfile = async () => {
       
        const confirmed = window.confirm("Are you sure you want to delete your profile?");
        
        if (confirmed) {
          try {
            const userId = this.props.user._id;
            await deleteUserData(userId);
            
            
            logOut();
            this.props.setUser(null);
          } catch (error) {
            console.error("Failed to delete user profile:", error);
           
          }
        }
      };
    
     

    render() {
        return (
        <div>
            
            <h4>Are you sure you want to delete your profile?</h4>
            <button onClick={this.handleDeleteProfile}>Yes - Delete my BandMate Profile. </button>
            <a href="/user-profile">Cancel</a>
        </div>
        );
    }
}

