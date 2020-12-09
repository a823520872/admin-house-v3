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
                    <template v-slot="{ row }">
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
                    <template v-slot="{ row }">
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
                    :current-page="pageParams.page"
                ></el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import store from '../../store.js'
import Ajax from '../../utils/fetch.js'
import dayjs from 'dayjs'

export default {
    setup () {
        const { loading } = store
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

        const router = useRouter()

        const handleAdd = () => {
            router.push('/landlord/add')
        }

        const getData = () => {
            let obj = {
                page: pageParams.page,
                page_size: pageParams.pageSize,
                ...params,
            }
            Ajax('/api/admin/landlord/getList', obj, { loading: true }).then(res => {
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
            router.push(`/landlord/${item.id}`)
        }

        onMounted(() => {
            getData()
        })
    
        return {
            loading,
            params,
            pageParams,
            list,
            handleAdd,
            selectedOptions,
            handleChange,
            handleSubmit,
            handleLink,
        }
    }
}
</script>

<style>
</style>