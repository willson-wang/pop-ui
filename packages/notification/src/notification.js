import Vue from 'vue';

const NotificationConstructor = Vue.extend(require('./notification.vue').default);

let instance;
let instances = [];
let seed = 1;

const PopupManager = {
    zIndex: 4000,
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

var Notification = function (options) {
    if (Vue.prototype.$isServer) return;
    options = options || {};

    if (typeof options === 'string') {
        options = {
            message: options
        };
    }

    let userOnClose = options.onClose;
    let id = 'notification' + seed++;

    options.onClose = function () {
        Notification.close(id, userOnClose);
    };

    instance = new NotificationConstructor({
        data: options
    });

    instance.id = id;
    if (isVNode(instance.message)) {
        instance.$slots.default = [instance.message];
        instance.message = null;
    }

    instance.vm = instance.$mount();
    document.body.appendChild(instance.vm.$el);
    instance.showNotification = true;
    instance.dom = instance.vm.$el;
    instance.dom.style.zIndex = PopupManager.nextZIndex();
    if (instances.length) {
        const lastDomRect = instances[instances.length - 1].dom.getBoundingClientRect();
        instance.dom.style.top = lastDomRect.bottom + 10 + 'px';
    }
    instances.push(instance);
    return instance.vm;
};

['info', 'success', 'error', 'warning'].forEach((type) => {
    Notification[type] = function (options) {
        if (typeof options === 'string') {
            options = {
                message: options
            };
        }
        options.type = type;
        return Notification(options);
    };
});

Notification.close = function (id, userOnClose) {
    for (let i, len = instances.length; i < len; i++) {
        if (id === instances[i].id) {
            if (typeof userOnClose === 'function') {
                userOnClose(instances[i]);
            }
            instances.splice(i, 1);
            break;
        }
    }
};

Notification.closeAll = function () {
    for (let i, len = instances.length; i < len; i++) {
        instances[i].close();
    }
};

export default Notification;
