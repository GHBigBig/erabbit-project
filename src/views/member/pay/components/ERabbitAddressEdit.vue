<script>
export default {
  name: 'ERabbitAddressEdit',
};
</script>
<script setup>
import { ref, reactive } from 'vue';

const dialogVisible = ref(false);
//打开函数
const open = () => {
  dialogVisible.value = true;
};

//表单数据
const formData = reactive({
  receiver: '',
  contact: '',
  provinceCode: '',
  cityCode: '',
  countyCode: '',
  address: '',
  postalCode: '',
  addressTags: '',
  isDefault: 0,
  fullLocation: '',
});
//选择地区
const changeCity = (data) => {
  formData.provinceCode = data.provinceCode;
  formData.cityCode = data.cityCode;
  formData.countyCode = data.countyCode;
  formData.fullLocation = data.fullLocation;
};
</script>

<template>
  <div class="er-address-edit">
    <ERabbitDialog title="添加收货地址" v-model:visible="dialogVisible">
      <div class="address-edit">
        <div class="er-form">
          <div class="er-form-item">
            <div class="label">收货人：</div>
            <div class="field">
              <input
                v-model="formData.receiver"
                type="text"
                class="input"
                placeholder="请输入收货人"
              />
            </div>
          </div>
          <div class="er-form-item">
            <div class="label">手机号：</div>
            <div class="field">
              <input type="text" class="input" placeholder="请输入手机号" />
            </div>
          </div>
          <div class="er-form-item">
            <div class="label">地区：</div>
            <div class="field">
              <ERabbitCity placeholder="请选择所在地区"></ERabbitCity>
            </div>
          </div>
          <div class="er-form-item">
            <div class="label">详细地址：</div>
            <div class="field">
              <input type="text" class="input" placeholder="请输入详细地址" />
            </div>
          </div>
          <div class="er-form-item">
            <div class="label">邮政编码：</div>
            <div class="field">
              <input type="text" class="input" placeholder="请输入邮政编码" />
            </div>
          </div>
          <div class="er-form-item">
            <div class="label">地址标签：</div>
            <div class="field">
              <input
                type="text"
                class="input"
                placeholder="请输入地址标签，逗号分隔"
              />
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <ERabbitButton type="gray" style="margin-right: 20px"
          >取消</ERabbitButton
        >
        <ERabbitButton type="primary">确认</ERabbitButton>
      </template>
    </ERabbitDialog>
  </div>
</template>

<style scoped lang="less">
.er-address-edit {
  .er-dialog {
    :deep(.wrapper) {
      width: 780px;
      &.fade {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      .body {
        font-size: 14px;
        max-height: 1000px;
      }
    }
  }

  .er-form {
    padding: 0;
    input {
      outline: 0;
      &::placeholder {
        color: #ccc;
      }
    }
    .er-form-item {
      justify-content: center;
      .label {
        width: 80px;
      }
      .field {
        margin-left: 0;
      }
    }
  }

  .er-city {
    width: 320px;
    :deep(.select) {
      height: 50px;
      line-height: 48px;
      display: flex;
      padding: 0 10px;
      justify-content: space-between;
      margin-left: 0;
      .placeholder {
        color: #ccc;
      }
      i {
        color: #ccc;
        font-size: 18px;
      }
      .value {
        font-size: 14px;
      }
    }
    :deep(.option) {
      top: 49px;
    }
  }
}
</style>
