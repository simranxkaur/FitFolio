import logo from './logo.svg';
import './App.css';
import RegisterLoginButtons from './RegisterLoginButtons';
import AuthComponent from './AuthComponent';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to Fitfolio: An App to Track Your Progress in the Gym!
        </p>
        <AuthComponent/>
      </header>
    </div>
  );
}

export default App;
