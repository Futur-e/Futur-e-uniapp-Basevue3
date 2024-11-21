<template>
	<view>
    <uv-upload
        :fileList="fileList"
        :previewFullImage="true"
        name="1"
        multiple
        :maxCount="1"
        @afterRead="afterRead($event,1)"
        @delete="deletePic($event,1)"
    ></uv-upload>
	</view>
</template>

<script setup>
	import {ref} from "vue";
  import { VUE_APP_UPLOAD_URL} from "@/config";

  const deletePic = (event, index) => {
    console.log(event, index)
    fileList.value = []
  };
  const fileList = ref([])
  const afterRead = async (event, index) => {
    console.log(index)
    uni.uploadFile({
      url: VUE_APP_UPLOAD_URL,
      filePath: event.file[0].url,
      name: 'file',
      header: {
        Authorization: 'Bearer ' + member.value.accessToken,
        lang: lang.value,
        'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      success(uploadFileResult) {
        if (uploadFileResult) {
          const upload = JSON.parse(uploadFileResult.data);
          fileList.value.push({url: upload.data})
          commentForm.value.picUrls = upload.data

        }
      },
      fail(e) {
        console.log(e)
      }
    });
  };
</script>

<style lang="less">

</style>