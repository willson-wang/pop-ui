import Radio from '../packages/radio/index.js';
import RadioButton from '../packages/radio-button/index.js';
import RadioGroup from '../packages/radio-group/index.js';
import checkBox from '../packages/checkbox/index.js';
import checkBoxGroup from '../packages/checkbox-group/index.js';
import checkBoxButton from '../packages/checkbox-button/index.js';
import Row from '../packages/row/index.js';
import Col from '../packages/col/index.js';
import Icon from '../packages/icon/index.js';
import Button from '../packages/button/index.js';
import ButtonGroup from '../packages/button-group/index.js';
import Popover from '../packages/popover/index.js';
import Message from '../packages/message/index.js';
import Notification from '../packages/notification/index.js';
import Tag from '../packages/tag/index.js';
import Select from '../packages/select/index.js';
import SelectOption from '../packages/select-option/index.js';
import SelectOptionGroup from '../packages/select-option-group/index.js';
import Pagination from '../packages/pagination/index.js';
import Input from '../packages/input/index.js';
import InputNumber from '../packages/input-number/index.js';
import Dialog from '../packages/dialog/index.js';
import Scrollbar from '../packages/scrollbar/index.js';
import Timepicker from '../packages/datepicker/src/timepicker.vue';

const components = [
    Radio,
    RadioButton,
    RadioGroup,
    checkBox,
    checkBoxGroup,
    checkBoxButton,
    Row,
    Col,
    Icon,
    Button,
    ButtonGroup,
    Popover,
    Tag,
    Select,
    SelectOption,
    SelectOptionGroup,
    Pagination,
    Input,
    InputNumber,
    Dialog,
    Scrollbar,
    Timepicker
];

const install = function (Vue) {
    components.forEach((component) => {
        Vue.component(component.name, component);
    });
    Vue.prototype.$message = Message;
    Vue.prototype.$notification = Notification;
};

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
};

export default {
    install,
    Radio,
    RadioButton,
    RadioGroup,
    checkBox,
    checkBoxGroup,
    checkBoxButton,
    Row,
    Col,
    Icon,
    Button,
    ButtonGroup,
    Popover,
    Message,
    Notification,
    Tag,
    Select,
    SelectOption,
    SelectOptionGroup,
    Pagination,
    Input,
    InputNumber,
    Dialog,
    Scrollbar,
    Timepicker
};
