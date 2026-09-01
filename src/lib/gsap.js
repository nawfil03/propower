import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Shared reduced-motion matchMedia gate — every ScrollTrigger sequence in the
// app should build inside gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', ...)
// so motion-sensitive users get the readable final state with no animation.
export { gsap, ScrollTrigger };
