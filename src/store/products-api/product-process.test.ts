import { changeSortBy, changeSortOrder, productProcessSlice } from './products-process';
import { ProductProcess, SortingTypeBy, SortingTypeOrder} from './types';

describe('reducer: productProcessSlice', () => {
  let state: ProductProcess;

  beforeEach(() => {
    state = {
      filter: {
        by:SortingTypeBy.Price,
        order: SortingTypeOrder.Up,
      }
    };
  });

  it('SortingBy', () => {
    const sortingByReducer = productProcessSlice.reducer(state, {
      type: changeSortBy,
      payload: SortingTypeBy.Rate
    });
    expect(sortingByReducer).toEqual({
      filter: {
        by:'rating',
        order: SortingTypeOrder.Up,
      }});
  });

  it('SortingOrder', () => {
    const sortingOrderReducer = productProcessSlice.reducer(state, {
      type: changeSortOrder,
      payload: SortingTypeOrder.Down
    });
    expect(sortingOrderReducer).toEqual({
      filter: {
        by:'price',
        order: SortingTypeOrder.Down,
      }});
  });
});
