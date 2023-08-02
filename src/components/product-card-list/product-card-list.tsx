import { useState } from 'react';
import { BasketItemModal } from '../basket-item-modal';
import { BasketSuccessModal } from '../basket-success-modal';
import { ProductCard } from '../product-card';
import { ProductCardListProps } from './types';
import { Product } from '../../store/products-api/types';

export const ProductCardList = ({cameras}:ProductCardListProps) =>{
  const [openedAddModal, setOpenedAddModal] = useState(false);
  const [openedAddSuccessModal, setOpenedAddSuccessModal] = useState(false);
  const [currentCamera, setCurrentCamera] = useState<Product>(cameras[0]);

  const handleAddModalCloseClick = () => {
    setOpenedAddModal(false);
  };

  const handleAddSuccessModalCloseClick = () => {
    setOpenedAddSuccessModal(false);
  };

  return(
    <div className="cards catalog__cards" data-testid="test-product-card">
      {cameras.map((item) => <ProductCard camera={item} key={item.id} setCurrentCamera={setCurrentCamera} setOpenedAddModal={setOpenedAddModal} /> )}
      <BasketItemModal isOpen={openedAddModal} camera={currentCamera} setOpenedAddSuccessModal={setOpenedAddSuccessModal} onCloseCLick={handleAddModalCloseClick}/>
      <BasketSuccessModal isOpen={openedAddSuccessModal} onCloseCLick={handleAddSuccessModalCloseClick} />
    </div>
  );
};
export default ProductCardList;
