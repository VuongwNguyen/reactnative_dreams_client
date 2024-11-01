function throttle(func, delay) {
  let timerFlag = null;
  return (...args) => {
    if (timerFlag === null) {
      // If there is no timer currently running
      func(...args); // Execute the main function
      timerFlag = setTimeout(() => {
        // Set a timer to clear the timerFlag after the specified delay
        timerFlag = null; // Clear the timerFlag to allow the main function to be executed again
      }, delay);
    }
  };
}

export default throttle;