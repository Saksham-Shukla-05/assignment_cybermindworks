import JobFilters from "./components/JobFilter";
import Navbar from "./components/Navbar";
import { JobModalProvider } from "./context/JobModalContext";
function App() {
  return (
    <div>
      <JobModalProvider>
        <Navbar />
        <JobFilters />
      </JobModalProvider>
    </div>
  );
}

export default App;
