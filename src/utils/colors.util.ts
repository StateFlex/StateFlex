
const getColor = (function () {

  const colors: Array<string> = [
    '#60D7F9', 
    '#5EF2CB', 
    '#7AE65A', 
    '#DAC055', 
    '#C84E9D',
    '#B24CC2'];

    
    


  let colorIndex = 0;

  return (portion: number): string => {
    colorIndex %= colors.length;
    return colors[colorIndex++];

  }
})();


export default getColor;