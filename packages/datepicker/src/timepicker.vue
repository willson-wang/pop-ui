<template>
    <div class="pop-timepicker" v-clickOutSide="handlerClose">
        <label class="pop-timepicker__input">
            <pop-input v-model="time" placeholder="选择时间" icon="tag" ref="reference" @click="handlerOpenTimePicker"></pop-input>
        </label>
        <transition>
            <div ref="popover" v-show="visible" class="pop-timepicker-pannel" :style="{'minWidth': minWidth + 'px'}">
                <pop-scrollbar v-if="timeType === 'normal'">
                    <ul class="pop-timepicker-pannel__content" style="maxHeight: 200px" @click="handlerGetCurrentTime">
                        <li v-for="(item, index) in timeList" :key="index" >{{item}}</li>
                    </ul>
                </pop-scrollbar>
                <div class="pop-timepicker-pannel__mark" v-if="timeType === 'selectRange'">
                    <div  class="clearFix">
                        <div class="f-l pop-timepicker-pannel__spinner" >
                            <pop-scrollbar ref="hour">
                                <ul class="pop-timepicker-pannel__list" style="maxHeight: 190px" @click="handlerGetCurrentTime" >
                                    <li v-for="(item, index) in hourList" :key="index" >{{item}}</li>
                                </ul>
                            </pop-scrollbar>
                        </div>
                        <div class="f-l pop-timepicker-pannel__spinner" >
                            <pop-scrollbar ref="minute">
                                <ul class="pop-timepicker-pannel__list" style="maxHeight: 190px" @click="handlerGetCurrentTime">
                                    <li v-for="(item, index) in minuteAndSecondList" :key="index" >{{item}}</li>
                                </ul>
                            </pop-scrollbar>
                        </div>
                        <div class="f-l pop-timepicker-pannel__spinner" >
                            <pop-scrollbar ref="second">
                                <ul class="pop-timepicker-pannel__list" style="maxHeight: 190px" @click="handlerGetCurrentTime">
                                    <li v-for="(item, index) in minuteAndSecondList" :key="index" >{{item}}</li>
                                </ul>
                            </pop-scrollbar>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import vuePopover from 'src/utils/vue-popover.js';
    import emitter from 'src/utils/emitter.js';
    import clickOutSide from 'src/utils/clickoutside.js';
    import {debounce} from 'src/utils';
    export default {
        name: 'popTimepicker',
        componentName: 'popTimepicker',
        data () {
            return {
                time: this.value || '',
                visible: false,
                defaultPickerOptions: {
                    start: '09:00',
                    end: '18:00',
                    step: '00:15',
                    minTime: '00:00',
                    maxTime: ''
                },
                minWidth: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
                currentDate: this.$options.defaultValue || this.date || new Date()
            };
        },
        props: {
            readonly: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            },
            editable: {
                type: Boolean,
                default: true
            },
            clearable: {
                type: Boolean,
                default: true
            },
            size: {
                type: String,
                default: 'normal'
            },
            placeholder: {
                type: String,
                default: ''
            },
            value: {},
            className: {},
            pickerOptions: {},
            placement: {
                default: 'bottom-start'
            },
            boundariesPadding: {
                default: 0
            },
            popperOptions: {
                default () {
                    return {
                        gpuAcceleration: false
                    };
                }
            },
            date: {
                default () {
                    return new Date();
                }
            }
        },
        computed: {
            timeList () {
                let timeArr = [];
                const opts = Object.assign({}, this.defaultPickerOptions, this.pickerOptions);
                const startTime = this.utilTimeToSecond(opts.start);
                const endTime = this.utilTimeToSecond(opts.end);
                const step = this.utilTimeToSecond(opts.step);
                for (let i = startTime; i <= endTime; i += step) {
                    timeArr.push(this.utilSecondToTime(i));
                }
                return timeArr;
            },
            timeType () {
                if (this.isRange) {
                    return 'range';
                } else if (this.pickerOptions.selectableRange) {
                    return 'selectRange';
                } else {
                    return 'normal';
                }
            },
            hourList: function () {
                let arr = [];
                for (let i = 0; i < 24; i++) {
                    arr[i] = i;
                }
                return arr;
            },
            minuteAndSecondList: function () {
                let arr = [];
                for (let i = 0; i < 60; i++) {
                    arr[i] = i;
                }
                return arr;
            }
        },
        mixins: [vuePopover, emitter],
        directives: {
            clickOutSide
        },
        watch: {
            visible (val) {
                if (!val) {
                    this.destroyPopper();
                } else {
                    this.updatePopper();
                    this.$nextTick(() => {
                        this.broadcast('popScrollbar', 'updateScrollbar');
                    });
                }
            }
        },
        methods: {
            utilHourToSecond (hour) {
                return parseInt(hour) * 3600;
            },
            utilMinuteToSecond (minute) {
                return parseInt(minute) * 60;
            },
            utilTimeToSecond (time) {
                const timeIndex = time.indexOf(':');
                const beforeSecond = time.slice(timeIndex - 2, timeIndex);
                const afterSecond = time.slice(timeIndex + 1, timeIndex + 3);
                return this.utilHourToSecond(beforeSecond) + this.utilMinuteToSecond(afterSecond);
            },
            utilSecondToTime (second) {
                let hour = Math.floor(second / 3600);
                let minute = (second - (hour * 3600)) / 60;
                hour = hour > 9 ? hour : '0' + hour;
                minute = minute > 9 ? minute : '0' + minute;
                return hour + ':' + minute;
            },
            setCurrentTime (newVal) {
                const oldVal = this.time;
                if (newVal === oldVal) return newVal;
                this.time = newVal;
                this.$emit('input', newVal);
            },
            handlerClose () {
                this.visible = false;
            },
            handlerOpenTimePicker () {
                this.visible = !this.visible;
            },
            handlerGetCurrentTime (e) {
                this.visible = false;
                this.setCurrentTime(e.target.innerText);
            },
            bindScrollEvent () {
                this.$refs.hour && (this.$refs.hour.$refs.views.onscroll = e => this.handleScroll('hour'));
                this.$refs.minute && (this.$refs.minute.$refs.views.onscroll = e => this.handleScroll('minute'));
                this.$refs.second && (this.$refs.second.$refs.views.onscroll = e => this.handleScroll('second'));
            },
            handleScroll (type) {
                const ajust = {};
                console.log(this.$refs[`${type}`].$refs.views.scrollTop);
                ajust[`${type}s`] = Math.min(Math.floor((this.$refs[`${type}`].$refs.views.scrollTop - 80) / 32 + 3), (`${type}` === 'hour' ? 23 : 59));
                this.debounceAjustElTop(type);
                this.setScrollTime(ajust);
            },
            setScrollTime (date) {
                if (date.hours !== undefined) {
                    this.currentDate.setHours(date.hours);
                    this.hours = this.currentDate.getHours();
                }
                if (date.minutes !== undefined) {
                    this.currentDate.setMinutes(date.minutes);
                    this.minutes = this.currentDate.getMinutes();
                }
                if (date.seconds !== undefined) {
                    this.currentDate.setSeconds(date.seconds);
                    this.seconds = this.currentDate.getSeconds();
                }
                this.ajustScrollTop();
            },
            ajustScrollTop () {
                this.ajustElTop('hour', this.hours);
                this.ajustElTop('minute', this.minutes);
                this.ajustElTop('second', this.seconds);
            },
            ajustElTop (type, value) {
                // this.$refs[`${type}`].$refs.views.scrollTop = Math.max(0, (value - 2.5) * 32 + 80);
            }
        },
        created () {
            this.debounceAjustElTop = debounce(500, type => this.ajustElTop(type, this[`${type}s`]));
        },
        mounted () {
            this.referenceElm = this.$refs.reference.$el;
            this.popperElm = this.$refs.popover;
            this.minWidth = this.referenceElm.getBoundingClientRect().width;
            this.$nextTick(() => {
                this.bindScrollEvent();
            });
        }
    };
</script>
