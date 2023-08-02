import { makeFakerProduct } from '../../utils/mocks';
import { addProduct, basketProcessSlice, decrementProductCount, removeProduct, resetOrderStatus, setCoupon, setProductCount } from './basket-process';
import { BasketSlice, Coupon, Status } from './const';

const camera = makeFakerProduct();

describe('Reducer: basketProcessSlice', () => {
  let state: BasketSlice;

  beforeEach(() => {
    state = {
      discounts: 0,
      basketProducts: [],
      totalCount: 0,
      discount: 0,
      coupon: null,
      orderStatus: Status.Idle,
    };
  });
  it('Should change totalCount by a add camera', () => {
    expect(basketProcessSlice.reducer(state, addProduct(camera)))
      .toEqual({
        ...state,
        basketProducts: [{ ...camera, count: 1 }],
        totalCount: state.totalCount + 1
      });
  });

  it('Should change camera count by a decrement camera count', () => {
    state.basketProducts = [{ ...camera, count: 2 }];
    state.totalCount = 2;

    expect(basketProcessSlice.reducer(state, decrementProductCount(camera)))
      .toEqual({
        ...state,
        basketProducts: [{ ...state.basketProducts[0], count: 1 }],
        totalCount: state.totalCount - 1
      });
  });

  it('Should delete camera and change camera count by a remove camera', () => {
    expect(basketProcessSlice.reducer(state, removeProduct(camera)))
      .toEqual(state);
  });

  it('Should change camera count by a set camera count', () => {
    state.basketProducts = [{ ...camera, count: 1 }];
    const payloadCount = 10;

    expect(basketProcessSlice.reducer(state, setProductCount({ id: state.basketProducts[0].id, count: payloadCount })))
      .toEqual({
        ...state,
        basketProducts: [{ ...state.basketProducts[0], count: payloadCount }],
        totalCount: payloadCount
      });
  });

  it('Should change coupon by a given coupon', () => {
    expect(basketProcessSlice.reducer(state, setCoupon(Coupon.First)))
      .toEqual({
        ...state,
        coupon: Coupon.First
      });
  });

  it('Should reset orderStatus by a given reset order status', () => {
    expect(basketProcessSlice.reducer(state, resetOrderStatus()))
      .toEqual(state);
  });
});

