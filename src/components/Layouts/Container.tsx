import Header from "./Header";

const Container: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    
      <div className="bg-white w-full rounded-lg h-full">{children}</div>
  );
};
export default Container;
