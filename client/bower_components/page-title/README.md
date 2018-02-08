# page-title

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://webcomponents.org/element/zacharytamas/page-title)

A Polymer element for updating the title of a webpage declaratively, possibly
automatically, using Polymer bindings. Example:

    <page-title base-title="zacharytamas" page-title="Home"></page-title>

Or something more complex using bindings:

    <my-blog>
      <!-- inside Local DOM -->
      <page-title base-title="MyBlog"
        page-title="{{currentPost.title}}"></page-title>
    </my-blog>
