import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {/* Edit <code>src/App.js</code> and save to reload. */}
          Hello! Welcome to react!
          <p>I'm running from a Docker container!</p>
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

// Docker comand -
// docker run --name react-instance-1 -p 3000:3000 -v C:/Pranav/Docker/Working/Udemy/Docker-the-complete-guide/CH-6/frontend/src/:/app/src/ react-image2

// react-image2 is produced by -> docker build -t react-image2 -f Dockerfile.dev .

export default App;
