const stripHTMLTagsFromString = (html) => html.replace(/<\/?[^>]+(>|$)/g, '');

export default stripHTMLTagsFromString;
