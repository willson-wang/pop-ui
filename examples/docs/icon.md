<script>
  module.exports = {
    data() {
      return {
          iconList:[
              'check',
              'loading',
              'locationfill',
              'location',
              'roundcheckfill',
              'roundcheck',
              'roundclosefill',
              'roundclose',
              'roundrightfill',
              'roundright',
              'search',
              'unfold',
              'order',
              'back',
              'more',
              'scan',
              'settings',
              'questionfill',
              'question',
              'top',
              'pulldown',
              'pullup',
              'right',
              'refresh',
              'moreandroid',
              'cart',
              'delete',
              'home',
              'homefill',
              'friendadd',
              'friend',
              'fold',
              'forwardfill',
              'forward',
              'down',
              'pullright',
              'refresharrow',
              'backwardfill',
              'playfill',
              'tagfill',
              'tag',
              'triangledownfill',
              'triangleupfill',
              'roundleftfill-copy',
              'pulldown1',
              'full',
              'close_light',
              'add_light',
              'back_light',
              'video_fill_light',
              'video_light',
              'down_light'
          ]
      };
    }
  };
</script>
# Icon 图标

---

提供了一套常用的图标集合。

## 使用方法
通过直接设置类名为pop-icon-iconName来使用即可。例如:

<div class="demo-block demo-icons">
    <i class="pop-icon-check"></i>
    <i class="pop-icon-location"></i>
    <i class="pop-icon-loading"></i>
</div>

::: demo

``` html
    <i class="pop-icon-check"></i>
    <i class="pop-icon-location"></i>
    <i class="pop-icon-loading"></i>
```

:::

## 图标合集

<div class="demo-block demo-icon">
    <ul class="icon-list clearFix">
        <li v-for="name in iconList">
            <p><i :class="'pop-icon-' + name"></i></p>
            <div>pop-icon-{{ name}}</div>
        </li>
    </ul>
</div>

