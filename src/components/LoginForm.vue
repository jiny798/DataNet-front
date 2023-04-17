<template>
  <div class="contents">
    <div class="form-wrapper form-wrapper-sm">
      <form @submit.prevent="submitForm" class="form">
        <div>
          <label for="nickname">id:</label>
          <input id="nickname" type="text" v-model="nickname" />
          <p class="validation-text">
            <span class="warning" v-if="!isUsernameValid && nickname">
              Please enter an nickname
            </span>
          </p>
        </div>
        <div>
          <label for="password">pw:</label>
          <input id="password" type="text" v-model="password" />
        </div>
        <button type="submit" class="btn">
          로그인
        </button>
      </form>
      <p class="log">{{ logMessage }}</p>
    </div>
  </div>
</template>

<script>
import { validateNickName } from '@/utils/validation';

export default {
  data() {
    return {
      // form values
      nickname: '',
      password: '',
      // log
      logMessage: '',
    };
  },
  computed: {
    isUsernameValid() {
      return validateNickName(this.nickname);
    },
  },
  methods: {
    async submitForm() {
      try {
        // 비즈니스 로직
        const userData = {
          nickname: this.nickname,
          password: this.password,
        };
        await this.$store.dispatch('LOGIN', userData);
        this.$router.push('/main');
      } catch (error) {
        // 에러 핸들링할 코드
        //this.logMessage = error.response.data.msg;
      } finally {
        this.initForm();
      }
    },
    initForm() {
      this.nickname = '';
      this.password = '';
    },
  },
};
</script>

<style>
.btn {
  color: white;
}
</style>
