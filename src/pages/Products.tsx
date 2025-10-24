import React, { useState, useEffect, useMemo, useCallback, memo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Container, Title } from '../styles/GlobalStyles';
import { useCart } from '../contexts/CartContext';
import { products } from '../data/products';
import { Product } from '../types/Product';
import { usePrice } from '../hooks/usePrice';
import { useVirtualScroll } from '../hooks/useVirtualScroll';
import OptimizedProductCard from '../components/OptimizedProductCard';
import {
  ProductsWrapper,
  FilterSection,
  FilterContainer,
  FilterButton,
  ProductsGrid,
  PageHeader,
  PageTitle,
  PageSubtitle
} from '../styles/pages/ProductsStyles';

// Виртуализированная сетка продуктов
const VirtualizedProductGrid = styled.div`
  width: 100%;
  height: 800px; // Фиксированная высота для виртуализации
  margin-top: 30px;
`;


const VirtualContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 30px;
  padding: 0 20px;
  width: 100%;
`;

const Products: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { addToCart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  // Мемоизируем категории
  const categories = useMemo(() => [
    { id: 'all', name: 'All Courses' },
    { id: 'C++ Basics', name: 'C++ Basics' },
    { id: 'C++ Fundamentals', name: 'C++ Fundamentals' },
    { id: 'C++ I/O Operations', name: 'Input/Output' },
    { id: 'Control Structures', name: 'Control Structures' },
    { id: 'Loops & Practice', name: 'Loops & Practice' },
    // { id: 'Marketing Psychology', name: 'Marketing Psychology' },
    // { id: 'Advanced Copywriting', name: 'Advanced Copywriting' },
    // { id: 'Direct Response', name: 'Direct Response' },
    // { id: 'Professional Copywriting', name: 'Professional Copywriting' },
    // { id: 'Conversion Optimization', name: 'Conversion Optimization' },
    // { id: 'Complete Mastery', name: 'Complete Mastery' }
  ], []);

  // Мемоизируем фильтрацию продуктов
  const filteredProducts = useMemo(() => {
    return selectedCategory === 'all' 
      ? products 
      : products.filter((product: Product) => product.category === selectedCategory);
  }, [selectedCategory]);

  // Виртуализация для больших списков (если продуктов больше 50)
  const useVirtualization = filteredProducts.length > 50;
  
  const virtualScroll = useVirtualScroll(filteredProducts, {
    itemHeight: 450, // Высота карточки продукта + отступы
    containerHeight: 800,
    overscan: 3
  });

  // Мемоизируем обработчики
  const handleAddToCart = useCallback((product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
      category: product.category
    });
  }, [addToCart]);

  const handleViewDetails = useCallback((id: number) => {
    navigate(`/product/${id}`);
  }, [navigate]);

  const handleCategoryChange = useCallback((categoryId: string) => {
    setSelectedCategory(categoryId);
    if (categoryId === 'all') {
      navigate('/products', { replace: true });
    } else {
      navigate(`/products?category=${categoryId}`, { replace: true });
    }
  }, [navigate]);

  // Читаем категорию из URL параметров
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const categoryParam = searchParams.get('category');
    
    if (categoryParam) {
      const validCategories = categories.map(cat => cat.id);
      if (validCategories.includes(categoryParam)) {
        setSelectedCategory(categoryParam);
      } else {
        navigate('/products', { replace: true });
        setSelectedCategory('all');
      }
    } else {
      setSelectedCategory('all');
    }
  }, [location.search, navigate, categories]);

  return (
    <ProductsWrapper>
      <Container>
            <PageHeader>
          <PageTitle>C++ Programming Course Collection</PageTitle>
          <PageSubtitle>Master C++ programming with our comprehensive C++ fundamentals and advanced development technique video library</PageSubtitle>
        </PageHeader>
        
        <FilterSection>
          <FilterContainer>
            {categories.map(category => (
              <FilterButton
                key={category.id}
                active={selectedCategory === category.id}
                onClick={() => handleCategoryChange(category.id)}
              >
                {category.name}
              </FilterButton>
            ))}
          </FilterContainer>
        </FilterSection>

        {useVirtualization ? (
          <VirtualizedProductGrid>
            <div {...virtualScroll.containerProps}>
              <div {...virtualScroll.scrollElementProps}>
                <VirtualContent>
                  {virtualScroll.virtualItems.map((product: Product, index) => (
                    <OptimizedProductCard
                      key={`${product.id}-${index}`}
                      product={product}
                      onAddToCart={handleAddToCart}
                      onViewDetails={handleViewDetails}
                    />
                  ))}
                </VirtualContent>
              </div>
            </div>
          </VirtualizedProductGrid>
        ) : (
          <ProductsGrid>
            {filteredProducts.map((product: Product) => (
              <OptimizedProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onViewDetails={handleViewDetails}
              />
            ))}
          </ProductsGrid>
        )}
      </Container>
    </ProductsWrapper>
  );
};

export default memo(Products);
