import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import styles from './Slider.module.scss';

import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/type';

const slides = [1, 2, 3];

export const Slider: React.FC = () => {
  const theme = useSelector((state: RootState) => state.theme.value);

  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 640);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 640);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <div className={styles.wrapper}>
        <Swiper
          className={styles.slider}
          modules={[Navigation, Pagination, Autoplay]}
          navigation={{
            nextEl: `.${styles.slider__controlsNext}`,
            prevEl: `.${styles.slider__controlsPrev}`,
          }}
          pagination={{ clickable: true, el: `.${styles.slider__pagination}` }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          spaceBetween={10}
          loop
        >
          {slides.map(num => (
            <SwiperSlide key={num} className={styles.slider__slide}>
              <picture>
                <source
                  type="image/webp"
                  srcSet={`img/slider/slide-${num}-${isDesktop ? 'desktop' : 'mobile'}.webp`}
                />
                <source
                  type="image/avif"
                  srcSet={`img/slider/slide-${num}-${isDesktop ? 'desktop' : 'mobile'}.avif`}
                />
                <img
                  className={styles.slider__img}
                  src={`img/slider/slide-${num}-${isDesktop ? 'desktop' : 'mobile'}.png`}
                  alt={`Slide ${num}`}
                />
              </picture>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className={styles.slider__controlsPrev}>
          <span
            className={classNames(
              theme === 'light'
                ? styles['slider__prev--gray']
                : styles.slider__prev,
            )}
          />
        </div>
        <div className={styles.slider__controlsNext}>
          <span
            className={classNames(
              theme === 'light'
                ? styles['slider__next--gray']
                : styles.slider__next,
            )}
          />
        </div>
      </div>
      <div className={styles.slider__pagination} />
    </>
  );
};
