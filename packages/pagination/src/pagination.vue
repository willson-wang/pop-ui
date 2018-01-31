<template>
    <div class="pop-pagination-wrap" :class="className">
        <div class="pop-pagination__select" v-if="isSelect">
            <span>行数</span>
            <span>
                <pop-select width="100px" @change="selectSizeHandler" v-model="currentSize" size="small">
                    <pop-select-option v-for="(item, index) in pageSizes" :key="index" :value="item" :label="item"></pop-select-option>
                </pop-select>
            </span>
        </div>
        <div class="pop-pagination__prev" :class="{'pop-pagination__bidden': currentPage === 1}" @click="prev">
            <i class="pop-icon-back"></i>
        </div>
        <ul class="pop-pagination clearFix" @click="pagerClickHandler">
            <li :class="{active: currentPage === 1}" v-if="pageCount > 0" class="pop-pagination-number">1</li>
            <li :class="[quickprevIconClass]" v-if="showPrevMore" class="more btn-quickprev" @mouseenter="quickprevIconClass = 'pop-icon-back'" @mouseleave="quickprevIconClass = 'pop-icon-more'"></li>
            <li v-for="(pager, index) in pagers" :class="{active: currentPage === pager}" :key="index" class="pop-pagination-number">{{pager}}</li>
            <li :class="[quicknextIconClass]" v-if="showNextMore" class="more btn-quicknext" @mouseenter="quicknextIconClass = 'pop-icon-right'" @mouseleave="quicknextIconClass = 'pop-icon-more'"></li>
            <li :class="{ active: currentPage === pageCount }"  class="pop-pagination-number" v-if="pageCount > 1">{{ pageCount }}</li>
        </ul>
        <div class="pop-pagination__next" @click="next" :class="{'pop-pagination__bidden': currentPage === pageCount}">
            <i class="pop-icon-right"></i>
        </div>
        <div class="pop-pagination__jump" v-if="isJump">
            <span>跳转至</span>
            <input type="text" v-model="jumpTo">
            <button type="button" @click="jumpToHandler">确定</button>
            <span>总数{{totle}}条</span>
        </div>
    </div>
    
</template>

<script>
    export default {
        name: 'popPagination',
        componentName: 'popPagination',
        props: {
            totle: {
                type: Number
            },
            pageLimit: {
                type: Number
            },
            currentPage: {
                type: Number
            },
            pageSizes: {
                type: Array,
                default () {
                    return [20, 50, 100, 200, 300, 400];
                }
            },
            className: {},
            isSelect: {
                type: Boolean,
                default: false
            },
            isJump: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                currentSize: this.pageLimit || '20',
                jumpTo: '',
                showPrevMore: false,
                showNextMore: false,
                quicknextIconClass: 'pop-icon-more',
                quickprevIconClass: 'pop-icon-more'
            };
        },
        computed: {
            pageCount () {
                return Math.ceil(this.totle / this.pageLimit);
            },
            pagers () {
                // 默认展示7条分页页码
                const pagerCount = 7;
                const currentPage = Number(this.currentPage);
                const pageCount = Number(this.pageCount);

                let showPrevMore = false;
                let showNextMore = false;

                // 如果实际分页数大于默认分页数
                if (pageCount > pagerCount) {
                    if (currentPage > pagerCount - 3) {
                        showPrevMore = true;
                    }

                    if (currentPage < pageCount - 3) {
                        showNextMore = true;
                    }
                }

                // 处理需要显示的页码
                let arr = [];
                if (showPrevMore && !showNextMore) {
                    const startPage = pageCount - (pagerCount - 2);
                    for (let i = startPage; i < pageCount; i++) {
                        arr.push(i);
                    }
                } else if (!showPrevMore && showNextMore) {
                    for (let i = 2; i < pagerCount; i++) {
                        arr.push(i);
                    }
                } else if (showPrevMore && showNextMore) {
                    const offset = Math.floor(pagerCount / 2) - 1;
                    for (let i = currentPage - offset; i <= currentPage + offset; i++) {
                        arr.push(i);
                    }
                } else {
                    for (let i = 2; i < pageCount; i++) {
                        arr.push(i);
                    }
                }

                this.showPrevMore = showPrevMore;
                this.showNextMore = showNextMore;
                return arr;
            }
        },
        methods: {
            fixPage (newPage, pageCount, currentPage) {
                // 对页码的修正
                if (!isNaN(newPage)) {
                    if (newPage < 1) {
                        newPage = 1;
                    } else if (newPage > pageCount) {
                        newPage = pageCount;
                    }
                }

                if (newPage !== currentPage) {
                    this.$emit('currentPageChange', {currentPage: newPage, size: this.pageLimit});
                }
            },
            // 切换当前页
            pagerClickHandler (event) {
                const target = event.target;
                if (target.tagName === 'UL') return;
                // 获取当前点击元素的页码
                let newPage = Number(event.target.textContent);

                const pageCount = this.pageCount;
                const currentPage = this.currentPage;

                // 设置更前与更后页码
                if (target.className.indexOf('more') !== -1) {
                    if (target.className.indexOf('quickprev') !== -1) {
                        // 默认向前走5页
                        newPage = currentPage - 5;
                    } else if (target.className.indexOf('quicknext') !== -1) {
                        // 默认向后走5页
                        newPage = currentPage + 5;
                    }
                }
                // 修正当前页码
                this.fixPage(newPage, pageCount, currentPage);
            },
            // 切换显示条数
            selectSizeHandler () {
                console.log(this.currentSize);
                this.$emit('pageSizeChange', this.currentSize);
            },
            // 跳转页
            jumpToHandler () {
                const newPage = Number(this.jumpTo);
                if (isNaN(newPage)) return;
                // 修正当前页码
                this.fixPage(newPage, this.pageCount, this.currentPage);
            },
            prev () {
                let page = this.currentPage;
                page--;
                this.fixPage(page, this.pageCount, this.currentPage);
            },
            next () {
                let page = this.currentPage;
                page++;
                this.fixPage(page, this.pageCount, this.currentPage);
            }
        }
    };
</script>
