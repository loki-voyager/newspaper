import { Navigation } from "./Navigation";

const navItems = [
  { label: "Home", href: "/", type: "public" },
  { label: "News", href: "/news", type: "public" },
];

const Header = () => {
  return (
    <header>
      <div className="wrapper">
        <nav>
          <Navigation navLinks={navItems} />
        </nav>
      </div>
    </header>
  );
};

export { Header };
