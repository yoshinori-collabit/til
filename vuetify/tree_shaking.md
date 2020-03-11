## treeShaking とは

VuetifyLoader の機能

もちろん @nuxtjs/vuetify でも利用する機会がある

利用しているコンポーネント以外のコードをビルド時に削除するしくみ

(木を揺らして葉が落ちるイメージ)

## development 環境だとデフォルトオフになっている

treeShaking はそれなりに重い処理が走るため、@nuxtjs/vuetify では本番のみ実行されるようになっていた

だが、vuetify の sass 変数を上書きする際、treeShaking が必須になる

今回は FontFamily 等上書きしていて、development でも確認したかった為オンにしている

## Dynamic import への対処

treeShaking はコードから利用されているか、自動的に判別するため、Dynamic に import されているものは落ちてしまう

例えばこういったコード ↓

```
<component :is="hogeComponent"></component>
```

### 今回当たったケース

Vuetify に依存したトーストのライブラリを利用しており、内部で v-snackbar を呼び出していた

こちらのコード上は v-snackbar を利用しないように見えています ↓

```
import Vue from 'vue'
import VuetifyToast from 'vuetify-toast-snackbar'

Vue.use(VuetifyToast)
```

利用するライブラリ上でも import する処理は無く、v-snackbar や v-btn が呼び出せる前提のコードでした

今回は Vue.use(VuetifyToast) の前に 手動でコンポーネントを登録しました

```
import Vue from 'vue'
import { VSnackbar } from 'vuetify/lib'
import VuetifyToast from 'vuetify-toast-snackbar'

// TreeShaking 対策
Vue.component('v-snackbar', VSnackbar)

Vue.use(VuetifyToast)
```

vuetify/lib から個々のコンポーネントを拾ってこれるようになっています

これは @nuxtjs/vuetify を利用している際にも使えます

(@nuxtjs/vuetify が vuetify に依存しているので、暗黙的に install されています)

global にコンポーネント登録しているのがちょっと気持ち悪いですが

ライブラリのコードそのままならこれが一番楽でした
