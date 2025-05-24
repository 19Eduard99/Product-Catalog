import React, { useEffect, useMemo, useState } from 'react';
import styles from './ProductDetailsPage.module.scss';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { Breadcrumb } from '../../shared/Breadcrumb';
import { ProductGallery } from '../../components/ProductGallery';
import { ProductOptions } from '../../components/ProductOptions';
import { AboutProduct } from './About/AboutProduct';
import ProductInfo from '../../shared/Product/ProductInfo';
import { useProducts } from '../../contexts/ProductsContext';
import { ProductType } from '../../types/ProductType';
import { Loading } from '../../shared/Loading';
import { NotFound } from '../NotFound';
import { ProductsSlider } from '../../shared/ProductsSlider';
import { ErrorPage } from '../ErrorPage';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/type';

export const ProductDetailsPage: React.FC = () => {
  const theme = useSelector((state: RootState) => state.theme.value);
  const { products, error, isLoading } = useProducts();
  const [localError, setLocalError] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const pathnames = useMemo(() => {
    return location.pathname.split('/').filter(Boolean);
  }, [location.pathname]);

  const category = pathnames[0];

  const [categoryProducts, setCategoryProducts] = useState<ProductType[]>([]);
  const [product, setProduct] = useState<ProductType | null>(null);
  const [img, setImg] = useState('');
  const [localLoading, setLocalLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLocalLoading(true);
        setLocalError(false);

        let currentProducts = categoryProducts;

        if (
          !categoryProducts.length ||
          !categoryProducts.some(p => p.category === category)
        ) {
          await new Promise(resolve => setTimeout(resolve, 300));
          const res = await fetch(`./api/${category}.json`);
          const data: ProductType[] = await res.json();

          setCategoryProducts(data);
          currentProducts = data;
        } else if (!categoryProducts.length && products?.length) {
          currentProducts = products;
        }

        const foundProduct =
          currentProducts.find(p => p.id === id) ||
          products?.find(p => p.id === id);

        if (foundProduct) {
          setProduct(foundProduct);
          setImg(foundProduct.images[0]);
        } else {
          setProduct(null);
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        setLocalError(true);
      } finally {
        setLocalLoading(false);
      }
    };

    if (id) {
      fetchProducts();
    }
  }, [category, id, categoryProducts, products, isLoading]);

  const info = useMemo(
    () => [
      { title: 'Screen', value: product?.screen },
      { title: 'Resolution', value: product?.resolution },
      { title: 'Processor', value: product?.processor },
      { title: 'RAM', value: product?.ram },
      { title: 'Capacity', value: product?.capacity },
      { title: 'Camera', value: product?.camera },
      { title: 'Zoom', value: product?.zoom },
      { title: 'Cell', value: product?.cell },
    ],
    [product],
  );

  const recommendedProducts = useMemo(() => {
    if (!products?.length || !product) {
      return [];
    }

    return [...products]
      .filter(p => p.id !== id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 20);
  }, [products, id, product]);

  if (localLoading || isLoading) {
    return <Loading />;
  }

  if (error || localError) {
    return <ErrorPage />;
  }

  if (!product || !id) {
    return <NotFound title="Product not found" />;
  }

  return (
    <main>
      <section className={styles.productDetails}>
        <div className={styles.container}>
          <Breadcrumb pathnames={pathnames} />
          <button
            className={classNames(
              styles.productDetails__btn,
              styles[`productDetails__btn--${theme}`],
            )}
            onClick={() => navigate(-1)}
          >
            Back
          </button>

          <div className={styles.productDetails__content}>
            <article className={styles.productDetails__product}>
              <h1 className={styles.productDetails__title}>{product.name}</h1>

              <div className={styles.productDetails__wrapper}>
                <ProductGallery img={img} setImg={setImg} product={product} />
                <ProductOptions product={product} />
              </div>

              <div className={styles.productDetails__description}>
                <AboutProduct product={product} />

                <div className={styles.productDetails__tech}>
                  <h3 className={styles.productDetails__subtitle}>
                    Tech specs
                  </h3>
                  <ProductInfo info={info} />
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {recommendedProducts.length > 0 && (
        <ProductsSlider
          products={recommendedProducts}
          title="You may also like"
          fullPriceActive
        />
      )}
    </main>
  );
};
