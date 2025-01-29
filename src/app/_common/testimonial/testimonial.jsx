'use client';
import { useContext, useEffect } from "react";
import Image from "next/image";
import { SectorDataContext } from "@/context/apiContext";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

const Testimonial = () => {
  const { testimonialsApi } = useContext(SectorDataContext);

  useEffect(() => {
    const initSwiper = () => {
      const prevButton = document.querySelector(".custom-prev");
      const nextButton = document.querySelector(".custom-next");

      if (prevButton && nextButton) {
        const swiper = document.querySelector(".testimonials-inner")?.swiper;
        if (swiper) {
          swiper.params.navigation.prevEl = prevButton;
          swiper.params.navigation.nextEl = nextButton;
          swiper.navigation.init();
          swiper.navigation.update();
        }
      }
    };

    initSwiper();
  }, []);

  const truncateDescription = (text, wordLimit = 45) => {
    const words = text.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
  };

  return (
    <div className="container">
      <div className="testimonials">
        <div className="testimonials-pagination">
          <div className="testimonial-heading">
            <button className="custom-prev testimonial-button">
              <Image
                src="/images/testimonial-arrow.png"
                alt="Previous"
                width={24}
                height={24}
              />
            </button>
            <h3>What Our Clients Say About Us</h3>
            <button className="custom-next testimonial-button">
              <Image
                src="/images/testimonial-arrow.png"
                alt="Next"
                width={24}
                height={24}
              />
            </button>
          </div>
          <div className="pagination-top" />
        </div>

        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={3}
          pagination={{
            el: ".pagination-top",
            clickable: true,
          }}
          breakpoints={{
            320: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="testimonials-inner"
        >
          {testimonialsApi?.map((section, sectionIndex) => (
            <SwiperSlide key={sectionIndex} className="testimonial">
              <div className="testimonial-inner">
                <div className="testimonial-background-img">
                  <div className="testimonial-frontt">
                    <div className="testimonial-image">
                      <Image
                        src={section.acf.image}
                        alt="Testimonial Image"
                        layout="responsive"
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className="testimonial-name">
                      <h2>{section.acf.name}</h2>
                    </div>
                    <div className="testimonial-desg">
                      <p>{section.acf.designation}</p>
                    </div>
                    <div className="qutee-img">
                      <Image
                        src="/images/clarity_block-quote-line.png"
                        alt="Quote Icon"
                        width={40}
                        height={40}
                        layout="intrinsic"
                      />
                    </div>
                    <div className="testimonial-main-text-des">
                      <p>{truncateDescription(section.acf.description)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonial;
