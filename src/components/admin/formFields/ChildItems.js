import FormItem from "./FormItem";

const ChildItems = ({ items, ...rest }) => {
    return Object.keys(items).map(key => {
        const fieldData = {
            ...items[key],
            key: key
        };

        return <FormItem field={fieldData} {...rest} />;
    });
};

export default ChildItems;