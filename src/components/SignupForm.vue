<template>
  <div class="contents">
    <div class="form-wrapper form-wrapper-sm">
      <form @submit.prevent="submitForm" class="form">
        <div class="input_box">
          <label for="nickname">nickname: </label>
          <input id="nickname" type="text" v-model="nickname" />
          <small class="note" v-if="!isNickNameValid">
            영문자, 숫자만 가능하며, 영문자와 숫자를 포함하여 4~20자 이어야
            합니다.
          </small>
        </div>
        <div class="input_box">
          <label for="email">email: </label>
          <input id="email" type="text" v-model="email" />
          <small class="note" v-if="!isEmailValid">
            @포함하여 이메일을 입력해주세요.
          </small>
        </div>
        <div class="input_box">
          <label for="password">pw: </label>
          <input id="password" type="password" v-model="password" />
          <small class="note" v-if="!isPwValid">
            영문자, 숫자를 포함하여 8~50자를 입력해주세요.
          </small>
        </div>
        <button
          type="submit"
          class="btn"
          :disabled="!isEmailValid || !isNickNameValid || !isPwValid"
        >
          회원 가입
        </button>
      </form>
      <p class="log">{{ logMessage }}</p>
    </div>
  </div>
</template>

<script>
import { registerUser } from '@/api/auth';
import {
  validateEmail,
  validateNickName,
  validatePw,
} from '@/utils/validation';

export default {
  data() {
    return {
      // form values
      email: '',
      password: '',
      nickname: '',
      // log
      logMessage: '',
    };
  },
  computed: {
    isEmailValid() {
      return validateEmail(this.email);
    },
    isNickNameValid() {
      return validateNickName(this.nickname);
    },
    isPwValid() {
      return validatePw(this.password);
    },
  },
  methods: {
    async submitForm() {
      const userData = {
        nickname: this.nickname,
        email: this.email,
        password: this.password,
      };
      const response = await registerUser(userData);
      console.log(response);
      this.logMessage = `${response.data.data.nickname} 님이 가입되었습니다`;
      if (
        this.logMessage == 'undefined' ||
        this.logMessage == '' ||
        this.logMessage == null
      ) {
        this.logMessage = `${response.data.data.msg}`;
      }
      this.initForm();
    },
    initForm() {
      this.email = '';
      this.password = '';
      this.nickname = '';
    },
  },
};
</script>

<style scoped>
.note {
  display: block;
  margin-top: 5px;
  font-size: 0.6em;
  color: #462020;
}
.input_box {
  margin-bottom: 2.5rem;
}
</style>
