<template>
  <form class="form" autocomplete="off" @submit.prevent="formSubmitHandler">
    <h3>Личные данные</h3>
    <div class="field-set">
      <div class="field">
        <label for="last-name">Фамилия</label>
        <input v-model="formData.lastName" id="last-name" type="text" required>
      </div>
      <div class="field">
        <label for="first-name">Имя</label>
        <input v-model="formData.firstName" id="first-name" type="text" required>
      </div>
      <div class="field">
        <label for="middle-name">Отчество</label>
        <input v-model="formData.middleName" id="middle-name" type="text" required>
      </div>
      <div class="field">
        <label for="birthday">Дата рождения</label>
        <input v-model="formData.birthday" id="birthday" type="text" placeholder="дд.мм.гггг" required>
      </div>
      <div class="field">
        <label for="email">E-mail</label>
        <input v-model="formData.email" id="email" type="email" placeholder="mailbox@exapmple.com" required>
      </div>
      <div class="field">
        <span>Пол</span>
        <div class="radio-group">
          <div class="radio-group__item">
            <input v-model="formData.gender" id="male" type="radio" value="male" required><label for="male">Мужской</label>
          </div>
          <div class="radio-group__item">
            <input v-model="formData.gender" id="female" type="radio" value="female"><label for="female">Женский</label>
          </div>
        </div>
      </div>
    </div>
    <h3>Паспортные данные</h3>
    <div class="field-set">
      <div class="field">
        <Dropdown
          input-id="nationality"
          label="Гражданство"
          v-model="formData.nationality"
          :items="nationalities"
          @dropdown-closed="nationalityDropdownCloseHandler"
        />
      </div>
      <div v-if="isNationalitySelected" class="nation-specific">
        <div v-if="isNotRussian" class="not-russian">
          <div class="field">
            <label for="latin-last-name">Фамилия на латинице</label>
            <input v-model="formData.latinLastName" id="latin-last-name" type="text" required>
          </div>
          <div class="field">
            <label for="latin-first-name">Имя на латинице</label>
            <input v-model="formData.latinFirstName" id="latin-first-name" type="text" required>
          </div>
          <div class="field">
            <label for="pp-number">Номер паспорта</label>
            <input v-model="formData.pasportNumber" id="pp-number" type="text" required>
          </div>
          <div class="field">
            <Dropdown
              input-id="issue-country"
              label="Страна выдачи"
              v-model="formData.issueСountry"
              :items="nationalities"
            />
          </div>
          <div class="field">
            <Dropdown
              input-id="passport-type"
              label="Тип паспорта"
              v-model="formData.passportType"
              :items="passportTypes"
            />
          </div>
        </div>
        <div v-else class="russian">
          <div class="field field_pp-series">
            <label for="pp-series">Серия паспорта</label>
            <input v-model="formData.pasportSeries" id="pp-series" type="text" placeholder="xx xx" required>
          </div>
          <div class="field field_pp-number">
            <label for="pp-number">Номер паспорта</label>
            <input v-model="formData.pasportNumber" id="pp-number" type="text" placeholder="yyyyyy" required>
          </div>
          <div class="field field_pp-issue-date">
            <label for="pp-issue-date">Дата выдачи</label>
            <input v-model="formData.issueDate" id="pp-issue-date" type="text" placeholder="дд.мм.гггг" required>
          </div>
        </div>
        <div class="field">
          <span>Меняли ли фамилию или имя?</span>
          <div class="radio-group">
            <div class="radio-group__item">
              <input v-model="formData.namesChanged" id="names-changed-no" type="radio" value="no" required><label for="names-changed-no">Нет</label>
            </div>
            <div class="radio-group__item">
              <input v-model="formData.namesChanged" id="names-changed-yes" type="radio" value="yes"><label for="names-changed-yes">Да</label>
            </div>
          </div>
        </div>
        <div v-if="isNamesChanged" class="prev-names">
          <div class="field">
            <label for="prev-last-name">Фамилия</label>
            <input v-model="formData.prevLastName" id="prev-last-name" type="text">
          </div>
          <div class="field">
            <label for="prev-first-name">Имя</label>
            <input v-model="formData.prevFirstName" id="prev-first-name" type="text">
          </div>
        </div>

      </div>

    </div>
    <div class="form-footer">
      <button id="submit-btn" class="send-btn" type="submit" :disabled="!isSubmitPossible">Отправить</button>
    </div>
  </form>
