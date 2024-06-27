
import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import GetAllQuestion from './Components/Adminpanel/GetAllQuestion';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.min"
import AddQuestions from './Components/Adminpanel/AddQuestions';
import PlayQuiz from './Components/Quiz/PlayQuiz';
import CreateQuiz from './Components/Quiz/CreateQuiz';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<CreateQuiz />}/>
          <Route path="/admin/allquestions" element={<GetAllQuestion />}/>
          <Route path="/admin/addquestion" element={<AddQuestions />}/>
          <Route path="/playquiz/:id" element={<PlayQuiz />}/>
          <Route path="/dashboard" element={<h1>Dashboard</h1>}/>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
