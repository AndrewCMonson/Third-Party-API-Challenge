$(function () {
  
  // getStoredArr is a function used to grab a stored array from local storage
  // can be used for any stored array and it will parse
  const getStoredArr = (localStorageArr) => JSON.parse(localStorage.getItem(localStorageArr));

  const initalizeStorage = () => {
    const storedInputsStr = 'Stored Inputs';
    localStorage.removeItem(storedInputsStr);
  }
  
  const clearTextContent = () => {
    const timeBlocks = $('.time-block');

    for(let i = 0; i < timeBlocks.length; i++){
      const currentTimeBlock = timeBlocks[i];
      $(currentTimeBlock).children('.description').val('')
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
    const storedInputsStr = 'Stored Inputs';
    const storedArr = getStoredArr(storedInputsStr);
    const newInput = arr[0];
    if(!storedArr){
      initalizeStorage();
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
    const now = dayjs().format('H');
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
    const storedInputsStr = 'Stored Inputs'
    const localStoredArr = getStoredArr(storedInputsStr);

    const compareArrs = (timeBlocks, storedArr) => {
      for(let i = 0; i < timeBlocks.length; i++){
        const currentTimeBlock = timeBlocks[i];
        const hour = currentTimeBlock.id;
        const trueHour = hour.match(/[0-9]+/);
        const trueHourValue = parseInt(trueHour);
        if(storedArr){
          for(let j = 0; j < storedArr.length; j++){
          const currentStoredArrIndex = storedArr[j];
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




    // final functions run to complete application
    setInterval(displayTime, 1000);
    determineTime();
    $('.time-block').on('click', '.saveBtn', captureInput);
    $('#reset-btn').click(initalizeStorage).click(clearTextContent);
    
    
    
    // on('click', e =>{
    //   initalizeStorage;
    //   clearTextContent;
    // } );
    publishInputs();
});


