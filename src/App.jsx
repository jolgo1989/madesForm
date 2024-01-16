import "./App.css";
import Form from "./components/Form";
import DateComponent from "./components/DateComponent";
import Date from "./components/Date";

function App() {
  return (
    <div>
      <section>
        <Form />
        {/* <Date /> */}
        <DateComponent />
      </section>
    </div>
  );
}
export default App;
