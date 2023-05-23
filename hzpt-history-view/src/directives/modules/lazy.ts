import { useIntersectionObserver } from "@vueuse/core";
import bg from "@/assets/images/transparent.png";
export default {
  // 图片懒加载
  mounted(el: HTMLImageElement) {
    // 1. 暂存图片地址
    const imgSrc = el.src;
    el.src = bg;

    const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
      if (isIntersecting) {
        // 2. 当图片可见时，加载图片
        el.src = imgSrc;
        // 3. 停止监听
        stop();
      }
    });
  },
};
