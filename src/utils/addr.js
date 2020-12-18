import {
    // computed,
    ref,
} from 'vue'
import Ajax from './fetch.js'

function useAddr() {
    // const list = ref(null)
    const addr = ref(null)
    const addrList = ref(null)

    // computed(() => list.value, )

    const getAddr = () => {
        if (addr.value) return
        Ajax('/api/admin/area/getAllList').then(res => {
            const list = res.data;
            let addrList2 = {}
            const addr2 = list.reduce((obj, item) => {
                if (!item.pid) return obj;
                addrList2[item.id] = item;
                if (!obj[item.pid]) {
                    obj[item.pid] = [];
                }
                obj[item.pid].push(item);
                return obj;
            }, {});

            addrList.value = addrList2

            const city = list.filter(li => li.level === 2);

            addr.value = city.map(item => {
                if (addr2[item.id]) {
                    const children = addr2[item.id].map(li => {
                        if (addr2[li.id]) {
                            li.children = addr2[li.id].map(l => ({
                                value: l.id,
                                label: l.name,
                                level: l.level
                            }))
                        }
                        return {
                            value: li.id,
                            label: li.name,
                            level: li.level,
                            children: li.children
                        }
                    })
                    item.children = children
                }
                return {
                    value: item.id,
                    label: item.name,
                    level: item.level,
                    children: item.children
                }
            })
        })
    }

    return {
        addr,
        addrList,
        getAddr,
    }
}

export default useAddr()
