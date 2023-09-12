import EditProfileForm from "../../components/EditProfileForm/EditProfileForm";


export default function EditProfilePage({ user, setUser }) {
    return (
        <main>
            <h1>Edit Your Profile</h1>
            <EditProfileForm user= { user } setUser={  setUser }/>
        </main>
    );
}