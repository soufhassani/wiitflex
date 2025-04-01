type Props = {
  text: string;
  limit: number;
};

const textReducer = ({ text, limit }: Props) => {
  if (text.length > limit) {
    const newString = text.slice(0, limit) + "...";
    return newString;
  }
  return text;
};

export default textReducer;
