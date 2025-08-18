import FormItem from "./FormItem";

const ChildItems = ({ items, definition, ...rest }) => {
    return Object.keys(items).map(key => {
        const fieldData = {
            ...items[key],
            key: key
        }

        return <FormItem 
            definition={definition}
            field={fieldData} 
            {...rest}
        />;
    });
};

export default ChildItems;