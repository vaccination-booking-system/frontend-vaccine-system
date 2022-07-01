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
};

export default StringHelper;
