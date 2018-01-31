<template>
    <div class="pop-scrollbar" ref="scrollbar">
        <div class="pop-scrollbar__view" ref="views" :style="{maxHeight: maxHeight + 'px', marginRight: marginRight + 'px', marginBottom: marginBottom + 'px', overflowX: marginBottom ? 'scroll' : 'auto', overflowY: marginRight ? 'scroll' : 'auto'}">
            <slot></slot>
        </div>
        <div class="pop-scrollbar__bar is-vertical" v-if="isScrollRightBar" @mousedown="handlerVerticalBarMouseDown" ref="verticalBar">
            <div class="pop-scrollbar__thumb" @mousedown="handerVerticalThumbMouseDown" ref="verticalThumb" :style="{top: top}"></div>
        </div>
        <div class="pop-scrollbar__bar is-horizontal" v-if="isScrollBottomBar" @mousedown="handlerHorizontalBarMouseDown" ref="horizontalBar">
            <div class="pop-scrollbar__thumb" @mousedown="handerHorizontalThumbMouseDown" ref="horizontalThumb" :style="{left: left}"></div>
        </div>
    </div>
</template>

<script>
    import ScrollbarWidth from 'src/utils/scrollbar-width.js';
    export default {
        name: 'popScrollbar',
        componentName: 'popScrollbar',
        data () {
            return {
                // 设置垂直滚动手柄的top
                top: 0,
                // 设置水平滚动手柄的left
                left: 0,
                // 设置滚动包裹层的最大高度
                maxHeight: 0,
                // 是否有垂直滚动条
                isScrollRightBar: false,
                // 是否有水平滚动条
                isScrollBottomBar: false,
                // 当前正在滚动的滚动条
                currentScrollBar: null
            };
        },
        computed: {
            // 滚动条宽度
            scrollbarWidth () {
                return ScrollbarWidth();
            },
            // 设置股东包裹层marginRight值，如果有垂直滚动条
            marginRight () {
                return this.isScrollRightBar ? -this.scrollbarWidth : 0;
            },
            marginBottom () {
                return this.isScrollBottomBar ? -this.scrollbarWidth : 0;
            }
        },
        methods: {
            startDrag (e) {
                // 拖拽原理
                e.stopImmediatePropagation();
                this.cursorDown = true;
                this.disX = e.clientX - (this.$refs.horizontalThumb && this.$refs.horizontalThumb.offsetLeft);
                this.disY = e.clientY - (this.$refs.verticalThumb && this.$refs.verticalThumb.offsetTop);
                document.addEventListener('mousemove', this.mouseMoveDocumentHandler);
                document.addEventListener('mouseup', this.mouseUpDocumentHandler);
                document.onselectstart = () => false;
            },
            mouseMoveDocumentHandler (e) {
                if (!this.cursorDown) return;
                let type = null;
                let clientType = null;
                let scrollType = null;
                let eleType = null;
                if (this.currentScrollBar === 'vertical') {
                    type = 'Y';
                    clientType = 'Height';
                    scrollType = 'Top';
                    eleType = 'vertical';
                } else if (this.currentScrollBar === 'horizontal') {
                    type = 'X';
                    clientType = 'Width';
                    scrollType = 'Left';
                    eleType = 'horizontal';
                }
                let count = e['client' + type] - this['dis' + type];
                if (count < 0) {
                    count = 0;
                } else if (count > this.$refs[eleType + 'Bar']['client' + clientType] - this.$refs[eleType + 'Thumb']['client' + clientType]) {
                    count = this.$refs[eleType + 'Bar']['client' + clientType] - this.$refs[eleType + 'Thumb']['client' + clientType];
                }
                // 这里不需要设置top，只需要设置scrollTop即可，因为有监听scroll事件，scrollTop改变的时候会来改top值
                // this.top = count + 'px';
                if (this.currentScrollBar === 'horizontal') {
                    this.left = count + 'px';
                }
                let scal = count / (this.$refs[eleType + 'Bar']['client' + clientType] - this.$refs[eleType + 'Thumb']['client' + clientType]);
                if (scal < 0) {
                    scal = 0;
                } else if (scal > 1) {
                    scal = 1;
                }
                this.$refs.views['scroll' + scrollType] = scal * (this.$refs.views['scroll' + clientType] - this.$refs.views['client' + clientType]); // 注意这里设置百分比无效
            },
            mouseUpDocumentHandler (e) {
                this.cursorDown = false;
                document.removeEventListener('mousemove', this.mouseMoveDocumentHandler);
                document.onselectstart = null;
                this.disY = null;
                this.currentScrollBar = null;
            },
            handlerVerticalBarMouseDown (e) {
                let scal = e.offsetY / e.target.clientHeight;
                this.top = (scal * 0.88 * 100) + '%';
                this.$refs.views.scrollTop = scal * (this.$refs.views.scrollHeight - this.$refs.views.clientHeight); // 注意这里设置百分比无效
            },
            handerVerticalThumbMouseDown (e) {
                this.startDrag(e);
                this.currentScrollBar = 'vertical';
            },
            handlerHorizontalBarMouseDown (e) {
                let scal = e.offsetX / e.target.clientWidth;
                this.left = (scal * 0.88 * 100) + '%';
                this.$refs.views.scrollLeft = scal * (this.$refs.views.scrollWidth - this.$refs.views.clientWidth); // 注意这里设置百分比无效
            },
            handerHorizontalThumbMouseDown (e) {
                this.startDrag(e);
                this.currentScrollBar = 'horizontal';
            },
            getOverflowWidthAndHeight () {
                // scrollHeight这个只读属性是一个元素内容高度的度量，包括由于溢出导致的视图中不可见内容。没有垂直滚动条的情况下，scrollHeight值与元素视图填充所有内容所需要的最小值clientHeight相同。包括元素的padding，但不包括元素的border和margin.
                // scrollWidth 元素的scrollWidth只读属性以px为单位返回元素的内容区域宽度或元素的本身的宽度中更大的那个值。若元素的宽度大于其内容的区域（例如，元素存在滚动条时）, scrollWidth的值要大于clientWidth 这两个属性都兼容ie9+
                // clientHeight 这个属性是只读属性，对于没有定义CSS或者内联布局盒子的元素为0，同时它是元素内部的高度(单位像素)，包含内边距，但不包括水平滚动条、边框和外边距。clientHeight是在IE浏览器对象模型中引入的属性。可以通过 CSS height + CSS padding - 水平滚动条高度 (如果存在)来计算.
                // clientWidth 属性表示元素的内部宽度，以像素计。该属性包括内边距，但不包括垂直滚动条（如果有）、边框和外边距。
                // offsetHeight是一个只读属性，它返回该元素的像素高度，高度包含该元素的垂直内边距和边框，且是一个整数。通常，元素的offsetHeight是一种元素CSS高度的衡量标准，包括元素的边框、内边距和元素的水平滚动条（如果存在且渲染的话），不包含:before或:after等伪类元素的高度。
                // offsetWidth HTMLElement.offsetWidth 是一个只读属性，返回一个元素的布局宽度。一个典型的（译者注：各浏览器的offsetWidth可能有所不同）offsetWidth是测量包含元素的边框(border)、水平线上的内边距(padding)、竖直方向滚动条(scrollbar)（如果存在的话）、以及CSS设置的宽度(width)的值
                // scrollTop 属性可以获取或设置一个元素的内容垂直滚动的像素数。 注意是这个元素的顶部到它的最顶部可见内容（的顶部）的距离的度量，而不是到视口的高度
                // getBoundingClientRect获取到的top,left,right,bottom都是相对于视口的位置，width,height
                // 总结1.当没有滚动条，且属于正常盒模型时scrollHeight == clientHeight scrollWidth == clientWidth, offsetHeight = clientHeight + border offsetWidth = clientWidth + border; getBoundingClientRect().height = offsetHeight getBoundingClientRect().width = offsetWidth getBoundingClientRect().top 就是上边框距离视口的像素值(也就是浏览器展示页面用的左上角)，.left就是左边边框距离左侧的间距，.bottom = .top + .height .right = .left + width x与y暂时有兼容性问题
                // 总结2.当没有滚动条，且box-size:border-box(把border及padding算到width及height内来)时，offsetWidth = width - border -padding clientWidth = width 其它属性的值与总结1一样scrollHeight = clientHeight
                // 总结3.当有滚动条的时候，且属于正常合模型时offsetHeight = clientHeight + border + scrollBar offsetHeight同理 clientHeight = width - scollbar + padding clientWidth同理，scrollHeight会比包裹的子元素的offsetHeight还要大点，具体是大40个像素，具体原因不知道，scrollTop的取值范围是0 - target.scrollHeight - target.clientHeight left同理，注意这里是clientHeight 而不是offsetHeight的原因是，offsetHeight包含了滚动条的高度
                let child = this.$refs.views.children[0];
                let rect = child.getBoundingClientRect();
                while (!rect.width && !rect.height) {
                    child = child.children[0];
                    if (!child) return;
                    rect = child && child.getBoundingClientRect();
                }
                let scrollHeight = child.scrollHeight;
                let scrollWidth = child.scrollWidth;
                let width = rect.width;
                let height = rect.height;
                // 当scrollHeight大于clientHeight时，表示有垂直滚动条，同理有水平滚动条
                this.isScrollRightBar = scrollHeight > height ? true : false; // eslint-disable-line
                this.isScrollBottomBar = scrollWidth > width ? true : false; // eslint-disable-line
                this.maxHeight = height;
            },
            setVerticalBarTop (e) {
                let target = e.target;
                let scal;
                scal = target.scrollTop / (target.scrollHeight - target.clientHeight);
                // 这里是根据scrollTop占当前可滚动高度的比例来设置，滑块的top值，需要注意的是*0.88是因为滑块的高度占了12%，而top值只需要在88%的这个高度内移动
                this.top = (scal * 0.88 * 100) + '%';
            }
        },
        mounted () {
            this.getOverflowWidthAndHeight();
            // 鼠标滚轮滚动的时候只会触发垂直方向的滚动，不会触发水平方向的滚动
            this.$refs.views.onscroll = this.setVerticalBarTop;
            this.$on('updateScrollbar', this.getOverflowWidthAndHeight);
        },
        beforeDestroy () {
            document.removeEventListener('mouseup', this.mouseUpDocumentHandler);
            this.$refs.views.onscroll = null;
        }
    };
</script>
