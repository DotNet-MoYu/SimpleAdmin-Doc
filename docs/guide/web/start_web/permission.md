<!-- 权限管理 -->

# 权限管理

## 菜单权限

::: tip

- 目前菜单权限使用动态路由实现，后台根据不同用户角色返回对应路由,前端根据返回的路由动态添加路由

:::

## 按钮权限

::: tip

- 按钮权限判断是否能看到这个按钮，同时后端也做了校验，前端只是显示与不显示
- 支持使用 Hooks 方式绑定权限,同时也支持使用v-auth指令方式绑定权限
- 用户登录后，后端返回用户权限列表，前端根据权限列表判断是否显示按钮
- 推荐使用v-auth指令方式绑定权限
:::

### 使用	v-auth 指令方式绑定权限

具体实现如下：
```typescript
import { useAuthStore } from "@/stores/modules/auth";
import type { Directive, DirectiveBinding } from "vue";

/**
 * @description 按钮权限指令
 * 通过传入的权限码判断当前用户是否有权限，如果没有权限则移除该元素
 * @param value {string | string[]} - 权限码
 * @example
 * <button v-auth="'userAdd'">需要有用户添加用户权限</button>
 * <button v-auth="['userAdd','userEdit']">需要有添加用户权限编辑用户</button>
 * <button v-auth:and="['userAdd', 'userEdit']">添加和编辑用户权限都要有</button>
 * <button v-auth.and="['userAdd', 'userEdit']">添加和编辑用户权限都要有</button>
 */
const auth: Directive = {
  // 当指令挂载时调用
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    // 获取传入的值和参数
    const { value, arg } = binding;
    // 获取authStore
    const authStore = useAuthStore();
    // 获取用户权限按钮列表
    const currentPageRoles = authStore.authButtonListGet ?? [];
    // 如果传入的值是数组，并且数组的长度大于0
    if (value instanceof Array && value.length) {
      const fn = binding.modifiers.and || arg === "and" ? "every" : "some"; //some表示只要有一个权限通过即可，every表示必须每个权限都通过
      const hasPermission = value[fn](item => currentPageRoles.includes(item)); // 判断传入的权限码是否在当前页面的权限列表中
      // 如果不包含，则移除该元素
      if (!hasPermission) el.remove();
    } else {
      // 如果传入的值不包含当前页面的角色，则移除该元素
      if (!currentPageRoles.includes(value)) el.remove();
    }
  }
};

export default auth;
```
使用方法：
vue中通过 v-auth 判断是否显示按钮：
```vue
  <s-button v-auth="'xxxAdd'" suffix="机构" />
```

### 使用 Hooks 方式绑定权限

具体实现如下：
```typescript jsx
import { useAuthStore } from "@/stores/modules";
import { isArray } from "@/utils/is";

export const useAuthButtons = () => {
  const authStore = useAuthStore();
  const authButtons = authStore.authButtonListGet; // 权限按钮列表

  /**
   * @func hasPermission
   * @desc   权限判断是否能看到这个按钮，同时后端也做了校验，前端只是显示与不显示
   * @param {}   permission 按钮的权限码，可以是单个字符串，也可以是数组
   * @param {}   and 是否完全匹配，默认false，即只要有一个权限码通过则通过，如果为 true，则必须每个权限码都通过
   * 使用方法：
   * 例如 buttonCodeList 的数据为： ['button1', 'button2', 'button3']
   * 想要判断 button1 的权限，可以写成：hasPerm('button1')
   * 想要判断 button1 或 button2 的权限，可以写成：hasPerm(['button1', 'button2' ])
   * 想要判断 button1 与 button2 的权限，可以写成：hasPerm(['button1', 'button2' ], true)
   * @return {}
   */
  const hasPerm = (permission: string[] | string, and: boolean = false) => {
    //如果是数组，则需要判断数组中的每一项权限
    if (isArray(permission)) {
      const fn = and ? "every" : "some"; //some表示只要有一个权限通过即可，every表示必须每个权限都通过
      return permission[fn](item => authButtons.includes(item)); //多个权限
    } else {
      return authButtons.includes(permission); //单个权限
    }
  };

  return { hasPerm };
};
```

使用方法：
```typescript 
import { useAuthButtons } from "@/hooks/useAuthButtons";
const { hasPerm } = useAuthButtons();
```
vue中通过v-if判断是否显示按钮：
```vue
<el-button v-if="hasPerm('xxxAdd')">按钮1</el-button>
```
