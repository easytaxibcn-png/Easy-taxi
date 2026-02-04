import { Button } from "@/components/ui/button"
import Link from "next/link"

export const ReserveButton = ({ text, className }: { text: string; className?: string }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
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