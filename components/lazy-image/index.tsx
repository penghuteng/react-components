import { useEffect, useRef } from "react";

export type LazyImageProps = React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
> & {
  src: string;
};

export default function LazyImage(props: LazyImageProps) {
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const el = ref.current!;
    const observer = new IntersectionObserver(
      ([{ isIntersecting }]) => {
        if (isIntersecting) {
          observer.unobserve(el);
          el.src = props.src;
          el.onerror = () => {
            el.src = "";
          };
        }
      },
      { threshold: 0 }
    );
    observer.observe(el);
  }, []);

  return <img {...props} ref={ref} src={undefined} />;
}
