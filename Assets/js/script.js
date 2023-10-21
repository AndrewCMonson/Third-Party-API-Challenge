$(function () {
  // GLOBAL VARIABLES
  const storedInputsStr = 'Stored Inputs';
  
  
  
  /*
    - getStoredArr is a function used to grab a stored array from local storage
    - can be used for any stored array and it will parse
  */ 
  const getStoredArr = (localStorageArr) => JSON.parse(localStorage.getItem(localStorageArr));
  /*
    - initializeStorage takes a local storage key that has been converted to a variable and removes it from local storage
  */
  const initalizeStorage = (storageName) => {
    localStorage.removeItem(storageName);
  }
  
  /*
    - clearTextContent iterates through all '.time-block' class elements and resets the text to an empty string
    - this could be re-purposed to pass a single text block through and used with a reset button for individual elements in the future
  */
  const clearTextContent = () => {
    const timeBlocks = $('.time-block');
    for(let i = 0; i < timeBlocks.length; i++){
      const currentTimeBlock = timeBlocks[i];
      $(currentTimeBlock).children('.description').val('');
    }
  }
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
    
    const localStoredArr = getStoredArr(storedInputsStr);
    const newInput = arr[0];
    if(!localStoredArr){
      initalizeStorage();
      localStorage.setItem(storedInputsStr, JSON.stringify(arr))
    }
    if(localStoredArr){
      const a = localStoredArr.findIndex(e => e.hour === newInput.hour);
      if(a > -1){
        localStoredArr[a] = newInput;
      }else{
        localStoredArr.push(newInput)
      }
      localStorage.setItem(storedInputsStr, JSON.stringify(localStoredArr))
    }
  }
  /*
    - This function will be used by a click event listener to capture the input of the targeted scheduler time-block.
    - It will create an object with the input and it's associated timevalue and push it into an array
    - Finally, the created array of objects is passed as an argument into the updateDailyVals function which updates LS.
  */
  const captureInput = (e) => {
    e.preventDefault()
    const hour = $(e.target).siblings('.hour').text();
    const trueHour = hour.match(/[0-9]+/);
    const trueHourValue = parseInt(trueHour);
    const userInputValue = $(e.target).siblings('.description').val();
    const storedInputs = [];
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
    const now = dayjs().format('h');
    const timeBlocks = $('.time-block');
    
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

  /*
    - publishInputs function is called on page load and takes no arguments
    - it utilizes the getStoredArr function to gather stored information from localStorage
    - it also grabs all of the '.time-block' class elements from the DOM via jQuery
    - Inside of publishInputs, there is a function called compareArrs. This function is built to explicitly take the two arrays of 'timeBlocksArr' and 'localStoredArr'. It loops through them and compares values of the 'timeBlocksArr' index 'id' property and the 'localStoredArr' index hour property to determine if they match. If they do, it manipulates the DOM to display the correct stored 'textInput' value
    - Finally, the compareArrs function is called within the publishInputs function, publishing the stored items to the page.
  */  
  const publishInputs = () => {
    const timeBlocksArr = $('.time-block');
    const localStoredArr = getStoredArr(storedInputsStr);

    const compareArrs = (timeBlocks, localStoredArr) => {
      for(let i = 0; i < timeBlocks.length; i++){
        const currentTimeBlock = timeBlocks[i];
        const hour = currentTimeBlock.id;
        const trueHour = hour.match(/[0-9]+/);
        const trueHourValue = parseInt(trueHour);
        if(localStoredArr){
          for(let j = 0; j < localStoredArr.length; j++){
          const currentStoredArrIndex = localStoredArr[j];
          if(trueHourValue === currentStoredArrIndex.hour){
            $(currentTimeBlock).children('.description').val(currentStoredArrIndex.textInput)
          }
        } }
        
      }
    }
    compareArrs(timeBlocksArr, localStoredArr);
  }

  // This formats the current time and displays it on the page
  const displayTime = () => {
    const now = dayjs().format('MM/DD/YYYY HH:MM:ss');
    const timeDisplay = $('#currentDay');
    timeDisplay.text(`Date and Time: ${now}`); 
  }




    // FINAL FUNCTION CALLS FOR APPLICATION
    
    
    // used to live update the time and date
    setInterval(displayTime, 1000);
    
    // used to color the '.time-block' elements on page load
    determineTime();

    // used to capture the input of '.time-block' text-areas and push to local storage
    $('.time-block').on('click', '.saveBtn', captureInput);
    
    // reset button functionality to empty local storage specific to 'Stored Inputs' and clear all text content
    $('#reset-btn').click(() => {
      initalizeStorage(storedInputsStr)}
      ).click(clearTextContent);
    
    // used to publish text inputs from local storage on page load
    publishInputs();
});


