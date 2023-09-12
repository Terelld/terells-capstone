import DeleteMyProfileForm from "../../components/DeleteMyProfileForm/DeleteMyProfileForm";


export default function DeleteProfilePage({ user, setUser }) {
    return (
        <main>
            <h1>Delete Your Account</h1>
            <DeleteMyProfileForm user= { user } setUser={  setUser }/>
        </main>
    );
}