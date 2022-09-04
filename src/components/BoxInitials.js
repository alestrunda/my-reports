import classNames from "classnames";

const BoxInitials = ({ className, firstName = "", lastName = "" }) => (
  <div className={classNames(className, "box-initials")}>
    {firstName[0] || lastName[0] ? `${firstName[0]}${lastName[0]}` : "N/A"}
  </div>
);

export default BoxInitials;
