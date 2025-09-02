import "./App.css";
import MyTODoList from "./components/MyToDoList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blue, purple } from "@mui/material/colors";
import "@fontsource/nunito"; // defaults to 400
import { SnackBarProvider } from "./contexts/SnackBarContext";
import { TodosProvider } from "./contexts/TodoContext";
const theme = createTheme({
  typography: {
    fontFamily: "nunito",
  },
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: purple[500],
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <TodosProvider>
        <SnackBarProvider>
          <div className="App">
            <MyTODoList />
          </div>
        </SnackBarProvider>
      </TodosProvider>
    </ThemeProvider>
  );
}

export default App;
