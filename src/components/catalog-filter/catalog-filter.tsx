export const CatalogFilter = () => (
  <form action="#">
    <h2 className="visually-hidden">Фильтр</h2>
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className="custom-input">
          <label>
            <input type="number" name="price" placeholder="от" onChange={(item)=>item}/>
          </label>
        </div>
        <div className="custom-input">
          <label>
            <input type="number" name="priceUp" placeholder="до" onChange={(item)=>item}/>
          </label>
        </div>
      </div>
    </fieldset>
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Категория</legend>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input type="checkbox" name="photocamera" onChange={(item)=>item}/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Фотокамера</span>
        </label>
      </div>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input type="checkbox" name="videocamera" onChange={(item)=>item}/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Видеокамера</span>
        </label>
      </div>
    </fieldset>
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Тип камеры</legend>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input type="checkbox" name="digital" onChange={(item)=>item}/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Цифровая</span>
        </label>
      </div>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input type="checkbox" name="film" onChange={(item)=>item}/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Плёночная</span>
        </label>
      </div>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input type="checkbox" name="snapshot" onChange={(item)=>item}/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Моментальная</span>
        </label>
      </div>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input type="checkbox" name="collection" onChange={(item)=>item}/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Коллекционная</span>
        </label>
      </div>
    </fieldset>
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Уровень</legend>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input type="checkbox" name="zero" onChange={(item)=>item}/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Нулевой</span>
        </label>
      </div>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input type="checkbox" name="non-professional" onChange={(item)=>item}/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Любительский</span>
        </label>
      </div>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input type="checkbox" name="professional" onChange={(item)=>item}/><span className="custom-checkbox__icon"></span><span className="custom-checkbox__label">Профессиональный</span>
        </label>
      </div>
    </fieldset>
    <button className="btn catalog-filter__reset-btn" type="reset">Сбросить фильтры
    </button>
  </form>
);
