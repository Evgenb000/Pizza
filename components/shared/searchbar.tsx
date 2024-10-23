"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { Input } from "../ui/input";
import { Api } from "@/services/api-client";
import { SearchbarPopup } from "./searchbarPopup";
import { useOnClickOutside } from "usehooks-ts";

interface Props {
  className?: string;
}

export const Searchbar: React.FC<Props> = ({ className }) => {
  // const [products, setProducts] = React.useState([])
  const [searchQuery, setSearchQuery] = React.useState("");
  const [focused, setFocused] = React.useState(false);
  // const isMobile = useIsMobile();
  // const isScrolled = useIsScrolled();

  const ref = React.useRef(null);

  const handleClickOutside = () => {
    // Your custom logic here
    console.log("clicked outside");
  };

  useOnClickOutside(ref, handleClickOutside);

  React.useEffect(() => {
    Api.products.search(searchQuery);
  }, [searchQuery]);

  return (
    <div className={cn("w-full", className)}>
      {focused ? <SearchbarPopup /> : ""}
      <Input
        className={cn("w-full")}
        onClick={() => setFocused(true)}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};
