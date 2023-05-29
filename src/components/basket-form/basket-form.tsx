const BasketForm = () => (
  <form action="#">
    <div className="custom-input">
      <label><span className="custom-input__label">Промокод</span>
        <input type="text" name="promo" placeholder="Введите промокод" />
      </label>
      <p className="custom-input__error">Промокод неверный</p>
      <p className="custom-input__success">Промокод принят!</p>
    </div>
    <button className="btn" type="submit">Применить
    </button>
  </form>
)

export default BasketForm;
