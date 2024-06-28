import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const CreateQuiz = () => {
    const navigate = useNavigate();
    const [createquiz, setcreatequiz] = useState({
      numQ: "",
      quizName: "",
      category: "",
    });
    const {numQ,quizName,category} = createquiz;
    const handleInputChange = (e) => {
        setcreatequiz({...createquiz,[e.target.name]:e.target.value})
    }
    const handlesubmit = async(e) => {
        e.preventDefault();
        const params = {
            numQ,
            quizName,
            category
        }
       await axios.post(`http://localhost:8080/quiz/create`,null,{params});
        navigate("/")
    }
  return (
    <div className="container">
      <h1 className="text-center mt-4">Create Quiz</h1>
      <div className="col-md-6 offset-md-3 border rounded p-4 mt-4 shadow">
        <form
          onSubmit={(e) => {
            handlesubmit(e);
          }}
        >
          <div class="col mb-4">
            <input
              type="text"
              class="form-control"
              placeholder="No of Question (should be less than 10)"
              aria-label="No of Question"
              name="numQ"
              value={numQ}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <div class="col mb-4">
            <input
              type="text"
              class="form-control"
              placeholder="Quiz Title"
              aria-label="No of Question"
              name="quizName"
              value={quizName}
              onChange={(e) => handleInputChange(e)}
            />
          </div>

          <select
            class="form-select"
            name="category"
            value={category}
            onChange={handleInputChange}
            aria-label="Default select example"
          >
            <option selected>Select Category</option>
            <option value="java">java</option>
            <option value="python">python</option>
          </select>
          <button type="submit" className="btn btn-primary mt-4">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateQuiz