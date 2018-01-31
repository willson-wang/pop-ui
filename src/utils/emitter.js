var _broadcast = function (componentName, eventName, params) {
    this.$children.forEach(child => {
        var name = child.$options.componentName;

        if (name === componentName) {
            child.$emit.apply(child, [eventName].concat(params));
        } else {
            _broadcast.apply(child, [componentName, eventName].concat(params));
        }
    });
};

export default {
    methods: {
        // 向上传播
        dispatch (componentName, eventName, params) {
            var parent = this.$parent || this.$root;
            var name = parent.$options.componentName;

            while (parent && (!name || name !== componentName)) {
                parent = parent.$parent;

                parent && (name = parent.$options.componentName);
            }

            if (parent) {
                parent.$emit.apply(parent, [eventName].concat(params));
            }
        },
        // 向下传播
        broadcast (componentName, eventName, params) {
            _broadcast.call(this, componentName, eventName, params);
        }
    }
};
