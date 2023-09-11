
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import SignInForm from "../../components/SignInForm/SignInForm";

export default function AuthPage({ setUser }) {
    return (
        <main>
            <h1>Join BandMate!</h1>
            <SignUpForm setUser={ setUser }/>
            <h1>Already a Member? Sign in! </h1>
            <SignInForm setUser={ setUser } />
        </main>
    );
}