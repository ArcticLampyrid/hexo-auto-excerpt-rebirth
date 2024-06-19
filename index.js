
(function () {
    function truncate(input, maxLength, maxLines) {
        let truncated = '';
        let lines = input.split('\n');
        let currentLength = 0;
        let lineCount = 0;

        for (let i = 0; i < lines.length && lineCount < maxLines; i++) {
            let line = lines[i];
            if (currentLength + line.length + (lineCount > 0 ? 1 : 0) > maxLength) {
                let remainingLength = maxLength - currentLength - (lineCount > 0 ? 1 : 0);
                truncated += (lineCount > 0 ? '\n' : '') + line.slice(0, remainingLength) + '...';
                return truncated;
            } else {
                truncated += (lineCount > 0 ? '\n' : '') + line;
                currentLength += line.length + (lineCount > 0 ? 1 : 0);
                lineCount++;
            }
        }
        return truncated;
    }

    const { compile } = require('html-to-text');
    const escape_html = hexo.extend.helper.get('escape_html').bind(hexo);
    const options =
    {
        wordwrap: false,
        selectors: [
            { selector: 'a', options: { ignoreHref: true } },
            { selector: 'img', format: 'inlineString', options: { string: '[Image]' } },
            { selector: 'table', format: 'dataTable', options: { leadingLineBreaks: 1, trailingLineBreaks: 1 } },
            { selector: 'figure>table', format: 'block', options: { leadingLineBreaks: 1, trailingLineBreaks: 1 } },
            { selector: '.gutter', format: 'skip' },
            { selector: 'p', options: { leadingLineBreaks: 1, trailingLineBreaks: 1 } },
            { selector: 'pre', options: { leadingLineBreaks: 1, trailingLineBreaks: 1 } },
            { selector: 'h1', options: { leadingLineBreaks: 1, trailingLineBreaks: 1 } },
            { selector: 'h2', options: { leadingLineBreaks: 1, trailingLineBreaks: 1 } },
            { selector: 'h3', options: { leadingLineBreaks: 1, trailingLineBreaks: 1 } },
            { selector: 'h4', options: { leadingLineBreaks: 1, trailingLineBreaks: 1 } },
            { selector: 'h5', options: { leadingLineBreaks: 1, trailingLineBreaks: 1 } },
            { selector: 'h6', options: { leadingLineBreaks: 1, trailingLineBreaks: 1 } },
            { selector: 'blockquote', options: { leadingLineBreaks: 1, trailingLineBreaks: 1 } },
        ],
    };
    const sanitize = compile(options);
    hexo.extend.filter.register('after_post_render', function (post) {
        if (post.excerpt || /<!--\s*more\s*-->/.test(post.content) || post.content.indexOf('<a id="more"></a>') !== -1 || post.content.indexOf('<span id="more"></span>') !== -1) {
            return post;
        }
        const { length, lines, filters, as_html } = hexo.config.auto_excerpt || {};
        if (filters) {
            for (const filter of filters) {
                if (filter.key) {
                    if (post[filter.key] !== filter.value) {
                        continue;
                    }
                }
                if (filter.type === "deny") {
                    return post;
                }
            }
        }
        const excerpt = sanitize(post.content);
        const truncatedExcerpt = truncate(excerpt, length || 150, lines || 5);
        post.excerpt = as_html ? escape_html(truncatedExcerpt).replace(/\r\n?|\n/g, '<br>') : truncatedExcerpt;
        return post;
    });
})();
