import useInViewOnce from "./useInViewOnce";

const scrollRevealOptions = {
  rootMargin: "0px 0px -10% 0px",
  threshold: 0.16,
};

function useScrollReveal() {
  return useInViewOnce(scrollRevealOptions);
}

export default useScrollReveal;
