import EditProfileForm from "../../components/EditProfileForm/EditProfileForm";


export default function EditProfilePage({ setUser }) {
    return (
        <main>
            <h1>Edit Your Profile</h1>
            <EditProfileForm setUser={ setUser }/>
        </main>
    );
}