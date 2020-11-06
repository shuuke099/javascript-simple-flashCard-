// const showBtn= document.querySelector(".show-btn")
// const questionCard= document.querySelector(".question-card")
// const closeBtn= document.querySelector(".close-btn")
// const feedback= document.querySelector(".feedback")
// const questionForm = document.getElementById("question-form")
// const questionInput = document.getElementById("question-input")
// const answerInput = document.getElementById("answer-input")
// const questionsList = document.getElementById("questions-list")
// let data = [];
// let id = 1;

function eventListeners(){  const showBtn= document.querySelector(".show-btn")
const questionCard= document.querySelector(".question-card")
const closeBtn= document.querySelector(".close-btn")
const feedback= document.querySelector(".feedback")
const questionForm = document.getElementById("question-form")
const questionInput = document.getElementById("question-input")
const answerInput = document.getElementById("answer-input")
const questionsList = document.getElementById("questions-list")
let data = [];
let id = 1;



const ui = new UI();

// show question card
showBtn.addEventListener("click", function(){
  ui.showQuestion(questionCard)
})
// hide question card
closeBtn.addEventListener("click", function(){
  ui.hideQuestion(questionCard)
})

// form
questionForm.addEventListener("submit", function(event){
  event.preventDefault();
  const questionValue = questionInput.value;
  const answerValue = answerInput.value;
  
  if(questionValue ==="" || answerValue === ""){
    feedback.classList.add("showItem" , "alert-danger")
    feedback.textContent = "cannot add empty value"
    setTimeout(function(){
      feedback.classList.remove("showItem" , "alert-danger")
    },3000)
  } else {
    // question instence
    const question = new Question(id, questionValue, answerValue)
    data.push(question)
    id++;
   
    
   
    
    // addQuestion()
    ui.addQuestion(questionsList, question)
    ui.clearField(questionInput, answerInput)
    console.log(data);
  }
  
})

questionsList.addEventListener("click", function(event){
  event.preventDefault()
//  console.log(event.target);
 
  if(event.target.classList.contains("show-answer")){
    event.target.nextElementSibling.classList.toggle("showItem")
    
  } else if(event.target.classList.contains("edit-flashcard")){
    let id = event.target.dataset.id;
    console.log(id);
    
    // delete the item
 questionsList.removeChild(event.target.parentElement.parentElement.parentElement)

   // edited question
    const temtQuestion = data.filter(function(item){
      return item.id === parseInt(id)
    })
    // rested question
    const temtData = data.filter(function(item){
      return item.id !== parseInt(id)
    })
    data =temtData;
    
    
   questionInput.value = temtQuestion[0].title
   answerInput.value = temtQuestion[0].answer
    
  }else if(event.target.classList.contains("delete-flashcard")){
    let id = event.target.dataset.id;
    // delete the item
    questionsList.removeChild(event.target.parentElement.parentElement.parentElement)
  
    const temtData = data.filter(function(item){
      return item.id !== parseInt(id)
    })
    data =temtData;
    
    
  
  }

  console.log(data);
})



}

// Ui constractor function
function UI(){};
// show question card
UI.prototype.showQuestion = function(element){
  element.classList.add("showItem")
}
// hide question card
UI.prototype.hideQuestion = function(element){
  element.classList.remove("showItem")
}
// add question
UI.prototype.addQuestion = function(element, question){
  const div= document.createElement("div");
  div.classList.add("col-md-4")
  div.innerHTML = `<div class="card card-body flashcard my-3">
  <h4 class="text-capitalize">${question.title}</h4>
  <a href="#" class="text-capitalize my-3 show-answer">show/hide answer</a>
  <h5 class="answer mb-3">${question.answer}</h5>
  <div class="flashcard-btn d-flex justify-content-between">

   <a href="#" id="edit-flashcard" class=" btn my-1 edit-flashcard text-uppercase" data-id="${question.id}">edit</a>
   <a href="#" id="delete-flashcard" class=" btn my-1 delete-flashcard text-uppercase"data-id="${question.id}">delete</a>
  </div>
 </div>`
 element.appendChild(div)
}
// clear forms
UI.prototype.clearField = function(question , answer){
  question.value = "";
  answer.value = "";
}


function Question(id, title, answer){
  this.id = id;
  this.title = title;
  this.answer = answer;
};


document.addEventListener("DOMContentLoaded", function(){
  eventListeners()
  
})




