import DeleteMyProfileForm from "../../components/DeleteMyProfileForm/DeleteMyProfileForm";


export default function DeleteProfilePage({ user, setUser }) {
    return (
        <main>
            <h1>We hate to see you go...</h1>
            <DeleteMyProfileForm user= { user } setUser={  setUser }/>
        </main>
    );
}