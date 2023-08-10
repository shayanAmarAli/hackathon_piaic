export default {
    title: 'Product category',
    name: 'product_category',
    type: 'array',
    of: [{type: 'string'}],
    options: {
      list: [
        {title: 'Male', value: 'male'},
        {title: 'Female', value: 'female'},
        {title: 'Kids', value: 'kids'},
      ]
    }
  }