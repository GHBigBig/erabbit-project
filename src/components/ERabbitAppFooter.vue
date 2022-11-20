<script setup></script>
<template>
  <footer class="app-footer">
    <div class="contact">
      <div class="container">
        <dl>
          <dt>客户服务</dt>
          <dd><i class="iconfont icon-kefu"></i>在线客服</dd>
          <dd><i class="iconfont icon-question"></i>问题反馈</dd>
        </dl>
        <dl>
          <dt>关注我们</dt>
          <dd><i class="iconfont icon-weixin"></i>公众号</dd>
          <dd><i class="iconfont icon-weibo"></i>微博</dd>
        </dl>
        <dl>
          <dt>下载APP</dt>
          <dd>
            <img src="../assets/images/qrcode.jpg" alt="下载二维码" />
          </dd>
          <dd class="no-border">
            <span>扫描二维码</span>
            <br />
            <span>下载APP</span>
            <br />
            <a class="download" href="javascript:;">下载页面</a>
          </dd>
        </dl>
        <dl>
          <dt>服务热线</dt>
          <dd class="no-border hotline">
            400-0000-0000
            <small>周一至周日 8:00-18:00</small>
          </dd>
        </dl>
      </div>
    </div>
    <div class="extra">
      <div class="container">
        <a href="#">
          <i class="iconfont icon-footer01"></i>
          <span>价格亲民</span>
        </a>

        <a href="#">
          <i class="iconfont icon-footer02"></i>
          <span>物流快捷</span>
        </a>

        <a href="#">
          <i class="iconfont icon-footer03"></i>
          <span>品质新鲜</span>
        </a>
      </div>
    </div>
    <div class="copyright">
      <div class="container">
        <p>
          <a href="javascript:;">关于我们</a>
          <a href="javascript:;">帮助中心</a>
          <a href="javascript:;">售后服务</a>
          <a href="javascript:;">配送与验收</a>
          <a href="javascript:;">商务合作</a>
          <a href="javascript:;">搜索推荐</a>
          <a href="javascript:;">友情链接</a>
        </p>
        <p>CopyRight © 小兔鲜儿</p>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="less">
.app-footer {
  background: #fff;

  .contact {
    color: #999;
    .container {
      display: flex;
      justify-content: space-between;

      dl {
        flex: 1;
        margin: 3rem 0;
        padding: 0 3rem;

        ~ dl {
          border-left: 1px solid #f2f2f2;
        }

        dt {
          font-size: 1.25rem;
          line-height: 1;
          text-align: center;
        }
        dd {
          display: inline-block;
          min-width: 6rem;
          height: 6rem;
          width: 45%;
          margin-top: 2rem;
          border: 1px solid #ededed;
          text-align: center;
          vertical-align: top; /*不设置会出问题*/

          i {
            font-size: 3rem;
            display: block;
            &:hover {
              color: @erColor;
            }
          }

          &:first-of-type {
            margin-right: 1rem;
          }
          &.no-border {
            border: 0;
          }
        }
        .hotline {
          width: 100%;
          margin-top: 0;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          font-size: 1.7rem;
          color: #666;
          small {
            font-size: 1rem;
            color: #999;
          }
        }
      }

      .download {
        display: block;
        font-size: 1rem;
        background: @erColor;
        color: #fff;
        line-height: 2.25rem;
        border-radius: 0.2rem;
        margin-top: 5px;
      }
    }
  }

  .extra {
    background: #333;

    a {
      color: #fff;
    }

    .container {
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 3.5rem 0;
      border-bottom: 1px solid #434343;

      a {
        line-height: 4rem;
        font-size: 1.7rem;
      }
      i {
        font-size: 4rem;
        vertical-align: middle;
        margin-right: 0.5rem;
      }
    }
  }
  .copyright {
    background: #333;
    color: #999;

    .container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 2rem 0;
      font-size: 1.12rem;
    }
    p {
      display: flex;
      padding-bottom: 1rem;

      a {
        color: #999;
        padding: 0 1rem;
        line-height: 1;

        ~ a {
          border-left: 1px solid #999;
        }
      }
    }
  }
}
</style>
