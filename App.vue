<script setup>
import { onHide, onLaunch, onShow } from '@dcloudio/uni-app'
import { useMainStore } from '@/store/store'
// import { getSchoolInfo } from '@/utils/getLocationStorage';
// import { handleGetAuth } from '@/utils/getAuth';

const main = useMainStore()
/*
const getLocation = async () => {

  const schoolInfo = await getSchoolInfo();
  const { code, data } = schoolInfo || {};
  console.log('getSchoolInfo', code, data);
  main.SET_PAGE_STATUS(code);
  if (code === 0) {
    handleGetAuth(main);
    main.SET_SCHOOLINFO(data.schoolInfo);
  }
}
*/

onLaunch(() => {
  console.log('App Launch')
})

onShow(() => {
  // getLocation()
})

onHide(() => {
  console.log('App Hide')
})

</script>

<style lang="scss">
@import '~@/static/style/app.scss';


// /*每个页面公共css */
// page {
//   background-color: #f5f5f5;
// }</style>
