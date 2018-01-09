from itertools import chain

from lxml import etree
from lxml.etree import tostring

templates_dir = '../elements/static-templates'

block_level_elements = ["p", "h1", "h2", "h3", "h4", "h5", "h6", "ol", "ul", "pre", "address", "blockquote", "dl",
                        "div", "fieldset", "form", "hr", "noscript", "table"]


def extract_strings_from_template(static_file):
    root = etree.parse(open(static_file))
    for element in root.iter(block_level_elements):
        if element.text:
            print(element.tag, stringify_children(element))


def stringify_children(node):
    parts = ([node.text] +
             list(chain(*([c.text, tostring(c), c.tail] for c in node.getchildren()))) +
             [node.tail])
    # filter removes possible Nones in texts and tails
    return parts


if __name__ == '__main__':
    extract_strings_from_template(templates_dir + '/about-page.html')