import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'

// @ts-ignore
let instance

function render(props = {}) {
  // @ts-ignore
  const { container } = props
  instance = createApp(App)
  instance.mount(container ? container.querySelector('#app') : '#app')
}

// @ts-ignore
if (!window.__POWERED_BY_QIANKUN__) {
  render()
}

// @ts-ignore
function storeTest(props) {
  props.onGlobalStateChange &&
    props.onGlobalStateChange(
      // @ts-ignore
      (value, prev) =>
        console.log(`[onGlobalStateChange - ${props.name}]:`, value, prev),
      true
    )
  props.setGlobalState &&
    props.setGlobalState({
      ignore: props.name,
      user: {
        name: props.name
      }
    })
}

export async function bootstrap() {
  console.log('[vue] vue app bootstraped')
}

// @ts-ignore
export async function mount(props) {
  console.log('[vue] props from main framework', props)
  storeTest(props)
  render(props)
  // @ts-ignore
  instance.config.globalProperties.$onGlobalStateChange =
    props.onGlobalStateChange
  // @ts-ignore
  instance.config.globalProperties.$setGlobalState = props.setGlobalState
}

export async function unmount() {
  // @ts-ignore
  instance.unmount()
  // @ts-ignore
  instance._container.innerHTML = ''
  instance = null
}
