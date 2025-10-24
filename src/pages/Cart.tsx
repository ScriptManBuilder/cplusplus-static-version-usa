import React from 'react';
import { Link } from 'react-router-dom';
import { MinusIcon, PlusIcon, TrashIcon, ShoppingBagIcon } from '../components/Icons';
import { Button, Container, Title } from '../styles/GlobalStyles';
import { useCart } from '../contexts/CartContext';
import { usePrice } from '../hooks/usePrice';
import { getProductImage } from '../data/products';
import {
  CartWrapper,
  CartContent,
  CartItems,
  CartItem,
  ItemImage,
  ItemInfo,
  QuantityControls,
  QuantityButton,
  Quantity,
  ItemPrice,
  RemoveButton,
  CartSummary,
  SummaryTitle,
  SummaryRow,
  EmptyCart,
  CheckoutButton,
  ContinueShoppingButton
} from '../styles/pages/CartStyles';

const Cart: React.FC = () => {
  const { state, updateQuantity, removeItem } = useCart();
  const { formatPrice } = usePrice();

  const subtotal = state.total;
  const shipping = subtotal > 50 ? 0 : 12.00;
  const total = subtotal + shipping;

  if (state.items.length === 0) {
    return (
      <CartWrapper>
        <Container>
          <EmptyCart>
            <ShoppingBagIcon className="icon" />
            <h2>Your cart is empty</h2>
            <p>Add some products to get started</p>
            <Button as={Link} to="/products" variant="primary">
              Shop Now
            </Button>
          </EmptyCart>
        </Container>
      </CartWrapper>
    );
  }

  return (
    <CartWrapper>
      <Container>
        <Title style={{ color: '#1f2937', marginBottom: '40px', fontSize: '2.5rem', fontWeight: '700' }}>Shopping Cart</Title>
        
        <CartContent>
          <CartItems>
            {state.items.map((item) => (
              <CartItem key={item.id}>
                <ItemImage>
                  <img src={getProductImage(item.id)} alt={item.name} />
                </ItemImage>
                <ItemInfo>
                  <h3>{item.name}</h3>
                  <ItemPrice>{formatPrice(item.price)}</ItemPrice>
                </ItemInfo>
                <QuantityControls>
                  <QuantityButton 
                    onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                  >
                    <MinusIcon />
                  </QuantityButton>
                  <Quantity>{item.quantity}</Quantity>
                  <QuantityButton 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <PlusIcon />
                  </QuantityButton>
                </QuantityControls>
                <RemoveButton 
                  onClick={() => removeItem(item.id)}
                >
                  <TrashIcon />
                </RemoveButton>
              </CartItem>
            ))}
          </CartItems>

          <CartSummary>
            <SummaryTitle>Order Summary</SummaryTitle>

            <SummaryRow>
              <span>Subtotal:</span>
              <span>{formatPrice(subtotal)}</span>
            </SummaryRow>

            {/* <SummaryRow>
              <span>Shipping:</span>
              <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
            </SummaryRow> */}

            <SummaryRow className="total">
              <span>Total:</span>
              <span>{formatPrice(total)}</span>
            </SummaryRow>

            <Button as={Link} to="/checkout" variant="primary">
              Proceed to Checkout
            </Button>
            
            {/* <div style={{ textAlign: 'center', marginTop: '15px', fontSize: '0.85rem', color: '#9ca3af' }}>
              Accept 4 payment methods
            </div> */}
          </CartSummary>
        </CartContent>

        <ContinueShoppingButton>
          <Link to="/products">Continue Shopping</Link>
        </ContinueShoppingButton>
      </Container>
    </CartWrapper>
  );
};

export default Cart;