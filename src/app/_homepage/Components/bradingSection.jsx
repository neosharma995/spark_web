// "use client";

// import React from "react";
// import { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// gsap.registerPlugin(ScrollTrigger);

// export default function BrandingSection() {
//   const ref = useRef(null);

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       const cards = gsap.utils.toArray(".brand-card");
//       gsap.set(cards, { opacity: 0, y: 40 });

//       // reveal on enter
//       gsap.to(cards, {
//         opacity: 1, y: 0,
//         stagger: 0.12,
//         duration: 0.8,
//         ease: "power2.out",
//         scrollTrigger: {
//           trigger: ".brand-right",
//           start: "top 75%",
//           once: true,
//         }
//       });

//       // soft parallax while scrolling
//       cards.forEach((c, i) => {
//         gsap.to(c, {
//           y: i % 2 ? -20 : 20,
//           ease: "none",
//           scrollTrigger: {
//             trigger: ref.current,
//             start: "top bottom",
//             end: "bottom top",
//             scrub: true,
//           }
//         });
//       });
//     }, ref);
//     return () => ctx.revert();
//   }, []);

//   return (
//     <section className="brand-split container" ref={ref} id="branding">
//       <div className="brand-left">
//         <span className="brand-index">01</span>
//         <div className="brand-rule" />
//         <div>
//           <h2 className="brand-title">Branding</h2>
//           <p className="brand-copy">
//             Your brand isn’t just your logo. It’s the feeling people get when they hear your name.
//           </p>
//           <ul className="brand-list">
//             <li>Brand <b>Strategy</b></li>
//             <li>Verbal <b>Identity</b></li>
//             <li>Visual <b>Identity</b></li>
//             <li>Brand <b>Experiences</b></li>
//             <li>Brand <b>Playbook</b></li>
//           </ul>
//         </div>
//         <span className="brand-index brand-index--bottom">04</span>
//       </div>

//       <div className="brand-right">
//         <div className="brand-grid">
//           {/* Replace src with your images in /public/branding/* */}
//           <div className="brand-card" style={{"--rot":"6deg"}}><img src="/branding/1.jpg" alt="Brand 1"/></div>
//         </div>
//       </div>
//     </section>
//   );
// }
// BrandingSection;
