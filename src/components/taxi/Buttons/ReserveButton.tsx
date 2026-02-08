import { Button } from "@/components/ui/button"
import Link from "next/link"

export const ReserveButton = ({ text, className, onClick }: { text: string; className?: string; onClick?: () => void }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick()
    e.preventDefault()
    const element = document.getElementById("contacto")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      window.history.pushState(null, "", "#contacto")
    }
  }

  return (
    <Link href="#contacto" onClick={handleClick}>
      <Button className={(className ? className + " " : "") + "cursor-pointer"}>
        {text}
      </Button>
    </Link>
  )
}