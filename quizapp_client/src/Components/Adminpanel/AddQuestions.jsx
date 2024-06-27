import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddQuestions = () => {
    const navigate = useNavigate();
    const [Questions,setQuestions] = useState({
        question:"",
        correctAnswer:"",
        option1:"",
        option2:"",
        option3:"",
        option4:"",
        category:"",
        difficultyLevel:""
    })
    const {question,correctAnswer,option1,option2,option3,option4,category,difficultyLevel} = Questions;
    const handleInputChange = (e) => {
        setQuestions({...Questions,[e.target.name]:e.target.value})
    }

    const submitQuestion =async (e)=>{
        e.preventDefault();
        await axios.post(
          "http://localhost:8080/question/postquestion",
          Questions
        );
        alert("Question added Successfully")
        navigate("/admin/allquestions")
    }
  return (
    <div className="container">
      <div className="col-md-12  border rounded p-4 mt-4 shadow">
        <h2 className="text-center mt-4"> Add Question</h2>
        <form onSubmit={(e)=>submitQuestion(e)}>
          <div class="row m-4">
            <div class="col">
              <input
                type="text"
                class="form-control"
                placeholder="Enter a Question"
                aria-label="Question"
                name="question"
                value={question}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div class="col">
              <input
                type="text"
                class="form-control"
                placeholder="Correct Answer"
                aria-label="Correct Answer"
                name="correctAnswer"
                value={correctAnswer}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
          </div>
          <div class="row m-4">
            <div class="col">
              <input
                type="text"
                class="form-control"
                placeholder="Option1"
                aria-label="Option1"
                name="option1"
                value={option1}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div class="col">
              <input
                type="text"
                class="form-control"
                placeholder="Option2"
                aria-label="Option2"
                name="option2"
                value={option2}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
          </div>
          <div class="row m-4">
            <div class="col">
              <input
                type="text"
                class="form-control"
                placeholder="Option3"
                aria-label="Option3"
                name="option3"
                value={option3}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div class="col">
              <input
                type="text"
                class="form-control"
                placeholder="Option4"
                aria-label="Option4"
                name="option4"
                value={option4}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
          </div>
          <div class="row m-4">
            <div class="col">
              <input
                type="text"
                class="form-control"
                placeholder="category"
                aria-label="category"
                name="category"
                value={category}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div class="col">
              <input
                type="text"
                class="form-control"
                placeholder="Difficulty Level"
                aria-label="Difficulty Level"
                name="difficultyLevel"
                value={difficultyLevel}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
          </div>
          <button className="btn btn-primary m-4">submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddQuestions;

{/* <Link to={`/admin/editquestion/${question.id}`}>
                <FontAwesomeIcon icon="fa-solid fa-trash" />
              </Link>
              <Link to={`/admin/deletequestion/${question.id}`}>
                <FontAwesomeIcon icon={faTrash} />
              </Link> */}