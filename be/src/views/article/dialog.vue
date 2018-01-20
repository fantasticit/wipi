<template>
  <ta-dialog v-if="isShow" title="发布文章" @cancel="emitCancel()" @ok="publish()">
    <ta-form-item 
      label="文章标题" placeholder="请输入文章标题" :rules="rules.title"
      v-model="info.title"
    ></ta-form-item>
    <ta-form-item 
      label="文章作者" placeholder="请输入文章作者" :rules="rules.author"
      v-model="info.author"
    ></ta-form-item>
    <ta-select
      v-model="info.classify"
      label="文章分类"
      placeholder="请选择文章分类"
      :options="options"
    ></ta-select>
    <div>
      <ta-form-item label="文章标签" placeholder="请输入文章标签" @enter="addTag($event)">
      </ta-form-item>
      <div class="tags">
        <ta-tag 
          v-for="(tag, index) in info.tags" :key="index"
          :type="tagTypes[index]"
          @close="removeTag(index)"
        >
          {{ tag }}
        </ta-tag>
      </div>
    </div>
  </ta-dialog>
</template>

<script>
export default {
  name: 'TaPublishDialog',

  props: {
    isShow: Boolean,
  },

  data() {
    return {
      options: [
        {
          value: 'web_fe',
          title: '前端',
        },
        {
          value: 'web_be',
          title: '后端',
        },
        {
          value: 'design',
          title: '设计',
        },
        {
          value: 'algorithm',
          title: '算法',
        },
        {
          value: 'data_structor',
          title: '数据结构',
        },
        {
          value: 'ai',
          title: '人工智能',
        },
        {
          value: 'other',
          title: '其他',
        },
      ],
      info: {
        title: '',
        author: '',
        classify: '',
        tags: [],
      },
      tagTypes: ['default', 'info', 'success', 'danger'],
      rules: {
        title: [
          { required: true, message: '标题不得为空', trigger: 'blur' },
        ],
        author: [
          { required: true, message: '作者不得为空', trigger: 'blur' },
        ],
        classify: [
          { required: true, message: '分类不得为空', trigger: 'blur' },
        ]
      },
    }
  },

  methods: {
    addTag(tag) {
      if (this.info.tags.length >= 4) {
        this.$message.error('最多4个标签')
      } else {
        this.info.tags.push(tag)
      }
    },

    removeTag(index) {
      let tags = Array.from(this.info.tags)
      tags.splice(index, 1)
      this.info.tags = tags
    },

    emitCancel() {
      this.$emit('cancel')
    },
    
    publish() {
      if (Object.keys(this.info).every(key => !!this.info[key])) {
        this.$emit('ok', this.info)
      } else {
        this.$message.error('请完善文章信息')
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.tags {
  margin-left: 5em;

  .ta-tag + .ta-tag {
    margin-left: 10px;
  }
}
</style>
