import { Component, useState } from "react";
import { deleteUserData } from "../../utilities/users-service";


export default class DeleteMyProfile extends Component {

    handleDeleteProfile = async () => {
        try {
        const userId = this.props.user._id;
        await deleteUserData(userId);
        } catch (error) {
        console.error("Failed to delete user profile:", error);  
        }
    };

    render() {
        return (
        <div>
            <h1>Delete My Profile</h1>
            <h4>Are you sure you want to delete your profile?</h4>
            <button onClick={this.handleDeleteProfile}>Yes - Delete!</button>
            <a href="/user-profile">Cancel</a>
        </div>
        );
    }
}
