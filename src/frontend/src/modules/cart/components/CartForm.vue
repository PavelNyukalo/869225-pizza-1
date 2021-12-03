<template>
  <div class="cart-form">
    <label class="cart-form__select">
      <span class="cart-form__label">Получение заказа:</span>

      <select name="test" class="select">
        <option value="1">Заберу сам</option>
        <option value="2">Новый адрес</option>
        <option value="3">Дом</option>
      </select>
    </label>

    <AppInput
      inputValue="заглушка"
      label="Контактный телефон"
      :bigLabel="true"
      name="tel"
      placeholder="+7 999-999-99-99"
    />

    <div class="cart-form__address">
      <span class="cart-form__label">Новый адрес:</span>

      <div class="cart-form__input">
        <AppInput inputValue="заглушка" label="Улица*" name="street" />
      </div>

      <div class="cart-form__input cart-form__input--small">
        <AppInput inputValue="заглушка" label="Дом*" name="house" />
      </div>

      <div class="cart-form__input cart-form__input--small">
        <AppInput inputValue="заглушка" label="Квартира" name="apartment" />
      </div>
    </div>
  </div>
</template>

<script>
import AppInput from "@/common/components/AppInput.vue";

export default {
  name: "CartForm",

  components: {
    AppInput,
  },
};
</script>
