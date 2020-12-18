<template>
    <div class="action-box">
        <page-header></page-header>
        <el-form ref="landlordForm" :model="form" :rules="rules" label-width="120px">
            <el-form-item label="姓名" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="mobile">
                <el-input v-model="form.mobile"></el-input>
            </el-form-item>
            <el-form-item label="房源数量" prop="house_num">
                <el-input v-model.number="form.house_num"></el-input>
            </el-form-item>
            <el-form-item label="房源位置" v-if="addr" prop="postion_street">
                <el-cascader expand-trigger="hover" separator=" " :options="addr" v-model="selectedOptions" @change="handleChange"></el-cascader>
            </el-form-item>
            <el-form-item label="推荐人" prop="referrer_user_mobile">
                <el-input v-model="form.referrer_user_mobile"></el-input>
            </el-form-item>
            <el-form-item label="审核" prop="is_audit">
                <el-radio-group v-model="form.is_audit">
                    <el-radio :label="1">开通</el-radio>
                    <el-radio :label="2">停止</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="认证房东" prop="is_auth">
                <el-radio-group v-model="form.is_auth">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="2">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="本次支付" prop="last_pay_amount">
                <el-input v-model.number="form.last_pay_amount" placeholder="支付金额"></el-input>
            </el-form-item>
            <el-form-item label="本次服务时间" prop="indate_end">
                <el-date-picker
                    v-model="timerange"
                    @change="timePicker"
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="pickerOptions"
                ></el-date-picker>
            </el-form-item>
            <el-form-item label="备注" prop="remarks">
                <el-input v-model="form.remarks" type="textarea" :rows="3"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="goBack">返回</el-button>
                <el-button type="primary" @click="submitForm('form')">确定</el-button>
            </el-form-item>
        </el-form>
        <v-loading></v-loading>
    </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import store from '../../store.js'
import Ajax from '../../utils/fetch.js'
import useAddr from '../../utils/addr.js'
import PageHeader from '../components/PageHeader.vue'
import vLoading from '../../components/Loading.vue'
import dayjs from 'dayjs'

export default {
    components: {
        PageHeader,
        vLoading,
    },
    setup () {
        const { loading } = store
        const router = useRouter()
        const route = useRoute()

        const goBack = () => router.go(-1)

        const { addr, getAddr } = useAddr

        let id

        const landlordForm = ref(null)

        const form = reactive({
            name: '',
            mobile: '',
            house_num: '',
            position_province_id: '',
            position_province: '',
            position_city_id: '',
            // position_city: '',
            postion_district_id: '',
            // postion_district: '',
            postion_street_id: '',
            // postion_street: '',
            indate_begin: '',
            indate_end: '',
            referrer_user_mobile: '',
            is_audit: 1,
            is_auth: 1,
            last_pay_amount: '',
            remarks: ''
        })

        const rules = ref({
            name: [{ required: true, message: '请输入房东姓名', trigger: 'blur' }],
            mobile: [{ required: true, message: '请输入手机号码', trigger: 'blur' }],
            house_num: [{ required: true, message: '请输入房源数量', trigger: 'blur' }],
            postion_street_id: [{ required: true, message: '请选择房源地址', trigger: 'change' }],
            is_audit: [{ required: true, message: '请选择审核状态', trigger: 'change' }],
            is_auth: [{ required: true, message: '请选择认证房东状态', trigger: 'change' }],
            last_pay_amount: [{ required: true, message: '请选择本次支付金额', trigger: 'blur' }],
            indate_end: [{ required: true, message: '请选择本次服务时间', trigger: 'change' }]
        })

        const selectedOptions = ref([])
        const timerange = ref([])
        const pickerOptions = ref({
                shortcuts: [
                    {
                        text: '最近一个月',
                        onClick(picker) {
                            const start = dayjs();
                            const end = dayjs().add(1, 'months');
                            picker.$emit('pick', [start, end]);
                        }
                    },
                    {
                        text: '最近三个月',
                        onClick(picker) {
                            const start = dayjs();
                            const end = dayjs().add(3, 'months');
                            picker.$emit('pick', [start, end]);
                        }
                    },
                    {
                        text: '最近半年',
                        onClick(picker) {
                            const start = dayjs();
                            const end = dayjs().add(6, 'months');
                            picker.$emit('pick', [start, end]);
                        }
                    },
                    {
                        text: '最近一年',
                        onClick(picker) {
                            const start = dayjs();
                            const end = dayjs().add(1, 'years');
                            picker.$emit('pick', [start, end]);
                        }
                    }
                ]
            })

        const getData = () => {
            Ajax('/api/admin/landlord/getDetail', { id }, { loading: true }).then(res => {
                    let { indate_begin, indate_end, position_city_id, postion_district_id, postion_street_id } = res.data || {};
                    Object.keys(form).map(key => {
                        form[key] = res.data[key];
                    });
                    if (indate_begin && indate_end) {
                        timerange.value = [indate_begin, indate_end];
                    }
                    selectedOptions.value = [position_city_id, postion_district_id, postion_street_id];
            })
        }

        const handleChange = (e) => {
            let position_province_id = 1964
            let [position_city_id, postion_district_id, postion_street_id] = e
            form.position_province_id = position_province_id
            form.position_city_id = position_city_id
            form.postion_district_id = postion_district_id
            form.postion_street_id = postion_street_id
        }

        const submitForm = () => {
            landlordForm.value.validate(valid => {
                if (!valid) return
                goBack()
            })
        }

        onMounted(() => {
            console.log('route :>> ', route);
            if (route.params.id) {
                id = route.params.id
                getData()
            }
            getAddr()
        })
    
        return {
            loading,
            landlordForm,
            form,
            rules,
            addr,
            timerange,
            selectedOptions,
            pickerOptions,
            handleChange,
            goBack,
            submitForm,
        }
    }
}
</script>

<style>

</style>