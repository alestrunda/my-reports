import iconChart from "../assets/icon_chart.svg";
import iconDashboard from "../assets/icon_dashboard.svg";
import iconGraph from "../assets/icon_graph.svg";
import iconPower from "../assets/icon_power.svg";
import iconScreen from "../assets/icon_screen.svg";

const links = [
  {
    id: "graph",
    icon: iconGraph,
    href: "./",
  },
  {
    id: "dashboard",
    icon: iconDashboard,
    href: "./",
  },
  {
    id: "screen",
    icon: iconScreen,
    href: "./",
  },
  {
    id: "chart",
    icon: iconChart,
    href: "./",
  },
  {
    id: "logout",
    icon: iconPower,
    href: "./",
  },
];

const Sidebar = ({ className }) => (
  <aside className={className}>
    {links.map((link) => (
      <a href={link.href} key={link.id}>
        <img alt={link.id} src={link.icon} />
      </a>
    ))}
  </aside>
);

export default Sidebar;
