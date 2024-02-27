import Logo from "../assets/Images/logo.svg";

export default function Navbar() {
  return (
    <div className="sticky h-[10vh] flex gap-4 items-center text-white">
      <img src={Logo} alt="logo" className="h-10 w-10" />
      <div className="font-gugi  text-3xl">Echo Talk</div>
    </div>
  );
}
