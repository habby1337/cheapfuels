import { Button } from "@/Components/ui/button";
import { LucideProps, Moon, Sun } from 'lucide-react';
import { useEffect, useState } from "react";

interface Props {
  iconSize?: LucideProps["size"];
  className?: string;
}

const ThemeHandler = (props: Props) => {
  // State for the theme
  const [theme, setTheme] = useState<string>(() => {
    // Check if theme is stored in local storage
    const storedTheme = localStorage.getItem("theme");
    return storedTheme || "light"; // Use stored theme if available, otherwise use "light"
  });

  useEffect(() => {
    // Update the classList of document.documentElement based on the theme
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    // Store the theme in local storage
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Toggle the theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Set the icon based on the theme
  const SetIconToTheme = () => {
    if (theme === "light") {
      return <Moon size={props.iconSize} />;
    } else {
      return <Sun size={props.iconSize} />;
    }
  };

  return (
    <div className={props.className}>
      <Button
        variant="outline"
        size="icon"
        className="bg-transparent"
        onClick={toggleTheme}
      >
        {SetIconToTheme()}
      </Button>
    </div>
  );
};

export default ThemeHandler;
