<template>
  <div class="dropdown" v-click-outside="closeDropdown">
    <label
      class="dropdown__label"
    >
      {{label}}
      <input
        class="dropdown__input"
        type="text"
        required
        v-model="selectedValue"
        @click="dropdownClickHandler"
      >
    </label>
    <ul
      class="dropdown__list"
      v-show="isDropdownOpened"
    >
      <template v-if="actualList.length">
        <li
          class="dropdown__item"
          v-for="(item, index) in actualList"
          :key="item.id || index"
          @click="itemClickHandler(item)"
        >
          {{item.value}}
        </li>
      </template>
      <template v-else>
        <li
          class="dropdown__item"
          @click="itemClickHandler()"
        >
          Нет данных
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
  import ClickOutside from 'vue-click-outside';
  import {debounce} from '../helpers/debounce.js';

  export default {
    inheritAttrs: false,
    props: {
      items: {
        type: Array,
        default() {
          return [];
        },
      },
      label: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        isDropdownOpened: false,
        selectedValue: '',
        actualList: null,
        debouncedRelevantList: null,
      };
    },
    created() {
      this.debouncedRelevantList = debounce(this.getRelevantList, 700);
      this.getRelevantList(this.selectedValue);
    },
    methods: {
      dropdownClickHandler() {
        this.isDropdownOpened = !this.isDropdownOpened;
      },
      itemClickHandler(item) {
        if (item) {
          this.selectedValue = item.value;
        }
        this.closeDropdown();
      },
      closeDropdown() {
        this.isDropdownOpened = false;
      },
      getRelevantList(value) {
        this.actualList = this.items.filter(
          (item) => item.value.toLowerCase().startsWith(value.toLowerCase())
        );
      },
    },
    watch: {
      isDropdownOpened(newVal) {
        newVal ? this.$emit('dropdown-closed', false) : this.$emit('dropdown-closed', true);
      },
      selectedValue() {
        this.debouncedRelevantList(this.selectedValue);
        this.$emit('input', this.selectedValue);
      }
    },
    directives: {
      ClickOutside,
    },
  };
</script>

<style scoped>
  .dropdown {
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
  }
  .dropdown__label {
    color: inherit;
  }
  .dropdown__list {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    max-height: 300%;
    margin: 0;
    padding: 0;
    border: 1px solid #ccd8e4;
    border-top-color: transparent;
    border-bottom-right-radius: 4px;
    border-bottom-left-radius: 4px;
    list-style: none;
    background-color: #ffffff;
    overflow: auto;
    cursor: pointer;
  }
  .dropdown__item {
    padding: 0.2em 0.4em;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .dropdown__item:hover {
    background-color: #f8f8f8;
  }
</style>