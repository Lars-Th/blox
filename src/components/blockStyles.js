// src/components/blockStyles.js

export const getBlockStyle = (value) => {
    let backgroundColor = '#eee4da';
  
    switch (value) {
      case 2:
        backgroundColor = '#7BC9E2';
        break;
      case 4:
        backgroundColor = '#FAD02E';
        break;
      case 8:
        backgroundColor = '#EBA5A5';
        break;
      case 16:
        backgroundColor = '#A1E3A1';
        break;
      case 32:
        backgroundColor = '#F7C46A';
        break;
      case 64:
        backgroundColor = '#D9E1A1';
        break;
      case 128:
        backgroundColor = '#85D1ED';
        break;
      case 256:
        backgroundColor = '#F5A3B3';
        break;
      case 512:
        backgroundColor = '#A6E1F4';
        break;
      case 1024:
        backgroundColor = '#F5D97C';
        break;
      case 2048:
        backgroundColor = '#EBD2A6';
        break;
      default:
        backgroundColor = '#3c3a32';
        break;
    }
  
    return {
      backgroundColor,
    };
  };
  
  export const getTextColor = (value) => {
    return value > 4 ? '#f9f6f2' : '#776e65';
  };