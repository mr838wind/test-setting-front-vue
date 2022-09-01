
<script>
import WDInput from './WDInput';
    export default {
        name: "WDNumberInputExtendsVer",
        extends: WDInput,
        props: {
            min: {
                type: Number,
                default: -1
            },
            max: {
                type: Number,
                default: -1
            },
            isMoney: {
                type: Boolean,
                default: false
            },
            validateReg: {
                type: String,
                default: '[^0-9]'
            },
            validateRule: {
                type: Function,
                default: (value,props)=>{
                    if(props.maxLength !== -1 && value.length>props.maxLength) {
                        value = value.substr(0,props.maxLength);
                    }
                    let num = value.replace(new RegExp(RegExp(props.validateReg), "g"), '');

                    if(props.min !== -1 && Number(num) < props.min) {
                        num = props.min;
                    }
                    if(props.max !== -1 && Number(num) > props.max) {
                        num = props.max;
                    }
                    if(props.isMoney) {
                        return Number(num).toLocaleString();
                    } else {
                        return num.toString();
                    }
                }
            },

        },
        methods:{
        },

    }
</script>
