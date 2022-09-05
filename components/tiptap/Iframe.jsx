import { Node } from '@tiptap/core'

export default Node.create({
  name: 'iframe',

  group: 'block',

  atom: true,

  options: {
      allowFullscreen: false,
      HTMLAttributes: {}
  },

  addOptions() {
    return {
      allowFullscreen: true,
      HTMLAttributes: {
        class: 'iframe-wrapper',
      },
    }
  },

  addAttributes() {
    return {
      class: {
        default: 'tiptap-iframe'
      },
      src: {
        default: null,
      },
      frameborder: {
        default: 0,
      },
      autoplay: {
        default: true
      },
      allowfullscreen: {
        default: this.options.allowFullscreen,
        parseHTML: () => this.options.allowFullscreen,
      },
    }
  },

  parseHTML() {
    return [{
      tag: 'iframe',
    }]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', this.options.HTMLAttributes, ['iframe', HTMLAttributes]]
  },

  addCommands() {
    return {
      setIframe: ({ src }) => ({ tr, dispatch }) => {
        this.options.src = `https://www.youtube.com/embed/${src}`;
        const { selection } = tr
        const node = this.type.create(this.options)
        if (dispatch) {
          tr.replaceRangeWith(selection.from, selection.to, node)
        }
        return true
      },
    }
  }
})