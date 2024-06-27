import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
const GetAllQuestion = () => {
  const [Questions, setQuestions] = useState([]);
  const [ShowCorrectAnswer, SetShowCorrectAnswer] = useState(false);

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    const response = await axios.get(
      "http://localhost:8080/question/allquestions"
    );
    setQuestions(response.data);
    checkCorrectAnswercolumn(response.data); // to check the coorrect answer col is present
  };

  const handlecategory = async (category) => {
    const response = await axios.get(
      `http://localhost:8080/question/category/${category}`
    );
    setQuestions(response.data);
    checkCorrectAnswercolumn(response.data); // to check the coorrect answer col is present
  };
  const checkCorrectAnswercolumn = (questions) => {
    const hascorrectanscolumn = questions.some(
      (question) => question.correctAnswer
    ); // check if any of one response has an correctanswer col then it return true
    SetShowCorrectAnswer(hascorrectanscolumn);
  };
  const handleDelete = async(id)=> {
   await axios.delete(`http://localhost:8080/question/${id}`);
    loadQuestions();
  }
  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center ">
        <h1 className="text-center mt-4">All Questions</h1>

        <div>
          <Link to="/admin/addquestion" className="btn btn-primary">
            Add Question
          </Link>

          <div class="btn-group mx-2">
            <button
              type="button"
              className="btn btn-danger dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              category
            </button>
            <ul class="dropdown-menu">
              <li
                className="dropdown-item"
                onClick={() => handlecategory("java")}
              >
                java
              </li>
              <li
                className="dropdown-item"
                onClick={() => handlecategory("python")}
              >
                python
              </li>
              <li className="dropdown-item" onClick={() => loadQuestions()}>
                All
              </li>
            </ul>
          </div>
        </div>
      </div>

      <table className="table table-hover  mt-4">
        <thead>
          <tr className="table-primary">
            <th scope="col">#</th>
            <th scope="col">Question</th>
            <th scope="col">Option1</th>
            <th scope="col">Option2</th>
            <th scope="col">Option3</th>
            <th scope="col">Option4</th>
            {ShowCorrectAnswer ? <th scope="col">CorrectAnswer</th> : ""}
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {Questions.map((question, index) => (
            <tr>
              <th scope="row">{index + 1}</th>
              <td>{question.question}</td>
              <td>{question.option1}</td>
              <td>{question.option2}</td>
              <td>{question.option3}</td>
              <td>{question.option4}</td>
              <td>{question.correctAnswer}</td>
              <td>
                {/* <button
                   onClick={() => handleEdit(question.id)}
                  className="btn btn-warning btn-sm mx-1"
                >
                  <i className="fas fa-edit"></i>
                </button> */}
                <button
                   onClick={() => handleDelete(question.id)}
                  className="btn btn-danger btn-sm mx-1"
                >
                  <i className="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GetAllQuestion;
