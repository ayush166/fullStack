
let recentStrings = [];

const storeRecentString = (newString) => {
  recentStrings.push(newString);
  if (recentStrings.length > 2) {
    recentStrings.shift();  //only the most recent two strings are kept
  }
};

const getRecentStrings = () => {
  return recentStrings; 
};


module.exports = {storeRecentString,getRecentStrings };
