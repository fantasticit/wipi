<template>
  <div>
    <ul class="ta-statics">
      <li class="is-primary">
        <div class="icon-message"><ta-icon name="ios-paper"></ta-icon></div>
        <div class="info">
          <p>{{ statics.pv }}</p>
          <p>页面浏览量</p>
        </div>
      </li>

      <li class="is-danger">
        <div class="icon-message"><ta-icon name="shuffle"></ta-icon></div>
        <div class="info">
          <p>{{ apiCallTimes }}</p>
          <p>接口调用量</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'
import { ReportProvider } from '@/provider/report-provider'

@Component({
})
export default class Dashboard extends Vue {
  statics = {}
  apiCallTimes = 0

  created() {
    this.fetchPerformenceStatics()
    this.fetchApiCallTimes()
  }

  async fetchPerformenceStatics() {
    try {
      const res =  await ReportProvider.getStatics()
      this.$set(this.statics, 'pv', res.pv)
    } catch (err) {
      this.$message.error(err.message)
    }
  }

  async fetchApiCallTimes() {
    try { 
      const res = await ReportProvider.getApiCallTimes()
      this.apiCallTimes = Object.keys(res).reduce((num, key) => num += res[key], 0)
    } catch (err) {
      this.$message.error(err.message)
    }
  }
}
</script>

<style lang="scss" scoped>
@include b(statics) {
  li {
    height: 80px;
    font-size: 12px;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 4px rgba(0,0,0,.05);
    cursor: pointer;
    display: inline-block;
    overflow: hidden;
    @include clear;

    + li {
      margin-left: 40px;
    }
  }

  @each $key, $val in ('primary': $primary, 'danger': $danger) {
    li.is-#{$key} {
      .icon-message {
        background: $val;
        color: #fff;
      }

      .info {
        color: $val;
        border: 1px solid $val;
      }
    }
  }

  .icon-message {
    float: left;
    height: 100%;
    padding: 0 16px;
    

    @include flexLayout {
      align-items: center;
    };

    .ta-icon {
      font-size: 36px;
    }
  }

  .info {
    box-sizing: border-box;
    float: right;
    font-weight: bold;
    padding: 0 20px;
    height: 100%;
    @include flexLayout {
      align-items: center;
      flex-direction: column;
    };

    p {
      text-align: center;
      margin: 0;

      &:first-child {
        margin-bottom: .5em;
        font-size: 20px;
        color: inherit;
        
      }

      &:last-child {
        font-size: 14px;
        font-weight: normal;
        color: #c8c8c8;
      }
    }
  }
}
</style>
