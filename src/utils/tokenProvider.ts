const tokenProvider = () => {
    const charset =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomText = "";
  
    for (let i = 0; i < 150; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      randomText += charset[randomIndex];
    }
  
    return randomText;
  };

  export default tokenProvider