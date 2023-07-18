import { getRate} from '../../utils/utils';
import { Reviews } from '../../store/review-list-api/type';
import { useEffect, useState } from 'react';
import { BACKEND_URL } from '../../services/constatnts';
import { Products } from '../../store/products-api/types';
import { api } from '../use-get-sort-products/use-get-sort-products';

export const useGetDataWithReview = ({ data }: {
  data: Products | undefined;
}) => {
  const [dataFinal, setDataFinal] = useState<Products>([]);
  const reviewRequests: Promise<Reviews>[] = [];
  const [inProgress, setInProgress] = useState<boolean>(true);

  useEffect(() => {
    if (data) {
      setDataFinal([...data]);
      const fetchAllreviews = async () => {
        setInProgress(true);
        for (let i = 0; i < data.length; i++) {
          reviewRequests.push(
            api<Reviews>(`${BACKEND_URL}cameras/${data[i].id}/reviews`)
          );
        }
        const reviewResponse = await Promise.all(reviewRequests);
        reviewResponse.forEach((item, index) => {
          const dataReview = item;
          setDataFinal((prev) => {
            const newState = prev.map((elem, elemIndex) => {
              if (index === elemIndex) {
                return {
                  ...elem,
                  rating: getRate(dataReview)
                };
              }
              return elem;
            });
            return newState;
          });
        });
        setInProgress(false);
      };
      fetchAllreviews();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return { dataFinal, inProgress };
};
