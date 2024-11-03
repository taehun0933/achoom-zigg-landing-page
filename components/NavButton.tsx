interface NavButtonProps {
  title: string;
  onClick: any;
  largeButton?: boolean;
  style?: StyleSheet;
}

const NavButton: React.FC<NavButtonProps> = ({
  onClick,
  title,
  largeButton,
}) => {
  return (
    <button
      className={`${largeButton ? "font-bold" : "font-semibold"} ${
        largeButton ? "text-lg" : "text-base"
      } hover:scale-105`}
      onClick={() => {
        onClick();
      }}
    >
      {title}
    </button>
  );
};

export default NavButton;
