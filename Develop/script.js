// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //

  const getStorage = () => JSON.parse(localStorage.getItem('Stored Inputs'));
  
  const updateStorage = (arr) => {
    const storedArr = getStorage();
    console.log(storedArr);
    if(!storedArr){
      localStorage.setItem('Stored Inputs', JSON.stringify(arr))
    }if(storedArr){
      const newStoredArr = [...storedArr, arr];
      localStorage.setItem('Stored Inputs', JSON.stringify(newStoredArr))
    }

  }


  $('.time-block').on('click', '.saveBtn', e => {
      e.preventDefault()
      console.log('description value', $(e.target).siblings('.description').val());
      console.log($(e.target).siblings('.hour').text())

      // grabs the hour value from the DOM, finds the first number in the string and converts it to an integer
      const hour = $(e.target).siblings('.hour').text();
      const trueHour = hour.match(/[0-9]+/);
      const trueHourValue = parseInt(trueHour);
      // grabs the user input from the DOM and stores it in a variable
      const userInputValue = $(e.target).siblings('.description').val();
      // array to store inputs from the user
      const storedInputs = [];
      // inputs from the user placed into an object
      const savedInput = {
        hour: trueHourValue,
        textInput: userInputValue
      }
      storedInputs.push(savedInput);

      // localStorage.setItem('Stored Inputs', JSON.stringify(storedInputs));
      updateStorage(storedInputs);

    })
    
    
    
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
    const determineTime = () => {
      const hour = $(e.target).siblings('.hour').text();
      const trueHour = hour.match(/[0-9]+/);
      const trueHourValue = parseInt(trueHour);
    }
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
    const getInput = () => {

    }
  // TODO: Add code to display the current date in the header of the page.

    const displayTime = () => {
      const now = dayjs().format('MM/DD/YYYY HH:MM:ss');
      const timeDisplay = $('#currentDay');
      timeDisplay.text(now); 
    }

    setInterval(displayTime, 1000);
});
