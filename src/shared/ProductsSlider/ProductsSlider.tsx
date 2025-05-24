import React, { useEffect, useMemo, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Product } from '../Product';
import { ProductType } from '../../types/ProductType';

import styles from './ProductsSlider.module.scss';
import { ProductLoading } from '../ProductLoading';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/type';

type Props = {
  title: string;
  products: ProductType[];
  fullPriceActive?: boolean;
};

export const ProductsSlider: React.FC<Props> = ({
  title,
  products,
  fullPriceActive = false,
}) => {
  const [isTablet, setIsTablet] = useState(window.innerWidth >= 640);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const [showLoading, setShowLoading] = useState(true);

  const theme = useSelector((state: RootState) => state.theme.value);

  const slidesToShow = isDesktop ? 4 : isTablet ? 2 : 1;

  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth >= 640);
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setShowLoading(true);

    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [theme]);

  const uniqueId = useMemo(
    () => Math.random().toString(36).substring(2, 9),
    [],
  );

  const prevBtnId = `prev-${uniqueId}`;
  const nextBtnId = `next-${uniqueId}`;

  const renderSlides = () => {
    if (showLoading) {
      return Array.from({ length: slidesToShow }).map((_, i) => (
        <SwiperSlide key={`loading-${i}`} className={styles.slider__slide}>
          <ProductLoading />
        </SwiperSlide>
      ));
    }

    return products.map(product => (
      <SwiperSlide key={product.id} className={styles.slider__slide}>
        <Product product={product} fullPriceActive={fullPriceActive} />
      </SwiperSlide>
    ));
  };

  return (
    <section className={styles.productsSlider}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <div className={styles.slider__controls}>
            <button id={prevBtnId} className={styles.slider__controlsPrev}>
              <span
                className={classNames(
                  theme === 'light' ? styles.light : styles.dark,
                )}
              />
            </button>
            <button id={nextBtnId} className={styles.slider__controlsNext}>
              <span
                className={classNames(
                  theme === 'light' ? styles.light : styles.dark,
                )}
              />
            </button>
          </div>
        </div>

        <div className={styles.slider}>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            slidesPerView={slidesToShow}
            spaceBetween={10}
            navigation={{
              nextEl: `#${nextBtnId}`,
              prevEl: `#${prevBtnId}`,
            }}
          >
            {renderSlides()}
          </Swiper>
        </div>
      </div>
    </section>
  );
};
