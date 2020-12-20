<template>
    <div class="list">
        <div class="list_btns mb-3">
            <el-button type="primary" @click="handleAdd">添加房东</el-button>
        </div>
        <el-form inline @submit.prevent="handleSubmit(1)">
            <el-form-item>
                <el-input v-model="params.name" placeholder="房东姓名"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="params.mobile" placeholder="房东手机号"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="params.landlord_nickname" placeholder="房东昵称"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="params.referrer_user_mobile" placeholder="推荐人手机号"></el-input>
            </el-form-item>
            <el-form-item v-if="addr">
                <el-cascader
                    placeholder="所属村"
                    expand-trigger="hover"
                    separator=" "
                    :options="addr"
                    :props="{ expandTrigger: 'hover' }"
                    v-model="selectedOptions"
                    @change="handleChange"
                ></el-cascader>
            </el-form-item>
            <el-form-item>
                <el-select v-model="params.opening_status" placeholder="状态">
                    <!-- <el-option label="全部" value=""></el-option> -->
                    <el-option label="未开通" value="未开通"></el-option>
                    <el-option label="服务中" value="服务中"></el-option>
                    <el-option label="服务结束" value="服务结束"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-select v-model="params.is_auth" placeholder="是否认证房东">
                    <!-- <el-option label="全部" value=""></el-option> -->
                    <el-option label="是" :value="1"></el-option>
                    <el-option label="否" :value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleSubmit(1)">搜索</el-button>
            </el-form-item>
        </el-form>
        <div class="table" v-if="list">
            <el-table :data="list" stripe v-loading="loading">
                <el-table-column prop="id" label="序号" width="50"></el-table-column>
                <el-table-column prop="name" label="姓名" width="80"></el-table-column>
                <el-table-column prop="nickname" label="昵称" width="80"></el-table-column>
                <el-table-column prop="mobile" label="手机号" width="120"></el-table-column>
                <el-table-column prop="referrer_user_mobile" label="推荐人" width="120"></el-table-column>
                <el-table-column prop="house_num" label="房源数量" width="80"></el-table-column>
                <el-table-column prop="public_num" label="发布数量" width="80"></el-table-column>
                <el-table-column prop="getphone_number" label="获取联系方式数量" width="80"></el-table-column>
                <el-table-column label="所属村">
                    <template #default="{ row }">
                        <!-- <span>{{row.position_province}}</span> -->
                        <span>{{ row.position_city }}</span>
                        <span>{{ row.postion_district }}</span>
                        <span>{{ row.postion_street }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="status_remain_days" label="状态" width="80"></el-table-column>
                <el-table-column prop="is_auth" label="认证房东" width="80" :formatter="row => row.is_auth === 1 ? '是' : '否'"></el-table-column>
                <el-table-column prop="indate_end" label="服务结束时间" width="110"></el-table-column>
                <el-table-column prop="last_opentime" label="上次开通时间" width="110"></el-table-column>
                <el-table-column prop="remarks" label="备注" width="80"></el-table-column>
                <el-table-column prop="_createtime" label="申请时间" width="110"></el-table-column>
                <el-table-column label="操作" width="400">
                    <template #default="{ row }">
                        <el-button size="small" type="warning" @click="handleCheck(row)">审核</el-button>
                        <el-button size="small" @click="handleLink(row)">编辑</el-button>
                        <el-button size="small" type="warning" @click="handleOpen(row)">开通记录</el-button>
                        <el-button size="small" type="danger" @click="handleDel(row)">删除</el-button>
                        <el-button size="small" type="primary" @click="handleProd(row)">生成二维码</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination el-row--flex is-justify-end">
                <el-pagination
                    layout="prev, pager, next, jumper, total" 
                    @current-change="handleSubmit"
                    :page-size="pageParams.pageSize"
                    :total="pageParams.count"
                    v-model:current-page="pageParams.page"
                ></el-pagination>
            </div>
        </div>
        <el-dialog title="审核" v-model="dialogCheckVisible" width="480px">
            <el-form :model="form" label-width="80px">
                <el-form-item label="审核">
                    <el-radio-group v-model="form.is_audit">
                        <el-radio :label="1">开通</el-radio>
                        <el-radio :label="2">停止</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="认证房东">
                    <el-radio-group v-model="form.is_auth">
                        <el-radio :label="1">是</el-radio>
                        <el-radio :label="2">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="本次支付" prop="pay_amount">
                    <el-input v-model.number="form.pay_amount" placeholder="支付金额"></el-input>
                </el-form-item>
                <el-form-item label="服务时间" prop="indate_begin">
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
                        :default-time="['00:00:00', '23:59:59']"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item label="备注" prop="remarks">
                    <el-input v-model="form.remarks" type="textarea" :rows="3"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="cancelCheck('form')">取 消</el-button>
                    <el-button type="primary" @click="confirmCheck('form')" :loading="loading">确 定</el-button>
                </div>
            </template>
        </el-dialog>
        <dialog-qr :qr="qr" title="二维码" @close="qr = false"></dialog-qr>
        <el-dialog title="开通记录" v-model="dialogOpenVisible" v-if="openList" width="610px" top="5vh">
            <el-table :data="openList" stripe>
                <el-table-column prop="id" label="序号" width="50"></el-table-column>
                <el-table-column prop="indate_begin" label="开通时间" width="110"></el-table-column>
                <el-table-column prop="indate_end" label="结束时间" width="110"></el-table-column>
                <el-table-column prop="days" label="开通时长" width="110"></el-table-column>
                <el-table-column prop="pay_amount" label="支付金额" width="80"></el-table-column>
                <el-table-column prop="audit_time" label="审核时间" width="110"></el-table-column>
            </el-table>
        </el-dialog>
        <v-loading></v-loading>
    </div>
</template>

<script>
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import store from '../../store.js'
import request from '../../api/index.js'
import dayjs from 'dayjs'
import useAddr from '../../utils/addr.js'
import dialogQr from '../components/DialogQR';
import { ElMessageBox } from 'element-plus'

export default {
    components: {
        dialogQr,
    },
    setup() {
        const { loading } = store
        const router = useRouter()

        const goPage = v => router.push(v)

        const { addr, getAddr } = useAddr

        const params = reactive({
            name: '',
            postion_street_id: '',
            referrer_user_mobile: '',
            opening_status: '',
            is_auth: ''
        })
        const pageParams = reactive({
            page: 1,
            pageSize: 10,
            count: 0
        })

        const list = ref([])
        const selectedOptions = ref([])

        const handleAdd = () => {
            goPage('/landlord/add')
        }

        const getData = () => {
            let obj = {
                page: pageParams.page,
                page_size: pageParams.pageSize,
                ...params,
            }
            request.landlord.list(obj).then(res => {
                const { count, data, page } = res.data || {}
                pageParams.page = +page
                pageParams.count = +count
                list.value = (data || []).map(v => ({ ...v, _createtime: timeFilter(v.createtime) }))
            })
        }
        
        const timeFilter = (v) => {
            return v ? dayjs(new Date(v * 1000)).format('YYYY-MM-DD HH:mm:ss') : '/';
        }

        const handleChange = e => {
            params.postion_street_id = e[2];
        }

        const handleSubmit = (n) => {
            pageParams.page = n || 1
            getData()
        }

        const handleLink = item => {
            goPage(`/landlord/${item.id}`)
        }

        const form = ref(null)
        const dialogCheckVisible = ref(false)
        const start = dayjs();
        const pickerOptions = ref({
            shortcuts: [
                {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = start.add(1, 'months');
                        picker.$emit('pick', [start, end]);
                    }
                },
                {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = start.add(3, 'months');
                        picker.$emit('pick', [start, end]);
                    }
                },
                {
                    text: '最近半年',
                    onClick(picker) {
                        const end = start.add(6, 'months');
                        picker.$emit('pick', [start, end]);
                    }
                },
                {
                    text: '最近一年',
                    onClick(picker) {
                        const end = start.add(1, 'years');
                        picker.$emit('pick', [start, end]);
                    }
                }
            ]
        })
        const timerange = ref('')

        const handleCheck = item => {
            form.value = {
                id: item.id,
                indate_begin: item.indate_begin,
                indate_end: item.indate_end,
                pay_amount: item.pay_amount || '',
                is_audit: 1,
                is_auth: 1,
                remarks: item.remarks
            };
            timerange.value = [item.indate_begin, item.indate_end];
            dialogCheckVisible.value = true;
        }
        
        const cancelCheck = () => {
            dialogCheckVisible.value = false;
            form.value = {
                id: '',
                indate_begin: '',
                indate_end: '',
                is_audit: 1,
                is_auth: 1,
                remarks: ''
            };
        }
        const confirmCheck = name => {
            this.$refs[name].validate(valid => {
                if (!valid) return;
                const data = { ...form.value }
                request.landlord.check(data).then(() => {
                    ElMessageBox({
                        type: 'success',
                        message: '操作成功!'
                    });
                    cancelCheck(name);
                    getData();
                });
            });
        }

        const openList = ref([])
        const dialogOpenVisible = ref(false)

        const handleOpen = item => {
            request.landlord.getOpenList({ landlord_id: item.id }).then(res => {
                const {
                    data: { data }
                } = res;
                openList.value = data.map(item => {
                    item.create_t = dayjs(new Date(item.createtime * 1000)).format('YYYY-MM-DD HH:mm:ss');
                    return item;
                });
                dialogOpenVisible.value = true;
            });
        }
        const qr = ref(false)

        const handleProd = item => {
            request.landlord
                .getQRCode({
                    user_id: item.user_id
                })
                .then(res => {
                    if (res && res.data) {
                        qr.value = res.data;
                    }
                });
        }
        
        const handleDel = item => {
            ElMessageBox.confirm('确认删除该条信息？', '提示', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                request.landlord
                    .del({
                        id: item.id
                    })
                    .then(() => {
                        ElMessageBox({
                            type: 'success',
                            message: '操作成功!'
                        });
                        getData();
                    });
            });
        }

        onMounted(() => {
            getData()
            getAddr()
        })
    
        return {
            loading,
            params,
            pageParams,
            addr,
            list,
            handleAdd,
            selectedOptions,
            handleChange,
            handleSubmit,
            handleLink,
            form,
            handleCheck,
            cancelCheck,
            confirmCheck,
            dialogCheckVisible,
            pickerOptions,
            timerange,
            dialogOpenVisible,
            openList,
            handleOpen,
            qr,
            handleProd,
            handleDel,
        }
    }
}
</script>

<style>
</style>