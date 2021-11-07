<template>
  <form class="form" autocomplete="off">
    <h3>Личные данные</h3>
    <div class="field-set">
      <div class="field">
        <label for="last-name">Фамилия</label>
        <input id="last-name" type="text" required>
      </div>
      <div class="field">
        <label for="first-name">Имя</label>
        <input id="first-name" type="text" required>
      </div>
      <div class="field">
        <label for="middle-name">Отчество</label>
        <input id="middle-name" type="text" required>
      </div>
      <div class="field">
        <label for="birthday">Дата рождения</label>
        <input id="birthday" type="text" placeholder="дд.мм.гггг" required>
      </div>
      <div class="field">
        <label for="email">E-mail</label>
        <input id="email" type="email" placeholder="mailbox@exapmple.com" required>
      </div>
      <div class="field">
        <span>Пол</span>
        <div class="radio-group">
          <div class="radio-group__item">
            <input id="male" type="radio" name="gender" required><label for="male">Мужской</label>
          </div>
          <div class="radio-group__item">
            <input id="female" type="radio" name="gender"><label for="female">Женский</label>
          </div>
        </div>
      </div>
    </div>
    <h3>Паспортные данные</h3>
    <div class="field-set">
      <div class="field">
        <label for="pp-nationality">Гражданство</label>
        <input id="pp-nationality" type="text">
      </div>
      <div v-if="isNotRussian" class="nation-specific nation-specific_not-russian">
        <div class="field">
          <label for="latin-last-name">Фамилия на латинице</label>
          <input id="latin-last-name" type="text" required>
        </div>
        <div class="field">
          <label for="latin-first-name">Имя на латинице</label>
          <input id="latin-first-name" type="text" required>
        </div>
        <div class="field">
          <label for="pp-number">Номер паспорта</label>
          <input id="pp-number" type="text" required>
        </div>
        <div class="field">
          <label for="pp-issue-country">Страна выдачи</label>
          <input id="pp-issue-country" type="text" required>
        </div>
        <div class="field">
          <label for="pp-type">Тип паспорта</label>
          <input id="pp-type" type="text" required>
        </div>
      </div>
      <div v-else class="nation-specific nation-specific_russian">
        <div class="field field_pp-series">
          <label for="pp-series">Серия паспорта</label>
          <input id="pp-series" type="text" placeholder="xx xx" required>
        </div>
        <div class="field field_pp-number">
          <label for="pp-number">Номер паспорта</label>
          <input id="pp-number" type="text" placeholder="yyyyyy" required>
        </div>
        <div class="field field_pp-issue-date">
          <label for="pp-issue-date">Дата выдачи</label>
          <input id="pp-issue-date" type="text" placeholder="дд.мм.гггг" required>
        </div>
      </div>
      <div class="field">
        <span>Меняли ли фамилию или имя?</span>
        <div class="radio-group">
          <div class="radio-group__item">
            <input v-model="namesChangedAnswer" id="names-changed-no" type="radio" name="names-changed" value="no" required><label for="names-changed-no">Нет</label>
          </div>
          <div class="radio-group__item">
            <input v-model="namesChangedAnswer" id="names-changed-yes" type="radio" name="names-changed" value="yes"><label for="names-changed-yes">Да</label>
          </div>
        </div>
      </div>
      <div v-if="isNamesChanged" class="prev-names">
        <div class="field">
          <label for="prev-last-name">Фамилия</label>
          <input id="prev-last-name" type="text">
        </div>
        <div class="field">
          <label for="prev-first-name">Имя</label>
          <input id="prev-first-name" type="text">
        </div>
      </div>
    </div>
    <div class="form-footer">
      <button id="submit-btn" class="send-btn" type="submit" disabled>Отправить</button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      namesChangedAnswer: 'no',
      isNotRussian: false,
    };
  },
  computed: {
    isNamesChanged() {
      return this.namesChangedAnswer === 'no' ? false : true;
    },
  },
};
</script>

<style scoped>
.form {
  width: 100%;
  max-width: 600px;
  padding: 20px;
  margin: 0 auto;
  border: 1px solid #ccd8e4;
  border-radius: 6px;
  color:#7c8288;
  background: #ffffff;
}
h3 {
  font-weight: normal;
}
.field-set {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 1em;
  padding: 0 1em;
}
.nation-specific {
  grid-column: 1 / span 2;
}
.nation-specific_russian {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  column-gap: 1em;
}
.field_pp-series {
  grid-column: 1 / span 2;
}
.field_pp-number {
  grid-column: 3 / span 3;
}
.field_pp-issue-date {
  grid-column: 6 / span 3;
}
.nation-specific_not-russian {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 1em;
}
.field {
  display: flex;
  flex-direction: column;
  margin-bottom: 0.7em;
}
label,
span {
  font-size: 0.9em;
}
input {
  width: 100%;
  padding: 0.2em 0.4em;
  border-color: rgba(161, 170, 179, 0.3);
  border-style: solid;
  border-radius: 4px;
  font-size: 1.2em;
  color: #2c3e50;
  background-color: transparent;
}
input::placeholder {
  font-size: 0.9em;
  color:#a1aab3;
}
input:focus {
  border-color: #7794b1;
  outline: none;
  background-color: transparent;
}
.radio-group {
  display: flex;
  align-items: stretch;
  flex-grow: 1;
}
.radio-group__item {
  display: flex;
  align-items: center;
}
input[type="radio"] {
  width: initial;
  margin-right: 0.2em;
}
input[type="radio"] ~ label {
  margin-right: 1em;
  font-size: 1.2em;
}
input[type="radio"]:checked ~ label {
  color: #2c3e50;
}
.prev-names {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 1em;
  grid-column: 1 / span 2;
}
.form-footer {
  text-align: right;
  margin-top: 1em;
}
.send-btn {
  padding: 0.6em 1em;
  background-color: rgba(161, 170, 179, 0.3);
  border: 2px solid#7794b1;;
  border-radius: 4px;
}
.send-btn:disabled {
  background-color: transparent;
  border-color: rgba(161, 170, 179, 0.3);
}
</style>
