
import { Button } from "@/Components/ui/button"
import { LucideProps, Moon, Sun } from 'lucide-react'
import { useEffect, useState } from "react"


interface Props {
  iconSize?: LucideProps["size"],
  className?: string
}

const ThemeHandler = (props: Props) => {

  //check if the theme is in the local storage, if so then set it if not then set it to light
  //this is so that the theme is saved between refreshes
  //then if button is clicked toggle between light and dark
  //to set the theme u can use document.documentElement.classList.add('dark') or remove

  const [theme, setTheme] = useState<string>("light")

  useEffect(() => {
    const theme = localStorage.getItem("theme")
    if (theme) {
      setTheme(theme)
    } else {
      setTheme("light")
    }
  }, [])

  const changeTheme = () => {
    if (theme === "light") {
      setTheme("dark")
      localStorage.setItem("theme", "dark")
      document.documentElement.classList.add('dark')
    } else {
      setTheme("light")
      localStorage.setItem("theme", "light")
      document.documentElement.classList.remove('dark')
    }
  }





  const SetIconToTheme = () => {
    if (theme === "light") {
      return <Moon size={props.iconSize} />
    } else {
      return <Sun size={props.iconSize} />
    }
  }



  return (
    <div className={props.className}>
      <Button variant="outline" size="icon" className="bg-transparent" onClick={changeTheme}>{SetIconToTheme()}</Button>
    </div>

  )


}

export default ThemeHandler









