import { FilterPrices, FilterProcess, FilterTypeCategory, FilterTypeLevel, FilterTypeTypes } from '../products-api/types';
import { changFilterCategory, changFilterLTypes, changFilterLevel, changFilterMaxPrice, changFilterMinPrice, filterProcessSlice } from './filter-process';

describe('reducer: filterProcessSlice', () => {
  let state: FilterProcess;

  beforeEach(() => {
    state = {
      filter: {
        maxPrice: 0,
        minPrice:0,
        category:null,
        type:[],
        level:[],
        min:0,
        max:0
      }};});

  it('Category', () => {
    const filterCategoryReducer = filterProcessSlice.reducer(state, {
      type: changFilterCategory,
      payload:  FilterTypeCategory.Photocamera
    });
    expect(filterCategoryReducer).toEqual({
      filter: {
        category:'Фотокамера',
        maxPrice: 0,
        minPrice:0,
        type:[],
        level:[],
        min:0,
        max:0
      }});
  });

  it('Type', () => {
    const filterTypeReducer = filterProcessSlice.reducer(state, {
      type: changFilterLTypes,
      payload: FilterTypeTypes.Collection
    });
    expect(filterTypeReducer).toEqual({
      filter: {
        type: ['Коллекционная'],
        maxPrice: 0,
        minPrice:0,
        category:null,
        level:[],
        min:0,
        max:0
      }});});

  it('Level', () => {
    const filterLevelReducer = filterProcessSlice.reducer(state, {
      type: changFilterLevel,
      payload: FilterTypeLevel.Zero
    });
    expect(filterLevelReducer).toEqual({
      filter: {
        type: [],
        maxPrice: 0,
        minPrice:0,
        category:null,
        level:['Нулевой'],
        min:0,
        max:0
      }});});

  it('MinPrice', () => {
    const filterMinPriceReducer = filterProcessSlice.reducer(state, {
      type: changFilterMinPrice,
      payload: FilterPrices.Min
    });
    expect(filterMinPriceReducer).toEqual({
      filter: {
        type: [],
        maxPrice: 0,
        minPrice:'min',
        category:null,
        level:[],
        min:0,
        max:0
      }});});

  it('MaxPrice', () => {
    const filterMaxReducer = filterProcessSlice.reducer(state, {
      type: changFilterMaxPrice,
      payload: FilterPrices.Max
    });
    expect(filterMaxReducer).toEqual({
      filter: {
        type: [],
        maxPrice: 'max',
        minPrice:0,
        category:null,
        level:[],
        min:0,
        max:0
      }});});

});
