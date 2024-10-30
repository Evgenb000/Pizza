export function useLockScroll() {
  const lockScroll = () => {
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollBarWidth}px`;
  };

  const unlockScroll = () => {
    document.body.style.overflow = "unset";
    document.body.style.paddingRight = "0px";
  };

  return { lockScroll, unlockScroll };
}