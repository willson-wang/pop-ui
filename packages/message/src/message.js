import Vue from 'vue';
// 注意这里需要加上default，因为v-loader13.0.0之后的版本将，esModule设置为true，
let MessageConstructor = Vue.extend(require('./message.vue').default);

let instance;
let instances = [];
let seed = 1;
const PopupManager = {
    zIndex: 3000,
    nextZIndex: function () {
        return PopupManager.zIndex++;
    }
};

function hasOwn (obj, key) {
    return hasOwnProperty.call(obj, key);
};

function isVNode (node) {
    return typeof node === 'object' && hasOwn(node, 'componentOptions');
};

var Message = function (options) {
    if (Vue.prototype.$isServer) return;
    options = options || {};
    // 判断传入参数
    if (typeof options === 'string') {
        options = {
            message: options
        };
    }
    // 添加关闭函数
    let userOnClose = options.onClose;
    let id = 'message_' + seed++;

    options.onClose = function () {
        Message.close(id, userOnClose);
    };
    // 使用new Vue构造出来的组件再次构造实例
    instance = new MessageConstructor({
        data: options
    });
    instance.id = id;
    // 判断传入的信息是否为dom
    if (isVNode(instance.message)) {
        instance.$slots.default = [instance.message];
        instance.message = null;
    }
    // 挂载实例
    instance.vm = instance.$mount();
    document.body.appendChild(instance.vm.$el);
    instance.vm.visible = true;
    instance.dom = instance.vm.$el;
    instance.dom.style.zIndex = PopupManager.nextZIndex();
    instances.push(instance);
    return instance.vm;
};

['success', 'warning', 'info', 'error'].forEach(type => {
    Message[type] = options => {
        if (typeof options === 'string') {
            options = {
                message: options
            };
        }
        options.type = type;
        return Message(options);
    };
});

Message.close = function (id, userOnClose) {
    for (let i = 0, len = instances.length; i < len; i++) {
        if (id === instances[i].id) {
            if (typeof userOnClose === 'function') {
                userOnClose(instances[i]);
            }
            instances.splice(i, 1);
            break;
        }
    }
};

Message.closeAll = function () {
    for (let i = instances.length - 1; i >= 0; i--) {
        instances[i].close();
    }
};

export default Message;
