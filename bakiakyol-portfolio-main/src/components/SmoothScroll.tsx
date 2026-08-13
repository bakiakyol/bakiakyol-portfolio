export const smoothScrollTo = (targetId: string) => {
  const target = document.querySelector(targetId);
  if (target) {
    const navbarHeight = 64; // h-16 = 64px
    const targetPosition =
      target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  }
};
