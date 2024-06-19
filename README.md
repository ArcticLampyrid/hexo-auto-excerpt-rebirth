## hexo-auto-excerpt-rebirth
[![npm-image]][npm-url]
[![license-image]](LICENSE)  

A Hexo plugin that automatically generates excerpts for your posts, rebirth of [hexo-auto-excerpt](https://github.com/ashisherc/hexo-auto-excerpt) with more features and flexibility.

## Config
```yaml
auto_excerpt:
  as_html: true # Whether to output the excerpt as HTML or plain text (default: false)
  length: 150 # Limit the number of characters in the excerpt (default: 150)
  lines: 5 # Limit the number of lines in the excerpt (default: 5)
  filters: 
  # Filter the post based on the specified property
  - key: title # For property `title`
    value: '' # If the property is empty
    type: deny # Deny the processing of the post
```

[npm-image]: https://img.shields.io/npm/v/hexo-auto-excerpt-rebirth?style=flat-square
[license-image]: https://img.shields.io/npm/l/hexo-auto-excerpt-rebirth?style=flat-square
[npm-url]: https://www.npmjs.com/package/hexo-auto-excerpt-rebirth
