import { FaArrowLeft } from "react-icons/fa"
import { Link } from "react-router-dom";
import "./Header.css"

interface ITitle {
  title: string;
  to: string;
}

export function Header({ title, to }: ITitle) {
  return (
    <div >
      <main className="container_main">
        <Link to={to}>
          <FaArrowLeft className="left"/>
        </Link>
        <h2>{title}</h2>
      </main>
    </div>
  )
}