import { useState } from 'react';
import { useAppSelector } from '../../hooks';
import { BasketItem } from '../basket-item';
import { BasketItemType } from '../basket-item/basket-item';
import { BasketListEmpty } from '../basket-list-empty';
import { Product } from '../../store/products-api/types';
import { BasketRemoveCameraModal } from '../basket-remove-camera-modal';

export const BasketList = () => {
  const basketCameras = useAppSelector((state) => state.BASKET.basketProducts);

  localStorage.setItem('persist-state', JSON.stringify(basketCameras));

  const [openedRemoveModal, setOpenedRemoveModal] = useState(false);
  const [currentCamera, setCurrentCamera] = useState<Product>({} as Product);

  const handleRemoveModalCloseClick = () => {
    setOpenedRemoveModal(false);
  };

  return (
    <ul className="basket__list" data-testid='basket-list'>
      {!basketCameras?.length
        ? <BasketListEmpty />
        : basketCameras.map((camera) => (
          <BasketItem
            camera={camera}
            type={BasketItemType.Standart}
            setOpenedRemoveModal={setOpenedRemoveModal}
            setCurrentCamera={setCurrentCamera}
            key={camera.id}
          />))}
      <BasketRemoveCameraModal camera={currentCamera} isOpen={openedRemoveModal} onCloseCLick={handleRemoveModalCloseClick} />
    </ul>
  );
};
