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

  // function used to grab a stored array from local storage
  // can be used for any stored array and it will parse
  const getStoredArr = (localStorageArr) => JSON.parse(localStorage.getItem(localStorageArr));
  
  /*
    - This function takes an array that has only one object as argument
    - If there is not an array stored in local storage, it creates one based on the passed array
    - If there is an array stored, it pulls a stored array from localStorage via the getStoredArr function
    - After pulling the array from LS, it checks if there is already an object in the array that matches the new one
    - If there is an existing object, it updates the values
    - If there is no object, it pushes the new arr to the stored arr
    - Finally, it sets the LS with the new values
  */
  const updateDailyVals = (arr) => {
    const storedInputsStr = 'Stored Inputs'
    const storedArr = getStoredArr(storedInputsStr);
    const newInput = arr[0];
    if(!storedArr){
      localStorage.setItem(storedInputsStr, JSON.stringify(arr))
    }
    if(storedArr){
      const a = storedArr.findIndex(e => e.hour === newInput.hour);
      if(a > -1){
        storedArr[a] = newInput;
      }else{
        storedArr.push(newInput)
      }
      localStorage.setItem(storedInputsStr, JSON.stringify(storedArr))
    }
  }

  /*
    - This event listener uses a click on the '.saveBtn" class of buttons to save the value of the '.description' class and the hour it belongs to, into an object. 
    - After the object is created, it is pushed into an array
    - Finally, the created array of objects is passed as an argument into the updateDailyVals function which updates LS.
  */
  $('.time-block').on('click', '.saveBtn', e => {
      e.preventDefault()
      console.log('>>>description value>>>', $(e.target).siblings('.description').val());
      // console.log($(e.target).siblings('.hour').text())

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
      updateDailyVals(storedInputs);

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
