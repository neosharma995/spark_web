'use client';

import { useRef, useLayoutEffect, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const BrandingSection = () => {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const panels = Array.from(container.querySelectorAll('.spwproc__panel'));
    if (!panels.length) return;

    // Initial state: only the first visible
    gsap.set(panels, {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      opacity: 0,
      pointerEvents: 'none',
    });
    gsap.set(panels[0], { opacity: 1, pointerEvents: 'auto' });

    const endDistance = () => '+=' + Math.max(0, (panels.length - 1) * window.innerHeight);

    const st = ScrollTrigger.create({
      id: 'spwproc-pin',
      trigger: container,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      start: 'top top',
      end: endDistance,
      scrub: 1,
      invalidateOnRefresh: true,
      refreshPriority: 2,
      snap: panels.length > 1
        ? {
            snapTo: 1 / (panels.length - 1),
            duration: { min: 0.2, max: 0.6 },
            delay: 0.1,
            ease: 'power1.inOut',
          }
        : false,
      onUpdate: (self) => {
        const newIndex = Math.round(self.progress * (panels.length - 1));
        if (newIndex === activeIndex) return;

        setActiveIndex(newIndex);
        panels.forEach((p, i) => {
          gsap.to(p, {
            opacity: i === newIndex ? 1 : 0,
            duration: 0.35,
            pointerEvents: i === newIndex ? 'auto' : 'none',
          });
        });
      },
    });

    // Ensure ScrollTrigger recalculates when images load
    const imgs = Array.from(container.querySelectorAll('img'));
    let pending = imgs.length;
    const done = () => {
      pending -= 1;
      if (pending <= 0) ScrollTrigger.refresh();
    };
    if (pending) {
      imgs.forEach((img) => {
        if (img.complete) done();
        else {
          img.addEventListener('load', done, { once: true });
          img.addEventListener('error', done, { once: true });
        }
      });
    } else {
      ScrollTrigger.refresh();
    }
    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => st.kill();
  }, [activeIndex]);

  return (
    <section className="spwproc" ref={containerRef}>
      <div className="spwproc__stack">
        {/* ===== 01 ===== */}
        <div className="spwproc__panel">
          <div className="spwproc__inner">
            <div className="spwproc__text">
              <h1 className="spwproc__title">Branding</h1>
              <p className="spwproc__para">
                We turn your vision into a distinct, consistent brand—strategy, voice, identity, and guidelines—so you’re instantly recognizable and built for growth.
              </p>
              <ul className="spwproc__list">
                <li>Brand Strategy</li>
                <li>Verbal Identity</li>
                <li>Visiual Identity</li>
                <li>Brand Experiences</li>
                <li>Brand Playbook</li>
              </ul>
            </div>
            <div className="spwproc__media">
              <Image
                src="/images/Branding.png"
                alt="Branding visual"
                width={1200}
                height={800}
                sizes="(max-width: 1024px) 100vw, 600px"
                priority
              />
            </div>
          </div>
        </div>

        {/* ===== 02 ===== */}
        <div className="spwproc__panel">
          <div className="spwproc__inner">
            <div className="spwproc__text">
              <h1 className="spwproc__title"> Design</h1>
              <p className="spwproc__para">
                "We craft designs that don’t just look good — they grow your brand, boost engagement, and convert visitors into loyal customers."
              </p>
              <ul className="spwproc__list">
                <li><b>Pitch Deck</b> Design</li>
                <li>Advertising <b>Mocks</b></li>
                <li>Campaign <b>Design</b></li>
                <li>Social <b>Media</b></li>
                <li><b>Packaging</b></li>
              </ul>
            </div>
            <div className="spwproc__media">
              <Image
                src="/images/Design.png"
                alt="Design work"
                width={1200}
                height={800}
                sizes="(max-width: 1024px) 100vw, 600px"
              />
            </div>
          </div>
        </div>

        {/* ===== 03 ===== */}
        <div className="spwproc__panel">
          <div className="spwproc__inner">
            <div className="spwproc__text">
              <h1 className="spwproc__title"> Web & Digital</h1>
              <p className="spwproc__para">
                Your website should not just look beautiful — it should perform beautifully too. We design and develop digital experiences that engage users, enhance SEO, and convert visitors into loyal customers.
              </p>
              <ul className="spwproc__list">
                <li>Web Design</li>
                <li>Web Development</li>
                <li>UX/UI Design</li>
                <li>App Design</li>
                <li>E-commerce Solutions</li>
              </ul>
            </div>
            <div className="spwproc__media">
              <Image
                src="/images/website.png"
                alt="Web & Digital"
                width={1200}
                height={800}
                sizes="(max-width: 1024px) 100vw, 600px"
              />
            </div>
          </div>
        </div>

        {/* ===== 04 ===== */}
        <div className="spwproc__panel">
          <div className="spwproc__inner">
            <div className="spwproc__text">
              <h1 className="spwproc__title">Video & Motion </h1>
              <p className="spwproc__para">
                In today’s scroll-fast world, video stops the thumb. We create high-impact videos and motion graphics that tell your story, build your brand, and keep audiences watching till the end.
              </p>
              <ul className="spwproc__list">
                <li>Branded Video Content</li>
                <li>Corporate & Pitch Videos</li>
                <li>Award Submissions</li>
                <li>Short Films & Ads</li>
                <li>3D Animation & Motion Graphics</li>
              </ul>
            </div>
            <div className="spwproc__media">
              {/* Tip: avoid '&' in filenames to prevent URL issues; rename to 'video-motion.png' if possible */}
              <Image
                src="/images/video&motion.png"
                alt="Video and Motion"
                width={1200}
                height={800}
                sizes="(max-width: 1024px) 100vw, 600px"
              />
            </div>
          </div>
        </div>

        {/* ===== 05 ===== */}
        <div className="spwproc__panel">
          <div className="spwproc__inner">
            <div className="spwproc__text">
              <h1 className="spwproc__title"> Go Live</h1>
              <p className="spwproc__para">
                We launch your project with precision — deploying, testing, and monitoring every detail to ensure seamless performance, long-term stability, and measurable growth.
              </p>
              <ul className="spwproc__list">
                <li>Seamless Deployment</li>
                <li>Website Performance Testing </li>
                <li>SEO Optimization & Tracking </li>
                <li>Post-Launch Monitoring </li>
                <li>Ongoing Maintenance & Support </li>
              </ul>
            </div>
            <div className="spwproc__media">
              <Image
                src="/images/live-site.png"
                alt="Go Live"
                width={1200}
                height={800}
                sizes="(max-width: 1024px) 100vw, 600px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandingSection;
