import product_category from "./product_category"
export default {
    name: "product",
    title: "Product",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string",
            validation: (Rule:any) => Rule.required()
        },
        {
            name: "Price",
            title: "Price",
            type: "string",
            validation: (Rule:any) => Rule.required()
        },
        {
            name: "product_image",
            title: "Product image",
            type: "image",
            validation: (Rule:any) => Rule.required()
        },
        {
            title: "Product Category",
            name: "product_category",
            type: "string",
            options: {
                list: [
                    { title: "male", value: "male" },
                { title: "female", value: "female" },
              ],
              layout: "radio",
              direction: "horizontal"
            }
        },
        {
          title: 'Sub Category',
          name: 'sub_category',
          type: 'string',
          options: {
            list: [
              { title: 'Pant', value: 'pant' },
              { title: 'Dress', value: 'dress' },
              { title: 'T-shirt', value: 't-shirt' },
              { title: 'Jacket', value: 'jacket' },
              { title: 'Sweater', value: 'sweater' },
            ],
          },
        },
        
    ]
}