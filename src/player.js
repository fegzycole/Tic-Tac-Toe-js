const player = (name, token) => {
  let score = 0;

  const increaseScore = () => {
    score += 1;
  };

  const getScore = () => score;

  return {
    name,
    increaseScore,
    token,
    score,
    getScore,
  };
};

export default player;