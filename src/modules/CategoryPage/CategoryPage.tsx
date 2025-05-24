import React, { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Breadcrumb } from '../../shared/Breadcrumb';
import { Product } from '../../shared/Product';
import { ProductLoading } from '../../shared/ProductLoading';
import { useProducts } from '../../contexts/ProductsContext';
import { Loading } from '../../shared/Loading';
import { ErrorPage } from '../ErrorPage';
import { getCurrentProducts } from '../../utils/getCurrentProducts';
import { Pagination } from '../../components/Pagination';
import { getSearchWith, SearchParams } from '../../utils/searchHelper';
import styles from './CategoryPage.module.scss';
import { Filters } from './Filters';

type SelectValue = 'All' | '4' | '8' | '16';
type SortValue = 'Newest' | 'Alphabetical' | 'Cheapest';

type CategoryPageProps = {
  category: string;
  title: string;
};

export const CategoryPage: React.FC<CategoryPageProps> = ({
  category,
  title,
}) => {
  const { products, error, isLoading } = useProducts();
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);
  const [searchParams, setSearchParams] = useSearchParams();

  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowLoading(false), 500);

    return () => clearTimeout(timer);
  }, [showLoading]);

  const perPageParam = searchParams.get('perPage');
  const sortParam = searchParams.get('sort');
  const pageParam = searchParams.get('page');
  const query = searchParams.get('query')?.toLowerCase() || '';

  const selectedValue = (perPageParam as SelectValue) || 'All';
  const selectedSort = (sortParam as SortValue) || 'Newest';

  const currentPage = Number(pageParam) || 1;
  const perPage = selectedValue === 'All' ? null : Number(selectedValue);

  const filteredProducts = products
    ?.filter(product => product.category === category)
    .sort((a, b) => {
      if (selectedSort === 'Newest') {
        return b.year - a.year;
      }

      if (selectedSort === 'Alphabetical') {
        return a.name.localeCompare(b.name);
      }

      return a.price - b.price;
    })
    .filter(product => product.name.toLowerCase().includes(query));

  const currentProducts = getCurrentProducts(
    filteredProducts,
    perPage,
    currentPage,
  );

  const handleFiltersChange = (params: SearchParams) => {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorPage />;
  }

  const renderProductList = () => {
    if (showLoading) {
      let count = perPage || currentProducts.length || 4;

      if (count > 12) {
        count = 12;
      }

      return Array.from({ length: count }).map((_, i) => (
        <ProductLoading key={`loading-${i}`} />
      ));
    }

    return currentProducts.map(product => (
      <Product key={product.id} product={product} fullPriceActive={true} />
    ));
  };

  return (
    <main>
      <section className={styles.products}>
        <div className={styles.container}>
          <Breadcrumb pathnames={pathnames} />
          <h1 className={styles.products__title}>{title}</h1>

          <span className={styles.products__count}>
            {filteredProducts.length} models
          </span>

          <Filters
            selectedValue={selectedValue}
            selectedSort={selectedSort}
            onChange={handleFiltersChange}
            setShowLoading={setShowLoading}
            category={category}
          />

          {currentProducts.length !== 0 ? (
            <div className={styles.products__list}>{renderProductList()}</div>
          ) : (
            <div className={styles.products__empty}>
              <h2 className={styles.products__emptyText}>
                There are no {category} matching the query
              </h2>
            </div>
          )}

          {perPage && currentProducts.length !== 0 && (
            <Pagination
              total={filteredProducts.length}
              perPage={perPage}
              currentPage={currentPage}
              onPageChange={handleFiltersChange}
              setShowLoading={setShowLoading}
            />
          )}
        </div>
      </section>
    </main>
  );
};
