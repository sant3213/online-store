
import SignUp from "./components/sign-up";
const google = window.google;
function App() {

  return (
    <>
    <SignUp googleInformation = {google}></SignUp>
    </>
  );
}

export default App;
