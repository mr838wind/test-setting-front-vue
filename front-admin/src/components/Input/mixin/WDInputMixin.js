
let inputMixin = {
    props: {
        value: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: 'text'
        },
        readonly: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        state: {
            type: String | Boolean,
            default: null
        },
        maxLength: {
            type: Number,
            default: -1
        },
        validateRule: {
            type: Function,
            default: (value,props)=>{
                return value;
            }
        },
        isMoney: {
            type: Boolean,
            default: false
        },
        validateReg: {
            type: String,
            default: ''
        }
    },
    methods:{
        onInput(v){
            this.$emit('input', v);
        },
        onEnter(v) {
            this.$emit('enter', v);
        },
        onKeyup(v) {
            this.$emit('keyup', v);
        },
        onBlur(v) {
            this.$emit('blur', v);
        },
        onClick(v) {
            this.$emit('click', v);
        },
        onFocusout(v) {
            this.$emit('focusout', v);
        },
        formatter(value) {
            return this.validateRule(value,this.$props);
        }

    },
};
export default inputMixin;