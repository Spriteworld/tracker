const toWords = (string) => {
  return string.replace(/_/g, ' ').replace(/\w\S*/g, (word) => {
    return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
  });
};

export default toWords;
