import * as React from "react";

export function useIsScrolled(threshold = 100) {
  const [isScrolled, setIsScrolled] = React.useState<boolean>(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Обновляем состояние при монтировании

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold]);

  return !!isScrolled;
}