</template>

<script>
import Dropdown from './Dropdown.vue';
import citizenships from '@/assets/data/citizenships.json';
import passportTypesData from '@/assets/data/passport-types.json';

export default {
  components: {
    Dropdown,
  },
  data() {
    return {
      nationalities: null,
      passportTypes: null,
      isNationalityDropdownClosed: true,
      formData: {
        firstName: '',
        lastName: '',
        middleName: '',
        birthday: '',
        email: '',
        gender: '',
        nationality: '',
        latinFirstName: '',
        latinLastName: '',
        pasportNumber: '',
        issueСountry: '',
        passportType: '',
        pasportSeries: '',
        issueDate: '',
        namesChanged: 'no',
        prevFirstName: '',
        prevLastName: '',
      },
    };
  },
  created() {
    this.nationalities = citizenships.map((item) => ({
      id: item.id,
      value: item.nationality,
    }));
    this.passportTypes = passportTypesData.map((item) => ({
      id: item.id,
      value: item.type,
    }));
  },
  computed: {
    isNationalitySelected() {
      return this.formData.nationality !== '' && this.isNationalityDropdownClosed;
    },
    isNamesChanged() {
      return this.formData.namesChanged === 'no' ? false : true;
    },
    isNotRussian() {
      return this.formData.nationality !== 'Russia';
    },
    isCommonFieldsFilled() {
      return Boolean(
        (
          this.formData.lastName
          && this.formData.firstName
          && this.formData.middleName
          && this.formData.birthday
          && this.formData.email
          && this.formData.gender
        )
          &&
        (
          this.formData.namesChanged === 'no'
          || this.formData.namesChanged === 'yes'
          && (this.formData.prevLastName || this.formData.prevFirstName))
        );
    },
    isNationalFieldsFilled() {
      if (this.formData.nationality) {
        return this.isNotRussian
          ? Boolean(
            this.formData.latinLastName
            && this.formData.latinFirstName
            && this.formData.pasportNumber
            && this.formData.issueСountry
            && this.formData.passportType
          )
          : Boolean(
            this.formData.pasportSeries
            && this.formData.pasportNumber
            && this.formData.issueDate
          );
      }
      return false
    },
    isSubmitPossible() {
      return this.isCommonFieldsFilled && this.isNationalFieldsFilled;
    },

  },
  methods: {
    nationalityDropdownCloseHandler(val) {
      this.isNationalityDropdownClosed = val;
    },
    formSubmitHandler() {
      const userData = {};
      console.log(Object.keys(this.formData).forEach((key) => {
        if (this.formData[key])
        userData[key] = this.formData[key];
      }));
      console.log(JSON.stringify(userData));
    },
  },
  watch: {
    isNamesChanged(newVal) {
      if (!newVal) {
        this.formData.prevLastName = '';
        this.formData.prevFirstName = '';
      }
    },
    isNotRussian(newVal) {
      if (newVal) {
        this.formData.pasportSeries = '';
        this.formData.pasportNumber = '';
        this.formData.issueDate = '';
      } else {
        this.formData.latinLastName = '';
        this.formData.latinFirstName = '';
        this.formData.pasportNumber = '';
        this.formData.issueСountry = '';
        this.formData.passportType = '';
      }
    }
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
    align-items: start;
    min-height: 11em;
    padding: 0 1em;
  }
  .nation-specific {
    grid-column: 1 / span 2;
  }
  .russian {
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
  .not-russian {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1em;
  }
  .field {
    display: flex;
    flex-direction: column;
    margin-bottom: 0.7em;
  }
  span {
    font-size: 0.9em;
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

<style>
  label {
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
</style>