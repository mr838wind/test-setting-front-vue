<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png">
        <p>Welcome to Your Vue.js App</p>
        <p>
            <WDButton @click=" onClick " >hello</WDButton>
        </p>
    </div>
</template>

<script>

import {EventBus} from "@/plugins/EventBus";

export default {
    name: 'Home',
    components: {},
    methods: {
        onClick() {
            this.$showLoading();
            this.$showAlert(
                {
                    title: '알림',
                    content: `test 을(를) 입력해 주세요.`,
                    callback: () => { this.$hideLoading(); },
                    okBtnName: '확인'
                });
        },
    }
}
</script>
