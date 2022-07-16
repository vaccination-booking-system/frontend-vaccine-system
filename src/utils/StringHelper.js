const StringHelper = {
  splitStringByDash: str => {
    const arrSplit = str.split("-");
    let tempArr = [];
    for (let i = 0; i < arrSplit.length; i++) {
      tempArr.push(StringHelper.capitalizeFirstLetter(arrSplit[i]));
    }
    return tempArr.join(" ");
  },

  capitalizeFirstLetter: letter => {
    const arrLetter = letter.split(" ");
    let tempArr = [];
    for (let i = 0; i < arrLetter.length; i++) {
      tempArr.push(arrLetter[i][0].toUpperCase() + arrLetter[i].slice(1));
    }
    return tempArr.join(" ");
  },

  getHideStr: (str, numHideChar) => {
    let hideStr = "";
    for (let i = 0; i < str.length; i++) {
      if (i < numHideChar) {
        hideStr += str[i];
      } else {
        hideStr += "*";
      }
    }
    return hideStr;
  },
};

export default StringHelper;
