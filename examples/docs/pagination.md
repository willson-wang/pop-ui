<script>
    export default {
        data () {
            return {
                offset: 1,
                total: 1000,
                limit: 20,
                pageSizes: [20, 50, 100, 200, 300, 400],
                offset1: 1,
                total1: 1000,
                limit1: 20,
                pageSizes1: [20, 50, 100, 200, 300, 400]
            }
        },
        methods: {
            currentPageChange ({currentPage, size}) {
                this.offset = currentPage;
                this.limit = size;
            },
            pageSizeChange (size) {
                this.limit = size;
                this.offset = 1;
            },
            currentPageChange1 ({currentPage, size}) {
                this.offset1 = currentPage;
                this.limit1 = size;
            },
            pageSizeChange1 (size) {
                this.limit1 = size;
                this.offset1 = 1;
            }
        }
    }
</script>
# Pagination 分页

---
当数据量过多时，使用分页分解数据。

## 基础用法

<div class="demo-block">
    <pop-pagination :totle="total" :page-limit="limit" :current-page="offset" :page-sizes="pageSizes" @currentPageChange="currentPageChange" @pageSizeChange="pageSizeChange"></pop-pagination>
</div>

::: demo
``` html
<pop-pagination :totle="total" :page-limit="limit" :current-page="offset" :page-sizes="pageSizes" @currentPageChange="currentPageChange" @pageSizeChange="pageSizeChange"></pop-pagination>

<script>
    export default {
        data () {
            return {
                offset: 1,
                total: 1000,
                limit: 20,
                pageSizes: [20, 50, 100, 200, 300, 400]
            }
        },
        methods: {
            currentPageChange ({currentPage, size}) {
                this.offset = currentPage;
                this.limit = size;
            },
            pageSizeChange (size) {
                this.limit = size;
                this.offset = 1;
            }
        }
    }
</script>
```
:::

## 完整功能

<div class="demo-block">
    <pop-pagination :totle="total1" :page-limit="limit1" :current-page="offset1" :page-sizes="pageSizes1" @currentPageChange="currentPageChange1" @pageSizeChange="pageSizeChange1" :is-select="true" :is-jump="true"></pop-pagination>
</div>

::: demo
``` html
<pop-pagination :totle="total1" :page-limit="limit1" :current-page="offset1" :page-sizes="pageSizes1" @currentPageChange="currentPageChange1" @pageSizeChange="pageSizeChange1" :is-select="true" :is-jump="true"></pop-pagination>

<script>
    export default {
        data () {
            return {
                offset1: 1,
                total1: 1000,
                limit1: 20,
                pageSizes1: [20, 50, 100, 200, 300, 400]
            }
        },
        methods: {
            currentPageChange1 ({currentPage, size}) {
                this.offset1 = currentPage;
                this.limit1 = size;
            },
            pageSizeChange1 (size) {
                this.limit1 = size;
                this.offset1 = 1;
            }
        }
    }
</script>
```
:::

### Attributes
| 参数               | 说明                                                     | 类型              | 可选值      | 默认值 |
|--------------------|----------------------------------------------------------|-------------------|-------------|--------|
| clas-name | 自定义类名 | String | — | —— |
| page-limit | 每页显示条目个数 | Number | — | 20 |
| total | 总条目数 | Number | — | — |
| current-page | 当前页数，支持 .sync 修饰符 | Number | — | 1 |
| page-sizes | 每页显示个数选择器的选项设置 | Number[] | — |  [10, 20, 30, 40, 50, 100] |
| is-select | 是否显示显示条数select | Boolean | — | false |
| is-jump | 是否显示页码跳转 | Boolean | — | false |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------|--------|---------|
| page-size-change | pageSize 改变时会触发 | 每页条数`size` |
| current-page-change | currentPage 改变时会触发 | 当前页`currentPage` |

