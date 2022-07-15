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
    return letter[0].toUpperCase() + letter.slice(1);
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
