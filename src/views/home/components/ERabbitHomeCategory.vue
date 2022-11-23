<script setup>
import { computed, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { findBrand } from '@/api/home.js';

findBrand(6).then((data) => {
  //获取品牌
  brand.brands = data.result;
});

const store = useStore();

const brand = reactive({
  id: 'brand',
  name: '品牌',
  children: [
    {
      id: 'brand-chilren',
      name: '品牌推荐',
    },
  ],
  brands: [],
});
const menuList = computed(() => {
  const list = store.state.category.list.map((item) => {
    return {
      id: item.id,
      name: item.name,
      children: item?.children?.slice(0, 2),
      goods: item.goods,
    };
  });
  list.push(brand);
  return list;
});
//侧边分类
const categoryId = ref(null);
const currCategory = computed(() =>
  menuList.value.find((item) => categoryId.value === item.id)
);
</script>
<template>
  <div class="home-category" @mouseleave="categoryId = null">
    <ul class="menu">
      <li
        v-for="item in menuList"
        :key="item.id"
        @mouseenter="categoryId = item.id"
        :class="{ active: categoryId === item.id }"
      >
        <RouterLink :to="`/category/${item.id}`">{{ item.name }}</RouterLink>
        <template v-if="item.children">
          <RouterLink
            v-for="sub in item.children"
            :key="sub.id"
            :to="`/category/sub/${sub.id}`"
          >
            {{ sub.name }}
          </RouterLink>
        </template>
        <span v-else>
          <ERabbitSkeleton
            width="60px"
            height="18px"
            style="margin-right: 5px"
            bg="rgba(255,255,255,0.2)"
          ></ERabbitSkeleton>
          <ERabbitSkeleton
            width="50px"
            height="18px"
            bg="rgba(255,255,255,0.2)"
          ></ERabbitSkeleton>
        </span>
      </li>
    </ul>
    <div class="layer">
      <h4>
        {{ currCategory?.id === 'brand' ? '品牌' : '分类' }}推荐
        <small>根据您的购买或浏览记录推荐</small>
      </h4>
      <ul v-if="currCategory?.goods?.length">
        <li v-for="item in currCategory?.goods" :key="item.id">
          <RouterLink to="/">
            <img :src="item.picture" alt="商品图片" />
            <div class="info">
              <p class="name ellipsis-2">{{ item.name }}</p>
              <p class="desc ellipsis">{{ item.desc }}</p>
              <p class="price"><i>¥</i>{{ item.price }}</p>
            </div>
          </RouterLink>
        </li>
      </ul>
      <ul v-if="currCategory?.brands?.length">
        <li class="brand" v-for="item in currCategory?.brands" :key="item.id">
          <RouterLink to="/">
            <img :src="item.picture" alt="品牌图片" />
            <div class="info">
              <p class="place">
                <i class="iconfont icon-dingwei"></i>{{ item.place }}
              </p>
              <p class="name ellipsis">{{ item.name }}</p>
              <p class="desc ellipsis-2">{{ item.desc }}</p>
            </div>
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="less">
.home-category {
  width: 250px;
  height: 500px;
  background: rgba(0, 0, 0, 0.8);
  position: relative;
  z-index: 99;
  .menu {
    li {
      padding-left: 40px;
      height: 50px;
      line-height: 50px;
      &:hover,
      &.active {
        background: @erColor;
      }
      a {
        color: #fff;
        margin-right: 4px;
        &:first-child {
          font-size: 16px;
        }
      }
    }
  }

  .layer {
    width: 990px;
    height: 500px;
    background: rgba(255, 255, 255, 0.8);
    position: absolute;
    top: 0;
    left: 250px;
    padding: 0 15px;
    display: none;

    h4 {
      font-size: 20px;
      font-weight: normal;
      line-height: 80px;
      small {
        font-size: 16px;
        color: #666;
      }
    }

    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        width: 310px;
        height: 120px;
        margin-right: 15px;
        margin-bottom: 15px;
        border: 1px solid #eee;
        border-radius: 4px;
        background: #fff;

        &:nth-of-type(3n) {
          margin-right: 0;
        }

        a {
          display: flex;
          width: 100%;
          height: 100%;
          align-items: center;
          padding: 10px;
          &:hover {
            background: #e3f9f4;
          }

          img {
            width: 95px;
            height: 95px;
          }

          .info {
            padding-left: 10px;
            width: 190px;
            line-height: 24px;
            .name {
              font-size: 16px;
              color: #666;
            }
            .desc {
              color: #999;
            }
            .price {
              font-size: 22px;
              color: @priceColor;
              i {
                font-size: 16px;
              }
            }
          }
        }
      }
      li.brand {
        height: 180px;
        a {
          align-items: flex-start;
          img {
            width: 120px;
            height: 160px;
          }
          .info {
            p {
              margin-top: 8px;
              .place {
                color: #999;
              }
            }
          }
        }
      }
    }
  }
  &:hover {
    .layer {
      display: block;
    }
  }
}
</style>
