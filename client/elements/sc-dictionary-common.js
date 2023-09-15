export function dictionarySimpleItemToHtml(dicItem) {
  if (!dicItem) {
    return '';
  }
  return `
    <dl>
      <dt>
        <dfn class="entry" lang="pi" translate="no">${dicItem.word || dicItem.entry}</dfn>
      </dt>
      <dd>
        ${dicItem.grammar ? `<span class="grammar">${dicItem.grammar}</span>` : ''}
        ${
          dicItem.definition
            ? `
            <ol class="definition">
              ${dicItem.definition.constructor === Array
                  ? `${dicItem.definition.map(item => `<li>${item}</li>`).join('')}`
                  : `<li>${dicItem.definition}</li>`
              }
            </ol>
          ` : ''
        }
        ${
          dicItem.xr
            ? `
            <ul class="xr">
              ${dicItem.xr.constructor === Array
                  ? `${dicItem.xr.map(item => `<li><a href="/define/${item}">${item}</a></li>`).join('')}`
                  : `<li><a href="/define/${dicItem.xr}">${dicItem.xr}</a></li>`
              }
            </ul>
          ` : ''
        }
      </dd>
    </dl>
  `;
}
