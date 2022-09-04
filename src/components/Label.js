const Label = ({ children, color }) => {
  return (
    <div className="label">
      <div className="label__icon" style={{ backgroundColor: color }}></div>
      {children}
    </div>
  );
};

export default Label;
