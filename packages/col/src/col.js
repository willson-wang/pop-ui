export default {
    name: 'popCol',
    component: 'popCol',
    props: {
        span: {
            type: Number,
            default: 24
        },
        offset: {
            type: Number,
            default: 0
        },
        push: {
            type: Number,
            default: 0
        },
        pull: {
            type: Number,
            default: 0
        },
        xs: [Number, Object],
        sm: [Number, Object],
        md: [Number, Object],
        lg: [Number, Object],
        tag: {
            type: String,
            default: 'div'
        }
    },
    computed: {
        gutter () {
            var parent = this.$parent;
            while (parent && parent.$options.componentName !== 'popRow') {
                parent = parent.$parent;
            }
            return parent ? parent.gutter : 0;
        }
    },
    render (h) {
        let classList = [];
        let style = {};

        if (this.gutter) {
            style.paddingLeft = this.gutter / 2 + 'px';
            style.paddingRight = style.paddingLeft;
        }

        ['span', 'offset', 'pull', 'push'].forEach((prop) => {
            if (this[prop]) {
                classList.push(
                    prop !== 'span' ? `pop-col-${prop}-${this[prop]}` : `pop-col-${this[prop]}`
                );
            }
        });

        ['xs', 'sm', 'md', 'lg'].forEach((type) => {
            if (typeof this[type] === 'number') {
                classList.push(`pop-col-${type}-${this[type]}`);
            } else if (typeof this[type] === 'object') {
                let props = this[type];
                Object.keys(props).forEach(prop => {
                    classList.push(
                        prop !== 'span'
                        ? `pop-col-${type}-${prop}-${props[prop]}`
                        : `pop-col-${type}-${props[prop]}`
                    );
                });
            }
        });

        return h(this.tag, {
            class: ['pop-col', classList],
            style
        }, this.$slots.default);
    }
};
