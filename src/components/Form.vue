<template>
  <form class="form" autocomplete="off" @submit.prevent="formSubmitHandler">
    <h3>Личные данные</h3>
    <div class="field-set">
      <div class="field">
        <label>Фамилия
          <input v-model="formData.lastName" type="text" required>
        </label>
        <span v-if="isLastNameNotValid" class="error-msg">{{errorMsgs.notCyrilic}}</span>
      </div>
      <div class="field">
        <label>Имя
          <input v-model="formData.firstName" type="text" required>
        </label>
        <span v-if="isFirstNameNotValid" class="error-msg">{{errorMsgs.notCyrilic}}</span>
      </div>
      <div class="field">
        <label>Отчество
          <input v-model="formData.middleName" type="text" required>
        </label>
        <span v-if="isMiddleNameNotValid" class="error-msg">{{errorMsgs.notCyrilic}}</span>
      </div>
      <div class="field">
        <label>Дата рождения
          <input v-model="formData.birthday" type="text" placeholder="дд.мм.гггг" required>
        </label>
        <span v-if="isDateNotValid" class="error-msg">{{errorMsgs.dateNotValid}}</span>
      </div>
      <div class="field">
        <label>E-mail
          <input v-model="formData.email" type="email" placeholder="mailbox@exapmple.com" required>
        </label>
        <span v-if="isEmailNotValid" class="error-msg">{{errorMsgs.emailNotValid}}</span>
      </div>
      <div class="field field_radio-group">
        <span>Пол</span>
        <div class="radio-group">
          <div class="radio-group__item">
            <label class="radio-label">
              <input v-model="formData.gender" type="radio" value="male" required>
              Мужской
            </label>
          </div>
          <div class="radio-group__item">
            <label class="radio-label">
              <input v-model="formData.gender" type="radio" value="female">
              Женский
            </label>
          </div>
        </div>
      </div>
    </div>
    <h3>Паспортные данные</h3>
    <div class="field-set">
      <div class="field">
        <Dropdown
          label="Гражданство"
          v-model="formData.nationality"
          :items="nationalities"
          @dropdown-closed="nationalityDropdownCloseHandler"
        />
      </div>
      <div v-if="isNationalitySelected" class="nation-specific">
        <div v-if="isNotRussian" class="not-russian">
          <div class="field">
            <label>Фамилия на латинице
              <input v-model="formData.latinLastName" type="text" required>
            </label>
            <span v-if="isLatinLastNameNotValid" class="error-msg">{{errorMsgs.notLatin}}</span>
          </div>
          <div class="field">
            <label>Имя на латинице
              <input v-model="formData.latinFirstName" type="text" required>
            </label>
            <span v-if="isLatinFirstNameNotValid" class="error-msg">{{errorMsgs.notLatin}}</span>
          </div>
          <div class="field">
            <label>Номер паспорта
              <input v-model="formData.pasportNumber" type="text" required>
            </label>
            <span v-if="isOtherPassportNumberNotValid" class="error-msg">{{errorMsgs.otherPassportNumberNotValid}}</span>
          </div>
          <div class="field">
            <Dropdown
              label="Страна выдачи"
              v-model="formData.issueСountry"
              :items="nationalities"
            />
          </div>
          <div class="field">
            <Dropdown
              label="Тип паспорта"
              v-model="formData.passportType"
              :items="passportTypes"
            />
          </div>
        </div>
        <div v-else class="russian">
          <div class="field field_pp-series">
            <label>Серия паспорта
              <input v-model="formData.pasportSeries" id="pp-series" type="text" placeholder="xxxx" required>
            </label>
            <span v-if="isRuPassportSeriesNotValid" class="error-msg">{{errorMsgs.ruPassportSeriesNotValid}}</span>
          </div>
          <div class="field field_pp-number">
            <label>Номер паспорта
              <input v-model="formData.pasportNumber" type="text" placeholder="xxxxxx" required>
            </label>
            <span v-if="isRuPassportNumberNotValid" class="error-msg">{{errorMsgs.ruPassportNumberNotValid}}</span>
          </div>
          <div class="field field_pp-issue-date">
            <label>Дата выдачи
              <input v-model="formData.issueDate" type="text" placeholder="дд.мм.гггг" required>
            </label>
          </div>
        </div>
        <div class="field field_radio-group">
          <span>Меняли ли фамилию или имя?</span>
          <div class="radio-group">
            <div class="radio-group__item">
              <label class="radio-label">
                <input v-model="formData.namesChanged" type="radio" value="no" required>
                Нет
              </label>
            </div>
            <div class="radio-group__item">
              <label class="radio-label">
                <input v-model="formData.namesChanged" type="radio" value="yes">
                Да
              </label>
            </div>
          </div>
        </div>
        <div v-if="isNamesChanged" class="prev-names">
          <div class="field">
            <label>Фамилия
              <input v-model="formData.prevLastName" type="text">
            </label>
            <span v-if="isPrevLastNameNotValid" class="error-msg">{{errorMsgs.notCyrilic}}</span>
          </div>
          <div class="field">
            <label>Имя
              <input v-model="formData.prevFirstName" id="prev-first-name" type="text">
            </label>
            <span v-if="isPrevFirstNameNotValid" class="error-msg">{{errorMsgs.notCyrilic}}</span>
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
import {
  isCyrilicText,
  isLatinText,
  isFourDigits,
  isSixDigits,
  isOnlyDigits,
  isEmail,
  isDate,
  isNotGreaterNow,
} from '../helpers/validators.js';

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
      errorMsgs: {
        notCyrilic: 'Значение только кириллицей',
        notLatin: 'Значение только латиницей',
        ruPassportSeriesNotValid: 'Четыре цифры в формате xxxx',
        ruPassportNumberNotValid: 'Шесть цифр в формате xxxxxx',
        otherPassportNumberNotValid: 'Допустимы только цифры',
        emailNotValid: 'Допустим только корректный email адрес',
        dateNotValid: 'Допустимый фрпмат даты дд.мм.гггг',
      }
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
    isLastNameNotValid() {
      return !isCyrilicText(this.formData.lastName);
    },
    isFirstNameNotValid() {
      return !isCyrilicText(this.formData.firstName);
    },
    isMiddleNameNotValid() {
      return !isCyrilicText(this.formData.middleName);
    },
    isPrevLastNameNotValid() {
      return !isCyrilicText(this.formData.prevLastName);
    },
    isPrevFirstNameNotValid() {
      return !isCyrilicText(this.formData.prevFirstName);
    },
    isLatinFirstNameNotValid() {
      return !isLatinText(this.formData.latinFirstName);
    },
    isLatinLastNameNotValid() {
      return !isLatinText(this.formData.latinLastName);
    },
    isRuPassportSeriesNotValid() {
      return !isFourDigits(this.formData.pasportSeries)
    },
    isRuPassportNumberNotValid() {
      return !isSixDigits(this.formData.pasportNumber)
    },
    isOtherPassportNumberNotValid() {
      return !isOnlyDigits(this.formData.pasportNumber)
    },
    isEmailNotValid() {
      return !isEmail(this.formData.email);
    },
    isDateNotValid() {
      if (isDate(this.formData.birthday) && this.formData.birthday !== '') {
        return !isNotGreaterNow(this.formData.birthday);
      }
      return this.formData.birthday === '' ? false : true;
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
    margin-bottom: 1em;
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
    position: relative;
    display: flex;
    flex-direction: column;
    margin-bottom: 0.7em;
  }
  .error-msg {
    position: absolute;
    top: 100%;
    right: 0;
    font-size: 0.7em;
    color:#d02626;
    text-align: right;
  }
  span {
    font-size: 0.9em;
  }
  .field_radio-group {
    align-self: stretch;
  }
  .radio-group {
    display: flex;
    align-items: stretch;
    flex-grow: 1;
  }
  .radio-group__item {
    display: flex;
    margin-right: 1em;
  }
  .radio-label {
    flex-direction: row;
    align-items: center;
    font-size: 1.2em;
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
    display: flex;
    flex-direction: column;
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