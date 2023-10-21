// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
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
    - This function will be used by a click event listener to capture the input of the targeted scheduler time-block.
    - It will create an object with the input and it's associated timevalue and push it into an array
    - Finally, the created array of objects is passed as an argument into the updateDailyVals function which updates LS.
  */
  const captureInput = (e) => {
    e.preventDefault()
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
    updateDailyVals(storedInputs);
  }
    
  /*
    - determineTime is run on page load and takes no arguments
    - it initializes dayjs and formats it into a 24 hour clock
    - next, the function gathers all of the timeblocks from the DOM via jQuery
    - next, it gathers the id from each time block and converts it to an integer
    - next, it compares the integer to the current hour of dayjs
    - if the current hour is greater than the hour on the time block, it adds the '.past' class turning the block grey.
    - if the current hour is less than the hour on the time block, it add the '.future' class and turns the block green
    - if the hours match, the block is turned red
  */
  const determineTime = () => {
    // const hour = $(e.target).siblings('.hour').text();
    // const trueHour = hour.match(/[0-9]+/);
    // const trueHourValue = parseInt(trueHour);
    const now = dayjs().format('H');
    console.log(now)
    const timeBlocks = $('.time-block');
    console.log(timeBlocks);

    for(let i = 0; i < timeBlocks.length; i++){
      const currentTimeBlock = timeBlocks[i];
      const hour = currentTimeBlock.id;
      const trueHour = hour.match(/[0-9]+/);
      const trueHourValue = parseInt(trueHour);

      if(trueHourValue < now){
        $(currentTimeBlock).addClass('past');
      }else if(trueHourValue > now){
        $(currentTimeBlock).addClass('future')
      }else{
        $(currentTimeBlock).addClass('present')
      }
    }
  }

    determineTime();
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
    const updateDom = () => {

    }


    // This displays the current time on the page and updates every second
    const displayTime = () => {
      const now = dayjs().format('MM/DD/YYYY HH:MM:ss');
      const timeDisplay = $('#currentDay');
      timeDisplay.text(now); 
    }

    setInterval(displayTime, 1000);
    $('.time-block').on('click', '.saveBtn', captureInput)
});
