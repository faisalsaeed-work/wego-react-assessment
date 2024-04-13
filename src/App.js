import { useSelector } from "react-redux";
import "./App.css";
import Loader from "./components/Loader";
import Home from "./pages/Home";

function App() {
  const isLoading = useSelector(state => state.loader.isLoading)
	return (
		<>
			{isLoading && <Loader />}
			<Home />
		</>
	);
}

export default App;
