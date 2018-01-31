export default {
    name: 'popRow',
    componentName: 'popRow',
    props: {
        type: String,
        gutter: Number,
        justify: {
            type: String,
            default: 'start'
        },
        align: {
            type: String,
            default: 'top'
        },
        tag: {
            type: String,
            default: 'div'
        }
    },
    computed: {
        style () {
            var result = {};
            if (this.gutter) {
                result.marginLeft = `-${this.gutter / 2}px`;
                result.marginRight = result.marginLeft;
            }
            return result;
        }
    },
    render (h) {
        return h(this.tag, {
            class: [
                'pop-row',
                this.justify !== 'start' ? `is-justify-${this.justify}` : '',
                this.align !== 'top' ? `is-align-${this.align}` : '',
                { 'pop-row--flex': this.type === 'flex' }
            ],
            style: this.style
        }, this.$slots.default);
    }
};
