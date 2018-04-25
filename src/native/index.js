import App from '@/main'

export default {
  loading: (type) => {
    let loading = require('@/components/loading').default;
    type === 'show' ? loading.open() : loading.close();
  },
  saveImage: (url) => {
    require('@/directive/download').default();
    App.$download(url)
  },
  clipboard: (text, tip) => {
    try {
      require('@/directive/clipboard').default();
      App.$toask(App.$clipboard(text) ? `${tip}成功` : `${tip}失败`)
    } catch (e) {
      log(`you have this, but you never give me\nso sorry i can't help you to clipboard ${text}`)
    }
  }
};
